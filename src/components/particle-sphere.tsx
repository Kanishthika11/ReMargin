import { useEffect, useRef } from "react";

export function ParticleSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    
    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: {x: number, y: number, z: number, r: number, baseAlpha: number}[] = [];
    const numParticles = 400; // Dense enough for a good 3D feel
    const sphereRadius = Math.min(width, height) * 0.45;
    
    // Distribute particles across a 3D sphere surface
    for (let i = 0; i < numParticles; i++) {
      // Golden ratio spiral for even distribution
      const phi = Math.acos(1 - 2 * (i + 0.5) / numParticles);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      
      const x = Math.cos(theta) * Math.sin(phi);
      const y = Math.sin(theta) * Math.sin(phi);
      const z = Math.cos(phi);
      
      particles.push({
        x, y, z,
        r: Math.random() * 1.5 + 0.5,
        baseAlpha: Math.random() * 0.5 + 0.3
      });
    }

    let angleX = 0;
    let angleY = 0;
    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Slow constant rotation
      angleY += 0.003;
      angleX += 0.001;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      particles.forEach(p => {
        // 3D Rotation Math
        let y1 = p.y * cosX - p.z * sinX;
        let z1 = p.y * sinX + p.z * cosX;

        let x2 = p.x * cosY + z1 * sinY;
        let z2 = -p.x * sinY + z1 * cosY;

        // Perspective projection
        const perspective = 400;
        const zProjected = perspective + z2 * sphereRadius;
        
        // Prevent division by zero
        if (zProjected <= 0) return;
        
        const scaleProjected = perspective / zProjected;
        
        const xProjected = (x2 * sphereRadius * scaleProjected) + width / 2;
        const yProjected = (y1 * sphereRadius * scaleProjected) + height / 2;

        // Calculate opacity based on Z-depth (front is opaque, back is faded)
        // z2 ranges from -1 (front) to 1 (back)
        const depthAlpha = (1 - z2) / 2; // 1 at front, 0 at back
        const finalAlpha = p.baseAlpha * depthAlpha;
        
        if (finalAlpha > 0.05) {
          ctx.beginPath();
          ctx.arc(xProjected, yProjected, p.r * scaleProjected, 0, Math.PI * 2);
          
          // Using a vibrant primary-like color for the dots
          ctx.fillStyle = `rgba(74, 222, 128, ${finalAlpha})`; // green-400
          
          // Add glow to dots closer to the front
          if (z2 < 0) {
            ctx.shadowBlur = 4 * scaleProjected;
            ctx.shadowColor = `rgba(74, 222, 128, ${finalAlpha * 0.8})`;
          } else {
            ctx.shadowBlur = 0;
          }
          
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none rounded-full"
    />
  );
}
