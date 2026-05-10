import { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { Headphones, BookOpen, Zap, Server, Cloud, Sparkles } from "lucide-react";
import ContactCTA from "@/components/ContactCTA";
import SocialLinks from "@/components/SocialLinks";
import { CodeTerminalModal } from "@/components/InteractiveCodeCard";
import { LanguageCardModal } from "@/components/LanguageCardModal";
import { snippetsByLabel } from "@/data/code-snippets";
import { languagesByLabel } from "@/data/language-phrases";
import BentoCard from "@/components/about/BentoCard";
import CatIllustration from "@/components/about/CatIllustration";
import DogIllustration from "@/components/about/DogIllustration";
import PetPolaroids from "@/components/about/PetPolaroids";
import BookshelfIllustration from "@/components/about/BookshelfIllustration";
import WorkspaceIllustration from "@/components/about/WorkspaceIllustration";
import LanguagesIllustration from "@/components/about/LanguagesIllustration";
import SuitcaseIllustration from "@/components/about/SuitcaseIllustration";
import MapCard from "@/components/about/MapCard";
import { workExperiences, skills } from "@/data/about";
import { siteConfig } from "@/config/site";
import { getSocial } from "@/data/social-profiles";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { FadeIn, BlurFadeIn, SlideIn, StaggerContainer, StaggerItem, Float } from "@/components/MotionWrapper";
import { PAGE_PADDING } from "@/config/layout";

export default function AboutPage() {
  useDocumentTitle("About");
  const [activeLang, setActiveLang] = useState<string | null>(null);
  const handleClose = useCallback(() => setActiveLang(null), []);

  const [activeHumanLang, setActiveHumanLang] = useState<string | null>(null);
  const handleHumanLangClose = useCallback(() => setActiveHumanLang(null), []);

  return (
    <main className="pb-20">
      {/* ─── Hero Section ─── */}
      <section className={`max-w-5xl mx-auto ${PAGE_PADDING} pb-12`}>
        <div className="grid md:grid-cols-[1fr_340px] gap-10 items-center">
          <div className="space-y-6">
            <BlurFadeIn>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">{siteConfig.name.full}</h1>
              <p className="text-muted-foreground text-lg mt-1">
                {siteConfig.occupation} · {siteConfig.locationShort}
              </p>
            </BlurFadeIn>
            <BlurFadeIn delay={0.1}>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">{siteConfig.bio}</p>
            </BlurFadeIn>
            <BlurFadeIn delay={0.2}>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                I've worked at organizations like{" "}
                {workExperiences.slice(0, 3).map((job, i) => (
                  <span key={job.company}>
                    {i > 0 && (i === 2 ? ", and " : ", ")}
                    {job.url ? (
                      <a href={job.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                        {job.company}
                      </a>
                    ) : (
                      job.company
                    )}
                  </span>
                ))}
                .
              </p>
            </BlurFadeIn>
            <BlurFadeIn delay={0.3}>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">{siteConfig.bioExtended}</p>
            </BlurFadeIn>
          </div>

          {/* Portrait photo */}
          <SlideIn direction="right" delay={0.3} className="hidden md:flex justify-center">
            <PortraitPhoto />
          </SlideIn>
        </div>
      </section>

      {/* ─── Bento Grid ─── */}
      <section className={`max-w-5xl mx-auto ${PAGE_PADDING}`}>
        <StaggerContainer className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4" staggerDelay={0.07}>

          {/* Card: Interactive Map — full width */}
          <StaggerItem variant="scale" className="break-inside-avoid">
            <BentoCard className="relative overflow-hidden !p-0">
              <MapCard />
            </BentoCard>
          </StaggerItem>

          {/* Card: Music lover */}
          <StaggerItem variant="scale" className="break-inside-avoid">
            <BentoCard className="flex flex-col items-center justify-center text-center gap-3">
              <div className="text-5xl">🎧</div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                I code with <span className="text-primary font-semibold">music</span> on. Lo-fi, rock, or whatever matches the bug I'm debugging.
              </p>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Headphones key={i} size={14} className={i < 4 ? "text-primary" : "text-muted-foreground"} />
                ))}
              </div>
            </BentoCard>
          </StaggerItem>

          {/* Card: Backend & Cloud */}
          <StaggerItem variant="scale" className="break-inside-avoid">
            <BentoCard className="flex flex-col items-center justify-center text-center gap-4">
              <div className="flex gap-3 text-accent">
                <Server size={28} />
                <Cloud size={28} />
              </div>
              <p className="text-muted-foreground text-sm">
                I specialize in <span className="text-primary font-semibold">backend development</span> and <span className="text-primary font-semibold">cloud infrastructure</span>.
              </p>
              <p className="text-muted-foreground text-xs">AWS · Docker · Kubernetes · Microservices</p>
            </BentoCard>
          </StaggerItem>

          {/* Card: Location + Cat */}
          <StaggerItem variant="scale" className="break-inside-avoid">
            <BentoCard className="flex flex-col items-center text-center gap-3">
              <CatIllustration className="w-24 h-24" />
              <p className="text-muted-foreground text-sm leading-relaxed">
                Hello, fellow human! I'm based in <span className="text-foreground font-medium">{siteConfig.location}</span>.
              </p>
            </BentoCard>
          </StaggerItem>

          {/* Card: Years of experience */}
          <StaggerItem variant="scale" className="break-inside-avoid">
            <BentoCard className="flex flex-col items-center justify-center text-center gap-2">
              <p className="text-muted-foreground text-sm">I've been coding for</p>
              <p className="text-3xl font-bold text-foreground">
                {new Date().getFullYear() - siteConfig.startYear}+ <span className="text-base font-normal text-muted-foreground">years.</span>
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">From startups to enterprise — it's been quite a ride. 🚀</p>
            </BentoCard>
          </StaggerItem>

          {/* Card: Open source & GitHub */}
          <StaggerItem variant="scale" className="break-inside-avoid">
            <BentoCard className="flex flex-col gap-4">
              <div className="flex gap-2">
                {["P", "y", "J", "S"].map((key) => (
                  <div key={key} className="w-9 h-9 rounded border border-border bg-secondary flex items-center justify-center text-foreground font-mono text-sm font-bold">
                    {key}
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                I work across multiple languages and stacks daily — from <span className="text-accent font-semibold">Python</span> and <span className="text-primary font-semibold">Java</span> on the
                backend, to <span className="text-accent font-semibold">TypeScript</span> on the front.
              </p>
              <p className="text-muted-foreground text-sm">
                Check out my work on{" "}
                <a href={getSocial("github")?.href} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline underline decoration-dotted">
                  GitHub
                </a>
                .
              </p>
            </BentoCard>
          </StaggerItem>

          {/* Card: Work journey */}
          <StaggerItem variant="scale" className="break-inside-avoid">
            <BentoCard className="flex flex-col gap-3">
              <SuitcaseIllustration className="w-full max-w-[140px] mx-auto h-auto" />
              <ul className="space-y-2">
                {workExperiences.map((job) => (
                  <li key={job.company} className="flex items-center gap-2 text-sm">
                    {job.country && <span className="text-base shrink-0">{job.country.flag}</span>}
                    <span className="text-foreground">{job.company}</span>
                    <span className="text-muted-foreground text-xs ml-auto whitespace-nowrap">
                      {job.from}–{job.to}
                    </span>
                  </li>
                ))}
              </ul>
            </BentoCard>
          </StaggerItem>

          {/* Card: Scalable systems */}
          <StaggerItem variant="scale" className="break-inside-avoid">
            <BentoCard className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-accent">
                <Zap size={16} />
                <span className="text-xs font-semibold uppercase tracking-wider">Scalable Systems</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">I love designing systems that handle scale gracefully — from microservices architectures to event-driven pipelines.</p>
              <p className="text-muted-foreground text-sm leading-relaxed">There's something deeply satisfying about a well-orchestrated distributed system.</p>
            </BentoCard>
          </StaggerItem>

          {/* Card: Bookshelf + Workspace — side by side */}
          <StaggerItem variant="scale" className="break-inside-avoid">
            <BentoCard className="flex flex-col items-center justify-center gap-3">
              <BookshelfIllustration className="w-32 h-20" />
              <p className="text-muted-foreground text-xs text-center">Avid reader. Always have a book on the go.</p>
            </BentoCard>
          </StaggerItem>

          <StaggerItem variant="scale" className="break-inside-avoid">
            <BentoCard className="flex flex-col items-center justify-center gap-3">
              <WorkspaceIllustration className="w-full max-w-[200px] h-auto" />
              <p className="text-muted-foreground text-xs text-center">
                Clean desk, dual monitors, and a <span className="text-accent">terminal always open</span>.
              </p>
            </BentoCard>
          </StaggerItem>

          {/* Card: Pet lover */}
          <StaggerItem variant="scale" className="break-inside-avoid">
            <BentoCard className="flex flex-col items-center text-center gap-3">
              <div className="flex gap-3 items-end">
                <CatIllustration className="w-12 h-12" />
                <DogIllustration className="w-14 h-14" />
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                I love cats and dogs. I have a cat at home named <span className="text-primary font-semibold">Tommy</span> 🐱 — he stays with my sister most of the time, they're best friends.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                <span className="text-primary font-semibold">Mini</span> was also part of our family — a sweet little soul we'll always remember. 🐾
              </p>
              <PetPolaroids />
            </BentoCard>
          </StaggerItem>

          {/* Card: Languages I speak */}
          <StaggerItem variant="scale" className="break-inside-avoid">
            <BentoCard className="flex flex-col items-center justify-center gap-3">
              <LanguagesIllustration className="w-full max-w-[200px] h-auto" />
              <p className="text-muted-foreground text-sm text-center leading-relaxed">
                I speak <span className="text-primary font-semibold">4 languages</span> — Bengali, English, Indonesian &amp; Ruáingga.
              </p>
              <div className="flex flex-wrap justify-center gap-1.5">
                {["বাংলা", "English", "Bahasa", "Ruáingga"].map((lang) => {
                  const data = languagesByLabel[lang];
                  return (
                    <button
                      key={lang}
                      onClick={() => setActiveHumanLang(lang)}
                      className="group/lang text-xs bg-secondary border border-border rounded px-2 py-0.5 text-muted-foreground hover:text-foreground transition-all duration-200 cursor-pointer"
                      style={{ ["--chip-color" as string]: data?.color }}
                      onMouseEnter={(e) => {
                        if (data) {
                          e.currentTarget.style.borderColor = `${data.color}60`;
                          e.currentTarget.style.backgroundColor = `${data.color}10`;
                          e.currentTarget.style.color = data.color;
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "";
                        e.currentTarget.style.backgroundColor = "";
                        e.currentTarget.style.color = "";
                      }}
                    >
                      <span className="flex items-center gap-1">{lang}</span>
                    </button>
                  );
                })}
              </div>
              <p className="text-muted-foreground text-[10px] mt-2 flex items-center gap-1">
                <Sparkles size={10} className="animate-pulse" />
                Click a language to hear how it sounds
              </p>
            </BentoCard>
          </StaggerItem>

          {/* Card: Always learning */}
          <StaggerItem variant="scale" className="break-inside-avoid">
            <BentoCard className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-primary">
                <BookOpen size={16} />
                <span className="text-xs font-semibold uppercase tracking-wider">Always Learning</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                I believe the best engineers never stop learning. Whether it's a new language, a cloud service, or an architectural pattern — I'm always exploring.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">This blog is where I share the things I learn along the way. If something helped me, it might help you too. ✨</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {skills.slice(0, 8).map((skill) => {
                  const hasSnippet = !!snippetsByLabel[skill.name];
                  return hasSnippet ? (
                    <button
                      key={skill.name}
                      onClick={() => setActiveLang(skill.name)}
                      className="group/chip text-xs bg-secondary border border-border rounded px-2 py-0.5 text-muted-foreground hover:border-primary/60 hover:text-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer"
                    >
                      <span className="flex items-center gap-1">{skill.name}</span>
                    </button>
                  ) : (
                    <span key={skill.name} className="text-xs bg-secondary border border-border rounded px-2 py-0.5 text-muted-foreground">
                      {skill.name}
                    </span>
                  );
                })}
              </div>
            </BentoCard>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* ─── Social Links ─── */}
      <section className={`max-w-5xl mx-auto ${PAGE_PADDING} mt-20`}>
        <FadeIn>
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-primary uppercase tracking-[0.2em] text-xs font-bold whitespace-nowrap">Find me online</h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <p className="text-muted-foreground text-sm mb-6">I'm active across these platforms — feel free to connect.</p>
        </FadeIn>
        <SocialLinks />
      </section>

      {/* ─── Contact CTA ─── */}
      <section className={`max-w-5xl mx-auto ${PAGE_PADDING} mt-20`}>
        <FadeIn>
          <ContactCTA />
        </FadeIn>
      </section>

      {/* ── Code Terminal Modal (portal) ── */}
      {activeLang && createPortal(<CodeTerminalModal key={activeLang} activeLang={activeLang} onClose={handleClose} />, document.body)}

      {/* ── Language Card Modal ── */}
      {activeHumanLang && <LanguageCardModal key={activeHumanLang} language={activeHumanLang} onClose={handleHumanLangClose} />}
    </main>
  );
}

