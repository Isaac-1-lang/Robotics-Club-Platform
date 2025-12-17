export const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Team', path: '/team' },
  { label: 'Events', path: '/events' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
  { label: 'Login', path: '/login' },
  { label: 'Register', path: '/register' },
]

export type ProjectCategory = 'AI' | 'Hardware' | 'IoT' | 'Software'

export const projects = [
  {
    id: 'p1',
    title: 'Autonomous Line-Follower Rover',
    description:
      'Edge-detecting rover using computer vision to navigate complex courses with dynamic speed control.',
    category: 'Hardware' as ProjectCategory,
    stack: ['Raspberry Pi', 'OpenCV', 'Python', 'Motor Control'],
  },
  {
    id: 'p2',
    title: 'Smart Campus IoT Network',
    description:
      'Sensor mesh that tracks lab occupancy, air quality, and energy efficiency across the campus.',
    category: 'IoT' as ProjectCategory,
    stack: ['LoRa', 'Node-RED', 'MQTT', 'Grafana'],
  },
  {
    id: 'p3',
    title: 'AI Vision Lab Assistant',
    description:
      'Real-time detection assistant that flags lab safety issues and guides tool usage through AR overlays.',
    category: 'AI' as ProjectCategory,
    stack: ['TensorFlow', 'React', 'TypeScript', 'WebRTC'],
  },
  {
    id: 'p4',
    title: 'Modular Robotics Arm',
    description:
      'Lightweight, reconfigurable robotic arm designed for precision pick-and-place demos and research.',
    category: 'Hardware' as ProjectCategory,
    stack: ['Arduino', 'ROS2', 'C++', 'Kinematics'],
  },
  {
    id: 'p5',
    title: 'Swarm Drone Coordination',
    description:
      'Simulation of coordinated drones optimizing paths for search-and-rescue inspired drills.',
    category: 'Software' as ProjectCategory,
    stack: ['Python', 'Unity', 'Path Planning', 'Simulation'],
  },
  {
    id: 'p6',
    title: 'Voice-Controlled Lab Guide',
    description:
      'Conversational assistant that gives lab walkthroughs, safety reminders, and schedules sessions.',
    category: 'AI' as ProjectCategory,
    stack: ['NLP', 'React', 'Vite', 'Tailwind'],
  },
]

export const values = [
  {
    title: 'Innovation with Purpose',
    description:
      'We build robotics solutions that serve community needs, from education to sustainability.',
  },
  {
    title: 'Hands-On Mastery',
    description:
      'Every member ships—designing, soldering, coding, and testing in real environments.',
  },
  {
    title: 'Collaboration First',
    description:
      'Mentorship pairs and peer reviews keep projects inclusive, rigorous, and production-ready.',
  },
  {
    title: 'Ethical AI & Safety',
    description:
      'We prioritize transparent AI, robust testing, and safety protocols for every prototype.',
  },
]

export const whyRobotics = [
  {
    title: 'Future-Ready Skills',
    description:
      'Build expertise in automation, AI, embedded systems, and rapid prototyping to tackle real-world challenges.',
  },
  {
    title: 'Interdisciplinary Impact',
    description:
      'Blend software, hardware, and design thinking to create solutions that matter to Rwanda and beyond.',
  },
  {
    title: 'Competitive Edge',
    description:
      'Train for global competitions, hackathons, and research showcases with guidance from mentors.',
  },
]

export const team = [
  {
    name: 'Bonheur Christian',
    role: 'Club President',
    bio: 'Coordinates projects, partnerships, and competitions with a focus on AI safety.',
  },
  {
    name: 'Ntwali Gloria',
    role: 'Lead Hardware Engineer',
    bio: 'Designs circuits and motion systems for rovers, robotic arms, and IoT labs.',
  },
  {
    name: 'Diane Iradukunda',
    role: 'Software Lead',
    bio: 'Architects control software and cloud dashboards with modern web tooling.',
  },
  {
    name: 'Louis Miguel',
    role: 'Research & Vision',
    bio: 'Builds computer vision models and evaluates performance in lab settings.',
  },
  {
    name: 'Dr Geoffrey',
    role: 'Operations & Outreach',
    bio: 'Runs workshops, onboarding, and documentation to keep projects accessible.',
  },
  {
    name: 'NIYOBYOSE Isaac Precieux',
    role: 'Robotics Mentor',
    bio: 'Guides safety protocols, testing, and mechanical design reviews for teams.',
  },
]

export const events = [
  {
    id: 'e1',
    title: 'RCA Robotics Demo Day',
    date: 'Feb 12, 2026',
    status: 'upcoming',
    location: 'Rwanda Coding Academy Lab',
    description:
      'Live demos of autonomous rovers, IoT sensors, and AI assistants built by club squads.',
  },
  {
    id: 'e2',
    title: 'Pan-African Robotics Challenge',
    date: 'Mar 24, 2026',
    status: 'upcoming',
    location: 'Kigali Convention Centre',
    description:
      'Competitive showcase on obstacle navigation, precision arms, and drone coordination.',
  },
  {
    id: 'e3',
    title: 'AI for Impact Hackathon',
    date: 'Nov 02, 2025',
    status: 'past',
    location: 'RCA Innovation Hub',
    description:
      '48-hour build sprint on computer vision for campus safety and environmental monitoring.',
  },
  {
    id: 'e4',
    title: 'National STEM Expo',
    date: 'Aug 15, 2025',
    status: 'past',
    location: 'Kigali Arena',
    description:
      'Exhibited robotics projects to industry partners, alumni, and visiting schools.',
  },
]

export const gallery = [
  {
    id: 'g1',
    title: 'Vision Rover Test',
    description: 'Testing line-follow and object detection in the RCA lab.',
  },
  {
    id: 'g2',
    title: 'Robotic Arm Calibration',
    description: 'Students tuning servos for precise pick-and-place tasks.',
  },
  {
    id: 'g3',
    title: 'IoT Sensor Mesh',
    description: 'Deploying air-quality sensors across campus hallways.',
  },
  {
    id: 'g4',
    title: 'Swarm Simulation',
    description: 'Planning coordinated drone routes for search drills.',
  },
  {
    id: 'g5',
    title: 'Team Workshop',
    description: 'Weekly build sprint with mentors guiding soldering.',
  },
  {
    id: 'g6',
    title: 'Competition Prep',
    description: 'Stress-testing robots before regional qualifiers.',
  },
]

