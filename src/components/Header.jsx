import { Link } from "react-router-dom";
import { Settings } from "lucide-react";

export function Header({ variant = "default" }) {
  const light = variant === "transparent";

  return (
    <header className="z-20 flex items-center justify-between p-4">
      <div>
        <Link
          to="/"
          className={`flex items-center gap-2 text-2xl font-bold font-headline ${
            light ? "text-white" : "text-primary-foreground"
          }`}
        >
          <span className="text-4xl">🌸</span>
          <span>봄 꽃 미션 챌린지</span>
          <span className="text-4xl">🌸</span>
        </Link>
        <p
          className={`text-center text-xs font-light ${
            light ? "text-white/70" : "text-muted-foreground"
          }`}
        >
          made by gemidain
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-full border border-destructive/50 bg-destructive/10 px-3 py-1 text-sm font-bold text-destructive">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-destructive" />
          </span>
          <span>LIVE</span>
        </div>
        <Link
          to="/settings"
          aria-label="설정"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground"
        >
          <Settings className="h-7 w-7 text-destructive hover:text-destructive/90" />
        </Link>
      </div>
    </header>
  );
}
