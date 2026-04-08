'use client'
import * as React from 'react'
import { useEffect, useRef } from 'react'
import { createNoise2D } from 'simplex-noise'

// Background is taller than the viewport by OVERSPILL on each side so there
// is always filled content during the parallax translation.
const PARALLAX_FACTOR = 0.06  // background moves at 6% of scroll speed
const OVERSPILL = 0.18        // fraction of vh to extend above and below

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
    backgroundColor = "#0c111d",  // deep navy — lifted slightly from pure black
    pointerSize = 0,
}: WavesProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const svgRef = useRef<SVGSVGElement>(null)
    const mouseRef = useRef({
        x: -10,
        y: 0,
        lx: 0,
        ly: 0,
        sx: 0,
        sy: 0,
        v: 0,
        vs: 0,
        a: 0,
        set: false,
    })
    const pathsRef = useRef<SVGPathElement[]>([])
    const linesRef = useRef<Point[][]>([])
    const noiseRef = useRef<((x: number, y: number) => number) | null>(null)
    const rafRef = useRef<number | null>(null)
    const lastFrameRef = useRef<number>(0)
    const movedXRef = useRef<Float32Array | null>(null)
    const movedYRef = useRef<Float32Array | null>(null)
    const pathPartsRef = useRef<string[]>([])
    // Scroll-driven hue shift
    const hueTargetRef = useRef(0)
    const hueCurrentRef = useRef(0)
    // Parallax translation (px, negative = shifted up)
    const parallaxTargetRef = useRef(0)
    const parallaxCurrentRef = useRef(0)
    // Actual pixel overspill, set in setSize
    const overspillPxRef = useRef(0)
    // Full container dimensions (wider than viewport due to overspill height)
    const dimsRef = useRef({ width: 0, height: 0 })

    useEffect(() => {
        if (!containerRef.current || !svgRef.current) return

        noiseRef.current = createNoise2D()
        setSize()
        setLines()

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
                hueTargetRef.current = (window.scrollY / maxScroll) * -20
            }
        }

        window.addEventListener('resize', onResize)
        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('scroll', onScroll, { passive: true })
        document.addEventListener('visibilitychange', onVisibilityChange)

        rafRef.current = requestAnimationFrame(tick)

        return () => {
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
        const overspill = Math.round(vh * OVERSPILL)
        const containerH = vh + overspill * 2

        overspillPxRef.current = overspill
        dimsRef.current = { width: vw, height: containerH }

        // Position container so overspill extends equally above and below viewport
        containerRef.current.style.top = `${-overspill}px`
        containerRef.current.style.height = `${containerH}px`

        svgRef.current.style.width = `${vw}px`
        svgRef.current.style.height = `${containerH}px`
    }

    // Tight muted spectrum: deep blue → soft indigo
    // Low saturation and reduced lightness keeps lines unobtrusive
    const getLineColor = (t: number): string => {
        const h = 215 + t * 20   // 215 (deep blue) → 235 (soft indigo) — narrow range
        const s = 18 + t * 14    // 18% → 32% — very muted
        const l = 34 + t * 12    // 34% → 46% — dark, not luminous
        return `hsl(${h}, ${s}%, ${l}%)`
    }

    const setLines = () => {
        if (!svgRef.current) return
        const { width, height } = dimsRef.current
        if (!width || !height) return

        linesRef.current = []
        pathsRef.current.forEach(path => path.remove())
        pathsRef.current = []

        const xGap = 10
        const yGap = 10

        // Horizontal lines: iterate over y for lines, x for points
        const totalLines = Math.ceil((height + 200) / yGap)
        const totalPoints = Math.ceil((width + 30) / xGap)

        const xStart = (width - xGap * totalPoints) / 2
        const yStart = (height - yGap * totalLines) / 2

        movedXRef.current = new Float32Array(totalPoints)
        movedYRef.current = new Float32Array(totalPoints)
        pathPartsRef.current = new Array(totalPoints + 1)

        for (let i = 0; i < totalLines; i++) {
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
            path.setAttribute('opacity', '0.45')
            path.setAttribute('stroke', getLineColor(i / Math.max(totalLines - 1, 1)))

            svgRef.current.appendChild(path)
            pathsRef.current.push(path)
            linesRef.current.push(points)
        }
    }

    const onResize = () => { setSize(); setLines() }

    const onMouseMove = (e: MouseEvent) => {
        const mouse = mouseRef.current
        mouse.x = e.clientX
        // Translate viewport clientY into container-local Y, accounting for
        // the overspill offset and current parallax translation
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
        const cosA = Math.cos(mouse.a)
        const sinA = Math.sin(mouse.a)
        const msx = mouse.sx
        const msy = mouse.sy
        const mvs = mouse.vs
        const l = mvs > 175 ? mvs : 175
        const l2 = l * l
        const cursorInfluence = l * mvs * 0.00035

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

                if (p.cx > 50) p.cx = 50
                else if (p.cx < -50) p.cx = -50
                if (p.cy > 50) p.cy = 50
                else if (p.cy < -50) p.cy = -50
            }
        }
    }

    const drawLines = () => {
        const lines = linesRef.current
        const paths = pathsRef.current
        const movedX = movedXRef.current
        const movedY = movedYRef.current
        const parts = pathPartsRef.current
        if (!movedX || !movedY) return

        for (let li = 0; li < lines.length; li++) {
            const points = lines[li]
            const path = paths[li]
            const n = points.length
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
        const d = Math.sqrt(dx * dx + dy * dy)

        mouse.v = d
        mouse.vs += (d - mouse.vs) * 0.1
        if (mouse.vs > 100) mouse.vs = 100

        mouse.lx = mouse.x
        mouse.ly = mouse.y
        mouse.a = Math.atan2(dy, dx)

        // Smooth hue shift and parallax — gentle lerp for a restrained, premium feel
        hueCurrentRef.current += (hueTargetRef.current - hueCurrentRef.current) * 0.03
        parallaxCurrentRef.current += (parallaxTargetRef.current - parallaxCurrentRef.current) * 0.06

        if (containerRef.current) {
            containerRef.current.style.transform = `translateY(${parallaxCurrentRef.current.toFixed(2)}px)`
            // Blur softens the 1px lines; hue-rotate handles scroll colour shift
            containerRef.current.style.filter = `blur(0.4px) hue-rotate(${hueCurrentRef.current.toFixed(1)}deg)`
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
                top: 0,       // overridden by setSize
                left: 0,
                right: 0,
                height: '100vh', // overridden by setSize
                zIndex: 0,
                willChange: 'transform',
                '--x': '-0.5rem',
                '--y': '50%',
            } as React.CSSProperties}
        >
            <svg
                ref={svgRef}
                className="block js-svg"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    // Vignette: fades lines toward edges so the centre stays focal.
                    // Applied to the SVG element only — the container's backgroundColor is unaffected.
                    maskImage: 'radial-gradient(ellipse 110% 65% at 50% 50%, black 10%, rgba(0,0,0,0.7) 42%, rgba(0,0,0,0.15) 68%, transparent 85%)',
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
