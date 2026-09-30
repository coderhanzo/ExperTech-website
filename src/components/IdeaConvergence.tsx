import { useEffect, useRef } from "react";

interface BlobConfig {
  id: number;
  startX: number;
  startY: number;
  size: number;
  color: string;
  glow: string;
}

const BLOBS: BlobConfig[] = [
  { id: 0, startX: 12, startY: 18, size: 72, color: "rgba(201, 120, 90, 0.55)", glow: "rgba(201, 120, 90, 0.25)" },
  { id: 1, startX: 78, startY: 12, size: 58, color: "rgba(217, 140, 106, 0.5)", glow: "rgba(217, 140, 106, 0.2)" },
  { id: 2, startX: 86, startY: 58, size: 84, color: "rgba(145, 67, 46, 0.45)", glow: "rgba(145, 67, 46, 0.18)" },
  { id: 3, startX: 8, startY: 68, size: 62, color: "rgba(201, 120, 90, 0.5)", glow: "rgba(201, 120, 90, 0.22)" },
  { id: 4, startX: 52, startY: 6, size: 48, color: "rgba(255, 176, 91, 0.45)", glow: "rgba(255, 176, 91, 0.2)" },
  { id: 5, startX: 22, startY: 82, size: 68, color: "rgba(217, 140, 106, 0.5)", glow: "rgba(217, 140, 106, 0.22)" },
];

const CONNECTIONS: [number, number][] = [
  [0, 4], [4, 1], [1, 2], [2, 5], [5, 3], [3, 0],
  [0, 1], [2, 3], [4, 5], [0, 5], [1, 3],
];

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function smoothStep(from: number, to: number, value: number) {
  const ratio = clamp((value - from) / Math.max(0.0001, to - from));
  return ratio * ratio * (3 - 2 * ratio);
}

