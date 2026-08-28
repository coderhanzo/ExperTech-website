import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

interface NodePoint {
  start: [number, number, number];
  target: [number, number, number];
  phase: number;
  scale: number;
  color: number;
}

interface NetworkLink {
  from: number;
  to: number;
  reveal: number;
}

interface NetworkShape {
  nodes: NodePoint[];
  links: NetworkLink[];
}

const STORY = [
  {
    step: "01",
    label: "Listen",
    line: "Start with the signals.",
    accent: "Not the software.",
    body: "Customer requests, team handoffs and daily work reveal what the business actually needs to move forward.",
  },
  {
    step: "02",
    label: "Link",
    line: "Find what already",
    accent: "depends on what.",
    body: "We connect the people, decisions and tools behind the work, making hidden dependencies clear enough to design around.",
  },
  {
    step: "03",
    label: "Forge",
    line: "Turn those links",
    accent: "into one product.",
    body: "The scattered pieces tighten into a focused system with one job: make the business easier to operate and grow.",
  },
  {
    step: "04",
    label: "Run",
    line: "A working system.",
    accent: "Ready for real use.",
    body: "The result is dependable software the team can understand, customers can trust and the business can keep evolving.",
  },
] as const;

function seededRandom(seed: number) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function createNetwork(): NetworkShape {
  const random = seededRandom(1989);
  const nodes: NodePoint[] = [];
  const links: NetworkLink[] = [];
  const nodeCount = 190;

  for (let index = 0; index < nodeCount; index += 1) {
    const angle = random() * Math.PI * 2;
    const coreRadius = 0.12 + Math.pow(random(), 1.8) * 0.68;
    nodes.push({
      start: [
        -5.4 + random() * 10.8,
        -3.15 + random() * 6.3,
        -2.4 + random() * 4.8,
      ],
      target: [
        Math.cos(angle) * coreRadius,
        Math.sin(angle) * coreRadius,
        (random() - 0.5) * 0.7,
      ],
      phase: angle,
      scale: 0.7 + random() * 0.7,
      color: index % 11 === 0 ? 1 : 0,
    });
  }

  nodes.forEach((node, index) => {
    const nearest = nodes
      .map((candidate, candidateIndex) => ({
        index: candidateIndex,
        distance:
          candidateIndex === index
            ? Number.POSITIVE_INFINITY
            : Math.hypot(
                candidate.start[0] - node.start[0],
                candidate.start[1] - node.start[1],
                (candidate.start[2] - node.start[2]) * 0.45,
              ),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, index % 5 === 0 ? 2 : 1);

    nearest.forEach((neighbor, neighborIndex) => {
      if (neighbor.index < index) return;
      links.push({
        from: index,
        to: neighbor.index,
        reveal: 0.08 + random() * 0.82 + neighborIndex * 0.035,
      });
    });
  });

  return { nodes, links };
}

function smoothStep(value: number) {
  const clamped = Math.min(1, Math.max(0, value));
  return clamped * clamped * (3 - 2 * clamped);
}

function StaticNFallback() {
  return (
    <div className="forge-logo-fallback absolute inset-0 grid place-items-center" aria-hidden="true">
      <img src="/favicon.svg" alt="" draggable={false} />
    </div>
  );
}

function EnergyLogoReveal({ progress }: { progress: number }) {
  const reveal = smoothStep((progress - 0.76) / 0.18);
  const ignition = Math.max(
    0,
    smoothStep((progress - 0.7) / 0.065) - smoothStep((progress - 0.81) / 0.12),
  );
  const shockwave = smoothStep((progress - 0.715) / 0.15);
  const shockwaveOpacity = Math.max(
    0,
    smoothStep((progress - 0.71) / 0.055) - smoothStep((progress - 0.82) / 0.12),
  );
  const filamentDraw = Math.max(
    0,
    smoothStep((progress - 0.705) / 0.08) - smoothStep((progress - 0.835) / 0.12),
  );
  const sweep = smoothStep((progress - 0.75) / 0.17);
  const logoScale = 0.84 + reveal * 0.16;

  return (
    <div
      className="forge-logo-reveal absolute inset-0 grid place-items-center"
      style={
        {
          "--forge-logo-reveal": reveal.toFixed(4),
          "--forge-energy-flash": ignition.toFixed(4),
          "--forge-shockwave-scale": (0.32 + shockwave * 1.12).toFixed(4),
          "--forge-shockwave-opacity": shockwaveOpacity.toFixed(4),
          "--forge-filament-draw": filamentDraw.toFixed(4),
          "--forge-sweep-position": `${-140 + sweep * 280}%`,
          "--forge-logo-scale": logoScale.toFixed(4),
        } as CSSProperties
      }
      aria-hidden="true"
    >
      <span className="forge-logo-reveal__bloom" />
      <span className="forge-logo-reveal__shockwave" />
      <svg
        className="forge-logo-reveal__filaments"
        viewBox="0 0 520 520"
        fill="none"
        aria-hidden="true"
      >
        <path pathLength="1" d="M229 218C203 184 189 153 177 119" />
        <path pathLength="1" d="M278 213C295 178 323 160 348 132" />
        <path pathLength="1" d="M309 244C350 234 380 212 410 188" />
        <path pathLength="1" d="M313 274C355 286 383 305 425 319" />
        <path pathLength="1" d="M285 307C309 340 329 363 347 401" />
        <path pathLength="1" d="M244 309C230 346 207 373 194 406" />
        <path pathLength="1" d="M211 280C173 295 144 313 109 320" />
        <path pathLength="1" d="M208 244C171 231 143 211 116 191" />
        <path pathLength="1" d="M255 203C252 172 259 145 266 113" />
        <path pathLength="1" d="M298 294C329 315 354 326 385 347" />
      </svg>
      <span className="forge-logo-reveal__halo" />
      <span className="forge-logo-reveal__mark">
        <img src="/favicon.svg" alt="" draggable={false} />
        <span className="forge-logo-reveal__sweep" />
      </span>
    </div>
  );
}

function WebGLN({ progress, reducedMotion }: { progress: number; reducedMotion: boolean }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(progress);
  const [failed, setFailed] = useState(false);
  const network = useMemo(createNetwork, []);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let cancelled = false;
    let disposeScene = () => undefined;

    void (async () => {
      try {
        const THREE = await import("three");
        if (cancelled) return;

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x090a0a, 0.035);

        const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
        camera.position.set(0, 0, 11.2);

        const renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        });
        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.domElement.className = "absolute inset-0 z-0 block h-full w-full";
        renderer.domElement.setAttribute("aria-hidden", "true");
        mount.appendChild(renderer.domElement);

        const group = new THREE.Group();
        scene.add(group);

        const sphereGeometry = new THREE.SphereGeometry(0.07, 10, 10);
        const sphereMaterial = new THREE.MeshStandardMaterial({
          color: 0xc9785a,
          emissive: 0x71311f,
          emissiveIntensity: 0.66,
          metalness: 0.26,
          roughness: 0.34,
          transparent: true,
          opacity: 1,
          depthWrite: false,
        });
        const nodes = new THREE.InstancedMesh(
          sphereGeometry,
          sphereMaterial,
          network.nodes.length,
        );
        nodes.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        const baseColor = new THREE.Color(0xc9785a);
        const highlightColor = new THREE.Color(0xf0ae8f);
        network.nodes.forEach((node, index) => {
          nodes.setColorAt(index, node.color ? highlightColor : baseColor);
        });
        if (nodes.instanceColor) nodes.instanceColor.needsUpdate = true;
        group.add(nodes);

        const linePositions = new Float32Array(network.links.length * 6);
        const lineGeometry = new THREE.BufferGeometry();
        const lineAttribute = new THREE.BufferAttribute(linePositions, 3);
        lineGeometry.setAttribute("position", lineAttribute);
        const lineMaterial = new THREE.LineBasicMaterial({
          color: 0xd98c6a,
          transparent: true,
          opacity: 0.5,
          depthWrite: false,
        });
        const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
        group.add(lines);

        scene.add(new THREE.AmbientLight(0xffe8dc, 0.82));
        const keyLight = new THREE.PointLight(0xf3a784, 42, 18, 1.8);
        keyLight.position.set(4.6, 3.8, 5.8);
        scene.add(keyLight);
        const rimLight = new THREE.PointLight(0x66705d, 24, 18, 1.6);
        rimLight.position.set(-4, -2.8, 3.5);
        scene.add(rimLight);

        const dummy = new THREE.Object3D();
        const positions = network.nodes.map(() => new THREE.Vector3());
        const pointerTarget = new THREE.Vector2();
        const pointer = new THREE.Vector2();
        let pointerPresence = 0;
        let pointerPresenceTarget = 0;
        let wide = window.innerWidth >= 760;
        let visible = true;

        const onPointerMove = (event: PointerEvent) => {
          if (reducedMotion) return;
          const rect = mount.getBoundingClientRect();
          const inside =
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom;
          pointerPresenceTarget = inside ? 1 : 0;
          if (!inside) {
            pointerTarget.set(0, 0);
            return;
          }
          pointerTarget.set(
            ((event.clientX - rect.left) / Math.max(1, rect.width) - 0.5) * 2,
            -((event.clientY - rect.top) / Math.max(1, rect.height) - 0.5) * 2,
          );
        };
        window.addEventListener("pointermove", onPointerMove, { passive: true });

        const resize = () => {
          const width = mount.clientWidth;
          const height = mount.clientHeight;
          wide = window.innerWidth >= 760;
          renderer.setSize(width, height, false);
          camera.aspect = width / Math.max(1, height);
          camera.fov = wide ? 34 : 42;
          camera.updateProjectionMatrix();
          group.position.set(wide ? 2.12 : 0, 0, 0);
          group.scale.setScalar(wide ? 0.86 : 0.66);
        };
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(mount);
        resize();

        const visibilityObserver = new IntersectionObserver(
          ([entry]) => {
            visible = entry.isIntersecting;
          },
          { rootMargin: "20% 0px" },
        );
        visibilityObserver.observe(mount);

        const timer = new THREE.Timer();
        timer.connect(document);
        const renderFrame = () => {
          if (cancelled) return;
          if (!visible && !reducedMotion) return;

          timer.update();
          const elapsed = timer.getElapsed();
          const sceneProgress = reducedMotion ? 1 : progressRef.current;
          const linkReveal = smoothStep((sceneProgress - 0.22) / 0.3);
          const cohesion = smoothStep((sceneProgress - 0.26) / 0.47);
          const runBurst = smoothStep((sceneProgress - 0.71) / 0.13);
          const signalFade = 1 - smoothStep((sceneProgress - 0.73) / 0.18);
          const liveMotion = 1 - cohesion;
          const drift = (1 - cohesion) * 0.2;

          pointer.lerp(pointerTarget, reducedMotion ? 1 : 0.08);
          pointerPresence +=
            (pointerPresenceTarget - pointerPresence) * (reducedMotion ? 1 : 0.09);
          const halfHeight =
            Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5)) * camera.position.z;
          const halfWidth = halfHeight * camera.aspect;
          const pointerX = pointer.x * halfWidth - group.position.x;
          const pointerY = pointer.y * halfHeight - group.position.y;
          const listenForce = (1 - smoothStep(sceneProgress / 0.27)) * pointerPresence;

          network.nodes.forEach((node, index) => {
            let x =
              node.start[0] + (node.target[0] - node.start[0]) * cohesion +
              Math.sin(elapsed * 0.52 + node.phase) * drift;
            let y =
              node.start[1] + (node.target[1] - node.start[1]) * cohesion +
              Math.cos(elapsed * 0.44 + node.phase) * drift;
            let z =
              node.start[2] + (node.target[2] - node.start[2]) * cohesion +
              Math.sin(elapsed * 0.35 + node.phase * 1.4) * drift;

            if (listenForce > 0.001) {
              const dx = x - pointerX;
              const dy = y - pointerY;
              const distance = Math.hypot(dx, dy);
              const radius = 1.35;
              if (distance < radius) {
                const repulsion = Math.pow(1 - distance / radius, 1.55) * 1.2 * listenForce;
                x += (dx / Math.max(0.08, distance)) * repulsion;
                y += (dy / Math.max(0.08, distance)) * repulsion;
                z += repulsion * 0.28;
              }
            }

            if (runBurst > 0) {
              const burstDistance = runBurst * (0.7 + node.scale * 1.45);
              x += Math.cos(node.phase) * burstDistance;
              y += Math.sin(node.phase) * burstDistance;
              z += Math.sin(node.phase * 1.7) * burstDistance * 0.42;
            }

            positions[index].set(x, y, z);
            dummy.position.copy(positions[index]);
            const pulse = reducedMotion ? 1 : 1 + Math.sin(elapsed * 1.15 + node.phase) * 0.06;
            const nodeVisibility = wide || index % 2 === 0 ? 1 : 0.001;
            const listenScale = 1.22 - cohesion * 0.22;
            dummy.scale.setScalar(node.scale * pulse * nodeVisibility * listenScale);
            dummy.updateMatrix();
            nodes.setMatrixAt(index, dummy.matrix);
          });
          nodes.instanceMatrix.needsUpdate = true;
          sphereMaterial.opacity = signalFade;
          sphereMaterial.emissiveIntensity = 0.66 + runBurst * 1.5;

          network.links.forEach((link, index) => {
            const offset = index * 6;
            const from = positions[link.from];
            const to = positions[link.to];
            const revealed = link.reveal <= linkReveal;
            linePositions[offset] = from.x;
            linePositions[offset + 1] = from.y;
            linePositions[offset + 2] = from.z;
            linePositions[offset + 3] = revealed ? to.x : from.x;
            linePositions[offset + 4] = revealed ? to.y : from.y;
            linePositions[offset + 5] = revealed ? to.z : from.z;
          });
          lineAttribute.needsUpdate = true;
          lineMaterial.opacity = wide
            ? (0.03 + linkReveal * 0.44) * signalFade
            : (0.025 + linkReveal * 0.24) * signalFade;

          group.rotation.y = reducedMotion
            ? 0.08
            : 0.08 + liveMotion * (Math.sin(elapsed * 0.22) * 0.025 + pointer.x * 0.05);
          group.rotation.x = reducedMotion ? -0.02 : -0.02 + liveMotion * pointer.y * 0.03;
          group.rotation.z = (1 - cohesion) * -0.06;

          camera.position.x = pointer.x * 0.12 * liveMotion;
          camera.position.y = pointer.y * 0.08 * liveMotion;
          camera.lookAt(wide ? 0.12 : 0, wide ? 0 : group.position.y, 0);
          renderer.render(scene, camera);
        };

        if (reducedMotion) {
          renderFrame();
        } else {
          renderer.setAnimationLoop(renderFrame);
        }

        disposeScene = () => {
          renderer.setAnimationLoop(null);
          window.removeEventListener("pointermove", onPointerMove);
          resizeObserver.disconnect();
          visibilityObserver.disconnect();
          sphereGeometry.dispose();
          sphereMaterial.dispose();
          lineGeometry.dispose();
          lineMaterial.dispose();
          timer.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();

    return () => {
      cancelled = true;
      disposeScene();
    };
  }, [network, reducedMotion]);

  return (
    <div
      ref={mountRef}
      className="forge-webgl absolute right-0 bottom-0 left-0 top-[38%] lg:top-0"
      style={
        {
          "--forge-field-clip": `${smoothStep((progress - 0.18) / 0.12) * 42}%`,
        } as CSSProperties
      }
      aria-hidden="true"
    >
      {failed ? <StaticNFallback /> : <EnergyLogoReveal progress={progress} />}
    </div>
  );
}

