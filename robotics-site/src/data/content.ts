export const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Team', path: '/team' },
  { label: 'Events', path: '/events' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Blogs', path: '/blogs' },
  { label: 'Contact', path: '/contact' },
  { label: 'Login', path: '/login' },
]
// Need to replaced with the real main tags from the backend
export type ProjectCategory = 'AI' | 'Hardware' | 'IoT' | 'Software'
// Another one for sub tags if needed
export const projects = [
  {
    id: 'p1',
    title: 'Blinking LED',
    description:
      'Traffic light system using Arduino uno and LEDS for real-time object detection and movement control.',
    mainTag: 'Hardware' as ProjectCategory,
    tags: ['Arduino uno', 'Diodes', 'C++'],
    extendedDescription:
      'This project involves creating a traffic light system that utilizes an Arduino Uno microcontroller to control a series of LEDs. The system is designed to manage traffic flow by changing the lights based on real-time object detection, allowing for efficient movement control at intersections. The project showcases the integration of hardware components with programming to create a functional and responsive traffic management solution.',
  },
  {
    id: 'p2',
    title: 'Smart Campus IoT Network',
    description:
      'Sensor mesh that tracks lab occupancy, air quality, and energy efficiency across the campus.',
    mainTag: 'IoT' as ProjectCategory,
    tags: ['LoRa', 'Node-RED', 'MQTT', 'Grafana'],
    extendedDescription:
      'The Smart Campus IoT Network project focuses on deploying a network of interconnected sensors across the campus to monitor various environmental and operational parameters. The sensor mesh collects data on lab occupancy, air quality, and energy consumption, providing real-time insights into campus conditions. Utilizing LoRa technology for long-range communication, Node-RED for data flow management, MQTT for lightweight messaging, and Grafana for data visualization, this project aims to enhance campus sustainability and resource management through IoT solutions.',
  },
  {
    id: 'p3',
    title: 'AI Vision Lab Assistant',
    description:
      'Real-time detection assistant that flags lab safety issues and guides tool usage through AR overlays.',
    mainTag: 'AI' as ProjectCategory,
    tags: ['TensorFlow', 'React', 'TypeScript', 'WebRTC'],
    extendedDescription:
      'The AI Vision Lab Assistant project aims to develop a real-time detection system that enhances lab safety and efficiency. By leveraging computer vision techniques, the assistant can identify potential safety issues within the lab environment, such as improper tool usage or hazardous conditions. The system provides guidance through augmented reality (AR) overlays, helping users navigate tool operations safely. Built using TensorFlow for AI model development, React and TypeScript for the user interface, and WebRTC for real-time video processing, this project integrates advanced technologies to create an intelligent lab assistant.',
  },
  {
    id: 'p4',
    title: 'Modular Robotics Arm',
    description:
      'Lightweight, reconfigurable robotic arm designed for precision pick-and-place demos and research.',
    mainTag: 'Hardware' as ProjectCategory,
    tags: ['Arduino', 'ROS2', 'C++', 'Kinematics'],
    extendedDescription:
      'The Modular Robotics Arm project focuses on designing and building a lightweight, reconfigurable robotic arm that can be easily adapted for various tasks. The arm is engineered for precision pick-and-place operations, making it suitable for demonstrations and research applications. Utilizing Arduino for control, ROS2 for robotic operating system capabilities, C++ for programming, and kinematics principles for movement accuracy, this project aims to create a versatile robotic platform that can be customized for different use cases in robotics education and experimentation.',
  },
  {
    id: 'p5',
    title: 'Swarm Drone Coordination',
    description:
      'Simulation of coordinated drones optimizing paths for search-and-rescue inspired drills.',
    mainTag: 'Software' as ProjectCategory,
    tags: ['Python', 'Unity', 'Path Planning', 'Simulation'],
    extendedDescription:
      'The Swarm Drone Coordination project involves simulating a group of drones that work together to optimize their flight paths for search-and-rescue operations. Inspired by real-world scenarios, the simulation focuses on developing algorithms that enable drones to communicate and coordinate effectively, ensuring efficient area coverage and target identification. Built using Python for algorithm development, Unity for 3D simulation, and incorporating path planning techniques, this project aims to explore the potential of swarm robotics in enhancing search-and-rescue missions through collaborative drone behavior.',
  },
  {
    id: 'p6',
    title: 'Voice-Controlled Lab Guide',
    description:
      'Conversational assistant that gives lab walkthroughs, safety reminders, and schedules sessions.',
    mainTag: 'AI' as ProjectCategory,
    tags: ['NLP', 'React', 'Vite', 'Tailwind'],
    extendedDescription:
      'The Voice-Controlled Lab Guide project aims to create a conversational assistant that provides users with interactive lab walkthroughs, safety reminders, and session scheduling capabilities. By utilizing natural language processing (NLP) techniques, the assistant can understand and respond to user queries, offering guidance on lab procedures and safety protocols. Developed using React for the user interface, Vite for build tooling, and Tailwind for styling, this project seeks to enhance the lab experience by making information easily accessible through voice commands.',
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

export const adminMembers = [
  {
    id: 'm1',
    name: 'Bonheur Christian',
    role: 'Admin',
    squad: 'AI & Vision',
    status: 'Active',
  },
  {
    id: 'm2',
    name: 'NIYOBYOSE Isaac Precieux',
    role: 'Member',
    squad: 'Hardware',
    status: 'Active',
  },
  {
    id: 'm3',
    name: 'Ntwali Gloria',
    role: 'Member',
    squad: 'Software',
    status: 'Active',
  },
  {
    id: 'm4',
    name: 'ZIGIRA Miguel',
    role: 'Member',
    squad: 'Operations',
    status: 'Suspended',
  },
]
// they need to come from the backend API
export const joinRequests = [
  {
    id: 'r1',
    name: 'Ines Kamali',
    email: 'ines.kamali@rca.rw',
    interest: 'AI & Vision',
    note: 'Interested in safety detection models.',
    submitted: 'Today',
  },
  {
    id: 'r2',
    name: 'Patrick Rugamba',
    email: 'patrick.rugamba@rca.rw',
    interest: 'Hardware',
    note: 'Experience with PCB design, wants to join rover squad.',
    submitted: 'Yesterday',
  },
  {
    id: 'r3',
    name: 'Lydia Uwimana',
    email: 'lydia.uwimana@rca.rw',
    interest: 'IoT',
    note: 'Worked on LoRa mesh, wants to help sensor rollout.',
    submitted: '2 days ago',
  },
]

