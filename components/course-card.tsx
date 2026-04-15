import React from "react";
import Link from "next/link";

interface CourseCardProps {
  id: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Expert";
  format: string;
  instructor: {
    name: string;
    image: string;
  };
  rating: number;
  reviews: string;
  price: string;
  image: string;
  description: string;
}

export function CourseCard({ id, title, level, format, instructor, rating, reviews, price, image, description }: CourseCardProps) {
  const isOnlineOnly = format.toLowerCase().includes("online only");

  return (
    <div className="group bg-surface/40 backdrop-blur-md rounded-2xl overflow-hidden flex flex-col transition-all duration-500 hover:translate-y-[-10px] border border-border/50 hover:border-primary/50 hover:shadow-[0_20px_40px_-15px_rgba(191,255,0,0.15)] interactive-card">
      <div className="relative h-64 w-full bg-surface-variant overflow-hidden">
        <img 
          className="w-full h-full object-cover mix-blend-luminosity group-hover:mix-blend-normal group-hover:scale-110 transition-all duration-700 ease-out" 
          src={image} 
          alt={title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <div className="bg-primary/90 text-primary-foreground px-3 py-1 rounded-md text-[9px] font-black tracking-[0.2em] uppercase backdrop-blur-sm">
            {level}
          </div>
          <div className={`${isOnlineOnly ? "bg-blue-500/80" : "bg-emerald-500/80"} text-white px-3 py-1 rounded-md text-[9px] font-black tracking-[0.2em] uppercase backdrop-blur-sm`}>
            {format}
          </div>
        </div>
      </div>

      <div className="p-8 flex flex-col flex-grow relative">
        <div className="mb-4 flex justify-between items-start">
          <span className="text-[10px] text-muted font-mono tracking-widest uppercase opacity-50"># MISSION_LOG: {id}</span>
        </div>
        
        <h3 className="text-2xl font-headline font-black text-foreground mb-3 group-hover:text-primary transition-colors leading-tight uppercase tracking-tighter">
          {title}
        </h3>
        
        <p className="text-muted text-xs line-clamp-2 mb-6 font-medium leading-relaxed">
          {description}
        </p>

        <div className="mt-auto space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img 
                  className="w-8 h-8 rounded-full border border-border/50" 
                  src={instructor.image} 
                  alt={instructor.name}
                />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-surface flex items-center justify-center">
                  <span className="material-symbols-outlined text-[6px] text-primary-foreground">check</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-muted uppercase tracking-wider font-bold">Instructor</span>
                <span className="text-xs font-bold text-foreground">{instructor.name}</span>
              </div>
            </div>
            
            <div className="flex flex-col items-end">
               <div className="flex items-center gap-1 mb-1">
                 <span className="material-symbols-outlined text-primary text-xs material-fill">star</span>
                 <span className="text-foreground font-black text-xs">{rating}</span>
               </div>
               <span className="text-[9px] text-muted uppercase tracking-tighter">{reviews} Reviews</span>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Link 
              href={`/course/${id}`}
              className="flex-1 py-4 bg-primary text-primary-foreground text-center rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:shadow-[0_0_20px_rgba(191,255,0,0.3)] hover:scale-[1.02] active:scale-[0.98]"
            >
              Start Mission
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
