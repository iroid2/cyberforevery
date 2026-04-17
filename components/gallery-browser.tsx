"use client";

import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { galleryCategories, galleryItems, type GalleryCategory } from "@/lib/gallery-data";

function getItemsByCategory(category: "all" | GalleryCategory) {
  if (category === "all") {
    return galleryItems;
  }

  return galleryItems.filter((item) => item.category === category);
}

export function GalleryBrowser() {
  return (
    <Tabs defaultValue="all" className="gap-8">
      <div className="flex justify-center">
        <TabsList className="h-auto w-full max-w-4xl flex-wrap justify-center gap-2 rounded-[1.5rem] border border-border bg-surface/70 p-2 dark:bg-surface/40">
          {galleryCategories.map((category) => (
            <TabsTrigger
              key={category.value}
              value={category.value}
              className="min-w-[96px] rounded-full px-4 py-2 font-headline text-xs font-black uppercase tracking-[0.18em] data-[state=active]:border-primary/30 data-[state=active]:text-primary"
            >
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {galleryCategories.map((category) => {
        const items = getItemsByCategory(category.value);

        return (
          <TabsContent key={category.value} value={category.value}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="group overflow-hidden rounded-[1.75rem] border border-border bg-surface/70 shadow-[0_16px_50px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_22px_60px_rgba(0,0,0,0.14)] dark:bg-surface/40"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/45 px-3 py-1 font-headline text-[10px] font-bold uppercase tracking-[0.22em] text-white/80 backdrop-blur-md">
                      {item.category}
                    </span>
                  </div>

                  <div className="space-y-3 p-5">
                    <h3 className="text-xl font-black uppercase tracking-tight text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
