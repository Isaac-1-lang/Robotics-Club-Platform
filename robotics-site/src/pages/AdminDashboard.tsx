import { useState, useEffect } from 'react'
import { Calendar, Check, Clock, Users, ShieldCheck, Zap, LayoutDashboard, UserCheck, Menu, X, Settings, BookOpen, Search, Bell, MoreVertical, Loader, Tag, Plus, Trash2, Edit2, Image as ImageIcon, Lock, User, BellRing } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { getPendingUsers, approveUser, rejectUser, getDashboardStats, getSystemTags, createSystemTags, updateSystemTags, deleteSystemTags, type PendingUser, type DashboardStats, type TagData } from '../apis/adminApi'
import { updateProfile, changePassword } from '../apis/authApis'
import { getMembers, type MemberData } from '../apis/membersApi'
import { getProjects, createProject, updateProject, deleteProject, type ProjectData } from '../apis/projectApis'
import { getPosts, createPost, updatePost, deletePost, type PostData } from '../apis/postsApi'
import toast from 'react-hot-toast'

type TabKey = 'overview' | 'members' | 'requests' | 'events' | 'settings' | 'projects' | 'blogs' | 'Tags'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabKey>('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Data states
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([])
  const [members, setMembers] = useState<MemberData[]>([])
  const [tags, setTags] = useState<TagData[]>([])
  const [projects, setProjects] = useState<ProjectData[]>([])

  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const [statsData, pendingData, membersData, tagsData, projectsData, postsData] = await Promise.all([
        getDashboardStats(),
        getPendingUsers(),
        getMembers(),
        getSystemTags(),
        getProjects(),
        getPosts()
      ])
      setStats(statsData)
      setPendingUsers(pendingData)
      setMembers(membersData)
      setTags(tagsData)
      setProjects(projectsData)
      setPosts(postsData)
    } catch (error) {
      console.error('Failed to fetch admin data:', error)
      toast.error('Failed to load dashboard data')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleRequestAction = async (userId: string, action: 'approved' | 'rejected') => {
    try {
      if (action === 'approved') {
        await approveUser(userId)
        toast.success('User approved')
      } else {
        await rejectUser(userId)
        toast.success('User rejected')
      }
      fetchData()
    } catch (error) {
      console.error(`Failed to ${action} user:`, error)
      toast.error(`Failed to ${action} user`)
    }
  }

  // Tags Management
  const [isTagModalOpen, setIsTagModalOpen] = useState(false)
  const [editingTag, setEditingTag] = useState<TagData | null>(null)

  const handleSaveTag = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const tagData = {
      name: formData.get('name') as string,
      color: formData.get('color') as string,
    } as TagData

    try {
      if (editingTag) {
        await updateSystemTags(editingTag._id, tagData)
        toast.success('Tag updated')
      } else {
        await createSystemTags(tagData)
        toast.success('Tag created')
      }
      setIsTagModalOpen(false)
      setEditingTag(null)
      fetchData()
    } catch (error) {
      console.error('Failed to save tag:', error)
      toast.error('Failed to save tag')
    }
  }

  const handleDeleteTag = async (tagId: string) => {
    if (!confirm('Are you sure you want to delete this tag?')) return
    try {
      await deleteSystemTags(tagId)
      toast.success('Tag deleted')
      fetchData()
    } catch (error) {
      console.error('Failed to delete tag:', error)
      toast.error('Failed to delete tag')
    }
  }

  // Projects Management
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<ProjectData | null>(null)

  // Settings State
  const [activeSettingsTab, setActiveSettingsTab] = useState<'profile' | 'security' | 'notifications'>('profile')

  // Blogs Management
  const [posts, setPosts] = useState<PostData[]>([])
  const [isPostModalOpen, setIsPostModalOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<PostData | null>(null)

  const handleSavePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    try {
      if (editingPost) {
        await updatePost(editingPost._id, formData)
        toast.success('Post updated')
      } else {
        await createPost(formData)
        toast.success('Post created')
      }
      setIsPostModalOpen(false)
      setEditingPost(null)
      fetchData()
    } catch (error) {
      console.error('Failed to save post:', error)
      toast.error('Failed to save post')
    }
  }

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return
    try {
      await deletePost(postId)
      toast.success('Post deleted')
      fetchData()
    } catch (error) {
      console.error('Failed to delete post:', error)
      toast.error('Failed to delete post')
    }
  }

  const handleSaveProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    // Determine mainTag as first selected tag or logic
    // For simplicity, we just pass the formData as is, but we need to ensure the API receives what it expects.
    // The createProject API expects FormData directly if the backend handles it.
    // Looking at projectApis.ts: createProject(projectData: FormData)

    try {
      if (editingProject) {
        await updateProject(editingProject._id, formData)
        toast.success('Project updated')
      } else {
        await createProject(formData)
        toast.success('Project created')
      }
      setIsProjectModalOpen(false)
      setEditingProject(null)
      fetchData()
    } catch (error) {
      console.error('Failed to save project:', error)
      toast.error('Failed to save project')
    }
  }

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return
    try {
      await deleteProject(projectId)
      toast.success('Project deleted')
      fetchData()
    } catch (error) {
      console.error('Failed to delete project:', error)
      toast.error('Failed to delete project')
    }
  }

  const menuItems = [
    { key: 'overview' as TabKey, label: 'Overview', icon: LayoutDashboard },
    { key: 'members' as TabKey, label: 'Members', icon: Users },
    { key: 'requests' as TabKey, label: 'Requests', icon: UserCheck, badge: pendingUsers.length > 0 ? pendingUsers.length : undefined },
    { key: 'events' as TabKey, label: 'Events', icon: Calendar },
    { key: 'projects' as TabKey, label: 'Projects', icon: Zap },
    { key: 'blogs' as TabKey, label: 'Blogs', icon: BookOpen },
    { key: 'Tags' as TabKey, label: 'Tags', icon: Tag },
    { key: 'settings' as TabKey, label: 'Settings', icon: Settings },
  ]

  const statsItems = stats ? [
    { label: 'Members', value: stats.users.members.toString(), icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Pending', value: stats.users.pending.toString(), icon: Clock, color: 'text-amber-600', bg: 'bg-amber-100' },
    { label: 'Posts', value: stats.posts.total.toString(), icon: BookOpen, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Projects', value: stats.projects.total.toString(), icon: Zap, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  ] : []

  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Sidebar - Fixed width */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
          }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center px-6 border-b border-slate-100">
            <ShieldCheck className="h-7 w-7 text-blue-600 mr-3" />
            <span className="text-lg font-bold text-slate-800">AdminPanel</span>
            <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-slate-400">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  setActiveTab(item.key)
                  setSidebarOpen(false)
                }}
                className={`flex w-full items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === item.key
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`h-4 w-4 ${activeTab === item.key ? 'text-blue-600' : 'text-slate-400'}`} />
                  {item.label}
                </div>
                {item.badge && (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                {(localStorage.getItem('username') || 'U').charAt(0).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-slate-900 truncate">{localStorage.getItem('username')}</p>
                <p className="text-xs text-slate-500 truncate">{localStorage.getItem('role')}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content - Flex Column */}
      <main className="flex-1 flex flex-col h-full min-w-0 bg-slate-50/50">
        {/* Header - Fixed Height */}
        <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-500">
              <Menu className="h-5 w-5" />
            </button>
            <h2 className="text-lg font-semibold text-slate-800 capitalize">{activeTab}</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                className="h-9 w-64 rounded-md border border-slate-200 bg-slate-50 pl-9 pr-4 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
            <button className="text-slate-400 hover:text-slate-600">
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Content Body - Fills remaining space, no window scroll */}
        <div className="flex-1 p-6 overflow-hidden flex flex-col min-h-0">
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <Loader className="h-8 w-8 text-blue-600 animate-spin" />
            </div>
          ) : (
            <>

              {/* Overview Layout */}
              {activeTab === 'overview' && (
                <div className="flex flex-col h-full gap-6">
                  {/* Stats Row - Compact */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
                    {statsItems.map((item) => (
                      <div key={item.label} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                        <div>
                          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{item.label}</p>
                          <p className="text-2xl font-bold text-slate-900 mt-1">{item.value}</p>
                        </div>
                        <div className={`h-10 w-10 rounded-lg ${item.bg} ${item.color} flex items-center justify-center`}>
                          <item.icon className="h-5 w-5" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Dashboard Grid - Fills remaining height */}
                  <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">

                    {/* Recent Requests - Scrollable List */}
                    <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col min-h-0">
                      <div className="p-4 border-b border-slate-100 flex items-center justify-between shrink-0">
                        <h3 className="font-semibold text-slate-800">Pending Requests</h3>
                        <span className="text-xs text-slate-500">{pendingUsers.length} pending</span>
                      </div>
                      <div className="flex-1 overflow-y-auto p-2">
                        <div className="space-y-2">
                          {pendingUsers.map((user) => (
                            <div key={user._id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg border border-transparent hover:border-slate-100 transition-all">
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs shrink-0">
                                  {user.username.charAt(0).toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                  <p className="text-sm font-medium text-slate-900 truncate">{user.username}</p>
                                  <p className="text-xs text-slate-500 truncate">{user.email}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 shrink-0 ml-4">
                                <button
                                  onClick={() => handleRequestAction(user._id, 'approved')}
                                  className="p-1.5 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                                  title="Approve"
                                >
                                  <Check className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleRequestAction(user._id, 'rejected')}
                                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                  title="Reject"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                          {pendingUsers.length === 0 && (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400 py-12">
                              <UserCheck className="h-8 w-8 mb-2 opacity-50" />
                              <p className="text-sm">No pending requests</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions / Info - Fixed */}
                    <div className="flex flex-col gap-4 min-h-0">
                      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 shrink-0">
                        <h3 className="font-semibold text-slate-800 mb-4">Quick Actions</h3>
                        <div className="space-y-2">
                          <button className="w-full flex items-center gap-3 p-2.5 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors border border-slate-100 hover:border-slate-200">
                            <div className="h-8 w-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                              <BookOpen className="h-4 w-4" />
                            </div>
                            Create New Post
                          </button>
                          <button className="w-full flex items-center gap-3 p-2.5 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors border border-slate-100 hover:border-slate-200">
                            <div className="h-8 w-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                              <Zap className="h-4 w-4" />
                            </div>
                            Add Project
                          </button>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-sm p-5 text-white flex-1 flex flex-col justify-center items-center text-center">
                        <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center mb-3">
                          <ShieldCheck className="h-6 w-6 text-blue-400" />
                        </div>
                        <h3 className="font-semibold">System Status</h3>
                        <p className="text-xs text-slate-400 mt-1">All systems operational</p>
                        <div className="mt-4 flex items-center gap-2 text-xs bg-white/10 px-3 py-1 rounded-full">
                          <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                          Online
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* Members Table - Full Height with Internal Scroll */}
              {activeTab === 'members' && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden">
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between shrink-0">
                    <h3 className="font-semibold text-slate-800">All Members</h3>
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 text-xs font-medium bg-slate-100 text-slate-600 rounded-md hover:bg-slate-200">Filter</button>
                      <button className="px-3 py-1.5 text-xs font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700">Export</button>
                    </div>
                  </div>
                  <div className="flex-1 overflow-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                      <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 sticky top-0 z-10">
                        <tr>
                          <th className="px-6 py-3 border-b border-slate-200">User</th>
                          <th className="px-6 py-3 border-b border-slate-200">Role</th>
                          <th className="px-6 py-3 border-b border-slate-200">Joined</th>
                          <th className="px-6 py-3 border-b border-slate-200 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {members.map((member) => (
                          <tr key={member._id} className="hover:bg-slate-50">
                            <td className="px-6 py-3">
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-600">
                                  {member.username.charAt(0).toUpperCase()}
                                </div>
                                <span className="font-medium text-slate-900">{member.username}</span>
                              </div>
                            </td>
                            <td className="px-6 py-3">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${member.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                                }`}>
                                {member.role}
                              </span>
                            </td>
                            <td className="px-6 py-3">{new Date(member.createdAt).toLocaleDateString()}</td>
                            <td className="px-6 py-3 text-right">
                              <button className="text-slate-400 hover:text-slate-600">
                                <MoreVertical className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Requests Table - Full Height with Internal Scroll */}
              {activeTab === 'requests' && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden">
                  <div className="p-4 border-b border-slate-100 shrink-0">
                    <h3 className="font-semibold text-slate-800">Membership Requests</h3>
                  </div>
                  <div className="flex-1 overflow-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                      <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 sticky top-0 z-10">
                        <tr>
                          <th className="px-6 py-3 border-b border-slate-200">Candidate</th>
                          <th className="px-6 py-3 border-b border-slate-200">Email</th>
                          <th className="px-6 py-3 border-b border-slate-200">Note</th>
                          <th className="px-6 py-3 border-b border-slate-200">Date</th>
                          <th className="px-6 py-3 border-b border-slate-200 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {pendingUsers.map((user) => (
                          <tr key={user._id} className="hover:bg-slate-50">
                            <td className="px-6 py-3 font-medium text-slate-900">{user.username}</td>
                            <td className="px-6 py-3">{user.email}</td>
                            <td className="px-6 py-3 max-w-xs truncate" title={user.bio}>{user.bio || '-'}</td>
                            <td className="px-6 py-3">{new Date(user.membershipRequestedAt).toLocaleDateString()}</td>
                            <td className="px-6 py-3 text-right">
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => handleRequestAction(user._id, 'approved')}
                                  className="px-2 py-1 text-xs font-medium bg-green-50 text-green-700 rounded hover:bg-green-100"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleRequestAction(user._id, 'rejected')}
                                  className="px-2 py-1 text-xs font-medium bg-red-50 text-red-700 rounded hover:bg-red-100"
                                >
                                  Reject
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {pendingUsers.length === 0 && (
                          <tr>
                            <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                              No pending requests found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Tag Management with Animation */}
              {activeTab === 'Tags' && (
                <div className="flex flex-col h-full gap-6 overflow-hidden">
                  <div className="flex items-center justify-between shrink-0">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">Tags</h3>
                      <p className="text-slate-500 text-sm">Manage system-wide tags for projects and posts</p>
                    </div>
                    <button
                      onClick={() => { setEditingTag(null); setIsTagModalOpen(true) }}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
                    >
                      <Plus className="h-4 w-4" />
                      Create Tag
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto min-h-0 pr-2">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                    >
                      <AnimatePresence mode='popLayout'>
                        {tags.map((tag) => (
                          <motion.div
                            layout
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            key={tag._id}
                            className="group relative bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all duration-300"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex flex-col gap-2">
                                <span
                                  className="inline-flex items-center px-2.5 py-1 rounded-md text-white text-xs font-bold tracking-wide shadow-sm"
                                  style={{ backgroundColor: tag.color || '#3b82f6' }}
                                >
                                  {tag.name}
                                </span>
                                <span className="text-xs text-slate-400 font-mono uppercase">{tag.color || 'No Color'}</span>
                              </div>
                              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => { setEditingTag(tag); setIsTagModalOpen(true) }}
                                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                  title="Edit"
                                >
                                  <Edit2 className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteTag(tag._id)}
                                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                              <span>ID: ...{tag._id.slice(-6)}</span>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </motion.div>

                    {tags.length === 0 && (
                      <div className="h-64 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                        <Tag className="h-10 w-10 mb-3 opacity-20" />
                        <p className="font-medium">No tags found</p>
                        <p className="text-sm mt-1">Create a new tag to get started</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Projects Management */}
              {activeTab === 'projects' && (
                <div className="flex flex-col h-full gap-6 overflow-hidden">
                  <div className="flex items-center justify-between shrink-0">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">Projects</h3>
                      <p className="text-slate-500 text-sm">Showcase your team's work and innovations</p>
                    </div>
                    <button
                      onClick={() => { setEditingProject(null); setIsProjectModalOpen(true) }}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
                    >
                      <Plus className="h-4 w-4" />
                      Add Project
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto min-h-0 pr-2">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                      <AnimatePresence mode='popLayout'>
                        {projects.map((project) => (
                          <motion.div
                            layout
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            key={project._id}
                            className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group h-[360px]"
                          >
                            {/* Image Area */}
                            <div className="h-44 bg-slate-100 relative overflow-hidden">
                              {project.imageUrl ? (
                                <img
                                  src={project.imageUrl}
                                  alt={project.title}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                              ) : (
                                <div className="flex items-center justify-center h-full text-slate-300">
                                  <ImageIcon className="h-12 w-12" />
                                </div>
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                              {/* Floating Tag */}
                              <div className="absolute top-3 right-3">
                                <span className="bg-white/90 backdrop-blur-md text-slate-700 text-[10px] font-bold px-2 py-1 rounded-full shadow-sm uppercase tracking-wider">
                                  {project.mainTag?.name || 'Uncategorized'}
                                </span>
                              </div>

                              {/* Hover Actions */}
                              <div className="absolute bottom-3 right-3 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                <button
                                  onClick={() => { setEditingProject(project); setIsProjectModalOpen(true) }}
                                  className="p-2 bg-white text-blue-600 rounded-full hover:bg-blue-50 shadow-lg"
                                  title="Edit"
                                >
                                  <Edit2 className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteProject(project._id)}
                                  className="p-2 bg-white text-red-600 rounded-full hover:bg-red-50 shadow-lg"
                                  title="Delete"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>

                            {/* Content Area */}
                            <div className="p-5 flex-1 flex flex-col">
                              <div className="flex items-center gap-2 mb-2 text-xs text-slate-400">
                                <Calendar className="h-3 w-3" />
                                <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                              </div>
                              <h4 className="font-bold text-slate-900 text-lg mb-2 line-clamp-1" title={project.title}>{project.title}</h4>
                              <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed mb-4 flex-1">
                                {project.content}
                              </p>

                              {/* Mini Tags Footer */}
                              {project.tags && project.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-auto pt-3 border-t border-slate-50">
                                  {project.tags.slice(0, 3).map(t => (
                                    <span key={t._id} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                                      #{t.name}
                                    </span>
                                  ))}
                                  {project.tags.length > 3 && (
                                    <span className="text-[10px] text-slate-400 px-1">+ {project.tags.length - 3}</span>
                                  )}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </motion.div>

                    {projects.length === 0 && (
                      <div className="h-64 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                        <Zap className="h-10 w-10 mb-3 opacity-20" />
                        <p className="font-medium">No projects found</p>
                        <p className="text-sm mt-1">Add your first project to verify content</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Settings Page */}
              {activeTab === 'settings' && (
                <div className="flex flex-col h-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="flex flex-col md:flex-row h-full">
                    {/* Settings Sidebar */}
                    <div className="w-full md:w-64 border-r border-slate-100 bg-slate-50/50 p-4">
                      <h3 className="font-bold text-lg text-slate-800 mb-6 px-2">Settings</h3>
                      <nav className="space-y-1">
                        <button
                          onClick={() => setActiveSettingsTab('profile')}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeSettingsTab === 'profile' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:bg-slate-100'
                            }`}
                        >
                          <User className="h-4 w-4" />
                          Profile
                        </button>
                        <button
                          onClick={() => setActiveSettingsTab('security')}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeSettingsTab === 'security' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:bg-slate-100'
                            }`}
                        >
                          <Lock className="h-4 w-4" />
                          Security
                        </button>
                        <button
                          onClick={() => setActiveSettingsTab('notifications')}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeSettingsTab === 'notifications' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:bg-slate-100'
                            }`}
                        >
                          <BellRing className="h-4 w-4" />
                          Notifications
                        </button>
                      </nav>
                    </div>

                    {/* Settings Content */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-10">
                      <AnimatePresence mode='wait'>
                        {activeSettingsTab === 'profile' && (
                          <motion.div
                            key="profile"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="max-w-xl mx-auto"
                          >
                            <h2 className="text-xl font-bold text-slate-900 mb-1">Public Profile</h2>
                            <p className="text-sm text-slate-500 mb-8">Manage your public appearance and basic info.</p>

                            <form className="space-y-6" onSubmit={async (e) => {
                              e.preventDefault();
                              const formData = new FormData(e.currentTarget);
                              try {
                                await updateProfile({
                                  username: formData.get('username') as string,
                                  email: formData.get('email') as string,
                                  bio: formData.get('bio') as string,
                                });
                                toast.success('Profile updated successfully');
                              } catch (err) {
                                toast.error('Failed to update profile');
                              }
                            }}>
                              <div className="flex items-center gap-6">
                                <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold border-4 border-white shadow-sm">
                                  {(localStorage.getItem('username') || 'U').charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <button type="button" className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm">
                                    Change Avatar
                                  </button>
                                  <p className="text-xs text-slate-400 mt-2">JPG, GIF or PNG. Max size of 800K</p>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <label className="block text-sm font-medium text-slate-700 mb-2">Username</label>
                                  <input
                                    name="username"
                                    defaultValue={localStorage.getItem('username') || ''}
                                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                                  <input
                                    name="email"
                                    type="email"
                                    defaultValue="admin@robotics.com" // Placeholder/Mock
                                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Bio</label>
                                <textarea
                                  name="bio"
                                  rows={4}
                                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
                                  placeholder="Tell us a little about yourself..."
                                />
                              </div>

                              <div className="flex justify-end pt-4">
                                <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 shadow-sm transition-colors">
                                  Save Changes
                                </button>
                              </div>
                            </form>
                          </motion.div>
                        )}

                        {activeSettingsTab === 'security' && (
                          <motion.div
                            key="security"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="max-w-xl mx-auto"
                          >
                            <h2 className="text-xl font-bold text-slate-900 mb-1">Security</h2>
                            <p className="text-sm text-slate-500 mb-8">Update your password and security preferences.</p>

                            <form className="space-y-6" onSubmit={async (e) => {
                              e.preventDefault();
                              const formData = new FormData(e.currentTarget);
                              const newPass = formData.get('newPassword') as string;
                              const confirmPass = formData.get('confirmPassword') as string;

                              if (newPass !== confirmPass) {
                                toast.error('Passwords do not match');
                                return;
                              }

                              try {
                                await changePassword({
                                  currentPassword: formData.get('currentPassword') as string,
                                  newPassword: newPass
                                });
                                toast.success('Password updated successfully');
                                (e.target as HTMLFormElement).reset();
                              } catch (err) {
                                toast.error('Failed to update password');
                              }
                            }}>
                              <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Current Password</label>
                                <input
                                  type="password"
                                  name="currentPassword"
                                  required
                                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                />
                              </div>
                              <div className="pt-2">
                                <label className="block text-sm font-medium text-slate-700 mb-2">New Password</label>
                                <input
                                  type="password"
                                  name="newPassword"
                                  required
                                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Confirm New Password</label>
                                <input
                                  type="password"
                                  name="confirmPassword"
                                  required
                                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                />
                              </div>

                              <div className="flex justify-end pt-4">
                                <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 shadow-sm transition-colors">
                                  Update Password
                                </button>
                              </div>
                            </form>
                          </motion.div>
                        )}

                        {activeSettingsTab === 'notifications' && (
                          <motion.div
                            key="notifications"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="max-w-xl mx-auto"
                          >
                            <h2 className="text-xl font-bold text-slate-900 mb-1">Notifications</h2>
                            <p className="text-sm text-slate-500 mb-8">Manage how you receive alerts and updates.</p>

                            <div className="space-y-4">
                              {[
                                { title: 'Email Notifications', desc: 'Receive daily digests and important updates.' },
                                { title: 'New User Alerts', desc: 'Get notified when a new user requests to join.' },
                                { title: 'Project Updates', desc: 'Alerts when projects are modified or commented on.' },
                                { title: 'Security Alerts', desc: 'Login attempts and password changes.' }
                              ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                                  <div>
                                    <h4 className="font-semibold text-slate-800 text-sm">{item.title}</h4>
                                    <p className="text-xs text-slate-500">{item.desc}</p>
                                  </div>
                                  <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                  </label>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              )}

              {/* Blogs Management */}
              {activeTab === 'blogs' && (
                <div className="flex flex-col h-full gap-6 overflow-hidden">
                  <div className="flex items-center justify-between shrink-0">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">Blogs</h3>
                      <p className="text-slate-500 text-sm">Share news, updates, and articles with the community</p>
                    </div>
                    <button
                      onClick={() => { setEditingPost(null); setIsPostModalOpen(true) }}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
                    >
                      <Plus className="h-4 w-4" />
                      Create Post
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto min-h-0 pr-2">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                      <AnimatePresence mode='popLayout'>
                        {posts.map((post) => (
                          <motion.div
                            layout
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            key={post._id}
                            className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group h-[380px]"
                          >
                            {/* Image Area */}
                            <div className="h-48 bg-slate-100 relative overflow-hidden">
                              {post.imageUrl ? (
                                <img
                                  src={post.imageUrl}
                                  alt={post.title}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                              ) : (
                                <div className="flex items-center justify-center h-full text-slate-300">
                                  <BookOpen className="h-12 w-12" />
                                </div>
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                              {/* Floating Tag */}
                              <div className="absolute top-3 right-3">
                                <span className="bg-white/90 backdrop-blur-md text-slate-700 text-[10px] font-bold px-2 py-1 rounded-full shadow-sm uppercase tracking-wider">
                                  {post.mainTag?.name || 'Uncategorized'}
                                </span>
                              </div>

                              {/* Hover Actions */}
                              <div className="absolute bottom-3 right-3 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                <button
                                  onClick={() => { setEditingPost(post); setIsPostModalOpen(true) }}
                                  className="p-2 bg-white text-blue-600 rounded-full hover:bg-blue-50 shadow-lg"
                                  title="Edit"
                                >
                                  <Edit2 className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDeletePost(post._id)}
                                  className="p-2 bg-white text-red-600 rounded-full hover:bg-red-50 shadow-lg"
                                  title="Delete"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>

                            {/* Content Area */}
                            <div className="p-5 flex-1 flex flex-col">
                              <div className="flex items-center justify-between gap-2 mb-2 text-xs text-slate-400">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {new Date(post.createdAt).toLocaleDateString()}
                                </span>
                                <span className="flex items-center gap-1">
                                  <User className="h-3 w-3" />
                                  {post.author?.username || 'Unknown'}
                                </span>
                              </div>
                              <h4 className="font-bold text-slate-900 text-lg mb-2 line-clamp-1" title={post.title}>{post.title}</h4>
                              <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed mb-4 flex-1">
                                {post.content}
                              </p>

                              {/* Mini Tags Footer */}
                              {post.tags && post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-auto pt-3 border-t border-slate-50">
                                  {post.tags.slice(0, 3).map(t => (
                                    <span key={t._id} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                                      #{t.name}
                                    </span>
                                  ))}
                                  {post.tags.length > 3 && (
                                    <span className="text-[10px] text-slate-400 px-1">+ {post.tags.length - 3}</span>
                                  )}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </motion.div>

                    {posts.length === 0 && (
                      <div className="h-64 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                        <BookOpen className="h-10 w-10 mb-3 opacity-20" />
                        <p className="font-medium">No posts found</p>
                        <p className="text-sm mt-1">Write your first article to share with the world</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Placeholders for remaining */}
              {['events'].includes(activeTab) && (
                <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-xl border border-slate-200 border-dashed">
                  <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <Settings className="h-8 w-8 text-slate-300" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900">Under Construction</h3>
                  <p className="text-slate-500 mt-1">This module is coming soon.</p>
                </div>
              )}

              {/* Post Modal */}
              <AnimatePresence>
                {isPostModalOpen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setIsPostModalOpen(false)}
                      className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0, y: 10 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.95, opacity: 0, y: 10 }}
                      className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh] relative z-10"
                    >
                      <div className="p-5 border-b border-slate-100 flex items-center justify-between shrink-0">
                        <h3 className="text-lg font-bold text-slate-900">{editingPost ? 'Edit Post' : 'Create New Post'}</h3>
                        <button onClick={() => setIsPostModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                      <form onSubmit={handleSavePost} className="flex-1 overflow-y-auto p-6 space-y-6">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Post Title</label>
                          <input
                            name="title"
                            defaultValue={editingPost?.title}
                            required
                            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                            placeholder="e.g. The Future of AI in Robotics"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Main Category</label>
                            <select
                              name="mainTag"
                              defaultValue={editingPost?.mainTag?._id}
                              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all bg-white"
                            >
                              <option value="">Select a tag...</option>
                              {tags.map(tag => (
                                <option key={tag._id} value={tag._id}>{tag.name}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Cover Image</label>
                            <div className="relative">
                              <input
                                type="file"
                                name="image"
                                accept="image/*"
                                className="w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer cursor-pointer border border-slate-200 rounded-lg"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Content</label>
                          <textarea
                            name="content"
                            defaultValue={editingPost?.content}
                            required
                            rows={8}
                            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none resize-none transition-all font-mono text-slate-600"
                            placeholder="Write your article content here..."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Additional Tags</label>
                          <div className="flex flex-wrap gap-2 p-4 border border-slate-200 rounded-xl bg-slate-50/50 max-h-40 overflow-y-auto">
                            {tags.map(tag => (
                              <label key={tag._id} className="inline-flex items-center gap-2 cursor-pointer px-3 py-2 bg-white border border-slate-200 rounded-lg hover:border-blue-300 transition-colors shadow-sm">
                                <input
                                  type="checkbox"
                                  name="tags"
                                  value={tag._id}
                                  defaultChecked={editingPost?.tags?.some(t => t._id === tag._id)}
                                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                                />
                                <span className="text-sm font-medium text-slate-700 select-none">{tag.name}</span>
                              </label>
                            ))}
                            {tags.length === 0 && <span className="text-sm text-slate-400 italic">No tags available. Go create some!</span>}
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-100 flex justify-end gap-3">
                          <button
                            type="button"
                            onClick={() => setIsPostModalOpen(false)}
                            className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-6 py-2.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
                          >
                            {editingPost ? 'Update Post' : 'Publish Post'}
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>

            </>
          )}
        </div>
      </main>

      {/* Tag Modal */}
      <AnimatePresence>
        {isTagModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTagModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative z-10"
            >
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">{editingTag ? 'Edit Tag' : 'Create New Tag'}</h3>
                <button onClick={() => setIsTagModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleSaveTag} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tag Name</label>
                  <input
                    name="name"
                    defaultValue={editingTag?.name}
                    required
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    placeholder="e.g. Robotics"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Color</label>
                  <div className="flex gap-3">
                    <div className="relative">
                      <input
                        type="color"
                        name="color"
                        defaultValue={editingTag?.color || '#3b82f6'}
                        className="h-10 w-16 p-0 border-0 rounded-lg cursor-pointer overflow-hidden"
                      />
                    </div>
                    <input
                      name="color_text" // using a different name to avoid conflict or handle manually if needed, but for now just display
                      defaultValue={editingTag?.color || '#3b82f6'}
                      required
                      className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none uppercase font-mono"
                      pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
                      placeholder="#3B82F6"
                      onChange={() => {
                        // optional: sync with color picker if implementing controlled state
                      }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1.5">Pick a color that stands out.</p>
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsTagModalOpen(false)}
                    className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
                  >
                    {editingTag ? 'Save Changes' : 'Create Tag'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Project Modal */}
      <AnimatePresence>
        {isProjectModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsProjectModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] relative z-10"
            >
              <div className="p-5 border-b border-slate-100 flex items-center justify-between shrink-0">
                <h3 className="text-lg font-bold text-slate-900">{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
                <button onClick={() => setIsProjectModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleSaveProject} className="flex-1 overflow-y-auto p-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Project Title</label>
                  <input
                    name="title"
                    defaultValue={editingProject?.title}
                    required
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    placeholder="e.g. Autonomous Drone V2"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Main Category</label>
                    <select
                      name="mainTag"
                      defaultValue={editingProject?.mainTag?._id}
                      className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all bg-white"
                    >
                      <option value="">Select a tag...</option>
                      {tags.map(tag => (
                        <option key={tag._id} value={tag._id}>{tag.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Project Cover</label>
                    <div className="relative">
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer cursor-pointer border border-slate-200 rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description</label>
                  <textarea
                    name="content"
                    defaultValue={editingProject?.content}
                    required
                    rows={5}
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none resize-none transition-all"
                    placeholder="Detailed description of the project..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Additional Tags</label>
                  <div className="flex flex-wrap gap-2 p-4 border border-slate-200 rounded-xl bg-slate-50/50 max-h-40 overflow-y-auto">
                    {tags.map(tag => (
                      <label key={tag._id} className="inline-flex items-center gap-2 cursor-pointer px-3 py-2 bg-white border border-slate-200 rounded-lg hover:border-blue-300 transition-colors shadow-sm">
                        <input
                          type="checkbox"
                          name="tags"
                          value={tag._id}
                          defaultChecked={editingProject?.tags?.some(t => t._id === tag._id)}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                        />
                        <span className="text-sm font-medium text-slate-700 select-none">{tag.name}</span>
                      </label>
                    ))}
                    {tags.length === 0 && <span className="text-sm text-slate-400 italic">No tags available. Go create some!</span>}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsProjectModalOpen(false)}
                    className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
                  >
                    {editingProject ? 'Update Project' : 'Create Project'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}