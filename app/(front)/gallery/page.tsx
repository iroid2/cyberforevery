import { TopNavBar } from "@/components/top-nav-bar";
import { MainFooter } from "@/components/main-footer";
import { GalleryBrowser } from "@/components/gallery-browser";

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNavBar />

      <main className="relative overflow-hidden px-6 pb-24 pt-32 md:pt-40">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,rgba(191,255,0,0.12),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,rgba(191,255,0,0.14),transparent_60%)]" />
        <div className="pointer-events-none absolute left-1/2 top-40 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <header className="mx-auto mb-14 max-w-4xl text-center">
            <span className="mb-4 block font-headline text-[10px] font-bold uppercase tracking-[0.35em] text-primary">
              // VISUAL_ARCHIVE
            </span>
            <h1 className="text-4xl font-black uppercase tracking-tighter text-foreground md:text-7xl">
              Explore The
              <span className="ml-3 italic text-primary">Gallery</span>
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-muted md:text-base">
              Browse scenes from bootcamp sessions, community learning, classroom moments,
              and creative visuals that support the cyber4every1 story.
            </p>
          </header>

          <GalleryBrowser />
        </div>
      </main>

      <MainFooter />
    </div>
  );
}
