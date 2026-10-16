import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { PROJECTS_DATA } from '../data/mockData';
import { ProjectItem } from '../types';
import { 
  Camera, 
  Network, 
  Monitor, 
  Wrench, 
  Building, 
  MapPin, 
  ArrowRight, 
  X, 
  Check, 
  Eye,
  Layers
} from 'lucide-react';

interface GallerySectionProps {
  onOpenQuote: (serviceTitle?: string) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onOpenQuote }) => {
  const { theme } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const isLight = theme === 'light';

  const filterTabs = [
    { id: 'all', label: 'All Projects', icon: Layers },
    { id: 'cctv', label: 'CCTV Deployments', icon: Camera },
    { id: 'networking', label: 'Network Infrastructure', icon: Network },
    { id: 'computers', label: 'Workstation Rollouts', icon: Monitor },
    { id: 'repairs', label: 'Hardware Overhauls', icon: Wrench },
    { id: 'office', label: 'Office IT Setups', icon: Building },
  ];

  const filteredProjects = selectedFilter === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === selectedFilter);

  return (
    <section 
      id="projects" 
      className={`py-16 lg:py-24 transition-colors duration-200 border-b ${
        isLight 
          ? 'bg-slate-50 text-slate-900 border-slate-200' 
          : 'bg-[#080D1A] text-slate-100 border-slate-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider block">
              Recent Deployments &amp; Case Studies
            </span>
            
            <h2 className={`font-heading font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              Field Engineering Projects in Lagos
            </h2>
            
            <p className={`text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              Browse verified corporate and commercial installations across Victoria Island, Ikeja, Lekki, and Ikoyi. Every deployment is managed under strict cabling, thermal, and security standards.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenQuote('Site Installation Project')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-heading font-semibold text-xs tracking-wide transition-all shadow-sm active:scale-95 shrink-0"
          >
            <span>Book a Site Survey</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {filterTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = selectedFilter === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedFilter(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-blue-900 border-blue-900 text-white shadow-xs'
                    : isLight
                      ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Gallery Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveProject(project)}
              className={`rounded-xl border overflow-hidden cursor-pointer group transition-all duration-200 flex flex-col justify-between ${
                isLight 
                  ? 'bg-white border-slate-200 hover:border-blue-400 shadow-xs hover:shadow-md' 
                  : 'bg-[#101728] border-slate-800 hover:border-blue-500/50 hover:bg-[#152038]'
              }`}
            >
              <div>
                {/* Visual Thumbnail */}
                <div className="relative aspect-16/10 overflow-hidden bg-slate-900">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    loading="lazy"
                  />
                  
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900/90 text-white text-xs font-semibold border border-slate-700">
                    <span>{project.categoryLabel}</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300 bg-slate-900/90 px-3 py-1 rounded border border-slate-800">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>{project.location}</span>
                    </span>
                    <span className="text-slate-400">{project.completionYear}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-3">
                  <span className="text-xs text-blue-700 dark:text-blue-400 font-semibold uppercase tracking-wider block">
                    Client: {project.clientType}
                  </span>

                  <h3 className={`font-heading font-bold text-base sm:text-lg group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors leading-snug ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    {project.title}
                  </h3>

                  <p className={`text-xs leading-relaxed line-clamp-2 ${
                    isLight ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className={`px-6 py-3 border-t flex items-center justify-between text-xs font-semibold ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/40 border-slate-800'
              }`}>
                <span className="text-blue-700 dark:text-blue-400 inline-flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Project Scope</span>
                </span>
                <span className="text-slate-400 font-normal">Click to expand</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Project Lightbox Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
            onClick={() => setActiveProject(null)}
          />

          <div className={`relative w-full max-w-2xl rounded-2xl border overflow-hidden my-8 z-10 transition-all ${
            isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#0E1526] border-slate-800 text-slate-100'
          }`}>
            <div className={`px-6 py-4 border-b flex items-center justify-between ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
            }`}>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-blue-900 dark:text-blue-300 uppercase px-2.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
                  {activeProject.categoryLabel}
                </span>
                <span className="text-xs text-slate-500">
                  {activeProject.location}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-7 space-y-5 max-h-[75vh] overflow-y-auto">
              <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 aspect-16/9 bg-slate-950">
                <img 
                  src={activeProject.imageUrl} 
                  alt={activeProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="font-heading font-black text-xl sm:text-2xl">
                  {activeProject.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Completed in {activeProject.completionYear} • {activeProject.location}
                </p>
              </div>

              <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                {activeProject.description}
              </p>

              {/* Scope Checklist */}
              <div className={`p-4 rounded-xl border space-y-2 ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'
              }`}>
                <h4 className="font-bold text-xs uppercase tracking-wider text-blue-900 dark:text-blue-300">
                  Scope &amp; Hardware Deployed:
                </h4>
                <ul className="space-y-1.5 text-xs">
                  {activeProject.scopeHighlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const title = activeProject.title;
                    setActiveProject(null);
                    onOpenQuote(`Project Inquiry: ${title}`);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-heading font-semibold text-xs transition-all shadow-sm"
                >
                  <span>Request Similar Installation</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveProject(null)}
                  className="text-xs text-slate-500 hover:underline"
                >
                  Close Window
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