/* ── Portrait Photo Variants ── */

/** Change this to switch between portrait styles */
const PORTRAIT_VARIANT: "stacked-cards" | "film-strip" | "polaroid" | "gradient-ring" | "glassmorphism" = "stacked-cards";

function PortraitPhoto() {
  switch (PORTRAIT_VARIANT) {
    case "stacked-cards":
      return <PortraitStackedCards />;
    case "film-strip":
      return <PortraitFilmStrip />;
    case "polaroid":
      return <PortraitPolaroid />;
    case "gradient-ring":
      return <PortraitGradientRing />;
    case "glassmorphism":
      return <PortraitGlassmorphism />;
  }
}

/** Layered cards with rotation — casual, playful depth */
function PortraitStackedCards() {
  return (
    <div className="relative w-[280px]">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 rotate-3 scale-[1.02]" />
      <div className="absolute inset-0 rounded-2xl bg-card border border-border/50 -rotate-2 scale-[1.01]" />
      <Float y={4} duration={5}>
        <div className="relative rounded-2xl overflow-hidden border-2 border-border/30 shadow-xl">
          <img src="/tahsin-portrait.jpg" alt={siteConfig.name.full} className="w-full aspect-[4/5] object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
        </div>
      </Float>
      <div className="absolute -inset-4 rounded-3xl bg-primary/[0.06] blur-2xl -z-10" />
    </div>
  );
}

