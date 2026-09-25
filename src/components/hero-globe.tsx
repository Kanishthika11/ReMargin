import { useEffect, useRef } from "react";
import heroVideo from "@/assets/create_a_GIF_of_this_earthrota.mp4";

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

          // Key out background (both dark/black studio background & light backdrop)
          for (let i = 0; i < len; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const brightness = (r + g + b) / 3;

            // Remove dark/black video background
            if (brightness < 18) {
              data[i + 3] = 0;
            } else if (brightness < 40) {
              const factor = (brightness - 18) / 22;
              data[i + 3] = Math.round(255 * factor);
            } else if (
              brightness > 175 &&
              Math.abs(r - g) <= 15 &&
              Math.abs(g - b) <= 15
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

      {/* Canvas displaying keyed rotating earth globe seamlessly on landing page dark green background */}
      <canvas
        ref={canvasRef}
        width={1280}
        height={720}
        className="w-full h-auto object-contain drop-shadow-[0_0_50px_rgba(72,166,94,0.25)] rounded-2xl relative z-10"
      />
    </div>
  );
}
