import { Shield, Target, Eye, Users, GraduationCap, Heart, Sparkles, Award, BookOpen, Globe } from "lucide-react"
import { MarqueeBanner } from "@/components/marquee-banner"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <div className="grid-pattern absolute inset-0" />

      <header className="relative z-10 flex justify-center px-6 pt-8">
        <nav className="flex w-full max-w-4xl items-center justify-between rounded-full bg-card px-6 py-4 shadow-2xl">
          <a href="/" className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-card-foreground" />
            <span className="font-sans text-base font-semibold text-card-foreground">cyber4every1</span>
          </a>
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="/"
              className="text-sm font-medium text-card-foreground/70 transition-colors hover:text-card-foreground"
            >
              Home
            </a>
            <a
              href="/#services"
              className="text-sm font-medium text-card-foreground/70 transition-colors hover:text-card-foreground"
            >
              Services
            </a>
            <a href="/about" className="text-sm font-medium text-card-foreground transition-colors">
              About
            </a>
          </div>
        </nav>
      </header>

      <section className="relative z-10 px-6 py-24 text-center">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-primary/10 px-6 py-3 backdrop-blur-sm">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-base font-semibold text-primary">About CyberSecurity For Everyone LLC</span>
          </div>
          <h1 className="mb-8 font-sans text-5xl font-bold leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Cybersecurity for
            <br />
            <span className="text-primary">Everyone</span>
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
            Making digital safety accessible through education, awareness, and community empowerment
          </p>
        </div>
      </section>

      <section className="relative z-10 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-1">
            <div className="rounded-[2.4rem] bg-background/80 p-10 backdrop-blur-sm md:p-16">
              <div className="mb-10 inline-flex items-center justify-center rounded-2xl bg-primary/20 p-5">
                <Target className="h-12 w-12 text-primary" />
              </div>
              <h2 className="mb-8 font-sans text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">What We Do</h2>
              <div className="space-y-6 text-lg leading-relaxed md:text-xl">
                <p className="text-foreground">
                  At <span className="font-bold text-primary">CyberSecurity For Everyone LLC</span>, we make
                  cybersecurity accessible to all.
                </p>
                <p className="text-muted-foreground">
                  We provide awareness training, workshops, and educational programs designed to help individuals,
                  schools, churches, and community organizations understand digital safety in simple, practical ways.
                </p>
                <p className="text-muted-foreground">
                  Our goal is to remove technical barriers and empower everyday people to protect themselves, their
                  families, and their organizations from cyber threats.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="group relative overflow-hidden rounded-[2.5rem] bg-card/5 p-1 transition-all duration-500 hover:bg-card/10">
              <div className="rounded-[2.4rem] bg-background/80 p-10 backdrop-blur-sm md:p-14">
                <div className="absolute right-0 top-0 h-48 w-48 translate-x-16 -translate-y-16 rounded-full bg-primary/10 blur-3xl transition-all duration-500 group-hover:bg-primary/20" />
                <div className="relative">
                  <div className="mb-8 inline-flex items-center justify-center rounded-2xl bg-primary/20 p-5">
                    <Eye className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="mb-6 font-sans text-3xl font-bold text-foreground md:text-4xl">Vision Statement</h3>
                  <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
                    To create a world where every individual — regardless of age, background, or profession —
                    understands how to stay safe and confident in the digital world.
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-[2.5rem] bg-card/5 p-1 transition-all duration-500 hover:bg-card/10">
              <div className="rounded-[2.4rem] bg-background/80 p-10 backdrop-blur-sm md:p-14">
                <div className="absolute right-0 top-0 h-48 w-48 translate-x-16 -translate-y-16 rounded-full bg-primary/10 blur-3xl transition-all duration-500 group-hover:bg-primary/20" />
                <div className="relative">
                  <div className="mb-8 inline-flex items-center justify-center rounded-2xl bg-primary/20 p-5">
                    <Target className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="mb-6 font-sans text-3xl font-bold text-foreground md:text-4xl">Mission Statement</h3>
                  <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
                    To bridge the gap between technology and people by delivering clear, engaging, and inclusive
                    cybersecurity education that empowers communities to recognize and defend against digital threats.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-20 text-center font-sans text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
            Our <span className="text-primary">Approach</span>
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="group relative overflow-hidden rounded-[2rem] bg-card/5 p-1 transition-all duration-500 hover:bg-card/10">
              <div className="rounded-[1.9rem] bg-background/80 p-10 text-center backdrop-blur-sm">
                <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-primary/5 blur-3xl transition-all duration-500 group-hover:bg-primary/15" />
                <div className="relative">
                  <div className="mb-8 inline-flex items-center justify-center rounded-2xl bg-primary/20 p-5 transition-all duration-500 group-hover:scale-110">
                    <Users className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="mb-5 font-sans text-2xl font-bold text-foreground md:text-3xl">Community Focused</h3>
                  <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                    Reaching schools, churches, and organizations where people gather and learn together.
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-[2rem] bg-card/5 p-1 transition-all duration-500 hover:bg-card/10">
              <div className="rounded-[1.9rem] bg-background/80 p-10 text-center backdrop-blur-sm">
                <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-primary/5 blur-3xl transition-all duration-500 group-hover:bg-primary/15" />
                <div className="relative">
                  <div className="mb-8 inline-flex items-center justify-center rounded-2xl bg-primary/20 p-5 transition-all duration-500 group-hover:scale-110">
                    <GraduationCap className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="mb-5 font-sans text-2xl font-bold text-foreground md:text-3xl">Simple & Practical</h3>
                  <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                    Breaking down complex concepts into easy-to-understand, actionable steps for everyone.
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-[2rem] bg-card/5 p-1 transition-all duration-500 hover:bg-card/10">
              <div className="rounded-[1.9rem] bg-background/80 p-10 text-center backdrop-blur-sm">
                <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-primary/5 blur-3xl transition-all duration-500 group-hover:bg-primary/15" />
                <div className="relative">
                  <div className="mb-8 inline-flex items-center justify-center rounded-2xl bg-primary/20 p-5 transition-all duration-500 group-hover:scale-110">
                    <Heart className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="mb-5 font-sans text-2xl font-bold text-foreground md:text-3xl">
                    Inclusive & Accessible
                  </h3>
                  <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                    Removing age and technical barriers to ensure cybersecurity knowledge is available to all.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-1">
            <div className="rounded-[2.4rem] bg-background/80 p-10 backdrop-blur-sm md:p-16">
              <div className="mb-12 text-center">
                <div className="mb-6 inline-flex items-center justify-center rounded-2xl bg-primary/20 p-5">
                  <Award className="h-12 w-12 text-primary" />
                </div>
                <h2 className="mb-4 font-sans text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
                  Meet Our CEO
                </h2>
                <p className="text-3xl font-bold text-primary md:text-4xl">Ivan Zziwa</p>
                <p className="mt-2 text-lg text-muted-foreground">
                  Master's in Cyber Forensics & Security, Illinois Institute of Technology
                </p>
              </div>
              <div className="space-y-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
                <p>
                  Ivan Zziwa is a cybersecurity professional and educator with a Master's degree in Cyber Forensics and
                  Security from the Illinois Institute of Technology, where he graduated as the{" "}
                  <span className="font-semibold text-primary">top student in his program</span>.
                </p>
                <p>
                  With a passion for simplifying complex cybersecurity concepts, Ivan has taught and mentored{" "}
                  <span className="font-semibold text-primary">over 100 students</span> in digital safety and network
                  defense. He has also volunteered in multiple community and technology outreach programs, helping to
                  bridge the gap between advanced cybersecurity research and everyday awareness.
                </p>
                <div className="rounded-2xl bg-primary/10 p-8">
                  <p className="text-xl font-semibold text-foreground md:text-2xl">
                    "My mission is to make cybersecurity education relatable, practical, and available to everyone,
                    everywhere."
                  </p>
                </div>
              </div>

              <div className="mt-12 grid gap-6 md:grid-cols-3">
                <div className="rounded-2xl bg-card/10 p-6 text-center backdrop-blur-sm">
                  <BookOpen className="mx-auto mb-3 h-8 w-8 text-primary" />
                  <p className="text-3xl font-bold text-primary">100+</p>
                  <p className="text-sm text-muted-foreground">Students Mentored</p>
                </div>
                <div className="rounded-2xl bg-card/10 p-6 text-center backdrop-blur-sm">
                  <Award className="mx-auto mb-3 h-8 w-8 text-primary" />
                  <p className="text-3xl font-bold text-primary">#1</p>
                  <p className="text-sm text-muted-foreground">Top Graduate IIT</p>
                </div>
                <div className="rounded-2xl bg-card/10 p-6 text-center backdrop-blur-sm">
                  <Globe className="mx-auto mb-3 h-8 w-8 text-primary" />
                  <p className="text-3xl font-bold text-primary">Multiple</p>
                  <p className="text-sm text-muted-foreground">Community Programs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-16">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="mb-16 font-sans text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
            Our Core Values
          </h2>
          <div className="mb-16 flex flex-wrap items-center justify-center gap-6">
            <span className="rounded-full bg-primary/20 px-10 py-5 font-sans text-2xl font-bold text-primary transition-all hover:scale-105 hover:bg-primary/30 md:text-3xl">
              Secure
            </span>
            <span className="text-4xl text-primary">•</span>
            <span className="rounded-full bg-primary/20 px-10 py-5 font-sans text-2xl font-bold text-primary transition-all hover:scale-105 hover:bg-primary/30 md:text-3xl">
              Educate
            </span>
            <span className="text-4xl text-primary">•</span>
            <span className="rounded-full bg-primary/20 px-10 py-5 font-sans text-2xl font-bold text-primary transition-all hover:scale-105 hover:bg-primary/30 md:text-3xl">
              Empower
            </span>
          </div>
          <p className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Because Cybersecurity Shouldn't Be Complicated.
          </p>
        </div>
      </section>

      <ContactForm />

      <MarqueeBanner />
      <Footer />
    </main>
  )
}
