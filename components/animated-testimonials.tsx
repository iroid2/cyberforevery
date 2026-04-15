"use client";
import { Button } from "@/components/ui/button";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

const rotationOffsets = [-6, 3, 8, -4];

const AnimatedTestimonialsDemo = () => {
  const [active, setActive] = useState(testimonials[0]);
  const handleprev = () => {
    const currentIndex = testimonials.indexOf(active);
    const length = testimonials.length;
    const prevIndex = (currentIndex - 1 + length) % length;
    setActive(testimonials[prevIndex]);
  };
  const handlenext = () => {
    const currentIndex = testimonials.indexOf(active);
    const length = testimonials.length;
    const nextIndex = (currentIndex + 1) % length;
    setActive(testimonials[nextIndex]);
  };
  const isActive = (index: number) => {
    return testimonials[index] === active;
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto py-24 px-6 relative z-10">
        <div className="relative h-80 w-full">
          <AnimatePresence>
            {testimonials.map((testimonial, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  z: -100,
                  rotateY: rotationOffsets[index % rotationOffsets.length],
                }}
                animate={{
                  opacity: isActive(index) ? 1 : 0.7,
                  scale: isActive(index) ? 1 : 0.95,
                  z: isActive(index) ? 0 : -100,
                  rotate: isActive(index) ? 0 : rotationOffsets[index % rotationOffsets.length],
                  zIndex: isActive(index)
                    ? 999
                    : testimonials.length + 2 - index,
                  y: isActive(index) ? [0, -80, 0] : 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  z: 100,
                  rotate: rotationOffsets[index % rotationOffsets.length],
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 origin-bottom"
                key={testimonial.name}
              >
                <img
                  src={testimonial.src}
                  alt={testimonial.name}
                  draggable={false}
                  className="rounded-3xl h-full w-full object-cover object-center border border-border"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div>
          <div className="flex justify-between flex-col py-4">
            <motion.div
              key={active.name}
              initial={{
                y: 20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -20,
                opacity: 0,
              }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
            >
              <h3 className="text-2xl font-bold font-headline uppercase dark:text-white text-black">
                {active.name}
              </h3>
              <p className="text-sm text-primary tracking-widest uppercase font-bold mt-1">
                {active.designation}
              </p>
              <motion.p className="text-lg text-muted mt-8">
                {active.quote.split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{
                      filter: "blur(10px)",
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      filter: "blur(0px)",
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                      delay: 0.02 * index,
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          </div>
          <div className="flex gap-6 pt-5">
            <Button className="h-10 w-10 rounded-full bg-surface text-foreground hover:bg-primary hover:text-primary-foreground border border-border transition-colors" onClick={handleprev}>
              <ArrowLeft size={18} />
            </Button>
            <Button className="h-10 w-10 rounded-full bg-surface text-foreground hover:bg-primary hover:text-primary-foreground border border-border transition-colors" onClick={handlenext}>
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimatedTestimonialsDemo;

const testimonials = [
  {
    quote:
      "My child went from playing games to actually building them! The instructors are amazing, and the way they teach coding is so much fun and engaging. It's the highlight of his week.",
    name: "Oliver Smith",
    designation: "Parent of a Code Ninja",
    src: "https://images.unsplash.com/photo-1544717301-98cb5adab9a9?auto=format&fit=crop&q=80&w=400&h=400",
  },
  {
    quote:
      "Before this camp, I didn't know anything about how computers really work. Now I can build my own virtual worlds and keep my accounts fully secure with two-factor authentication!",
    name: "Mia Johnson",
    designation: "Tech Detective Graduate",
    src: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=400&h=400",
  },
  {
    quote:
      "The curriculum perfectly balances game creation with crucial online safety skills. I feel much more confident knowing my kids understand the digital footprint they are leaving behind.",
    name: "David Lee",
    designation: "Parent & Teacher",
    src: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=400&h=400",
  },
  {
    quote:
      "I made a game where a neon cat blasts laser beams at bad passwords. Best camp ever! I want to come back next year.",
    name: "Sammy K.",
    designation: "Game Builder",
    src: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=400&h=400",
  },
];
