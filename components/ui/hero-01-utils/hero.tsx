import * as React from "react"
import { ArrowRight, CheckCircle2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export interface AvatarList {
  image: string
}

interface HeroSectionProps {
  avatarList: AvatarList[]
}

export default function HeroSection({ avatarList }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <div className="inline-flex items-center gap-2 self-start rounded-full border bg-muted/60 px-3.5 py-1 text-xs font-medium text-foreground">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Next-Generation Digital Agency</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              Elevate your digital vision with modern craftsmanship.
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              We engineer scalable software, design iconic brand experiences, and build robust IT infrastructure to turn ambitious concepts into industry-leading digital products.
            </p>

            {/* Email / Subscription form */}
            <div className="flex flex-col sm:flex-row gap-2 max-w-md pt-2">
              <Input
                type="email"
                placeholder="Enter your work email"
                className="h-11 bg-background"
              />
              <Button className="h-11 px-6 whitespace-nowrap gap-2">
                <span>Book a Call</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Feature bullets */}
            <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-muted-foreground pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>Zero Lock-in</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>Enterprise SLA</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>Rapid Prototyping</span>
              </div>
            </div>

            {/* Social Proof Avatar Stack */}
            <div className="flex items-center gap-4 pt-4 border-t">
              <div className="flex -space-x-3 overflow-hidden">
                {avatarList.map((avatar, idx) => (
                  <img
                    key={idx}
                    src={avatar.image}
                    alt={`User avatar ${idx + 1}`}
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-background object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = `https://images.unsplash.com/photo-${1534528741775 + idx * 1000}?w=100&auto=format&fit=crop&q=80`;
                    }}
                  />
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-foreground ml-1">5.0</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  Trusted by 500+ global industry leaders
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border bg-muted shadow-2xl relative">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&auto=format&fit=crop&q=80"
                  alt="Modern team collaboration"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Floating telemetry badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-background/90 backdrop-blur-md border shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                      99%
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-foreground">Project Delivery Rate</div>
                      <div className="text-[11px] text-muted-foreground">On-time and on-spec</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-medium text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
