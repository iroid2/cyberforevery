import { Shield, Mail, MapPin, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/50 bg-background/50 px-6 py-12 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-sans text-xl font-bold text-foreground">cyber4every1</span>
            </div>
            <p className="mb-6 max-w-md leading-relaxed text-muted-foreground">
              Making cybersecurity simple and accessible for everyone. Empowering communities through education and
              awareness.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:info@cyber4every1.com" className="transition-colors hover:text-foreground">
                  info@cyber4every1.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>Coming Soon</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Serving Communities Nationwide</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-sans text-sm font-bold uppercase tracking-wider text-foreground">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 font-sans text-sm font-bold uppercase tracking-wider text-foreground">Our Services</h3>
            <ul className="space-y-3">
              <li className="text-sm text-muted-foreground">Individual Training</li>
              <li className="text-sm text-muted-foreground">School Programs</li>
              <li className="text-sm text-muted-foreground">Community Workshops</li>
              <li className="text-sm text-muted-foreground">Corporate Training</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-border/50 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} CyberSecurity For Everyone LLC. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