/** Film-strip style — photo with sprocket holes and frame border */
function PortraitFilmStrip() {
  return (
    <div className="relative w-[280px]">
      <Float y={4} duration={5}>
        <div className="relative bg-foreground/90 dark:bg-foreground/80 rounded-sm p-[3px] shadow-2xl">
          {/* Top sprocket holes */}
          <div className="flex justify-between px-3 py-1.5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-3 h-2 rounded-[1px] bg-background/30" />
            ))}
          </div>
          {/* Photo */}
          <div className="mx-2">
            <img src="/tahsin-portrait.jpg" alt={siteConfig.name.full} className="w-full aspect-[4/5] object-cover object-top" />
          </div>
          {/* Bottom sprocket holes */}
          <div className="flex justify-between px-3 py-1.5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-3 h-2 rounded-[1px] bg-background/30" />
            ))}
          </div>
          {/* Film frame number */}
          <div className="absolute bottom-5 right-4 text-[9px] font-mono text-background/40 tracking-widest">25A</div>
        </div>
      </Float>
      <div className="absolute -inset-4 rounded-3xl bg-accent/[0.05] blur-2xl -z-10" />
    </div>
  );
}

/** Polaroid — white frame with handwritten caption, slightly tilted */
function PortraitPolaroid() {
  return (
    <div className="relative w-[260px]">
      <Float y={4} duration={5}>
        <div className="relative rotate-2 bg-white rounded-sm p-3 pb-14 shadow-[0_4px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
          {/* Photo */}
          <img src="/tahsin-portrait.jpg" alt={siteConfig.name.full} className="w-full aspect-square object-cover object-top" />
          {/* Handwritten caption */}
          <p className="absolute bottom-4 left-0 right-0 text-center text-sm text-neutral-500 italic font-serif">{siteConfig.locationShort} ✦</p>
        </div>
      </Float>
      {/* Tape strip */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-primary/15 rotate-1 rounded-sm z-10" />
      <div className="absolute -inset-6 rounded-3xl bg-primary/[0.04] blur-2xl -z-10" />
    </div>
  );
}

/** Gradient ring — circular photo with animated gradient border */
function PortraitGradientRing() {
  return (
    <div className="relative">
      <Float y={4} duration={5}>
        <div className="relative w-[240px] h-[240px]">
          {/* Animated gradient ring */}
          <div
            className="absolute inset-0 rounded-full animate-[spin_8s_linear_infinite]"
            style={{
              background: "conic-gradient(from 0deg, var(--primary), var(--accent), var(--warm), var(--primary))",
            }}
          />
          {/* Gap ring — creates the border effect */}
          <div className="absolute inset-[3px] rounded-full bg-background" />
          {/* Photo */}
          <div className="absolute inset-[6px] rounded-full overflow-hidden">
            <img src="/tahsin-portrait.jpg" alt={siteConfig.name.full} className="w-full h-full object-cover object-top" />
          </div>
        </div>
      </Float>
      {/* Soft glow */}
      <div className="absolute -inset-8 rounded-full bg-primary/[0.06] blur-3xl -z-10" />
    </div>
  );
}

/** Glassmorphism — frosted glass card floating over gradient blobs */
function PortraitGlassmorphism() {
  return (
    <div className="relative w-[280px]">
      {/* Background gradient blobs */}
      <div className="absolute -top-8 -left-8 w-40 h-40 rounded-full bg-primary/25 blur-3xl" />
      <div className="absolute -bottom-6 -right-6 w-36 h-36 rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-warm/15 blur-2xl" />

      <Float y={4} duration={5}>
        {/* Glass card */}
        <div className="relative rounded-2xl border border-white/[0.15] dark:border-white/[0.08] bg-white/[0.12] dark:bg-white/[0.05] backdrop-blur-xl p-3 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          {/* Photo */}
          <div className="rounded-xl overflow-hidden">
            <img src="/tahsin-portrait.jpg" alt={siteConfig.name.full} className="w-full aspect-[4/5] object-cover object-top" />
          </div>
          {/* Glass footer strip */}
          <div className="mt-2.5 flex items-center justify-between px-1">
            <span className="text-xs text-foreground/60 font-medium">{siteConfig.name.first}</span>
            <span className="text-[10px] text-foreground/30">
              {siteConfig.locationEmoji} {siteConfig.locationShort}
            </span>
          </div>
        </div>
      </Float>
    </div>
  );
}
