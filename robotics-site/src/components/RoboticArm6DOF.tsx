import { motion } from 'framer-motion'

export default function RoboticArm6DOF() {
  return (
    <motion.div initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="svg-arm-stage" aria-label="Animated six-axis robotic arm">
      <svg viewBox="0 0 900 720" role="img" aria-labelledby="arm-title arm-desc">
        <title id="arm-title">Six-axis collaborative robotic arm</title><desc id="arm-desc">Original vector arm with independently moving base, shoulder, elbow, wrist and gripper.</desc>
        <defs>
          <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f7fbff"/><stop offset=".38" stopColor="#8ea5b4"/><stop offset=".72" stopColor="#263844"/><stop offset="1" stopColor="#b8ccd7"/></linearGradient>
          <linearGradient id="darkMetal"><stop stopColor="#314653"/><stop offset=".5" stopColor="#0a141d"/><stop offset="1" stopColor="#516d7d"/></linearGradient>
          <radialGradient id="joint"><stop stopColor="#dff9ff"/><stop offset=".45" stopColor="#4e6978"/><stop offset="1" stopColor="#050b10"/></radialGradient>
          <filter id="armGlow"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <g className="arm-floor"><ellipse cx="475" cy="650" rx="250" ry="38" fill="none" stroke="#ffffff" strokeOpacity=".22"/><ellipse cx="475" cy="650" rx="170" ry="24" fill="none" stroke="#ffffff" strokeOpacity=".3"/></g>
        <g className="arm-base-yaw">
          <ellipse cx="475" cy="625" rx="105" ry="28" fill="#07121c" stroke="#5e7887" strokeWidth="4"/><path d="M395 625v-72c0-32 160-32 160 0v72" fill="url(#metal)" stroke="#152630" strokeWidth="5"/><ellipse cx="475" cy="552" rx="80" ry="25" fill="url(#darkMetal)" stroke="#ffffff" strokeWidth="3"/>
          <g className="arm-shoulder-pitch">
            <circle cx="475" cy="520" r="67" fill="url(#joint)" stroke="#8ba3b0" strokeWidth="7"/><circle cx="475" cy="520" r="29" fill="#08131c" stroke="#ffffff" strokeWidth="3"/><circle cx="475" cy="520" r="8" fill="#ffffff" filter="url(#armGlow)"/><path d="M456 480L388 342Q377 320 398 306L430 286Q450 274 466 296L522 390Z" fill="url(#metal)" stroke="#12232e" strokeWidth="7"/>
            <g className="arm-elbow-pitch">
              <circle cx="432" cy="300" r="58" fill="url(#joint)" stroke="#8ba3b0" strokeWidth="7"/><circle cx="432" cy="300" r="25" fill="#08131c" stroke="#ffffff" strokeWidth="3"/><path d="M469 274L590 203Q614 189 629 211L645 235Q658 255 637 269L515 348Z" fill="url(#metal)" stroke="#12232e" strokeWidth="7"/>
              <g className="arm-wrist-roll"><circle cx="632" cy="235" r="49" fill="url(#joint)" stroke="#8ba3b0" strokeWidth="6"/><circle cx="632" cy="235" r="20" fill="#07121b" stroke="#ffffff" strokeWidth="3"/>
                <g className="arm-wrist-pitch"><path d="M665 212l75-24q24-7 33 15l8 21q8 22-15 31l-78 29z" fill="url(#metal)" stroke="#12232e" strokeWidth="6"/><circle cx="750" cy="222" r="38" fill="url(#joint)" stroke="#8ba3b0" strokeWidth="6"/>
                  <g className="arm-tool-roll"><path d="M771 245l20 72h-67l8-72z" fill="url(#darkMetal)" stroke="#718a98" strokeWidth="5"/><rect x="727" y="307" width="62" height="38" rx="12" fill="#07121b" stroke="#ffffff" strokeWidth="3"/>
                    <g className="arm-gripper"><path className="gripper-left" d="M742 340l-25 55 16 34 13-8-10-27 23-46z" fill="url(#metal)" stroke="#12232e" strokeWidth="4"/><path className="gripper-right" d="M775 340l25 55-16 34-13-8 10-27-23-46z" fill="url(#metal)" stroke="#12232e" strokeWidth="4"/></g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
        <g className="arm-telemetry" fontFamily="monospace" fontSize="12" fill="#ffffff"><text x="210" y="165">JOINT STATUS / ONLINE</text><text x="210" y="187" fill="#8296a2">J1 YAW · J2 SHOULDER · J3 ELBOW</text><text x="210" y="208" fill="#8296a2">J4 ROLL · J5 WRIST · J6 GRIP</text><path d="M210 220h210" stroke="#ffffff" strokeOpacity=".5"/></g>
      </svg><span className="arm-badge">6 DOF / LIVE KINEMATICS</span>
    </motion.div>
  )
}