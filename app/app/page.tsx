import CodeBlock from "@/components/CodeBlock";
import SiteHeader from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight, Boxes, Github, Globe2, Layers, PlayCircle, Radio, ShieldCheck, Sparkles, Workflow, Zap } from "lucide-react";
import Link from "next/link";
;


export default function Home() {

const heroSnippet = `import { createDepliteClient } from "deplite"

const client = createDepliteClient({
  programId: "...",
  admin: "...",
})

const enabled = await client.get("version_intelligence")`;

const readSnippet = `const enabled = await client.get("feature_name")`;

const subSnippet = `client.subscribe("feature_name", (val) => {
  // react instantly
})`;

const valueCards = [
  { icon: Zap, title: "No redeploys", body: "Flip a flag and your apps update instantly. No CI, no rollouts, no downtime." },
  { icon: Layers, title: "Shared state across apps", body: "One on-chain configuration source. Every client reads the same truth." },
  { icon: ShieldCheck, title: "No backend required", body: "Skip the config service. Solana is your highly-available control plane." },
];

const steps = [
  { n: "01", title: "Create & toggle flags", body: "Manage flags from the Deplite dashboard. One click to enable or disable." },
  { n: "02", title: "State stored on Solana", body: "Each flag is a PDA. Updates are signed transactions, verifiable by anyone." },
  { n: "03", title: "Apps read & react", body: "SDK clients read flag state and subscribe to live updates over RPC." },
];

const whySolana = [
  { icon: Globe2, title: "Shared global state", body: "A single source of truth across services, regions, and teams." },
  { icon: ShieldCheck, title: "Verifiable & transparent", body: "Every flip is a signed, on-chain transaction. Auditable by default." },
  { icon: Boxes, title: "No centralized backend", body: "No config server to operate, scale, or page someone about at 3am." },
  { icon: Workflow, title: "Composable across apps", body: "Other programs and apps can read your flag state. Build on top." },
];


  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-16 lg:pt-20 lg:pb-20">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-xs font-medium text-primary mb-6">
              <Sparkles className="h-3 w-3" />
              Powered by Solana
              <span className="text-primary/40">•</span>
              <span className="text-primary/80">On-chain control plane</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance text-foreground">
              Feature flags on <span className="text-primary">Solana.</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl text-balance">
              Control application features without redeploying. Deplite turns feature flags into a shared on-chain configuration layer.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="press shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all bg-primary hover:bg-primary-hover">
                <Link href="/dashboard">
                  Get Started
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="press hover:border-primary/40 hover:text-primary transition-all">
                <a href="https://github.com" target="_blank" rel="noreferrer">
                  <Github className="mr-1.5 h-4 w-4" />
                  View GitHub
                </a>
              </Button>
              <Button asChild size="lg" variant="ghost" className="press">
                <a href="#demo">
                  <PlayCircle className="mr-1.5 h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            </div>
          </div>

          <div className="mt-12 max-w-3xl mx-auto animate-fade-in transition-all duration-300 hover:-translate-y-0.5 hover:shadow-blue-glow rounded-lg">
            <CodeBlock code={heroSnippet} filename="app.ts" language="typescript" />
          </div>
        </div>
      </section>

      {/* CORE VALUE */}
      <section className="border-t border-border bg-surface-muted">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid md:grid-cols-3 gap-6">
            {valueCards.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-xl border border-border bg-card p-6 lift hover:border-primary/40"
              >
                <div className="h-9 w-9 rounded-md bg-primary-soft text-primary flex items-center justify-center mb-4">
                  <Icon className="h-4.5 w-4.5" strokeWidth={2} />
                </div>
                <h3 className="font-semibold text-lg text-foreground">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-28">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-wider text-primary mb-3">How it works</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">A control plane on-chain.</h2>
            <p className="mt-4 text-lg text-muted-foreground">Three simple steps from flag creation to runtime behavior change.</p>
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-6 relative">
            {steps.map((s, i) => (
              <div key={s.n} className="relative bg-card border border-border rounded-xl p-7 lift hover:border-primary/40">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-primary-foreground font-mono text-sm font-semibold shadow-md">
                  {i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 -right-3 z-10 text-border">
                    <ArrowRight className="h-5 w-5 text-muted-foreground/40" />
                  </div>
                )}
                <h3 className="mt-5 font-semibold text-lg text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY SOLANA */}
      <section className="border-t border-border bg-surface-muted">
        <div className="mx-auto max-w-7xl px-6 py-28">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-primary mb-3">Why Solana</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                Why Solana, not a backend?
              </h2>
              <p className="mt-5 text-xl font-medium text-foreground leading-snug">
                Deplite replaces your feature flag backend with a shared on-chain state layer.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Solana gives you something a typical SaaS feature-flag service can't: a verifiable, globally
                consistent state layer with no single operator.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {whySolana.map(({ icon: Icon, title, body }) => (
                <div key={title} className="rounded-lg border border-border bg-card p-5 lift hover:border-primary/40">
                  <Icon className="h-4 w-4 text-primary" />
                  <h4 className="mt-3 font-semibold text-sm text-foreground">{title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DEMO */}
      <section id="demo" className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-primary mb-3">Live demo</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">See on-chain flags in action.</h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Flip a flag → watch UI update instantly. This app enables and disables features
                based on on-chain state, with no redeploy.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild className="press hover:bg-primary-hover">
                  <a href="#" target="_blank" rel="noreferrer">
                    Open Xandeum demo
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="press hover:border-primary/40 hover:text-primary">
                  <Link href="/dashboard">Try it yourself</Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-video rounded-2xl border border-border bg-gradient-to-br from-secondary/60 to-primary-soft/40 flex items-center justify-center group cursor-pointer overflow-hidden hover:border-primary/40 hover:shadow-lg transition-all">
              <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
              <div className="relative flex flex-col items-center">
                <div className="relative">
                  <span className="absolute inset-0 rounded-full animate-pulse-ring" />
                  <div className="relative h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <PlayCircle className="h-8 w-8" />
                  </div>
                </div>
                <span className="mt-4 text-sm font-medium text-foreground">Watch a 60s walkthrough</span>
                <span className="mt-1 text-xs text-muted-foreground">Flip a flag → watch UI update instantly</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEVELOPER EXPERIENCE */}
      <section className="border-t border-border bg-surface-muted">
        <div className="mx-auto max-w-7xl px-6 py-28">
          <div className="max-w-2xl mb-10">
            <p className="font-mono text-xs uppercase tracking-wider text-primary mb-3">Developer experience</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">Two lines to read. One to subscribe.</h2>
            <p className="mt-4 text-lg text-muted-foreground">A tiny SDK that gets out of your way.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="transition-all duration-300 hover:-translate-y-0.5 rounded-lg hover:shadow-blue-glow">
              <div className="flex items-center gap-2 mb-3">
                <Radio className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Read a flag</span>
              </div>
              <CodeBlock code={readSnippet} language="ts" />
            </div>
            <div className="transition-all duration-300 hover:-translate-y-0.5 rounded-lg hover:shadow-blue-glow">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Subscribe to changes</span>
              </div>
              <CodeBlock code={subSnippet} language="ts" />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded bg-primary/90" />
            <span className="font-medium text-foreground">Deplite</span>
            <span>— Feature flags on Solana.</span>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/docs" className="hover:text-foreground transition-colors">Docs</Link>
            <Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
            <a href="https://github.com" className="hover:text-foreground transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}