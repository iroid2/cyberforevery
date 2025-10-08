import { Shield, ChevronDown, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ComingSoonPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <div className="grid-pattern absolute inset-0" />

      <header className="relative z-10 flex justify-center px-6 pt-8">
        <nav className="flex w-full max-w-4xl items-center justify-between rounded-full bg-card px-6 py-4 shadow-2xl">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-card-foreground" />
            <span className="font-sans text-base font-semibold text-card-foreground">cyber4every1</span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#"
              className="text-sm font-medium text-card-foreground/70 transition-colors hover:text-card-foreground"
            >
              Home
            </a>
            <a
              href="#"
              className="text-sm font-medium text-card-foreground/70 transition-colors hover:text-card-foreground"
            >
              Services
            </a>
            <a
              href="#"
              className="text-sm font-medium text-card-foreground/70 transition-colors hover:text-card-foreground"
            >
              About
            </a>
          </div>
          <div className="flex items-center gap-3">
            <button className="hidden text-sm font-medium text-card-foreground transition-colors hover:text-card-foreground/70 md:block">
              Login
            </button>
            <Button
              size="sm"
              className="rounded-full bg-card-foreground px-6 text-sm font-medium text-card hover:bg-card-foreground/90"
            >
              Signup
            </Button>
          </div>
        </nav>
      </header>

      <section className="relative z-10 flex min-h-[calc(100vh-120px)] flex-col items-center justify-center px-6 text-center">
        <div className="mx-auto max-w-4xl">
          {/* Main headline with neon green accent */}
          <h1 className="mb-6 font-sans text-5xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Ensuring Your
            <br />
            Digital <span className="text-primary">Safety</span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            cyber4every1's accessible cybersecurity education is a critical component of protecting everyone in the
            digital age.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="rounded-full bg-primary px-8 py-6 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/40"
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="group rounded-full border-0 bg-secondary px-8 py-6 text-base font-medium text-foreground transition-all hover:bg-secondary/80"
            >
              Learn more
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="relative mx-auto mt-16 flex h-64 w-full max-w-2xl items-center justify-center md:h-80">
            <div className="relative">
              {/* Lock icon as placeholder for 3D render */}
              <div className="flex h-32 w-32 items-center justify-center rounded-2xl bg-gradient-to-br from-muted/20 to-muted/5 backdrop-blur-sm md:h-40 md:w-40">
                <Shield className="h-16 w-16 text-primary md:h-20 md:w-20" />
              </div>

              {/* Network connection lines - decorative */}
              <div className="absolute -left-32 top-1/2 hidden h-px w-32 -translate-y-1/2 bg-gradient-to-r from-transparent to-border md:block" />
              <div className="absolute -right-32 top-1/2 hidden h-px w-32 -translate-y-1/2 bg-gradient-to-l from-transparent to-border md:block" />
              <div className="absolute left-1/2 -top-24 hidden h-24 w-px -translate-x-1/2 bg-gradient-to-b from-transparent to-border md:block" />
              <div className="absolute -bottom-24 left-1/2 hidden h-24 w-px -translate-x-1/2 bg-gradient-to-t from-transparent to-border md:block" />

              {/* Device icons at connection points */}
              <div className="absolute -left-40 top-1/2 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-muted/20 backdrop-blur-sm md:flex">
                <span className="text-xs text-muted-foreground">G</span>
              </div>
              <div className="absolute -right-40 top-1/2 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-muted/20 backdrop-blur-sm md:flex">
                <span className="text-xs text-muted-foreground">M</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-6 w-6 text-muted-foreground" />
        </div>
      </section>
    </main>
  )
}
