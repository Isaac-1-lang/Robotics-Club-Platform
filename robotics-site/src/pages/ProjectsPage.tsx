import { useMemo, useState, useEffect } from 'react'
import { Filter, MessageCircle, ThumbsUp, Heart, Smile, Rocket, Zap, Star } from 'lucide-react'
import { getProjects, type ProjectData } from '../apis/projectApis'
import { Card } from '../components/ui/Card'
import { Section } from '../components/ui/Section'
import { buttonClasses } from '../components/ui/buttonStyles'
import { Link } from 'react-router-dom'

const categories: string[] = [
  'All',
  'AI',
  'Hardware',
  'IoT',
  'Software',
]

interface Comment {
  id: string
  projectId: string
  author: string
  text: string
  timestamp: number
}

type ReactionType = 'like' | 'love' | 'smile' | 'rocket' | 'zap' | 'star'

interface Reaction {
  projectId: string
  type: ReactionType
  count: number
}

// Reaction config with icons and labels
const reactionConfig: Record<ReactionType, { icon: any; label: string; color: string }> = {
  like: { icon: ThumbsUp, label: 'Like', color: 'text-blue-500' },
  love: { icon: Heart, label: 'Love', color: 'text-red-500' },
  smile: { icon: Smile, label: 'Awesome', color: 'text-yellow-500' },
  rocket: { icon: Rocket, label: 'Innovative', color: 'text-purple-500' },
  zap: { icon: Zap, label: 'Exciting', color: 'text-orange-500' },
  star: { icon: Star, label: 'Amazing', color: 'text-amber-500' },
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [comments, setComments] = useState<Comment[]>([])
  const [reactions, setReactions] = useState<Reaction[]>([])
  const [showComments, setShowComments] = useState<string | null>(null)
  const [showReactions, setShowReactions] = useState<string | null>(null)
  const [newComment, setNewComment] = useState({ author: '', text: '' })

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true)
        const data = await getProjects()
        setProjects(data)
      } catch (err) {
        console.error('Failed to fetch projects:', err)
        setError('Failed to load projects. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Load comments and reactions from persistent storage
  useEffect(() => {
    const savedComments = localStorage.getItem('projectComments')
    if (savedComments) {
      setComments(JSON.parse(savedComments))
    }

    const savedReactions = localStorage.getItem('projectReactions')
    if (savedReactions) {
      setReactions(JSON.parse(savedReactions))
    }
  }, [])

  const saveComments = (commentsToSave: Comment[]) => {
    localStorage.setItem('projectComments', JSON.stringify(commentsToSave))
  }

  const saveReactions = (reactionsToSave: Reaction[]) => {
    localStorage.setItem('projectReactions', JSON.stringify(reactionsToSave))
  }

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects
    return projects.filter((project) =>
      project.mainTag?.name?.toLowerCase() === activeCategory.toLowerCase()
    )
  }, [activeCategory, projects])

  const handleAddComment = (projectId: string) => {
    if (!newComment.author.trim() || !newComment.text.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      projectId,
      author: newComment.author.trim(),
      text: newComment.text.trim(),
      timestamp: Date.now(),
    }

    const updatedComments = [...comments, comment]
    setComments(updatedComments)
    saveComments(updatedComments)
    setNewComment({ author: '', text: '' })
  }

  const handleReaction = (projectId: string, type: ReactionType) => {
    const existingReactionIndex = reactions.findIndex(
      (r) => r.projectId === projectId && r.type === type
    )

    let updatedReactions: Reaction[]

    if (existingReactionIndex >= 0) {
      // Increment existing reaction
      updatedReactions = [...reactions]
      updatedReactions[existingReactionIndex] = {
        ...updatedReactions[existingReactionIndex],
        count: updatedReactions[existingReactionIndex].count + 1,
      }
    } else {
      // Add new reaction
      updatedReactions = [...reactions, { projectId, type, count: 1 }]
    }

    setReactions(updatedReactions)
    saveReactions(updatedReactions)
  }

  const getProjectComments = (projectId: string) => {
    return comments.filter((c) => c.projectId === projectId)
  }

  const getProjectReactions = (projectId: string) => {
    return reactions.filter((r) => r.projectId === projectId)
  }

  const getTotalReactions = (projectId: string) => {
    return getProjectReactions(projectId).reduce((sum, r) => sum + r.count, 0)
  }

  if (isLoading) {
    return (
      <Section title="Robotics Projects" eyebrow="Builds & research" description="Loading projects...">
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </Section>
    )
  }

  if (error) {
    return (
      <Section title="Robotics Projects" eyebrow="Builds & research" description="Something went wrong.">
        <div className="flex justify-center py-12 text-red-500">
          {error}
        </div>
      </Section>
    )
  }

  return (
    <>
      <Section
        title="Robotics Projects"
        eyebrow="Builds & research"
        description="Explore our ongoing builds across AI, hardware, IoT, and software. Each project is student-led with mentorship from alumni and faculty."
      >
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-text-primary">
            <Filter className="h-4 w-4" />
            Filter by category
          </span>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const isActive = activeCategory === category
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={buttonClasses({
                    variant: isActive ? 'primary' : 'ghost',
                  })}
                >
                  {category}
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => {
            const projectComments = getProjectComments(project._id)
            const projectReactions = getProjectReactions(project._id)
            const totalReactions = getTotalReactions(project._id)
            const isCommentsOpen = showComments === project._id
            const isReactionsOpen = showReactions === project._id

            return (
              <Card
                key={project._id}
                className="flex h-full flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-lg"
              >
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="h-36 w-full object-cover"
                  />
                ) : (
                  <div className="h-36 bg-gradient-to-br from-primary/10 via-accent/15 to-white" />
                )}

                <div className="flex flex-1 flex-col space-y-3 p-6">
                  <div className="inline-flex w-fit rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-primary">
                    {project.mainTag?.name}
                  </div>
                  <h3 className="text-xl font-bold text-text-primary">
                    {project.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed line-clamp-3">
                    {project.content}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag._id}
                        className="rounded-full bg-background px-3 py-1 text-xs font-semibold text-text-muted"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>

                  {/* Reactions Summary */}
                  {projectReactions.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {projectReactions.map((reaction) => {
                        const Icon = reactionConfig[reaction.type].icon
                        return (
                          <span
                            key={reaction.type}
                            className={`flex items-center gap-1 text-xs ${reactionConfig[reaction.type].color}`}
                          >
                            <Icon className="h-3 w-3" />
                            {reaction.count}
                          </span>
                        )
                      })}
                    </div>
                  )}

                  <div className="mt-4 flex items-center justify-between">
                    <Link to={`/projects/${project._id}`} className="text-sm text-blue-500">
                      Read more
                    </Link>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setShowReactions(isReactionsOpen ? null : project._id)}
                        className="flex items-center gap-1 text-sm text-text-muted hover:text-primary transition"
                      >
                        <Heart className="h-4 w-4" />
                        {totalReactions}
                      </button>
                      <button
                        onClick={() => setShowComments(isCommentsOpen ? null : project._id)}
                        className="flex items-center gap-1 text-sm text-text-muted hover:text-primary transition"
                      >
                        <MessageCircle className="h-4 w-4" />
                        {projectComments.length}
                      </button>
                    </div>
                  </div>

                  {/* Reactions Panel */}
                  {isReactionsOpen && (
                    <div className="mt-4 space-y-3 border-t pt-4">
                      <h4 className="font-semibold text-sm text-text-primary">React to this project</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {(Object.keys(reactionConfig) as ReactionType[]).map((type) => {
                          const { icon: Icon, label, color } = reactionConfig[type]
                          const reactionCount = projectReactions.find((r) => r.type === type)?.count || 0

                          return (
                            <button
                              key={type}
                              onClick={() => handleReaction(project._id, type)}
                              className="flex flex-col items-center gap-1 rounded-lg border border-gray-200 p-3 hover:bg-gray-50 hover:border-primary transition"
                            >
                              <Icon className={`h-5 w-5 ${color}`} />
                              <span className="text-xs font-medium text-text-primary">{label}</span>
                              {reactionCount > 0 && (
                                <span className="text-xs text-text-muted">{reactionCount}</span>
                              )}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Comments Section */}
                  {isCommentsOpen && (
                    <div className="mt-4 space-y-3 border-t pt-4">
                      <h4 className="font-semibold text-sm text-text-primary">Comments</h4>

                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {projectComments.length === 0 ? (
                          <p className="text-xs text-text-muted">No comments yet. Be the first!</p>
                        ) : (
                          projectComments.map((comment) => (
                            <div key={comment.id} className="bg-background p-3 rounded text-xs">
                              <p className="font-semibold text-text-primary">{comment.author}</p>
                              <p className="text-text-muted mt-1">{comment.text}</p>
                              <p className="text-text-muted/70 text-xs mt-1">
                                {new Date(comment.timestamp).toLocaleDateString()}
                              </p>
                            </div>
                          ))
                        )}
                      </div>

                      <div className="space-y-2">
                        <input
                          type="text"
                          placeholder="Your name"
                          value={newComment.author}
                          onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
                          className="w-full rounded border border-gray-300 px-3 py-2 text-xs focus:border-primary focus:outline-none"
                        />
                        <textarea
                          placeholder="Add a comment..."
                          value={newComment.text}
                          onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
                          className="w-full rounded border border-gray-300 px-3 py-2 text-xs focus:border-primary focus:outline-none"
                          rows={3}
                        />
                        <button
                          onClick={() => handleAddComment(project._id)}
                          className={buttonClasses({ variant: 'primary' }) + ' w-full text-xs'}
                        >
                          Post Comment
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            )
          })}
        </div>
      </Section>
    </>
  )
}