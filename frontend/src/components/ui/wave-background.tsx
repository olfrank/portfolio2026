'use client'
import * as React from 'react'
import { useEffect, useRef } from 'react'
import { createNoise2D } from 'simplex-noise'

const PARALLAX_FACTOR = 0.06
const OVERSPILL = 0.18

// Three colour phases keyed by scroll progress (0 → 0.5 → 1.0)
// Each phase defines hue/saturation/lightness as a function of line position t (0–1)
const COLOR_PHASES = [
    // Deep blue — top of page
    (t: number) => ({ h: 215 + t * 20, s: 40 + t * 20, l: 48 + t * 14 }),
    // Indigo — mid scroll
    (t: number) => ({ h: 242 + t * 12, s: 45 + t * 18, l: 50 + t * 12 }),
    // Soft cyan — bottom of page
    (t: number) => ({ h: 192 + t * 16, s: 42 + t * 18, l: 52 + t * 12 }),
]

const lerpColor = (t: number, progress: number): string => {
    // Map progress (0–1) across the three phases
    const scaled = Math.min(progress * (COLOR_PHASES.length - 1), COLOR_PHASES.length - 1 - 0.0001)
    const idx   = Math.floor(scaled)
    const blend = scaled - idx

    const a = COLOR_PHASES[idx](t)
    const b = COLOR_PHASES[idx + 1](t)

    const h = a.h + (b.h - a.h) * blend
    const s = a.s + (b.s - a.s) * blend
    const l = a.l + (b.l - a.l) * blend

    return `hsl(${h.toFixed(1)},${s.toFixed(1)}%,${l.toFixed(1)}%)`
}

interface Point {
    x: number
    y: number
    waveX: number
    waveY: number
    cx: number
    cy: number
    cvx: number
    cvy: number
}

interface WavesProps {
    className?: string
    backgroundColor?: string
    pointerSize?: number
}

