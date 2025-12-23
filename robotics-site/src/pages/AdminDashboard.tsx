import { useState, useEffect } from 'react'
import { Calendar, Check, Clock, Users, ShieldCheck, Zap, LayoutDashboard, UserCheck, Menu, X, Settings, BookOpen, Search, Bell, MoreVertical, Loader } from 'lucide-react'
import { getPendingUsers, approveUser, rejectUser, getDashboardStats, type PendingUser, type DashboardStats } from '../apis/adminApi'
import { getMembers, type MemberData } from '../apis/membersApi'
import toast from 'react-hot-toast'

type TabKey = 'overview' | 'members' | 'requests' | 'events' | 'settings' | 'projects' | 'blogs'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabKey>('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Data states
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([])
  const [members, setMembers] = useState<MemberData[]>([])

  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const [statsData, pendingData, membersData] = await Promise.all([
        getDashboardStats(),
        getPendingUsers(),
        getMembers()
      ])
      console.log('Pending users from API:',pendingData);
      console.log('Members from API:',membersData);
      console.log('Stats from API:',statsData);
      setStats(statsData)
      setPendingUsers(pendingData)
      setMembers(membersData)
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

  const menuItems = [
    { key: 'overview' as TabKey, label: 'Overview', icon: LayoutDashboard },
    { key: 'members' as TabKey, label: 'Members', icon: Users },
    { key: 'requests' as TabKey, label: 'Requests', icon: UserCheck, badge: pendingUsers.length > 0 ? pendingUsers.length : undefined },
    { key: 'events' as TabKey, label: 'Events', icon: Calendar },
    { key: 'projects' as TabKey, label: 'Projects', icon: Zap },
    { key: 'blogs' as TabKey, label: 'Blogs', icon: BookOpen },
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

              {/* Placeholders */}
              {['events', 'projects', 'blogs', 'settings'].includes(activeTab) && (
                <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-xl border border-slate-200 border-dashed">
                  <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <Settings className="h-8 w-8 text-slate-300" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900">Under Construction</h3>
                  <p className="text-slate-500 mt-1">This module is coming soon.</p>
                </div>
              )}

            </>
          )}
        </div>
      </main>
    </div>
  )
}