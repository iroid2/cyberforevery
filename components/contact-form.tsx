"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail, Phone, ArrowRight } from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Form submitted:", formData)
  }

  return (
    <section className="relative z-10 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-muted/20 to-muted/5 p-1">
          <div className="rounded-[2.4rem] bg-background p-8 md:p-12 lg:p-16">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Left Side - Heading and Contact Info */}
              <div className="flex flex-col justify-center">
                <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
                  WE'RE HERE TO HELP YOU
                </p>
                <h2 className="mb-6 font-sans text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
                  Discuss Your
                  <br />
                  <span className="text-foreground">Cybersecurity</span>
                  <br />
                  <span className="text-foreground">Education Needs</span>
                </h2>
                <p className="mb-10 text-lg leading-relaxed text-muted-foreground">
                  Are you looking for accessible cybersecurity training tailored to your community? Reach out to us.
                </p>

                {/* Contact Information */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">E-mail</p>
                      <p className="text-lg font-semibold text-foreground">info@cyber4every1.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Phone number</p>
                      <p className="text-lg font-semibold text-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="rounded-[2rem] bg-card/5 p-8 backdrop-blur-sm md:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Jane Smith"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border-0 bg-muted/30 px-4 py-3.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="jane@framer.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border-0 bg-muted/30 px-4 py-3.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="organization" className="mb-2 block text-sm font-medium text-foreground">
                      Organization Type
                    </label>
                    <select
                      id="organization"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full rounded-xl border-0 bg-muted/30 px-4 py-3.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    >
                      <option value="">Select...</option>
                      <option value="individual">Individual/Family</option>
                      <option value="school">School/Education</option>
                      <option value="church">Church/Community</option>
                      <option value="company">Company/Organization</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                      Message
                    </label>
                    <textarea
                      id="message"
                      placeholder="Tell us about your needs..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      className="w-full resize-none rounded-lg border-0 bg-muted/30 px-4 py-3.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="group w-full rounded-full bg-primary px-8 py-6 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90 sm:w-auto"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
