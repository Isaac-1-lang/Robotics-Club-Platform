import { useEffect, useState } from 'react'
import { Image } from 'lucide-react'
import { getGallery, type GalleryItem } from '../apis/galleryApi'
import { Card } from '../components/ui/Card'
import { Section } from '../components/ui/Section'
import { ImageSlider } from '../components/ImageSlider'

// Import local assets for the slider
import img68 from '../assets/IMG_0068.JPG'
import img69 from '../assets/IMG_0069.JPG'
import img70 from '../assets/IMG_0070.JPG'
import img72 from '../assets/IMG_0072.JPG'
import img73 from '../assets/IMG_0073.JPG'
import img74 from '../assets/IMG_0074.JPG'
import img75 from '../assets/IMG_0075.JPG'
import img76 from '../assets/IMG_0076.JPG'
import img82 from '../assets/IMG_0082.JPG'
import img83 from '../assets/IMG_0083.JPG'
import img84 from '../assets/IMG_0084.JPG'
import img85 from '../assets/IMG_0085.JPG'
import img86 from '../assets/IMG_0086.JPG'

const sliderImages = [
  img68, img69, img70, img72, img73, img74, img75,
  img76, img82, img83, img84, img85, img86
]

export default function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const result = await getGallery()
        setGallery(result)
      } catch (error) {
        console.error("Failed to fetch gallery:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchGallery()
  }, [])

  return (
    <>
      <Section title="Gallery Spotlight" eyebrow="Featured Moments">
        <ImageSlider images={sliderImages} autoPlay={true} interval={4000} />
      </Section>

      <Section
        title="All Captures"
        eyebrow="Build moments"
        description="Snapshots from lab sessions, demos, and competitions. Each frame captures the energy of building together."
      >
        {loading ? (
          <div className="py-12 text-center text-text-muted">Loading gallery...</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((item, idx) => (
              <Card
                key={item._id}
                className="group relative overflow-hidden p-0 transition hover:-translate-y-1 hover:shadow-lg"
              >
                {item.image ? (
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={item.image}
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
        )}
      </Section>
    </>
  )
}

