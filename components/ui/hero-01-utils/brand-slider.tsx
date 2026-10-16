import * as React from "react"

export interface BrandList {
  image: string
  lightimg?: string
  name: string
}

interface BrandSliderProps {
  brandList: BrandList[]
}

export default function BrandSlider({ brandList }: BrandSliderProps) {
  return (
    <section className="py-12 border-y bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-8">
          Powering teams at forward-thinking enterprises worldwide
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16 opacity-70 hover:opacity-100 transition-opacity">
          {brandList.map((brand, idx) => (
            <div
              key={`${brand.name}-${idx}`}
              className="flex items-center justify-center p-2 grayscale hover:grayscale-0 transition-all hover:scale-105"
            >
              <img
                src={brand.image}
                alt={brand.name}
                className="h-7 w-auto max-w-[120px] object-contain dark:invert"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback to text badge if external SVG fails to load
                  const target = e.currentTarget
                  target.style.display = "none"
                  const parent = target.parentElement
                  if (parent && !parent.querySelector(".fallback-text")) {
                    const fallback = document.createElement("span")
                    fallback.className = "fallback-text text-sm font-bold font-mono tracking-wider text-foreground"
                    fallback.innerText = brand.name
                    parent.appendChild(fallback)
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