export function ForgeStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setSceneReady(true);
        observer.disconnect();
      },
      { rootMargin: "70% 0px" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(media.matches);
    updatePreference();
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setProgress(1);
      return;
    }

    let frame = 0;
    const update = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, section.offsetHeight - window.innerHeight);
      setProgress(Math.min(1, Math.max(0, -rect.top / distance)));
      frame = 0;
    };
    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  const activeStep = Math.min(STORY.length - 1, Math.floor(progress * STORY.length));
  const story = STORY[activeStep];

  return (
    <section
      ref={sectionRef}
      id="forge"
      data-header-theme="dark"
      className="forge-story relative bg-canvas-deep"
      aria-label="How NeuraForge connects business signals into working software"
    >
      <div className="forge-sticky sticky top-0 h-[100svh] min-h-[680px] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_50%,rgba(201,120,90,0.14),transparent_34%),radial-gradient(circle_at_20%_30%,rgba(61,68,54,0.24),transparent_38%)]" />
        {sceneReady && <WebGLN progress={progress} reducedMotion={reducedMotion} />}
        <div className="noise-layer" aria-hidden="true" />

        <div className="container-page relative z-10 flex h-full flex-col justify-start pt-28 sm:pt-32 lg:justify-center lg:pt-0">
          <div key={activeStep} className="forge-copy-in max-w-[520px]">
            <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-accent-soft">
              <span className="font-mono text-[9px] text-muted-soft">{story.step}</span>
              <span className="h-px w-8 bg-accent/70" />
              {story.label}
            </div>
            <h2 className="mt-5 text-[clamp(2.3rem,5.4vw,5.15rem)] leading-[0.96] tracking-[-0.05em] text-ink">
              {story.line}
              <br />
              <span className="text-accent-soft">{story.accent}</span>
            </h2>
            <p className="mt-6 max-w-[440px] text-[15px] leading-[1.75] text-muted sm:text-base">
              {story.body}
            </p>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-7 z-20 px-5 sm:bottom-9">
          <div className="container-page grid grid-cols-4 gap-2 sm:gap-4">
            {STORY.map((item, index) => {
              const fill = Math.min(1, Math.max(0, progress * STORY.length - index));
              return (
                <div key={item.label}>
                  <div className="h-px overflow-hidden bg-white/12">
                    <div
                      className="h-full origin-left bg-accent-soft"
                      style={{ transform: `scaleX(${fill})` }}
                    />
                  </div>
                  <div className={`mt-2 hidden items-center justify-between font-mono text-[9px] uppercase tracking-[0.14em] sm:flex ${index === activeStep ? "text-ink-soft" : "text-muted-soft"}`}>
                    <span>{item.label}</span>
                    <span>{item.step}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
