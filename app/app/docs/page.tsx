"use client"

import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import CodeBlock from "@/components/CodeBlock";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Section = { id: string; label: string };
type Group = { title: string; items: Section[] };

const groups: Group[] = [
  {
    title: "Getting Started",
    items: [
      { id: "installation", label: "Installation" },
      { id: "quickstart", label: "Quickstart" },
      { id: "core-concepts", label: "Core Concepts" },
    ],
  },
  {
    title: "SDK Reference",
    items: [
      { id: "client-init", label: "Client Initialization" },
      { id: "reading-state", label: "Reading State" },
      { id: "subscriptions", label: "Subscriptions" },
      { id: "error-handling", label: "Error Handling" },
    ],
  },
  {
    title: "API",
    items: [
      { id: "rest", label: "REST Endpoints" },
      { id: "rpc", label: "RPC Methods" },
    ],
  },
];

export default function Docs() {
  const [active, setActive] = useState("installation");

  useEffect(() => {
    const ids = groups.flatMap((g) => g.items.map((i) => i.id));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="mx-auto max-w-7xl px-6 lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        {/* Sidebar */}
        <aside className="hidden lg:block sticky top-14 self-start h-[calc(100vh-3.5rem)] overflow-y-auto py-10 pr-4">
          <nav className="space-y-7">
            {groups.map((group) => (
              <div key={group.title}>
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
                  {group.title}
                </p>
                <ul className="space-y-0.5 border-l border-border">
                  {group.items.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={() => setActive(item.id)}
                        className={cn(
                          "block pl-4 -ml-px py-1.5 text-sm border-l-2 transition-all",
                          active === item.id
                            ? "border-primary text-primary font-semibold bg-primary-soft/40 rounded-r"
                            : "border-transparent text-muted-foreground hover:text-foreground hover:border-foreground/30"
                        )}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="py-10 lg:py-14 max-w-2xl">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground">Deplite</Link>
            <ChevronRight className="h-3 w-3" />
            <span>Documentation</span>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight">Documentation</h1>
          <p className="mt-2 text-muted-foreground">
            Everything you need to integrate Deplite into your application — from install to subscriptions.
          </p>

          <Section id="installation" title="Installation" eyebrow="Getting Started">
            <p>Install the Deplite SDK with your package manager of choice.</p>
            <CodeBlock code={`npm install deplite`} language="bash" />
          </Section>

          <Section id="quickstart" title="Quickstart">
            <p>Create a client, point it at your program, and read your first flag.</p>
            <CodeBlock
              code={`import { createDepliteClient } from "deplite"

const client = createDepliteClient({
  programId: "...",
  admin: "...",
})

const enabled = await client.get("feature_name")`}
              language="ts"
              filename="client.ts"
            />
          </Section>

          <Section id="core-concepts" title="Core Concepts">
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Feature flags are stored on-chain as Solana program state.</li>
              <li>Each flag lives at a deterministic <em>PDA</em> derived from your program and flag name.</li>
              <li>Apps read flag state directly — no centralized backend in the loop.</li>
              <li>Updates are signed transactions, so every change is verifiable and auditable.</li>
            </ul>
          </Section>

          <Section id="client-init" title="Client Initialization" eyebrow="SDK Reference">
            <p>Configure the client with your program ID, admin pubkey, and an optional RPC.</p>
            <CodeBlock
              code={`createDepliteClient({
  programId: "Dep1...",   // your deployed program
  admin:     "9xQe...",   // pubkey allowed to flip flags
  rpc:       "https://api.devnet.solana.com", // optional
})`}
              language="ts"
            />
            <ConfigTable />
          </Section>

          <Section id="reading-state" title="Reading State">
            <p>Read a flag's current value. Returns a boolean.</p>
            <CodeBlock
              code={`const enabled = await client.get("feature_name")`}
              language="ts"
            />
          </Section>

          <Section id="subscriptions" title="Subscriptions">
            <p>Subscribe to a flag and react to changes in real time.</p>
            <CodeBlock
              code={`client.subscribe("feature_name", (val) => {
  // realtime updates
})`}
              language="ts"
            />
          </Section>

          <Section id="error-handling" title="Error Handling">
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Missing flag → returns <code className="font-mono text-foreground bg-secondary px-1 rounded text-xs">false</code>.</li>
              <li>RPC failures fall back to the last known cached value.</li>
              <li>Network errors during subscription auto-retry with exponential backoff.</li>
            </ul>
          </Section>

          <Section id="rest" title="REST Endpoints" eyebrow="API">
            <p className="text-muted-foreground">Coming soon — a hosted REST gateway for non-Solana clients.</p>
          </Section>

          <Section id="rpc" title="RPC Methods">
            <p className="text-muted-foreground">Coming soon — direct RPC method documentation for advanced integrators.</p>
          </Section>

          <div className="mt-16 pt-6 border-t border-border text-sm text-muted-foreground">
            Need help? <a href="https://github.com" className="text-primary hover:underline">Open an issue on GitHub</a>.
          </div>
        </main>
      </div>
    </div>
  );
}

function Section({
  id,
  title,
  eyebrow,
  children,
}: {
  id: string;
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 mt-16 first:mt-10">
      {eyebrow && (
        <p className="font-mono text-[11px] uppercase tracking-wider text-primary mb-2">{eyebrow}</p>
      )}
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{title}</h2>
      <div className="mt-5 space-y-5 text-[15px] leading-relaxed text-foreground/90">{children}</div>
    </section>
  );
}

function ConfigTable() {
  const rows = [
    { key: "programId", type: "string", desc: "Your deployed Deplite program address." },
    { key: "admin", type: "string", desc: "Pubkey allowed to update flag state." },
    { key: "rpc", type: "string?", desc: "Custom Solana RPC URL. Defaults to devnet." },
  ];
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-secondary/60 text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="text-left font-medium px-4 py-2.5">Option</th>
            <th className="text-left font-medium px-4 py-2.5">Type</th>
            <th className="text-left font-medium px-4 py-2.5">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.key} className={cn(i !== 0 && "border-t border-border")}>
              <td className="px-4 py-2.5 font-mono text-xs">{r.key}</td>
              <td className="px-4 py-2.5 font-mono text-xs text-primary">{r.type}</td>
              <td className="px-4 py-2.5 text-muted-foreground">{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}