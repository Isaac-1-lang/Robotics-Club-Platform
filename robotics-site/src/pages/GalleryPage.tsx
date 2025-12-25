import { useEffect, useState } from 'react'
import { Image } from 'lucide-react'
import { sanityClient, urlFor } from '../lib/sanity'
import { Card } from '../components/ui/Card'
import { Section } from '../components/ui/Section'

interface SanityGalleryItem {
  _id: string
  title: string
  description: string
  image: any
}

export default function GalleryPage() {
  const [gallery, setGallery] = useState<SanityGalleryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const query = `*[_type == "gallery"]{
                  _id,
                  title,
                  description,
                  image
              }`
        const result = await sanityClient.fetch(query)
        setGallery(result)
      } catch (error) {
        console.error('Error fetching gallery:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchGallery()
  }, [])

  if (loading) {
    return (
      <Section title="Gallery" eyebrow="Loading...">
        <p className="text-text-muted">Loading gallery...</p>
      </Section>
    )
  }

  return (
    <Section
      title="Gallery"
      eyebrow="Build moments"
      description="Snapshots from lab sessions, demos, and competitions. Each frame captures the energy of building together."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {gallery.map((item, idx) => (
          <Card
            key={item._id}
            className="group relative overflow-hidden p-0 transition hover:-translate-y-1 hover:shadow-lg"
          >
            {item.image ? (
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={urlFor(item.image).width(600).height(450).url()}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div
                className="aspect-[4/3] bg-gradient-to-br from-primary/10 via-accent/15 to-white"
                aria-hidden
              />
            )}

            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-slate-900/70 via-slate-900/30 to-transparent p-4 text-white opacity-0 transition group-hover:opacity-100">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                Capture {idx + 1}
              </p>
              <p className="text-lg font-bold">{item.title}</p>
              <p className="text-sm text-slate-200">{item.description}</p>
            </div>

            {/* Placeholder icon indicator */}
            <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary shadow-soft opacity-0 group-hover:opacity-100 transition">
              <Image className="h-4 w-4" />
              View
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}

