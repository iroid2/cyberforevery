import React from "react";

export function MainFooter() {
  return (
    <footer className="w-full px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8 bg-background py-12 border-t border-border">
      <div className="flex flex-col items-center md:items-start gap-3">
        <div className="text-primary font-bold font-headline tracking-tighter text-xl uppercase">cyber4every1</div>
        <p className="text-muted font-body text-[10px] tracking-widest uppercase opacity-60">©2026cyber4every1</p>
      </div>
      <div className="flex flex-wrap justify-center gap-6 md:gap-8">
        <a className="text-muted font-body text-[10px] tracking-widest uppercase hover:text-primary transition-colors opacity-80 hover:opacity-100" href="#">Manifesto</a>
        <a className="text-muted font-body text-[10px] tracking-widest uppercase hover:text-primary transition-colors opacity-80 hover:opacity-100" href="#">Protocol</a>
        <a className="text-muted font-body text-[10px] tracking-widest uppercase hover:text-primary transition-colors opacity-80 hover:opacity-100" href="#">Node_Status</a>
        <a className="text-muted font-body text-[10px] tracking-widest uppercase hover:text-primary transition-colors opacity-80 hover:opacity-100" href="#">Privacy_Override</a>
      </div>
      <div className="flex gap-4">
        <button className="material-symbols-outlined text-primary hover:scale-110 transition-transform">terminal</button>
        <button className="material-symbols-outlined text-primary hover:scale-110 transition-transform">share</button>
        <button className="material-symbols-outlined text-primary hover:scale-110 transition-transform">code</button>
      </div>
    </footer>
  );
}
