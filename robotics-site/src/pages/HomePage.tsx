import { ArrowRight, Bot, CalendarDays, CircuitBoard, Cpu, MapPin, Radio, ScanLine, Wrench } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { events } from '../data/content'
import { getProjects, type ProjectData } from '../apis/projectApis'

const disciplines = [
  { icon: CircuitBoard, title: 'Embedded systems', copy: 'Design circuits, program microcontrollers, and turn sensor data into real-world action.' },
  { icon: ScanLine, title: 'AI & perception', copy: 'Train robots to see, understand, and navigate changing environments safely.' },
  { icon: Wrench, title: 'Mechanical design', copy: 'Prototype mechanisms, fabricate parts, and engineer machines built to perform.' },
]

const fallbackProjects = [
  { _id: 'rover', title: 'Autonomous vision rover', content: 'A field-ready rover combining LiDAR, stereo vision, and adaptive path planning.', tags: [{ _id: 'ros', name: 'ROS2' }, { _id: 'cv', name: 'OpenCV' }], mainTag: { name: 'Autonomy' } },
  { _id: 'arm', title: 'Precision robotic arm', content: 'A modular six-axis arm engineered for repeatable pick-and-place tasks.', tags: [{ _id: 'kin', name: 'Kinematics' }, { _id: 'cpp', name: 'C++' }], mainTag: { name: 'Hardware' } },
  { _id: 'mesh', title: 'Smart campus sensor mesh', content: 'Low-power connected nodes measuring air quality, occupancy, and energy use.', tags: [{ _id: 'lora', name: 'LoRa' }, { _id: 'mqtt', name: 'MQTT' }], mainTag: { name: 'IoT' } },
] as ProjectData[]

const reveal = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-80px' }, transition: { duration: 0.55 } }

