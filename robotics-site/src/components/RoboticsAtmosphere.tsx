import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export default function RoboticsAtmosphere() {
  const location = useLocation()
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const moveGlow = (event: PointerEvent) => {
      if (!glowRef.current) return
      glowRef.current.style.setProperty('--pointer-x', `${event.clientX}px`)
      glowRef.current.style.setProperty('--pointer-y', `${event.clientY}px`)
    }
    window.addEventListener('pointermove', moveGlow, { passive: true })
    return () => window.removeEventListener('pointermove', moveGlow)
  }, [])

  return (
    <div ref={glowRef} className="robot-atmosphere" aria-hidden="true" data-route={location.pathname}>
      <div className="robot-cursor-glow" />
      <div className="robot-scanline" />
      <div className="robot-orbit robot-orbit-one" />
      <div className="robot-orbit robot-orbit-two" />
    </div>
  )
}