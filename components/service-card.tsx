import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"

interface ServiceCardProps {
  title: string
  description: string
  imageUrl: string
  features: Array<{
    icon: LucideIcon
    label: string
  }>
}

export function ServiceCard({ title, description, imageUrl, features }: ServiceCardProps) {
  return (
    <div className="group relative h-[28rem] overflow-hidden rounded-3xl bg-black shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_60px_-15px_rgba(191,255,0,0.3)]">
      {/* Circular Hover Effect Overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute left-1/2 top-1/2 h-0 w-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 transition-all duration-700 group-hover:h-[200%] group-hover:w-[200%]" />
      </div>

      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-20% via-black/60 via-70% to-black" />

        {/* Feature Badges Overlay */}
        <div className="absolute inset-0 flex flex-wrap items-start gap-2 p-4">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 backdrop-blur-md transition-all duration-300 hover:bg-black/80"
              >
                <Icon className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-medium text-white">{feature.label}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="relative z-10 flex h-[calc(100%-12rem)] flex-col justify-between bg-black p-6">
        <div>
          <h3 className="mb-2 font-sans text-xl font-bold tracking-tight text-white">{title}</h3>
          <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-white/70">{description}</p>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-2">
          <Button
            size="sm"
            className="flex-1 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-black transition-all hover:bg-primary/90"
          >
            Get Started
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1 rounded-full border border-white/20 bg-transparent px-4 py-2 text-sm font-medium text-white transition-all hover:border-primary/40 hover:bg-primary/5"
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  )
}
