import Image from "next/image";
import Link from "next/link";
import { featuredGalleryItems } from "@/lib/gallery-data";

export function GalleryPreview() {
  return (
    <section className="relative overflow-hidden bg-background px-6 py-24">
      <div className="pointer-events-none absolute inset-x-0 top-12 h-64 bg-[radial-gradient(circle_at_top,rgba(191,255,0,0.10),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,rgba(191,255,0,0.12),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-14 max-w-3xl">
          <span className="mb-4 block font-headline text-[10px] font-bold uppercase tracking-[0.35em] text-primary">
            // FIELD_GALLERY
          </span>
          <h2 className="text-4xl font-black uppercase tracking-tighter text-foreground md:text-6xl">
            Moments From The
            <span className="ml-3 italic text-primary">Mission</span>
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
            A quick look at the classrooms, community sessions, and visual learning moments
            shaping the cyber4every1 experience.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {featuredGalleryItems.map((item, index) => (
            <article
              key={item.id}
              className="group overflow-hidden rounded-[1.75rem] border border-border bg-surface/70 shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_70px_rgba(0,0,0,0.14)] dark:bg-surface/40"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                  priority={index < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
                  <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1 font-headline text-[10px] font-bold uppercase tracking-[0.24em] text-white/85 backdrop-blur-md">
                    {item.category}
                  </span>
                  <span className="rounded-full border border-primary/30 bg-primary/15 px-3 py-1 font-headline text-[10px] font-bold uppercase tracking-[0.24em] text-primary backdrop-blur-md">
                    0{index + 1}
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-xl font-black uppercase tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">
                    {item.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-3 rounded-full border border-border bg-surface/70 px-6 py-3 font-headline text-xs font-black uppercase tracking-[0.24em] text-foreground transition hover:border-primary hover:text-primary dark:bg-surface/40"
          >
            View More
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
