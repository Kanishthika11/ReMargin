import { useEffect, useRef } from "react";
import heroVideo from "@/assets/logo_branding.mp4";

export function HeroGlobe() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    // Ensure immediate rotation as soon as opening the landing page
    video.muted = true;
    video.defaultMuted = true;
    const startPlayback = () => {
      video.play().catch(() => {});
    };

    startPlayback();
    video.addEventListener("loadedmetadata", startPlayback);
    video.addEventListener("canplay", startPlayback);

    let animId: number;
    let isRunning = true;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    const render = () => {
      if (!isRunning) return;

      if (video.readyState >= 2 && ctx && !video.paused) {
        if (canvas.width !== video.videoWidth && video.videoWidth > 0) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
        }

        if (canvas.width > 0 && canvas.height > 0) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = frame.data;
          const len = data.length;

          // Merge light grey studio background into the page background green
          for (let i = 0; i < len; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const brightness = (r + g + b) / 3;

            // Background is neutral off-white/grey studio backdrop
            if (
              brightness > 175 &&
              Math.abs(r - g) <= 12 &&
              Math.abs(g - b) <= 12 &&
              Math.abs(r - b) <= 12
            ) {
              const factor = Math.min(1, Math.max(0, (brightness - 175) / 25));
              data[i + 3] = Math.round(255 * (1 - factor));
            }
          }
          ctx.putImageData(frame, 0, 0);
        }
      }

      if ("requestVideoFrameCallback" in video) {
        (video as any).requestVideoFrameCallback(render);
      } else {
        animId = requestAnimationFrame(render);
      }
    };

    if ("requestVideoFrameCallback" in video) {
      (video as any).requestVideoFrameCallback(render);
    } else {
      animId = requestAnimationFrame(render);
    }

    return () => {
      isRunning = false;
      cancelAnimationFrame(animId);
      video.removeEventListener("loadedmetadata", startPlayback);
      video.removeEventListener("canplay", startPlayback);
    };
  }, []);

  return (
    <div className="relative w-full max-w-xl flex items-center justify-center">
      {/* Hidden source video ensuring continuous, muted, instant autoplay */}
      <video
        ref={videoRef}
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 opacity-0 pointer-events-none w-1 h-1"
      />

      {/* Canvas displaying keyed rotating globe with sharp corners and border */}
      <canvas
        ref={canvasRef}
        width={1280}
        height={720}
        className="w-full h-auto object-contain drop-shadow-2xl rounded-none border border-primary/20 relative z-10"
      />
    </div>
  );
}
