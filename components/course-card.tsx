import React from "react";
import Link from "next/link";

interface CourseCardProps {
  id: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Expert";
  instructor: {
    name: string;
    image: string;
  };
  rating: number;
  reviews: string;
  price: string;
  image: string;
}

export function CourseCard({ id, title, level, instructor, rating, reviews, price, image }: CourseCardProps) {
  return (
    <div className="group bg-surface rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:translate-y-[-8px] border border-border">
      <div className="relative h-48 w-full bg-surface-variant overflow-hidden">
        <img 
          className="w-full h-full object-cover mix-blend-luminosity group-hover:mix-blend-normal group-hover:scale-105 transition-all duration-500" 
          src={image} 
          alt={title}
        />
        <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
          {level}
        </div>
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <span className="text-[10px] text-muted font-mono mb-2">// COURSE_ID: {id}</span>
        <h3 className="text-2xl font-headline font-bold text-foreground mb-4 group-hover:text-primary transition-colors leading-tight">
          {title}
        </h3>
        <div className="mt-auto">
          <div className="flex items-center gap-2 mb-4">
            <img 
              className="w-6 h-6 rounded-full grayscale group-hover:grayscale-0 transition-all" 
              src={instructor.image} 
              alt={instructor.name}
            />
            <span className="text-sm text-muted tracking-tight">
              Instructor: <span className="text-foreground font-medium">{instructor.name}</span>
            </span>
          </div>
          <div className="flex justify-between items-center pt-6 border-t border-border">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-primary text-sm material-fill">star</span>
              <span className="text-foreground font-bold text-sm">{rating}</span>
              <span className="text-muted text-xs">({reviews})</span>
            </div>
            <div className="text-xl font-headline font-bold text-primary">{price}</div>
          </div>
          <Link 
            href={`/course/${id}`}
            className="mt-6 block w-full py-3 bg-foreground/5 text-foreground/70 hover:bg-primary hover:text-primary-foreground text-center rounded-lg text-xs font-bold uppercase tracking-widest transition-all"
          >
            Tactical Enrollment
          </Link>
        </div>
      </div>
    </div>
  );
}
