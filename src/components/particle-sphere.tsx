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

    const numParticles = 150; 
    const sphereRadius = Math.min(width, height) * 0.45;
    
    // Background stray particles
    const particles: {x: number, y: number, z: number, r: number, baseAlpha: number}[] = [];
    for (let i = 0; i < numParticles; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / numParticles);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      
      particles.push({
        x: Math.cos(theta) * Math.sin(phi),
        y: Math.sin(theta) * Math.sin(phi),
        z: Math.cos(phi),
        r: Math.random() * 1.2 + 0.3,
        baseAlpha: Math.random() * 0.4 + 0.1
      });
    }

    // Orbital rings
    const rings = [
      { rx: 1.2, ry: 0.5, rz: 0.2, speed: 0.015, offset: 0 },
      { rx: -0.8, ry: 1.1, rz: -0.4, speed: -0.01, offset: Math.PI },
      { rx: 0.4, ry: -1.2, rz: 0.6, speed: 0.02, offset: Math.PI / 2 }
    ];

    let angleX = 0;
    let angleY = 0;
    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw inner glowing glassy orb (looks of the globe)
      const orbGradient = ctx.createRadialGradient(width/2, height/2, sphereRadius * 0.4, width/2, height/2, sphereRadius);
      orbGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
      orbGradient.addColorStop(0.7, 'rgba(6, 40, 20, 0.4)');
      orbGradient.addColorStop(0.95, 'rgba(74, 222, 128, 0.3)');
      orbGradient.addColorStop(1, 'rgba(74, 222, 128, 0.0)');
      ctx.fillStyle = orbGradient;
      ctx.beginPath();
      ctx.arc(width/2, height/2, sphereRadius, 0, Math.PI * 2);
      ctx.fill();

      // Rotate stray particles slowly
      angleY += 0.002;
      angleX += 0.001;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      // Render stray particles
      particles.forEach(p => {
        let y1 = p.y * cosX - p.z * sinX;
        let z1 = p.y * sinX + p.z * cosX;
        let x2 = p.x * cosY + z1 * sinY;
        let z2 = -p.x * sinY + z1 * cosY;

        const perspective = 400;
        const zProjected = perspective + z2 * sphereRadius;
        if (zProjected <= 0) return;
        
        const scaleProjected = perspective / zProjected;
        const xProjected = (x2 * sphereRadius * scaleProjected) + width / 2;
        const yProjected = (y1 * sphereRadius * scaleProjected) + height / 2;

        const depthAlpha = (1 - z2) / 2;
        const finalAlpha = p.baseAlpha * depthAlpha;
        
        if (finalAlpha > 0.02) {
          ctx.beginPath();
          ctx.arc(xProjected, yProjected, p.r * scaleProjected, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(74, 222, 128, ${finalAlpha})`;
          if (z2 < 0) {
            ctx.shadowBlur = 3 * scaleProjected;
            ctx.shadowColor = `rgba(74, 222, 128, ${finalAlpha * 0.8})`;
          } else {
            ctx.shadowBlur = 0;
          }
          ctx.fill();
        }
      });

      // Render orbital rings with moving comet tails
      const numRingSegments = 120;
      rings.forEach(ring => {
        ring.offset += ring.speed;
        
        const ringPoints = [];
        for (let i = 0; i < numRingSegments; i++) {
          const angle = (i / numRingSegments) * Math.PI * 2;
          
          let x = Math.cos(angle);
          let y = 0;
          let z = Math.sin(angle);

          // Apply fixed tilt for this ring
          let y1 = y * Math.cos(ring.rx) - z * Math.sin(ring.rx);
          let z1 = y * Math.sin(ring.rx) + z * Math.cos(ring.rx);
          let x2 = x * Math.cos(ring.ry) + z1 * Math.sin(ring.ry);
          let z2 = -x * Math.sin(ring.ry) + z1 * Math.cos(ring.ry);
          let x3 = x2 * Math.cos(ring.rz) - y1 * Math.sin(ring.rz);
          let y3 = x2 * Math.sin(ring.rz) + y1 * Math.cos(ring.rz);

          // Project
          const perspective = 400;
          const zProjected = perspective + z2 * sphereRadius;
          if (zProjected > 0) {
            const scaleProjected = perspective / zProjected;
            const xProjected = (x3 * sphereRadius * scaleProjected) + width / 2;
            const yProjected = (y3 * sphereRadius * scaleProjected) + height / 2;
            
            // Calculate comet tail intensity
            let normOffset = ((ring.offset % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
            let diff = angle - normOffset;
            
            if (ring.speed > 0) {
              if (diff > 0) diff -= Math.PI * 2;
            } else {
              if (diff < 0) diff += Math.PI * 2;
            }
            
            const tailLength = Math.PI * 1.2;
            let intensity = 0;
            if (Math.abs(diff) < tailLength) {
              intensity = 1 - (Math.abs(diff) / tailLength);
            }

            const depthAlpha = (1 - z2) / 2; // Fade out in back
            
            ringPoints.push({
              x: xProjected,
              y: yProjected,
              z: z2,
              scale: scaleProjected,
              intensity: Math.pow(intensity, 2) * depthAlpha, 
              baseAlpha: depthAlpha
            });
          }
        }

        // Draw ring segments
        for (let i = 0; i < ringPoints.length; i++) {
          const pt = ringPoints[i];
          const nextPt = ringPoints[(i + 1) % ringPoints.length];
          
          ctx.beginPath();
          ctx.moveTo(pt.x, pt.y);
          ctx.lineTo(nextPt.x, nextPt.y);
          
          // Faint full ring background line
          ctx.strokeStyle = `rgba(74, 222, 128, ${pt.baseAlpha * 0.15})`;
          ctx.lineWidth = 1 * pt.scale;
          ctx.shadowBlur = 0;
          ctx.stroke();

          // Glowing tail segment on top
          if (pt.intensity > 0.01) {
            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y);
            ctx.lineTo(nextPt.x, nextPt.y);
            ctx.strokeStyle = `rgba(74, 222, 128, ${pt.intensity * 1.5})`;
            ctx.lineWidth = (1 + pt.intensity * 2.5) * pt.scale;
            if (pt.z < 0) {
               ctx.shadowBlur = 12 * pt.scale * pt.intensity;
               ctx.shadowColor = `rgba(74, 222, 128, ${pt.intensity})`;
            } else {
               ctx.shadowBlur = 0;
            }
            ctx.stroke();
          }
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
