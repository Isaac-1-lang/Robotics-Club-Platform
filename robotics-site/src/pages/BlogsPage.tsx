import { useMemo, useState, useEffect } from 'react'
import { Filter } from 'lucide-react'
import { getPosts, type PostData } from '../apis/postsApi'
import { Card } from '../components/ui/Card'
import { Section } from '../components/ui/Section'
import { buttonClasses } from '../components/ui/buttonStyles'

const categories: string[] = [
  'All',
  'AI',
  'Hardware',
  'IoT',
  'Software',
]

export default function BlogsPage() {
  const [posts, setPosts] = useState<PostData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('All')

  // Fetch posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true)
        const data = await getPosts()
        setPosts(data)
      } catch (err) {
        console.error('Failed to fetch posts:', err)
        setError('Failed to load posts. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') return posts
    return posts.filter((post) =>
      post.mainTag?.name?.toLowerCase() === activeCategory.toLowerCase()
    )
  }, [activeCategory, posts])

  if (isLoading) {
    return (
      <Section title="Robotics Monthly Blogs" eyebrow="Builds & research" description="Loading blogs...">
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </Section>
    )
  }

  if (error) {
    return (
      <Section title="Robotics Monthly Blogs" eyebrow="Builds & research" description="Something went wrong.">
        <div className="flex justify-center py-12 text-red-500">
          {error}
        </div>
      </Section>
    )
  }

  return (
    <>
      <Section
        title="Robotics Monthly Blogs"
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
          {filteredPosts.map((post) => (
            <Card
              key={post._id}
              className="flex h-full flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-lg"
            >
              {post.imageUrl ? (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="h-36 w-full object-cover"
                />
              ) : (
                <div className="h-36 bg-gradient-to-br from-primary/10 via-accent/15 to-white" />
              )}

              <div className="flex flex-1 flex-col space-y-3 p-6">
                <div className="inline-flex w-fit rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-primary">
                  {post.mainTag?.name}
                </div>
                <h3 className="text-xl font-bold text-text-primary">
                  {post.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed line-clamp-3">
                  {post.content}
                </p>
                <div className="mt-auto flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag._id}
                      className="rounded-full bg-background px-3 py-1 text-xs font-semibold text-text-muted"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-text-muted">
                  <span>By {post.author.username}</span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </>
  )
}
