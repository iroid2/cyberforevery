"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { galleryCategories, galleryItems, type GalleryCategory } from "@/lib/gallery-data";
import { motion, AnimatePresence } from "framer-motion";

const BATCH_SIZE = 9;

export function GalleryBrowser() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState<number>(BATCH_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  // Filter items based on active category tab
  const getFilteredItems = (category: string) => {
    if (category === "all") {
      return galleryItems;
    }
    return galleryItems.filter((item) => item.category === category);
  };

  const filteredItems = getFilteredItems(activeTab);
  const displayedItems = filteredItems.slice(0, visibleCount);
  const hasMore = filteredItems.length > visibleCount;

  // Reset page limit when user changes tabs
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setVisibleCount(BATCH_SIZE);
  };

  // Infinite Scroll Trigger logic: Checks if user scrolls near or reaches the 100vh (window.innerHeight) threshold from bottom
  useEffect(() => {
    const handleScroll = () => {
      if (isLoadingMore || !hasMore) return;

      const threshold = window.innerHeight; // 100vh threshold
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const scrollTop = window.scrollY;

      const bottomOffset = scrollHeight - (scrollTop + clientHeight);

      if (bottomOffset <= threshold) {
        setIsLoadingMore(true);

        // Simulate a slight futuristic network delay of 600ms for premium UX loading state
        setTimeout(() => {
          setVisibleCount((prev) => prev + BATCH_SIZE);
          setIsLoadingMore(false);
        }, 60000 / 100); // 600ms
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoadingMore, hasMore]);

  return (
    <Tabs defaultValue="all" onValueChange={handleTabChange} className="space-y-12">
      
      {/* Category Selection Tabs Bar */}
      <div className="flex justify-center">
        <TabsList className="h-auto w-full max-w-4xl flex-wrap justify-center gap-2 rounded-[1.5rem] border border-border bg-surface/70 p-2 dark:bg-[#121212]/40 backdrop-blur-xl">
          {galleryCategories.map((category) => (
            <TabsTrigger
              key={category.value}
              value={category.value}
              className="min-w-[96px] rounded-full px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 data-[state=active]:bg-[#7FFF00]/10 data-[state=active]:border-[#7FFF00]/30 data-[state=active]:text-[#7FFF00]"
            >
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {/* Primary Gallery Canvas */}
      <div className="relative min-h-[50vh]">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {displayedItems.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.98 }}
                transition={{ 
                  duration: 0.5, 
                  ease: [0.16, 1, 0.3, 1], // Custom sleek cubic bezier easeOut
                  delay: (index % BATCH_SIZE) * 0.05 // Staggered entrance for loaded batch
                }}
                className="group flex flex-col justify-between overflow-hidden rounded-[1.75rem] border border-border bg-surface/70 shadow-[0_16px_50px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#7FFF00]/40 hover:shadow-[0_22px_60px_rgba(127,255,0,0.06)] dark:bg-[#121212]/30 backdrop-blur-md"
              >
                {/* Visual Image container with overlay elements */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105 group-hover:opacity-95"
                    priority={index < 6}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  
                  {/* Category Pill Badge */}
                  <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/45 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white/80 backdrop-blur-md">
                    {item.category}
                  </span>
                  
                  {/* Floating Tech ID Overlay */}
                  <span className="absolute right-4 bottom-4 font-mono text-[9px] text-[#7FFF00] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    // NODE_VAL: 0x{index.toString(16).toUpperCase()}
                  </span>
                </div>

                {/* Text Metadata Panel */}
                <div className="flex-1 space-y-2 p-5 bg-gradient-to-b from-transparent to-[#101010]/20">
                  <h3 className="text-xl font-bold uppercase tracking-tight text-foreground group-hover:text-[#7FFF00] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground/80">
                    {item.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More/Infinite Loading Indicator (Well-Animated) */}
        <div className="mt-16 flex flex-col items-center justify-center min-h-[80px]">
          {isLoadingMore ? (
            <div className="flex flex-col items-center gap-3">
              <span className="relative flex h-5 w-5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7FFF00] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-5 w-5 bg-[#7FFF00]"></span>
              </span>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#7FFF00] animate-pulse">
                fetching_next_visual_batch...
              </p>
            </div>
          ) : !hasMore ? (
            <div className="flex flex-col items-center gap-2">
              <div className="h-[1px] w-24 bg-white/10" />
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
                // END_OF_VISUAL_ARCHIVE //
              </p>
            </div>
          ) : (
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">
              scroll_down_to_explore_more
            </p>
          )}
        </div>
      </div>

    </Tabs>
  );
}
