import { Link } from "@tanstack/react-router";
import { ReMarginLogo } from "./remargin-logo";
import logoBrandingVideo from "@/assets/logo_branding.mp4";

const sparks = [
  { top: "12%", left: "22%", size: "w-1 h-1", delay: "0s", duration: "3s" },
  { top: "22%", left: "78%", size: "w-1.5 h-1.5", delay: "1s", duration: "4s" },
  { top: "38%", left: "18%", size: "w-1 h-1", delay: "0.5s", duration: "2.5s" },
  { top: "58%", left: "82%", size: "w-2 h-2", delay: "1.5s", duration: "5s" },
  { top: "68%", left: "28%", size: "w-1 h-1", delay: "2s", duration: "3.5s" },
  { top: "82%", left: "68%", size: "w-1.5 h-1.5", delay: "0.8s", duration: "4.2s" },
  { top: "32%", left: "62%", size: "w-1 h-1", delay: "1.2s", duration: "3s" },
  { top: "48%", left: "32%", size: "w-1.5 h-1.5", delay: "0.3s", duration: "4s" },
  { top: "78%", left: "48%", size: "w-1 h-1", delay: "1.8s", duration: "3.2s" },
  { top: "18%", left: "42%", size: "w-2 h-2", delay: "2.2s", duration: "4.5s" },
  { top: "88%", left: "18%", size: "w-1 h-1", delay: "0.7s", duration: "3.8s" },
  { top: "10%", left: "88%", size: "w-1 h-1", delay: "1.4s", duration: "2.8s" },
  { top: "52%", left: "12%", size: "w-1.5 h-1.5", delay: "0.9s", duration: "3.6s" },
  { top: "62%", left: "68%", size: "w-1 h-1", delay: "1.7s", duration: "4.1s" },
];

function SparkBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {sparks.map((spark, i) => (
        <div
          key={i}
          className={`absolute rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)] animate-pulse ${spark.size}`}
          style={{
            top: spark.top,
            left: spark.left,
            animationDelay: spark.delay,
            animationDuration: spark.duration,
            opacity: 0.75,
          }}
        />
      ))}
    </div>
  );
}

export function AuthPage({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <main className="grid min-h-screen bg-[#09140b] lg:grid-cols-[.8fr_1.2fr]">
      <section className="hidden bg-[radial-gradient(ellipse_at_center,_#1d3c26_0%,_#102417_50%,_#09140b_100%)] p-12 text-sidebar-foreground lg:flex lg:flex-col border-r border-sidebar-border/30 relative overflow-hidden">
        <SparkBackground />
        <div className="relative z-10 flex flex-col h-full w-full">
          <ReMarginLogo />
          <div className="my-auto flex items-center justify-center w-full py-6">
            <div className="w-full max-w-xl flex items-center justify-center relative">
              <video 
                src={logoBrandingVideo} 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-auto object-contain scale-110 [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_95%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_95%)]"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="flex items-center justify-center px-4 py-12 sm:px-8 bg-[#f4f9e8] text-zinc-900 relative z-10">
        <div className="w-full max-w-lg">
          <div className="mb-10 inline-flex lg:hidden"><ReMarginLogo /></div>
          <p className="text-xs font-extrabold uppercase tracking-widest text-[#5c9c14] mb-2">ReMargin workspace</p>
          <h1 className="font-display text-3xl font-extrabold text-[#1c3520] tracking-tight">{title}</h1>
          <p className="mt-2 text-sm font-medium text-[#3a543e]">{subtitle}</p>
          <div className="mt-8 auth-form-container">{children}</div>
        </div>
      </section>
    </main>
  );
}