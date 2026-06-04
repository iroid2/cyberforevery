import Image from "next/image";
import Link from "next/link";

import { featuredGalleryItems } from "@/lib/gallery-data";

const missionPoints = [
  {
    title: "Accessibility",
    description: "No prior experience required. We keep the learning path clear and approachable.",
  },
  {
    title: "Practicality",
    description: "Hands-on labs and real scenarios help learners build confidence fast.",
  },
  {
    title: "Community",
    description: "We support students, parents, and schools with a shared digital safety mission.",
  },
];

export function BrandStorySection() {
  const galleryHighlights = featuredGalleryItems.slice(0, 3);

  return (
    <section
      id="mission"
      className="relative overflow-hidden bg-[#0a0a0a] px-6 py-24 text-white md:px-8 lg:px-20"
    >
      <div className="pointer-events-none absolute left-[-8rem] top-[-6rem] h-72 w-72 rounded-full bg-[#7FFF00]/8 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-[-8rem] right-[-6rem] h-80 w-80 rounded-full bg-white/[0.03] blur-[140px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(127,255,0,0.08),transparent_42%)]" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="max-w-2xl">
          <span className="mb-4 block font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-[#7FFF00]">
            // WHY_CYBER4EVERY1
          </span>
          <h2 className="font-headline text-4xl font-black tracking-tight text-white md:text-6xl">
            Cybersecurity education that feels practical from day one.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-white/70 md:text-lg">
            CyberSecurity for Everyone LLC is built around one simple idea:
            make cybersecurity simple, useful, and welcoming for every learner
            and family we serve.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {missionPoints.map((point) => (
              <article
                key={point.title}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_12px_40px_rgba(0,0,0,0.18)]"
              >
                <h3 className="font-headline text-sm font-bold uppercase tracking-[0.2em] text-[#7FFF00]">
                  {point.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  {point.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/bootcamp"
              className="inline-flex items-center justify-center rounded-full bg-[#7FFF00] px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest text-black transition hover:scale-[1.02]"
            >
              Explore Bootcamp
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest text-white transition hover:bg-white/[0.08]"
            >
              Meet The Founder
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {galleryHighlights.map((item, index) => (
            <article
              key={item.id}
              className="group relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.04] shadow-[0_20px_50px_rgba(0,0,0,0.32)]"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 45vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-white/75 backdrop-blur-md">
                    {item.category}
                  </span>
                  <h3 className="mt-3 text-xl font-black uppercase tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-white/75">
                    {item.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