export function IdeaConvergence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frame = 0;
    let active = true;
    let reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const update = () => {
      frame = 0;
      if (!active || !container) return;

      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;

      // Scroll progress: 0 when section bottom enters viewport, 1 when section top leaves
      const startTrigger = vh * 0.85;
      const endTrigger = -rect.height * 0.15;
      const rawProgress = reducedMotion
        ? 1
        : clamp((startTrigger - rect.top) / (startTrigger - endTrigger));

      // Animation phases
      const blobsIn = smoothStep(0, 0.12, rawProgress);
      const connectionPhase = smoothStep(0.1, 0.42, rawProgress);
      const convergencePhase = smoothStep(0.32, 0.68, rawProgress);
      const detonationBuild = smoothStep(0.58, 0.74, rawProgress);
      const detonationFlash = smoothStep(0.72, 0.82, rawProgress);
      const detonationFade = smoothStep(0.8, 0.9, rawProgress);
      const revealPhase = smoothStep(0.82, 0.98, rawProgress);

      const centerX = 50;
      const centerY = 48;

      // Update scattered blobs
      BLOBS.forEach((blob, index) => {
        const blobEl = container.querySelector(`[data-blob="${blob.id}"]`) as HTMLElement;
        const blobGlow = container.querySelector(`[data-blob-glow="${blob.id}"]`) as HTMLElement;
        if (!blobEl) return;

        const moveProgress = Math.min(1, connectionPhase * 0.25 + convergencePhase * 0.75);
        const explodeProgress = Math.max(0, detonationFlash - 0.3) / 0.7;

        const currentX = blob.startX + (centerX - blob.startX) * moveProgress;
        const currentY = blob.startY + (centerY - blob.startY) * moveProgress;

        const explodeAngle = (index / BLOBS.length) * Math.PI * 2 + 0.7;
        const explodeDist = 45 * explodeProgress;
        const finalX = currentX + Math.cos(explodeAngle) * explodeDist;
        const finalY = currentY + Math.sin(explodeAngle) * explodeDist;

        const convergeScale = 1 + convergencePhase * 0.25 + detonationBuild * 0.35;
        const explodeScale = 1 - explodeProgress * 0.85;
        const scale = convergeScale * explodeScale;

        const opacity = blobsIn * (1 - detonationFade * 0.95);

        blobEl.style.transform = `translate(${finalX - 50}%, ${finalY - 50}%) scale(${scale})`;
        blobEl.style.opacity = String(opacity);

        if (blobGlow) {
          blobGlow.style.transform = `translate(${finalX - 50}%, ${finalY - 50}%) scale(${scale * 1.4})`;
          blobGlow.style.opacity = String(opacity * 0.5);
        }
      });

      // Update connection lines
      const svg = svgRef.current;
      if (svg) {
        CONNECTIONS.forEach(([from, to], lineIndex) => {
          const lineEl = svg.querySelector(`[data-line="${lineIndex}"]`) as SVGLineElement;
          const pulseEl = svg.querySelector(`[data-line-pulse="${lineIndex}"]`) as SVGLineElement;
          if (!lineEl) return;

          const fromBlob = BLOBS[from];
          const toBlob = BLOBS[to];
          const moveProgress = Math.min(1, connectionPhase * 0.25 + convergencePhase * 0.75);

          const x1 = fromBlob.startX + (centerX - fromBlob.startX) * moveProgress;
          const y1 = fromBlob.startY + (centerY - fromBlob.startY) * moveProgress;
          const x2 = toBlob.startX + (centerX - toBlob.startX) * moveProgress;
          const y2 = toBlob.startY + (centerY - toBlob.startY) * moveProgress;

          lineEl.setAttribute("x1", String(x1));
          lineEl.setAttribute("y1", String(y1));
          lineEl.setAttribute("x2", String(x2));
          lineEl.setAttribute("y2", String(y2));

          const lineOpacity = connectionPhase * 0.5 * (1 + convergencePhase * 0.5) * (1 - detonationFlash);
          lineEl.style.opacity = String(lineOpacity * 0.45);

          if (pulseEl) {
            pulseEl.setAttribute("x1", String(x1));
            pulseEl.setAttribute("y1", String(y1));
            pulseEl.setAttribute("x2", String(x2));
            pulseEl.setAttribute("y2", String(y2));
            const pulseOpacity = lineOpacity * 0.8 * Math.sin(Date.now() * 0.003 + lineIndex * 0.7) * 0.5 + 0.5;
            pulseEl.style.opacity = String(pulseOpacity);
          }
        });
      }

      // Central convergence blob
      const centralBlob = container.querySelector("[data-central-blob]") as HTMLElement;
      if (centralBlob) {
        const centralScale = 0.3 + convergencePhase * 1.4 + detonationBuild * 0.6;
        const centralOpacity = smoothStep(0.2, 0.5, rawProgress) * (1 - detonationFade * 0.9);
        centralBlob.style.transform = `translate(-50%, -50%) scale(${centralScale})`;
        centralBlob.style.opacity = String(centralOpacity);
      }

      // Energy core (intensifies before detonation)
      const energyCore = container.querySelector("[data-energy-core]") as HTMLElement;
      if (energyCore) {
        const coreScale = detonationBuild * 1.2;
        const coreOpacity = detonationBuild * (1 - detonationFlash * 0.8);
        energyCore.style.transform = `translate(-50%, -50%) scale(${coreScale})`;
        energyCore.style.opacity = String(coreOpacity);
      }

      // Detonation flash
      const flash = container.querySelector("[data-flash]") as HTMLElement;
      if (flash) {
        const flashPeak = smoothStep(0.74, 0.79, rawProgress);
        const flashDecay = 1 - smoothStep(0.78, 0.88, rawProgress);
        const flashOpacity = flashPeak * flashDecay;
        const flashScale = 0.3 + smoothStep(0.72, 0.86, rawProgress) * 2.2;
        flash.style.opacity = String(flashOpacity);
        flash.style.transform = `translate(-50%, -50%) scale(${flashScale})`;
      }

      // Shockwave ring
      const shockwave = container.querySelector("[data-shockwave]") as HTMLElement;
      if (shockwave) {
        const swProgress = smoothStep(0.76, 0.92, rawProgress);
        const swOpacity = Math.max(0, smoothStep(0.76, 0.82, rawProgress) - smoothStep(0.84, 0.94, rawProgress));
        const swScale = 0.2 + swProgress * 2.8;
        shockwave.style.opacity = String(swOpacity * 0.6);
        shockwave.style.transform = `translate(-50%, -50%) scale(${swScale})`;
      }

      // Secondary shockwave
      const shockwave2 = container.querySelector("[data-shockwave-2]") as HTMLElement;
      if (shockwave2) {
        const sw2Progress = smoothStep(0.78, 0.96, rawProgress);
        const sw2Opacity = Math.max(0, smoothStep(0.78, 0.85, rawProgress) - smoothStep(0.88, 0.98, rawProgress));
        const sw2Scale = 0.15 + sw2Progress * 3.2;
        shockwave2.style.opacity = String(sw2Opacity * 0.35);
        shockwave2.style.transform = `translate(-50%, -50%) scale(${sw2Scale})`;
      }

      // Particles burst
      const particlesContainer = container.querySelector("[data-particles]") as HTMLElement;
      if (particlesContainer) {
        const particleProgress = Math.max(0, smoothStep(0.75, 0.82, rawProgress) - smoothStep(0.82, 0.95, rawProgress));
        particlesContainer.style.opacity = String(particleProgress);

        particlesContainer.querySelectorAll<HTMLElement>("[data-particle]").forEach((particle, i) => {
          const angle = (i / 12) * Math.PI * 2 + 0.3;
          const dist = 30 + (i % 3) * 15;
          const px = Math.cos(angle) * dist * smoothStep(0.75, 0.9, rawProgress);
          const py = Math.sin(angle) * dist * smoothStep(0.75, 0.9, rawProgress);
          const pScale = 1 - smoothStep(0.8, 0.95, rawProgress) * 0.7;
          particle.style.transform = `translate(${px}px, ${py}px) scale(${pScale})`;
        });
      }

      // N Logo reveal
      const logo = container.querySelector("[data-logo]") as HTMLElement;
      if (logo) {
        const logoScale = 0.65 + revealPhase * 0.35;
        logo.style.opacity = String(revealPhase);
        logo.style.transform = `translate(-50%, -50%) scale(${logoScale})`;
      }

      // Logo glow / halo
      const logoGlow = container.querySelector("[data-logo-glow]") as HTMLElement;
      if (logoGlow) {
        const glowPulse = 1 + Math.sin(Date.now() * 0.0025) * 0.08;
        logoGlow.style.opacity = String(revealPhase * 0.35);
        logoGlow.style.transform = `translate(-50%, -50%) scale(${glowPulse})`;
      }

      // Logo sweep shine
      const logoSweep = container.querySelector("[data-logo-sweep]") as HTMLElement;
      if (logoSweep) {
        const sweepProgress = smoothStep(0.88, 1, rawProgress);
        logoSweep.style.opacity = String(revealPhase * 0.9);
        logoSweep.style.backgroundPosition = `${-120 + sweepProgress * 240}% center`;
      }

      // Tagline reveal
      const tagline = container.querySelector("[data-tagline]") as HTMLElement;
      if (tagline) {
        const taglineY = 12 * (1 - revealPhase);
        tagline.style.opacity = String(smoothStep(0.88, 0.98, rawProgress));
        tagline.style.transform = `translateY(${taglineY}px)`;
      }
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
        if (active) requestUpdate();
      },
      { rootMargin: "25% 0px" }
    );

    const onPreferenceChange = () => {
      reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      requestUpdate();
    };

    observer.observe(container);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", onPreferenceChange);
    requestUpdate();

    return () => {
      active = false;
      observer.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.matchMedia("(prefers-reduced-motion: reduce)").removeEventListener("change", onPreferenceChange);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={containerRef} className="idea-convergence">
      {/* SVG connection lines */}
      <svg
        ref={svgRef}
        className="idea-convergence__svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {CONNECTIONS.map((_, index) => (
          <g key={index}>
            <line
              data-line={index}
              x1="50"
              y1="50"
              x2="50"
              y2="50"
              stroke="rgba(201, 120, 90, 0.35)"
              strokeWidth="0.4"
              strokeLinecap="round"
            />
            <line
              data-line-pulse={index}
              x1="50"
              y1="50"
              x2="50"
              y2="50"
              stroke="rgba(255, 200, 140, 0.6)"
              strokeWidth="0.25"
              strokeLinecap="round"
            />
          </g>
        ))}
      </svg>

      {/* Blob glows (behind blobs) */}
      {BLOBS.map((blob) => (
        <div
          key={`glow-${blob.id}`}
          data-blob-glow={blob.id}
          className="idea-convergence__blob-glow"
          style={{
            width: blob.size * 1.6,
            height: blob.size * 1.6 * 0.85,
            background: blob.glow,
          }}
        />
      ))}

      {/* Scattered idea blobs */}
      {BLOBS.map((blob) => (
        <div
          key={blob.id}
          data-blob={blob.id}
          className="idea-convergence__blob"
          style={{
            width: blob.size,
            height: blob.size * 0.85,
            background: blob.color,
          }}
        />
      ))}

      {/* Central convergence blob */}
      <div
        data-central-blob
        className="idea-convergence__central-blob"
      />

      {/* Energy core (pre-detonation) */}
      <div
        data-energy-core
        className="idea-convergence__energy-core"
      />

      {/* Detonation flash */}
      <div data-flash className="idea-convergence__flash" />

      {/* Shockwave rings */}
      <div data-shockwave className="idea-convergence__shockwave" />
      <div data-shockwave-2 className="idea-convergence__shockwave idea-convergence__shockwave--secondary" />

      {/* Burst particles */}
      <div data-particles className="idea-convergence__particles">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            data-particle={i}
            className="idea-convergence__particle"
            style={{
              background:
                i % 3 === 0
                  ? "rgba(255, 200, 140, 0.9)"
                  : i % 3 === 1
                    ? "rgba(201, 120, 90, 0.85)"
                    : "rgba(255, 240, 210, 0.8)",
            }}
          />
        ))}
      </div>

      {/* N Logo */}
      <div data-logo className="idea-convergence__logo">
        <img src="/favicon.svg" alt="" draggable={false} />
        <div data-logo-sweep className="idea-convergence__logo-sweep" />
      </div>

      {/* Logo glow halo */}
      <div data-logo-glow className="idea-convergence__logo-glow" />

      {/* Tagline */}
      <p data-tagline className="idea-convergence__tagline">
        Your complete solution
      </p>
    </div>
  );
}
