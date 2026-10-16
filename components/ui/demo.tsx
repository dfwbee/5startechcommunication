import PathDrawingPortfolioHero from "@/components/ui/path-drawing-portfolio-hero";

export default function DefaultDemo() {
  return (
    <div className="w-full bg-[#0c0a0f] bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(240,147,251,0.14),transparent),radial-gradient(ellipse_60%_50%_at_80%_110%,rgba(245,87,108,0.1),transparent)] text-white">
      <PathDrawingPortfolioHero
        className="w-full"
        brand="AORA"
        tagline="UI / Brand Designer — Tokyo"
        eyebrow="Portfolio"
        targetId="works"
      />

      {/* Target Section for Animated Scroll */}
      <section id="works" className="w-full max-w-6xl mx-auto px-6 py-24 border-t border-white/10">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-pink-400 font-medium mb-2">Featured Projects</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Selected Works & Case Studies</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Neo Cybernetics Brand Identity",
              category: "Design System / 3D Art",
              desc: "Complete visual identity and motion design guidelines for next-gen fintech.",
            },
            {
              title: "Kinetic Sound Studio Platform",
              category: "Web Platform & Audio Engine",
              desc: "Interactive spatial audio dashboard and responsive DAW web client.",
            },
            {
              title: "Quantum AI Visualization",
              category: "Generative Canvas / Research",
              desc: "Real-time high-density cluster rendering and interactive physics simulation.",
            },
            {
              title: "Lumina Architectural Archive",
              category: "Editorial / Typography",
              desc: "Minimalist portfolio experience for contemporary brutalist architecture.",
            },
          ].map((project, idx) => (
            <div
              key={idx}
              className="group p-8 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300"
            >
              <div className="text-xs font-mono uppercase tracking-wider text-pink-400/80 mb-2">
                {project.category}
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-pink-300 transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">
                {project.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