export function Waves({
    className = "",
    backgroundColor = "#0c111d",
    pointerSize = 0,
}: WavesProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const svgRef       = useRef<SVGSVGElement>(null)
    const mouseRef = useRef({ x: -10, y: 0, lx: 0, ly: 0, sx: 0, sy: 0, v: 0, vs: 0, a: 0, set: false })
    const pathsRef     = useRef<SVGPathElement[]>([])
    const linesRef     = useRef<Point[][]>([])
    const noiseRef     = useRef<((x: number, y: number) => number) | null>(null)
    const rafRef       = useRef<number | null>(null)
    const lastFrameRef = useRef<number>(0)
    const movedXRef    = useRef<Float32Array | null>(null)
    const movedYRef    = useRef<Float32Array | null>(null)
    const pathPartsRef = useRef<string[]>([])

    // Parallax
    const parallaxTargetRef  = useRef(0)
    const parallaxCurrentRef = useRef(0)
    const overspillPxRef     = useRef(0)
    const dimsRef            = useRef({ width: 0, height: 0 })

    // Scroll-driven colour progress (0 → 1 across page)
    const progressTargetRef  = useRef(0)
    const progressCurrentRef = useRef(0)
    const lastColorProgress  = useRef(-1)  // last progress value at which colours were updated

    // Bounding box of #hero-title in container-local coordinates.
    // Updated on scroll/resize; null when the element is off-screen.
    const textBoundsRef = useRef<{ left: number; right: number; top: number; bottom: number } | null>(null)

    useEffect(() => {
        if (!containerRef.current || !svgRef.current) return

        noiseRef.current = createNoise2D()
        setSize()
        setLines()

        // Re-measure once the full page has rendered — needed on mobile where
        // stacked content makes the page much taller than during the first paint.
        const resizeTimer = setTimeout(() => { setSize(); setLines(); measureTextBounds() }, 200)

        const onVisibilityChange = () => {
            if (document.hidden) {
                if (rafRef.current) cancelAnimationFrame(rafRef.current)
            } else {
                lastFrameRef.current = 0
                rafRef.current = requestAnimationFrame(tick)
            }
        }

        const onScroll = () => {
            parallaxTargetRef.current = -window.scrollY * PARALLAX_FACTOR
            const maxScroll = document.body.scrollHeight - window.innerHeight
            if (maxScroll > 0) {
                progressTargetRef.current = window.scrollY / maxScroll
            }
            measureTextBounds()
        }

        window.addEventListener('resize', onResize)
        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('scroll', onScroll, { passive: true })
        document.addEventListener('visibilitychange', onVisibilityChange)

        rafRef.current = requestAnimationFrame(tick)

        return () => {
            clearTimeout(resizeTimer)
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
            window.removeEventListener('resize', onResize)
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('scroll', onScroll)
            document.removeEventListener('visibilitychange', onVisibilityChange)
        }
    }, [])

    const setSize = () => {
        if (!containerRef.current || !svgRef.current) return
        const vw = window.innerWidth
        const vh = window.innerHeight

        // Overspill must cover the full parallax travel so the container's bottom
        // edge never retreats above the viewport bottom at max scroll.
        // travel = maxScroll × PARALLAX_FACTOR, plus a small safety buffer.
        const maxScroll   = Math.max(0, document.documentElement.scrollHeight - vh)
        const minOverspill = Math.ceil(maxScroll * PARALLAX_FACTOR) + 32
        const overspill   = Math.max(Math.round(vh * OVERSPILL), minOverspill)
        const containerH  = vh + overspill * 2

        overspillPxRef.current = overspill
        dimsRef.current = { width: vw, height: containerH }

        containerRef.current.style.top    = `${-overspill}px`
        containerRef.current.style.height = `${containerH}px`
        svgRef.current.style.width  = `${vw}px`
        svgRef.current.style.height = `${containerH}px`

        measureTextBounds()
    }

    // Convert the hero title's viewport rect into container-local coordinates
    // so the repulsion math works in the same space as the wave points.
    const measureTextBounds = () => {
        const el = document.getElementById('hero-title')
        if (!el) { textBoundsRef.current = null; return }

        const r        = el.getBoundingClientRect()
        const padX     = 24   // px of extra breathing room left/right
        const padYTop  = 28   // px above the tallest ascenders
        const padYBot  = 28   // px below the baseline — subtitle sits naturally on the waves
        const overspill = overspillPxRef.current
        const parallax  = parallaxCurrentRef.current

        textBoundsRef.current = {
            left:   r.left   - padX,
            right:  r.right  + padX,
            top:    r.top    - padYTop + overspill - parallax,
            bottom: r.bottom + padYBot + overspill - parallax,
        }
    }

    const setLines = () => {
        if (!svgRef.current) return
        const { width, height } = dimsRef.current
        if (!width || !height) return

        linesRef.current = []
        pathsRef.current.forEach(path => path.remove())
        pathsRef.current = []

        const xGap = 6
        const yGap = 6

        const totalLines  = Math.ceil((height + 200) / yGap)
        const totalPoints = Math.ceil((width  + 30)  / xGap)

        const xStart = (width  - xGap * totalPoints) / 2
        const yStart = (height - yGap * totalLines)  / 2

        movedXRef.current    = new Float32Array(totalPoints)
        movedYRef.current    = new Float32Array(totalPoints)
        pathPartsRef.current = new Array(totalPoints + 1)

        for (let i = 0; i < totalLines; i++) {
            const t = i / Math.max(totalLines - 1, 1)
            const points: Point[] = new Array(totalPoints)

            for (let j = 0; j < totalPoints; j++) {
                points[j] = {
                    x: xStart + xGap * j,
                    y: yStart + yGap * i,
                    waveX: 0, waveY: 0,
                    cx: 0, cy: 0, cvx: 0, cvy: 0,
                }
            }

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
            path.classList.add('a__line', 'js-line')
            path.setAttribute('fill', 'none')
            path.setAttribute('stroke-width', '1')
            path.setAttribute('opacity', '0.65')
            path.setAttribute('stroke', lerpColor(t, 0))  // initial: phase 0 (deep blue)

            svgRef.current.appendChild(path)
            pathsRef.current.push(path)
            linesRef.current.push(points)
        }
    }

    // Update every line's stroke colour for the given scroll progress.
    // Called only when progress has shifted enough to be worth the DOM writes.
    const applyLineColors = (progress: number) => {
        const paths = pathsRef.current
        const n     = paths.length
        for (let i = 0; i < n; i++) {
            paths[i].setAttribute('stroke', lerpColor(i / Math.max(n - 1, 1), progress))
        }
    }

    const onResize = () => { setSize(); setLines(); measureTextBounds() }

    const onMouseMove = (e: MouseEvent) => {
        const mouse = mouseRef.current
        mouse.x = e.clientX
        mouse.y = e.clientY + overspillPxRef.current - parallaxCurrentRef.current

        if (!mouse.set) {
            mouse.sx = mouse.x
            mouse.sy = mouse.y
            mouse.lx = mouse.x
            mouse.ly = mouse.y
            mouse.set = true
        }
    }

    const movePoints = (time: number) => {
        const lines = linesRef.current
        const mouse = mouseRef.current
        const noise = noiseRef.current
        if (!noise) return

        const timeX = time * 0.008
        const timeY = time * 0.003
        const cosA  = Math.cos(mouse.a)
        const sinA  = Math.sin(mouse.a)
        const msx   = mouse.sx
        const msy   = mouse.sy
        const mvs   = mouse.vs
        const l     = mvs > 175 ? mvs : 175
        const l2    = l * l
        const cursorInfluence = l * mvs * 0.00035

        // Text repulsion — hoist bounds lookup out of inner loop
        const tb = textBoundsRef.current
        // Feather zone: lines this far outside the box are already unaffected
        const TEXT_FEATHER = 85   // px — width of the transition region
        const TEXT_PUSH    = 58   // max displacement in px

        for (let i = 0; i < lines.length; i++) {
            const points = lines[i]
            for (let j = 0; j < points.length; j++) {
                const p = points[j]

                const move = noise(
                    (p.x + timeX) * 0.003,
                    (p.y + timeY) * 0.002
                ) * 8

                p.waveX = Math.cos(move) * 6
                p.waveY = Math.sin(move) * 12

                // ── Text repulsion ─────────────────────────────────────────
                // Works in rest-position space (p.x, p.y) so the effect is
                // stable and doesn't feed back through the displacement itself.
                if (tb) {
                    // Signed distances into the bounding box on each axis.
                    // Positive = inside the box, negative = outside.
                    const overlapX = p.x > tb.left && p.x < tb.right
                        ? Math.min(p.x - tb.left, tb.right  - p.x)
                        : -(p.x < tb.left ? tb.left - p.x : p.x - tb.right)
                    const overlapY = p.y > tb.top  && p.y < tb.bottom
                        ? Math.min(p.y - tb.top,  tb.bottom - p.y)
                        : -(p.y < tb.top  ? tb.top  - p.y : p.y - tb.bottom)

                    // Only act when the point is inside or within feather range
                    if (overlapX > -TEXT_FEATHER && overlapY > -TEXT_FEATHER) {
                        // Blend factor: 0 at feather edge → 1 fully inside
                        const fx = Math.max(0, Math.min(1, (overlapX + TEXT_FEATHER) / TEXT_FEATHER))
                        const fy = Math.max(0, Math.min(1, (overlapY + TEXT_FEATHER) / TEXT_FEATHER))
                        const strength = fx * fy

                        if (strength > 0) {
                            // Push away from the box centre — active both inside
                            // the box AND in the feather zone so the displacement
                            // tapers smoothly to zero rather than jumping to zero
                            // at the box edge (which caused bunching / extra lines).
                            const pushY = p.y < (tb.top + tb.bottom) * 0.5 ? -1 : 1
                            p.waveY += pushY * strength * TEXT_PUSH
                        }
                    }
                }
                // ──────────────────────────────────────────────────────────

                const dx = p.x - msx
                const dy = p.y - msy
                const d2 = dx * dx + dy * dy

                if (d2 < l2) {
                    const d = Math.sqrt(d2)
                    const s = 1 - d / l
                    const f = Math.cos(d * 0.001) * s
                    p.cvx += cosA * f * cursorInfluence
                    p.cvy += sinA * f * cursorInfluence
                }

                p.cvx += -p.cx * 0.01
                p.cvy += -p.cy * 0.01
                p.cvx *= 0.95
                p.cvy *= 0.95
                p.cx += p.cvx
                p.cy += p.cvy

                if (p.cx > 50)  p.cx = 50
                else if (p.cx < -50) p.cx = -50
                if (p.cy > 50)  p.cy = 50
                else if (p.cy < -50) p.cy = -50
            }
        }
    }

    const drawLines = () => {
        const lines  = linesRef.current
        const paths  = pathsRef.current
        const movedX = movedXRef.current
        const movedY = movedYRef.current
        const parts  = pathPartsRef.current
        if (!movedX || !movedY) return

        for (let li = 0; li < lines.length; li++) {
            const points = lines[li]
            const path   = paths[li]
            const n      = points.length
            if (n < 2 || !path) continue

            const p0 = points[0]
            movedX[0] = p0.x + p0.waveX
            movedY[0] = p0.y + p0.waveY
            for (let j = 1; j < n; j++) {
                const p = points[j]
                movedX[j] = p.x + p.waveX + p.cx
                movedY[j] = p.y + p.waveY + p.cy
            }

            const startMidX = (movedX[0] + movedX[1]) * 0.5
            const startMidY = (movedY[0] + movedY[1]) * 0.5
            parts[0] = `M ${movedX[0] | 0} ${movedY[0] | 0} L ${startMidX | 0} ${startMidY | 0}`

            let pi = 1
            for (let j = 1; j < n - 1; j++) {
                const midX = (movedX[j] + movedX[j + 1]) * 0.5
                const midY = (movedY[j] + movedY[j + 1]) * 0.5
                parts[pi++] = `Q ${movedX[j] | 0} ${movedY[j] | 0} ${midX | 0} ${midY | 0}`
            }
            parts[pi++] = `L ${movedX[n - 1] | 0} ${movedY[n - 1] | 0}`

            path.setAttribute('d', parts.slice(0, pi).join(' '))
        }
    }

    const tick = (time: number) => {
        rafRef.current = requestAnimationFrame(tick)

        const elapsed = time - lastFrameRef.current
        if (elapsed < 1000 / 30) return
        lastFrameRef.current = time - (elapsed % (1000 / 30))

        const mouse = mouseRef.current

        mouse.sx += (mouse.x - mouse.sx) * 0.1
        mouse.sy += (mouse.y - mouse.sy) * 0.1

        const dx = mouse.x - mouse.lx
        const dy = mouse.y - mouse.ly
        const d  = Math.sqrt(dx * dx + dy * dy)

        mouse.v   = d
        mouse.vs += (d - mouse.vs) * 0.1
        if (mouse.vs > 100) mouse.vs = 100

        mouse.lx = mouse.x
        mouse.ly = mouse.y
        mouse.a  = Math.atan2(dy, dx)

        // Smooth parallax
        parallaxCurrentRef.current += (parallaxTargetRef.current - parallaxCurrentRef.current) * 0.06

        // Smooth colour progress — gentle lag makes the transition feel continuous
        progressCurrentRef.current += (progressTargetRef.current - progressCurrentRef.current) * 0.04

        // Only push new stroke colours when progress has shifted visibly (avoids
        // unnecessary DOM writes on frames where nothing has changed)
        if (Math.abs(progressCurrentRef.current - lastColorProgress.current) > 0.004) {
            applyLineColors(progressCurrentRef.current)
            lastColorProgress.current = progressCurrentRef.current
        }

        if (containerRef.current) {
            containerRef.current.style.transform = `translateY(${parallaxCurrentRef.current.toFixed(2)}px)`
            containerRef.current.style.filter    = 'blur(0.4px)'
        }

        movePoints(time)
        drawLines()
    }

    return (
        <div
            ref={containerRef}
            className={`waves-component ${className}`}
            style={{
                backgroundColor,
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '100vh',
                zIndex: 0,
                willChange: 'transform',
            } as React.CSSProperties}
        >
            <svg
                ref={svgRef}
                className="block js-svg"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    maskImage:       'radial-gradient(ellipse 110% 65% at 50% 50%, black 10%, rgba(0,0,0,0.7) 42%, rgba(0,0,0,0.15) 68%, transparent 85%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 110% 65% at 50% 50%, black 10%, rgba(0,0,0,0.7) 42%, rgba(0,0,0,0.15) 68%, transparent 85%)',
                }}
            />
            {pointerSize > 0 && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: `${pointerSize}rem`,
                        height: `${pointerSize}rem`,
                        background: 'white',
                        borderRadius: '50%',
                        transform: 'translate3d(calc(var(--x) - 50%), calc(var(--y) - 50%), 0)',
                        willChange: 'transform',
                    }}
                />
            )}
        </div>
    )
}
