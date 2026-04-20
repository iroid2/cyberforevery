import Link from "next/link";
import React from "react";

export default function NewNavbar() {
  return (
    <div className="flex items-center justify-between bg-[#131313] px-6 py-4 text-white">
      <div className="logo">
        <h1>hello</h1>
      </div>
      <div className="links  ">
        <Link href="/about">About</Link>
      </div>
      <div className="logo">
        <Link href="/contact">Contact</Link>
      </div>
      <div className="logo"></div>
    </div>
  );
}
