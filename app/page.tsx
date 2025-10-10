import {
  Shield,
  ChevronDown,
  ArrowRight,
  Clock,
  Zap,
  Lock,
  CheckCircle,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarqueeBanner } from "@/components/marquee-banner";
import { Footer } from "@/components/footer";
import { ServiceCard } from "@/components/service-card";
import { ContactForm } from "@/components/contact-form";

export default function ComingSoonPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <div className="grid-pattern absolute inset-0" />

      <header className="relative z-10 flex justify-center px-6 pt-8">
        <nav className="flex w-full max-w-4xl items-center justify-between rounded-full bg-card px-6 py-4 shadow-2xl">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-card-foreground" />
            <span className="font-sans text-base font-semibold text-card-foreground">
              cyber4every1
            </span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="/"
              className="text-sm font-medium text-card-foreground transition-colors"
            >
              Home
            </a>
            <a
              href="#services"
              className="text-sm font-medium text-card-foreground/70 transition-colors hover:text-card-foreground"
            >
              Services
            </a>
            <a
              href="/about"
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
              Get in Touch
            </Button>
          </div>
        </nav>
      </header>

      <section className="relative z-10 flex min-h-[calc(100vh-120px)] flex-col items-center justify-center px-6 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 font-sans text-5xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Making Cybersecurity
            <br />
            <span className="text-primary">Simple</span> for Everyone
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Empowering individuals, schools, churches, and communities with
            accessible cybersecurity education and awareness training.
          </p>

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
              <div className="flex h-32 w-32 items-center justify-center rounded-2xl bg-gradient-to-br from-muted/20 to-muted/5 backdrop-blur-sm md:h-40 md:w-40">
                <Shield className="h-16 w-16 text-primary md:h-20 md:w-20" />
              </div>

              <div className="absolute -left-32 top-1/2 hidden h-px w-32 -translate-y-1/2 bg-gradient-to-r from-transparent to-border md:block" />
              <div className="absolute -right-32 top-1/2 hidden h-px w-32 -translate-y-1/2 bg-gradient-to-l from-transparent to-border md:block" />
              <div className="absolute left-1/2 -top-24 hidden h-24 w-px -translate-x-1/2 bg-gradient-to-b from-transparent to-border md:block" />
              <div className="absolute -bottom-24 left-1/2 hidden h-24 w-px -translate-x-1/2 bg-gradient-to-t from-transparent to-border md:block" />

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

      <section className="relative z-10 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
              About Us
            </p>
            <h2 className="mb-6 font-sans text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
              Making Cybersecurity{" "}
              <span className="text-primary">Accessible</span> to All
            </h2>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Side - Image */}
            <div className="relative overflow-hidden rounded-3xl">
              <img
                src="/diverse-group-of-people-learning-cybersecurity-tog.jpg"
                alt="People learning cybersecurity"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Right Side - Content */}
            <div className="flex flex-col justify-center space-y-8">
              <div>
                <h3 className="mb-4 text-3xl font-bold text-foreground">
                  Who We Are
                </h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  At CyberSecurity For Everyone LLC, we bridge the gap between
                  technology and people by delivering clear, engaging, and
                  inclusive cybersecurity education that empowers communities to
                  recognize and defend against digital threats.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="mb-2 text-xl font-bold text-foreground">
                      Our Mission
                    </h4>
                    <p className="text-muted-foreground">
                      Empowering communities through accessible cybersecurity
                      education and awareness training.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="mb-2 text-xl font-bold text-foreground">
                      Our Vision
                    </h4>
                    <p className="text-muted-foreground">
                      A world where everyone understands how to stay safe and
                      confident in the digital world.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="mb-2 text-xl font-bold text-foreground">
                      Our Approach
                    </h4>
                    <p className="text-muted-foreground">
                      Simple, practical education that removes technical
                      barriers and empowers everyday people.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <Button
                  size="lg"
                  className="rounded-full bg-primary px-8 py-6 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:bg-primary/90"
                >
                  Learn More About Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section id="services" className="relative z-10 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <h2 className="mb-4 font-sans text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
              Our <span className="text-primary">Services</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
              Comprehensive cybersecurity education tailored for every community
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <ServiceCard
              title="Individual & Family Protection"
              description="Personal cybersecurity training designed to protect you and your loved ones from digital threats. Learn practical skills to stay safe online, recognize scams, and secure your personal information."
              imageUrl="/family-using-laptop-safely-at-home-cybersecurity.jpg"
              features={[
                { icon: Clock, label: "24/7 Support" },
                { icon: Zap, label: "Quick Start Guide" },
                { icon: Lock, label: "Privacy First" },
              ]}
            />

            <ServiceCard
              title="Schools & Education"
              description="Age-appropriate workshops teaching students safe online practices and digital citizenship. Empower the next generation with essential cybersecurity knowledge and responsible technology use."
              imageUrl="/students-learning-computer-safety-in-classroom.jpg"
              features={[
                { icon: CheckCircle, label: "Age-Appropriate" },
                { icon: Target, label: "Interactive Learning" },
                { icon: Zap, label: "Engaging Content" },
              ]}
            />

            <ServiceCard
              title="Churches & Communities"
              description="Community-focused programs helping congregations stay secure in their digital activities. Build trust and safety within your community through accessible cybersecurity education."
              imageUrl="/community-group-learning-digital-safety-together.jpg"
              features={[
                { icon: Lock, label: "Community Trust" },
                { icon: CheckCircle, label: "Easy to Understand" },
                { icon: Clock, label: "Flexible Schedule" },
              ]}
            />

            <ServiceCard
              title="Organizations & Companies"
              description="Professional training programs to strengthen your organization's security posture. Equip your team with the knowledge and skills to protect your business from cyber threats."
              imageUrl="/business-team-cybersecurity-training-office.jpg"
              features={[
                { icon: Target, label: "Custom Training" },
                { icon: Zap, label: "Quick Implementation" },
                { icon: Lock, label: "Enterprise Security" },
              ]}
            />
          </div>
        </div>
      </section> */}

      <ContactForm />

      <MarqueeBanner />
      <Footer />
    </main>
  );
}
