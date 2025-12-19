import { Navigate, Route, Routes } from 'react-router-dom'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import AboutPage from './pages/AboutPage'
import AdminDashboard from './pages/AdminDashboard'
import ContactPage from './pages/ContactPage'
import EventsPage from './pages/EventsPage'
import GalleryPage from './pages/GalleryPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProjectsPage from './pages/ProjectsPage'
import RegisterPage from './pages/RegisterPage'
import TeamPage from './pages/TeamPage'
import BlogsPage from './pages/BlogsPage'

function App() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Navbar />
      <main className="pt-24 pb-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
