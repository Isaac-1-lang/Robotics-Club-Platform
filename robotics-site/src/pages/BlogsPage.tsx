import { useEffect, useState, useMemo } from 'react'
import { Filter } from 'lucide-react'
import { sanityClient, urlFor } from '../lib/sanity'
import { Card } from '../components/ui/Card'
import { Section } from '../components/ui/Section'
import { buttonClasses } from '../components/ui/buttonStyles'

// Define shape for Sanity Post
interface SanityPost {
  _id: string
  title: string
  slug: { current: string }
  mainImage: any
  categories: { title: string }[]
  publishedAt: string
  body: any // Using specific block content type is better but for now any
  // We'll calculate a description/excerpt from body or add one later
}

export default function BlogsPage() {
  const [posts, setPosts] = useState<SanityPost[]>([])
  const [categories, setCategories] = useState<string[]>(['All'])
  const [activeCategory, setActiveCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch posts with expanded categories
        const query = `*[_type == "post"]{
                  _id,
                  title,
                  slug,
                  mainImage,
                  categories[]->{title},
                  publishedAt,
                  body
              }`
        const result = await sanityClient.fetch(query)
        setPosts(result)

        // Extract unique categories
        const allCats = new Set<string>()
        result.forEach((p: any) => {
          p.categories?.forEach((c: any) => allCats.add(c.title))
        })
        setCategories(['All', ...Array.from(allCats)])
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') return posts
    return posts.filter((post) =>
      post.categories?.some(c => c.title === activeCategory)
    )
  }, [activeCategory, posts])

  if (loading) {
    return (
      <Section title="Robotics Monthly Blogs" eyebrow="Loading...">
        <p className="text-text-muted">Loading blogs...</p>
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
              {post.mainImage ? (
                <div className="h-36 overflow-hidden">
                  <img
                    src={urlFor(post.mainImage).width(400).height(300).url()}
                    alt={post.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-36 bg-gradient-to-br from-primary/10 via-accent/15 to-white" />
              )}

              <div className="flex flex-1 flex-col space-y-3 p-6">
                <div className="flex flex-wrap gap-2">
                  {post.categories && post.categories.map((cat, idx) => (
                    <div key={idx} className="inline-flex w-fit rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-primary">
                      {cat.title}
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-bold text-text-primary">
                  {post.title}
                </h3>
                {/*  Ideally we should have an excerpt field, but for now omitting description or could use date */}
                <p className="text-sm text-text-muted leading-relaxed">
                  Published on: {new Date(post.publishedAt).toLocaleDateString()}
                </p>

              </div>
            </Card>
          ))}
        </div>
      </Section>
    </>
  )
}

