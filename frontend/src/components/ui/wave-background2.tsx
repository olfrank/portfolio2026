'use client'

import * as React from 'react'
import { useEffect, useRef } from 'react'
import { createNoise2D } from 'simplex-noise'

interface Point {
  x: number
  y: number
  wave: { x: number; y: number }
  cursor: {
    x: number
    y: number
    vx: number
    vy: number
  }
}

interface Ripple {
  id: number
  x: number
  y: number
  start: number
  strength: number
}

interface TrailPoint {
  id: number
  x: number
  y: number
  createdAt: number
  strength: number
}

interface LineMeta {
  t: number
  amplitudeX: number
  amplitudeY: number
  noiseScaleX: number
  noiseScaleY: number
  opacity: number
  strokeWidth: number
}

interface WavesProps {
  className?: string
  strokeColor?: string
  backgroundColor?: string
}

export function Waves({
  className = '',
  strokeColor = '#ffffff',
  backgroundColor = '#000000',
}: WavesProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const mouseRef = useRef({
    x: -1000,
    y: -1000,
    lx: -1000,
    ly: -1000,
    sx: -1000,
    sy: -1000,
    v: 0,
    vs: 0,
    a: 0,
    set: false,
    lastRippleAt: 0,
  })

  const pathsRef = useRef<SVGPathElement[]>([])
  const linesRef = useRef<Point[][]>([])
  const lineMetaRef = useRef<LineMeta[]>([])
  const noiseRef = useRef<((x: number, y: number) => number) | null>(null)
  const rafRef = useRef<number | null>(null)
  const boundingRef = useRef<DOMRect | null>(null)

  const ripplesRef = useRef<Ripple[]>([])
  const trailRef = useRef<TrailPoint[]>([])
  const rippleIdRef = useRef(0)
  const trailIdRef = useRef(0)

  const overlayStateRef = useRef({
    glowOpacity: 0,
    glowScale: 1,
    lensOpacity: 0,
    trailOpacity: 0,
  })

  useEffect(() => {
    if (!containerRef.current || !svgRef.current) return

    noiseRef.current = createNoise2D()

    setSize()
    setLines()

    const resizeObserver = new ResizeObserver(() => {
      onResize()
    })
    resizeObserver.observe(containerRef.current)

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchstart', onTouchMove, { passive: false })

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      resizeObserver.disconnect()
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchstart', onTouchMove)
    }
  }, [])

  const setSize = () => {
    if (!containerRef.current || !svgRef.current) return

    boundingRef.current = containerRef.current.getBoundingClientRect()
    const { width, height } = boundingRef.current

    svgRef.current.setAttribute('width', `${width}`)
    svgRef.current.setAttribute('height', `${height}`)
    svgRef.current.setAttribute('viewBox', `0 0 ${width} ${height}`)
    svgRef.current.style.width = `${width}px`
    svgRef.current.style.height = `${height}px`
  }

  const setLines = () => {
    if (!svgRef.current || !boundingRef.current) return

    const { width, height } = boundingRef.current

    linesRef.current = []
    lineMetaRef.current = []

    pathsRef.current.forEach((path) => path.remove())
    pathsRef.current = []

    const xGap = 12
    const yGap = 10

    const overflowX = 160
    const overflowY = 60

    const oWidth = width + overflowX
    const oHeight = height + overflowY

    const totalLines = Math.ceil(oWidth / xGap)
    const totalPoints = Math.ceil(oHeight / yGap)

    const xStart = (width - xGap * totalLines) / 2
    const yStart = (height - yGap * totalPoints) / 2

    for (let i = 0; i < totalLines; i++) {
      const t = i / Math.max(totalLines - 1, 1)

      const points: Point[] = []

      const lineJitterX = (Math.sin(i * 0.7) + Math.cos(i * 0.21)) * 2.5

      for (let j = 0; j < totalPoints; j++) {
        const yJitter = Math.sin(j * 0.35 + i * 0.12) * 0.8

        points.push({
          x: xStart + xGap * i + lineJitterX,
          y: yStart + yGap * j + yJitter,
          wave: { x: 0, y: 0 },
          cursor: { x: 0, y: 0, vx: 0, vy: 0 },
        })
      }

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      path.setAttribute('fill', 'none')
      path.setAttribute('stroke', strokeColor)
      path.setAttribute('stroke-linecap', 'round')
      path.setAttribute('stroke-linejoin', 'round')

      svgRef.current.appendChild(path)
      pathsRef.current.push(path)
      linesRef.current.push(points)

      const centerBias = Math.sin(t * Math.PI)

      lineMetaRef.current.push({
        t,
        amplitudeX: 6 + centerBias * 12,
        amplitudeY: 4 + centerBias * 7,
        noiseScaleX: 0.0025 + t * 0.001,
        noiseScaleY: 0.0017 + t * 0.0007,
        opacity: 0.12 + centerBias * 0.38,
        strokeWidth: 0.9 + centerBias * 0.6,
      })
    }
  }

  const onResize = () => {
    setSize()
    setLines()
  }

  const onMouseMove = (e: MouseEvent) => {
    updateMousePosition(e.clientX, e.clientY)
  }

  const onTouchMove = (e: TouchEvent) => {
    if (e.touches[0]) {
      e.preventDefault()
      updateMousePosition(e.touches[0].clientX, e.touches[0].clientY)
    }
  }

  const updateMousePosition = (clientX: number, clientY: number) => {
    if (!boundingRef.current || !containerRef.current) return

    const rect = boundingRef.current
    const mouse = mouseRef.current

    mouse.x = clientX - rect.left
    mouse.y = clientY - rect.top

    if (!mouse.set) {
      mouse.sx = mouse.x
      mouse.sy = mouse.y
      mouse.lx = mouse.x
      mouse.ly = mouse.y
      mouse.set = true
    }

    containerRef.current.style.setProperty('--x', `${mouse.sx}px`)
    containerRef.current.style.setProperty('--y', `${mouse.sy}px`)
  }

  const emitRipple = (time: number, strength: number) => {
    const mouse = mouseRef.current

    ripplesRef.current.push({
      id: rippleIdRef.current++,
      x: mouse.sx,
      y: mouse.sy,
      start: time,
      strength: Math.min(Math.max(strength, 12), 48),
    })
  }

  const emitTrailPoint = (time: number, strength: number) => {
    const mouse = mouseRef.current

    trailRef.current.push({
      id: trailIdRef.current++,
      x: mouse.sx,
      y: mouse.sy,
      createdAt: time,
      strength: Math.min(Math.max(strength, 8), 30),
    })
  }

  const movePoints = (time: number) => {
    const lines = linesRef.current
    const lineMeta = lineMetaRef.current
    const mouse = mouseRef.current
    const noise = noiseRef.current
    const ripples = ripplesRef.current

    if (!noise) return

    const breathing = Math.sin(time * 0.00045) * 0.5 + 0.5

    for (let li = 0; li < lines.length; li++) {
      const points = lines[li]
      const meta = lineMeta[li]

      for (let pi = 0; pi < points.length; pi++) {
        const p = points[pi]

        const n = noise(
          (p.x + time * 0.12) * meta.noiseScaleX,
          (p.y + time * 0.08) * meta.noiseScaleY
        )

        const drift = n * Math.PI * 2

        p.wave.x = Math.cos(drift) * meta.amplitudeX * (0.65 + breathing * 0.35)
        p.wave.y = Math.sin(drift) * meta.amplitudeY * (0.7 + breathing * 0.3)

        const dx = p.x - mouse.sx
        const dy = p.y - mouse.sy
        const d = Math.hypot(dx, dy)
        const influenceRadius = 180 + mouse.vs * 1.2

        if (d < influenceRadius) {
          const s = 1 - d / influenceRadius
          const f = s * s

          p.cursor.vx += Math.cos(mouse.a) * f * mouse.vs * 0.085
          p.cursor.vy += Math.sin(mouse.a) * f * mouse.vs * 0.055

          const swirl = Math.atan2(dy, dx) + Math.PI / 2
          p.cursor.vx += Math.cos(swirl) * f * mouse.vs * 0.012
          p.cursor.vy += Math.sin(swirl) * f * mouse.vs * 0.012
        }

        for (let ri = 0; ri < ripples.length; ri++) {
          const ripple = ripples[ri]
          const age = time - ripple.start

          if (age < 0 || age > 1400) continue

          const radius = age * 0.22
          const distX = p.x - ripple.x
          const distY = p.y - ripple.y
          const dist = Math.hypot(distX, distY)

          const bandWidth = 26 + ripple.strength * 0.35
          const delta = Math.abs(dist - radius)

          if (delta < bandWidth) {
            const ring = 1 - delta / bandWidth
            const fade = 1 - age / 1400
            const force = ring * fade * ripple.strength * 0.09

            const angle = Math.atan2(distY, distX)
            p.cursor.vx += Math.cos(angle) * force
            p.cursor.vy += Math.sin(angle) * force * 0.7
          }
        }

        p.cursor.vx += (0 - p.cursor.x) * 0.014
        p.cursor.vy += (0 - p.cursor.y) * 0.014

        p.cursor.vx *= 0.93
        p.cursor.vy *= 0.93

        p.cursor.x += p.cursor.vx
        p.cursor.y += p.cursor.vy

        p.cursor.x = Math.max(-58, Math.min(58, p.cursor.x))
        p.cursor.y = Math.max(-58, Math.min(58, p.cursor.y))
      }
    }
  }

  const moved = (point: Point, withCursorForce = true) => {
    return {
      x: point.x + point.wave.x + (withCursorForce ? point.cursor.x : 0),
      y: point.y + point.wave.y + (withCursorForce ? point.cursor.y : 0),
    }
  }

  const getLineColor = (t: number, energy: number, alpha: number) => {
    const hue = 255 - t * 68 + energy * 10
    const sat = 68 + t * 18 + energy * 8
    const light = 50 + t * 16 + energy * 6
    return `hsla(${hue}, ${sat}%, ${light}%, ${alpha})`
  }

  const drawLines = () => {
    const lines = linesRef.current
    const paths = pathsRef.current
    const meta = lineMetaRef.current
    const mouse = mouseRef.current

    const energy = Math.min(mouse.vs / 28, 1)

    for (let lIndex = 0; lIndex < lines.length; lIndex++) {
      const points = lines[lIndex]
      const path = paths[lIndex]
      const m = meta[lIndex]

      if (!points || points.length < 2 || !path || !m) continue

      const first = moved(points[0], false)
      const second = moved(points[1])

      const startMidX = (first.x + second.x) / 2
      const startMidY = (first.y + second.y) / 2

      let d = `M ${first.x} ${first.y} L ${startMidX} ${startMidY}`

      for (let i = 1; i < points.length - 1; i++) {
        const curr = moved(points[i])
        const next = moved(points[i + 1])
        const midX = (curr.x + next.x) / 2
        const midY = (curr.y + next.y) / 2
        d += ` Q ${curr.x} ${curr.y} ${midX} ${midY}`
      }

      const last = moved(points[points.length - 1])
      d += ` L ${last.x} ${last.y}`

      path.setAttribute('d', d)
      path.setAttribute('stroke', getLineColor(m.t, energy, m.opacity + energy * 0.1))
      path.setAttribute('stroke-width', `${m.strokeWidth + energy * 0.25}`)
    }
  }

  const updateEffects = (time: number) => {
    const mouse = mouseRef.current
    const state = overlayStateRef.current

    const activeEnergy = Math.min(mouse.vs / 24, 1)
    const isActive = mouse.set && mouse.sx > -500 && mouse.sy > -500

    state.glowOpacity += ((isActive ? 0.16 + activeEnergy * 0.2 : 0) - state.glowOpacity) * 0.08
    state.glowScale += ((1 + activeEnergy * 0.45) - state.glowScale) * 0.08
    state.lensOpacity += ((isActive ? 0.34 : 0) - state.lensOpacity) * 0.08
    state.trailOpacity += ((trailRef.current.length > 0 ? 1 : 0) - state.trailOpacity) * 0.08

    if (containerRef.current) {
      containerRef.current.style.setProperty('--glow-opacity', `${state.glowOpacity}`)
      containerRef.current.style.setProperty('--glow-scale', `${state.glowScale}`)
      containerRef.current.style.setProperty('--lens-opacity', `${state.lensOpacity}`)
      containerRef.current.style.setProperty('--trail-opacity', `${state.trailOpacity}`)
    }

    ripplesRef.current = ripplesRef.current.filter((r) => time - r.start < 1400)
    trailRef.current = trailRef.current.filter((t) => time - t.createdAt < 700)
  }

  const tick = (time: number) => {
    const mouse = mouseRef.current

    mouse.sx += (mouse.x - mouse.sx) * 0.11
    mouse.sy += (mouse.y - mouse.sy) * 0.11

    const dx = mouse.x - mouse.lx
    const dy = mouse.y - mouse.ly
    const d = Math.hypot(dx, dy)

    mouse.v = d
    mouse.vs += (d - mouse.vs) * 0.18
    mouse.vs = Math.min(100, mouse.vs)
    mouse.a = Math.atan2(dy, dx)

    if (mouse.set) {
      if (d > 3.5) {
        emitTrailPoint(time, mouse.vs)
      }

      if (mouse.vs > 16 && time - mouse.lastRippleAt > 140) {
        emitRipple(time, mouse.vs)
        mouse.lastRippleAt = time
      }
    }

    mouse.lx = mouse.x
    mouse.ly = mouse.y

    if (containerRef.current) {
      containerRef.current.style.setProperty('--x', `${mouse.sx}px`)
      containerRef.current.style.setProperty('--y', `${mouse.sy}px`)
    }

    movePoints(time)
    drawLines()
    updateEffects(time)

    rafRef.current = requestAnimationFrame(tick)
  }

  const renderRipples = () => {
    const now = performance.now()

    return ripplesRef.current.map((ripple) => {
      const age = now - ripple.start
      const progress = Math.min(age / 1400, 1)
      const size = 24 + progress * (180 + ripple.strength * 2.2)
      const opacity = (1 - progress) * 0.22

      return (
        <div
          key={ripple.id}
          style={{
            position: 'absolute',
            left: ripple.x,
            top: ripple.y,
            width: size,
            height: size,
            borderRadius: '9999px',
            border: `1px solid rgba(255,255,255,${opacity})`,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            boxShadow: `0 0 ${18 + ripple.strength * 0.35}px rgba(255,255,255,${opacity * 0.35})`,
            willChange: 'transform, width, height, opacity',
          }}
        />
      )
    })
  }

  const renderTrail = () => {
    const now = performance.now()

    return trailRef.current.map((point) => {
      const age = now - point.createdAt
      const progress = Math.min(age / 700, 1)
      const opacity = (1 - progress) * 0.16
      const size = 18 + point.strength * 0.9 + progress * 20

      return (
        <div
          key={point.id}
          style={{
            position: 'absolute',
            left: point.x,
            top: point.y,
            width: size,
            height: size,
            borderRadius: '9999px',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            background:
              'radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 28%, rgba(255,255,255,0.025) 52%, rgba(255,255,255,0) 72%)',
            opacity,
            filter: 'blur(10px)',
            mixBlendMode: 'screen',
            willChange: 'transform, opacity, width, height',
          }}
        />
      )
    })
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={
        {
          backgroundColor,
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          '--x': '-1000px',
          '--y': '-1000px',
          '--glow-opacity': 0,
          '--glow-scale': 1,
          '--lens-opacity': 0,
          '--trail-opacity': 0,
        } as React.CSSProperties
      }
    >
      <svg
        ref={svgRef}
        className="block h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      />

      {renderTrail()}
      {renderRipples()}

      {/* Soft blur glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '10rem',
          height: '10rem',
          borderRadius: '9999px',
          pointerEvents: 'none',
          transform:
            'translate3d(calc(var(--x) - 50%), calc(var(--y) - 50%), 0) scale(var(--glow-scale))',
          background:
            'radial-gradient(circle, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.035) 42%, rgba(255,255,255,0.01) 58%, rgba(255,255,255,0) 74%)',
          filter: 'blur(22px)',
          opacity: 'var(--glow-opacity)',
          mixBlendMode: 'screen',
          willChange: 'transform, opacity',
        }}
      />

      {/* Refracted lens circle */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '5.25rem',
          height: '5.25rem',
          borderRadius: '9999px',
          pointerEvents: 'none',
          transform: 'translate3d(calc(var(--x) - 50%), calc(var(--y) - 50%), 0)',
          opacity: 'var(--lens-opacity)',
          background: `
            radial-gradient(circle at 32% 30%, rgba(255,255,255,0.22), rgba(255,255,255,0.06) 22%, rgba(255,255,255,0.025) 36%, rgba(255,255,255,0.01) 52%, rgba(255,255,255,0) 72%),
            radial-gradient(circle at 70% 68%, rgba(255,255,255,0.08), rgba(255,255,255,0.025) 30%, rgba(255,255,255,0) 65%)
          `,
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow:
            'inset 0 1px 1px rgba(255,255,255,0.18), inset 0 -12px 24px rgba(255,255,255,0.03), 0 8px 40px rgba(255,255,255,0.05)',
          backdropFilter: 'blur(8px) saturate(130%)',
          WebkitBackdropFilter: 'blur(8px) saturate(130%)',
          willChange: 'transform, opacity',
        }}
      />
    </div>
  )
}