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
        setPosts(data.posts)
      } catch (err: any) {
        let errorMessage = 'Failed to load posts.'

        if (err.message && err.message.includes('Network Error')) {
          errorMessage = 'Network Error: Only localhost is allowed? Check Sanity CORS settings.'
        } else if (err.statusCode === 401 || err.statusCode === 403) {
          errorMessage = 'Access Denied: Check your API Token or Dataset privacy.'
        }

        setError(errorMessage)
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
        <div className="rounded-lg bg-black border border-black p-6 text-center">
          <p className="text-text-primary mb-2 font-semibold">Unable to load blogs</p>
          <p className="text-sm text-text-primary">{error}</p>
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
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <Card
                key={post._id}
                className="group flex h-full flex-col overflow-hidden"
                hover
              >
                <div className="relative h-48 overflow-hidden">
                  {post.imageUrl ? (
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-primary/10 via-accent/15 to-white" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold text-primary shadow-sm">
                      {post.mainTag?.name}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col space-y-4 p-6">
                  <h3 className="text-xl font-bold text-text-primary line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed line-clamp-3">
                    {post.content}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag._id}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-text-muted transition-colors group-hover:bg-accent/10 group-hover:text-primary"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-text-muted">
                    <span className="font-medium">By {post.author.username}</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-full rounded-2xl border-2 border-dashed border-slate-200 py-16 text-center">
              <p className="font-semibold text-lg text-text-primary">No blogs found</p>
              <p className="mt-2 text-sm text-text-muted">Check back later or try clearing filters.</p>
            </div>
          )}
        </div>
      </Section>
    </>
  )
}
