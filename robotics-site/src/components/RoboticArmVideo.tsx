import { motion } from 'framer-motion'

export default function RoboticArmVideo() {
  return (
    <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="robot-video-stage">
      <video className="robot-arm-video" autoPlay muted loop playsInline preload="metadata" aria-label="Industrial robotic arm operating in a modern factory">
        <source src="/assets/industrial-robot-arm.mp4" type="video/mp4" />
      </video>
      <div className="robot-video-shade" />
      <a className="robot-video-credit" href="https://www.pexels.com/video/industrial-robot-arm-in-high-tech-factory-32386532/" target="_blank" rel="noreferrer">Footage: Pexels</a>
    </motion.div>
  )
}