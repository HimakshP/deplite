
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const nav = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Docs", to: "/docs" },
  { label: "GitHub", to: "https://github.com", external: true },
];

export default function SiteHeader() {
  
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-6 w-6 rounded-md bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center shadow-sm">
            <span className="text-primary-foreground font-bold text-[11px] font-mono">D</span>
          </div>
          <span className="font-semibold tracking-tight">Deplite</span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-primary-soft text-primary">
            beta
          </span>
        </Link>


        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="press">
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}