export default function HomePage() {
  const [projects, setProjects] = useState<ProjectData[]>([])
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 140])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  useEffect(() => { getProjects().then(data => setProjects(data.projects.slice(0, 3))).catch(() => setProjects([])) }, [])
  const featured = projects.length ? projects : fallbackProjects
  const upcoming = events.filter(event => event.status === 'upcoming').slice(0, 2)

  return (
    <div className="robotics-home -mt-[76px] overflow-hidden">
      <section ref={heroRef} className="hero-shell relative flex min-h-[820px] items-end overflow-hidden border-b border-white/10 pt-28 lg:min-h-[900px]">
        <motion.img style={{ y: heroY, scale: heroScale }} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1 }} src="/assets/rca-humanoid-hero.png" alt="Advanced humanoid robot in the RCA robotics lab" className="absolute inset-0 h-full w-full object-cover object-[66%_center]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#050b14_0%,rgba(5,11,20,.94)_30%,rgba(5,11,20,.28)_68%,rgba(5,11,20,.36)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,#050b14_0%,transparent_38%)]" />
        <div className="tech-grid absolute inset-0 opacity-30" />
        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-5 pb-12 pt-28 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:px-10 lg:pb-16">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} className="max-w-3xl self-center">
            <p className="section-kicker mb-7">Rwanda Coding Academy · Robotics Club</p>
            <h1 className="max-w-3xl text-[3.2rem] font-semibold leading-[.94] tracking-[-.055em] sm:text-7xl lg:text-[5.7rem]">We engineer<br />machines that<br /><span className="text-[#9eff00]">move Rwanda.</span></h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">A student-led engineering lab where code meets metal. We build autonomous systems, intelligent machines, and the skills to solve real problems.</p>
            <div className="mt-9 flex flex-wrap gap-3"><Link to="/projects" className="robot-button bg-[#9eff00] text-[#06100b] hover:bg-white">Explore our builds <ArrowRight className="h-4 w-4" /></Link><Link to="/register" className="robot-button border border-white/25 bg-white/5 text-white hover:border-[#9eff00] hover:text-[#9eff00]">Join the club</Link></div>
          </motion.div>
          <div className="hidden items-end justify-end lg:flex"><div className="mb-5 w-72 border-l border-[#9eff00]/60 bg-[#07111d]/70 p-5 backdrop-blur-md"><div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[.2em] text-[#9eff00]">System live <Radio className="h-4 w-4 animate-pulse" /></div><div className="mt-5 grid grid-cols-2 gap-4"><div><b className="text-2xl">ROS2</b><p className="text-sm text-slate-500">Control stack</p></div><div><b className="text-2xl">360°</b><p className="text-sm text-slate-500">LiDAR scan</p></div></div></div></div>
          <div className="col-span-full grid border-y border-white/10 bg-[#07111d]/70 backdrop-blur sm:grid-cols-3">{[['30+', 'active builders'], ['15+', 'working prototypes'], ['04', 'engineering squads']].map(([value, label]) => <div key={label} className="flex items-center gap-4 border-white/10 px-6 py-5 sm:border-r last:border-r-0"><b className="font-mono text-2xl text-[#9eff00]">{value}</b><span className="text-xs uppercase tracking-[.17em] text-slate-400">{label}</span></div>)}</div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
        <motion.div {...reveal} className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20"><div><p className="section-kicker">What happens here</p><h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">Not just theory.<br /><span className="text-slate-500">Built, broken, rebuilt.</span></h2></div><p className="max-w-2xl self-end text-lg leading-8 text-slate-400">Members work in cross-disciplinary squads from first sketch to field test. Every wire, line of code, and design decision serves a working machine.</p></motion.div>
        <div className="mt-14 grid border-y border-white/10 md:grid-cols-3">{disciplines.map((item, i) => <motion.article key={item.title} {...reveal} transition={{ duration: .55, delay: i * .12 }} whileHover={{ y: -10 }} className="discipline-card group min-h-[310px] border-white/10 p-8 md:border-r last:border-r-0"><span className="font-mono text-xs text-slate-600">/0{i + 1}</span><item.icon className="mt-12 h-9 w-9 text-[#9eff00]" strokeWidth={1.5} /><h3 className="mt-7 text-2xl font-semibold">{item.title}</h3><p className="mt-4 leading-7 text-slate-400">{item.copy}</p></motion.article>)}</div>
      </section>

      <section className="lab-section border-y border-white/10 bg-[#08121f] py-24 lg:py-32"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <motion.div {...reveal} className="flex items-end justify-between gap-5"><div><p className="section-kicker">From the lab</p><h2 className="mt-5 text-4xl font-semibold sm:text-5xl">Machines in progress.</h2></div><Link to="/projects" className="hidden items-center gap-2 text-sm text-[#9eff00] sm:flex">View all <ArrowRight className="h-4 w-4" /></Link></motion.div>
        <div className="mt-12 grid gap-px border border-white/10 bg-white/10 lg:grid-cols-3">{featured.map((project, i) => <motion.article key={project._id} {...reveal} transition={{ duration: .55, delay: i * .12 }} whileHover={{ y: -8 }} className="project-card group flex min-h-[360px] flex-col bg-[#08121f] p-8 hover:bg-[#0b1827]"><div className="flex justify-between text-[#9eff00]"><span className="font-mono text-xs uppercase tracking-widest">{project.mainTag?.name || 'Robotics'}</span>{i === 0 ? <Bot /> : <Cpu />}</div><div className="mt-auto"><span className="font-mono text-xs text-slate-600">PROJECT / 0{i + 1}</span><h3 className="mt-3 text-2xl font-semibold">{project.title}</h3><p className="mt-4 line-clamp-3 leading-7 text-slate-400">{project.content}</p><div className="mt-6 flex gap-2">{project.tags?.slice(0, 2).map(tag => <span key={tag._id} className="border border-white/10 px-2 py-1 font-mono text-[10px] uppercase text-slate-400">{tag.name}</span>)}</div></div></motion.article>)}</div>
      </div></section>

      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:px-10 lg:py-32">
        <motion.div {...reveal}><p className="section-kicker">Next on the bench</p><h2 className="mt-5 text-4xl font-semibold sm:text-5xl">Show up.<br />Build something real.</h2><p className="mt-6 text-slate-400">Workshops, competitions, and open lab sessions give every member a place to test their ideas.</p></motion.div>
        <div className="divide-y divide-white/10 border-y border-white/10">{upcoming.map((event, i) => <motion.article key={event.id} initial={{ opacity: 0, x: 45 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: .55, delay: i * .12 }} className="grid gap-5 py-7 sm:grid-cols-[110px_1fr_auto] sm:items-center"><div className="font-mono text-xs uppercase text-[#9eff00]"><CalendarDays className="mb-2 h-5 w-5" />{event.date}</div><div><h3 className="text-xl">{event.title}</h3><p className="mt-2 flex gap-2 text-sm text-slate-500"><MapPin className="h-4 w-4" />{event.location}</p></div><Link to="/events" className="robot-icon"><ArrowRight className="h-4 w-4" /></Link></motion.article>)}</div>
      </section>

      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: .7 }} className="cta-section bg-[#9eff00] px-5 py-20 text-[#06100b]"><div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"><div><p className="font-mono text-xs font-bold uppercase tracking-[.2em]">Applications open</p><h2 className="mt-4 text-4xl font-semibold sm:text-6xl">Your first robot starts here.</h2></div><Link to="/register" className="robot-button self-start bg-[#06100b] text-white hover:bg-white hover:text-[#06100b]">Request membership <ArrowRight className="h-4 w-4" /></Link></div></motion.section>
    </div>
  )
}