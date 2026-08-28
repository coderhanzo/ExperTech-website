import { useEffect, useRef } from "react";
import { LogoMark } from "./primitives";

const PATH_NODE_PROGRESS = [0.08, 0.17, 0.29, 0.41, 0.54, 0.66, 0.78, 0.88, 0.95];
const PACKET_OFFSETS = [0.015, 0.075, 0.145, 0.24, 0.34];

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function smoothStep(from: number, to: number, value: number) {
  const ratio = clamp((value - from) / Math.max(0.0001, to - from));
  return ratio * ratio * (3 - 2 * ratio);
}

function buildPrimaryPath(points: Array<{ x: number; y: number }>) {
  if (!points.length) return "";
  return points.reduce((path, point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}`;
    const previous = points[index - 1];
    const controlY = previous.y + (point.y - previous.y) * 0.5;
    return `${path} C ${previous.x} ${controlY}, ${point.x} ${controlY}, ${point.x} ${point.y}`;
  }, "");
}

interface JourneyGeometry {
  width: number;
  height: number;
  primary: string;
  branches: string[];
}

function measureGeometry(main: HTMLElement): JourneyGeometry {
  const mainRect = main.getBoundingClientRect();
  const width = Math.max(1, main.clientWidth);
  const height = Math.max(1, main.scrollHeight);
  const mobile = width < 768;
  const x = (ratio: number) => width * ratio;
  const localY = (element: HTMLElement, ratio: number) =>
    element.getBoundingClientRect().top - mainRect.top + element.offsetHeight * ratio;
  const get = (id: string) => main.querySelector<HTMLElement>(`#${id}`);

  const hero = get("hero");
  const forge = get("forge");
  const work = get("work");
  const services = get("services");
  const products = get("products");
  const process = get("process");
  const about = get("about");
  const faq = get("faq");
  const contact = get("contact");
  const cta = get("final-cta");

  const endY = cta ? localY(cta, mobile ? 0.62 : 0.5) : height * 0.98;
  const sideLane = mobile ? x(0.91) : x(0.9);
  const innerLane = mobile ? x(0.84) : x(0.84);
  const endLane = mobile ? x(0.55) : x(0.78);

  const candidates: Array<{ element: HTMLElement | null; ratio: number; lane: number }> = [
    { element: hero, ratio: 1, lane: x(0.5) },
    { element: forge, ratio: 0.12, lane: mobile ? innerLane : x(0.72) },
    { element: forge, ratio: 0.86, lane: mobile ? sideLane : x(0.82) },
    { element: work, ratio: 0.82, lane: sideLane },
    { element: services, ratio: 0.54, lane: innerLane },
    { element: products, ratio: 0.56, lane: sideLane },
    { element: process, ratio: 0.55, lane: innerLane },
    { element: about, ratio: 0.6, lane: sideLane },
    { element: faq, ratio: 0.52, lane: innerLane },
    { element: contact, ratio: 0.5, lane: sideLane },
    { element: cta, ratio: mobile ? 0.62 : 0.5, lane: endLane },
  ];

  const points = candidates
    .filter((item): item is { element: HTMLElement; ratio: number; lane: number } => Boolean(item.element))
    .map(({ element, ratio, lane }) => ({ x: lane, y: localY(element, ratio) }));

  if (points.length < 2) {
    points.push({ x: sideLane, y: endY });
  }

  const branchIndexes = mobile ? [2, 6] : [1, 3, 5, 7];
  const branches = branchIndexes
    .map((index, branchIndex) => {
      const anchor = points[Math.min(index, points.length - 2)];
      const next = points[Math.min(index + 1, points.length - 1)];
      if (!anchor || !next) return "";
      const span = Math.max(120, Math.min(360, (next.y - anchor.y) * 0.52));
      const direction = branchIndex % 2 === 0 ? -1 : 1;
      const reach = mobile ? 34 : 88 + branchIndex * 8;
      const start = { x: anchor.x, y: anchor.y + 28 };
      const finish = { x: anchor.x, y: Math.min(next.y - 24, start.y + span) };
      const middleY = start.y + (finish.y - start.y) * 0.5;
      return `M ${start.x} ${start.y} C ${start.x + direction * reach} ${middleY - 34}, ${start.x + direction * reach} ${middleY + 34}, ${finish.x} ${finish.y}`;
    })
    .filter(Boolean);

  return {
    width,
    height,
    primary: buildPrimaryPath(points),
    branches,
  };
}

function useNeuralScrollProgress(
  rootRef: React.RefObject<HTMLDivElement>,
  pathRef: React.RefObject<SVGPathElement>,
  packetRefs: React.MutableRefObject<Array<SVGCircleElement | null>>,
  nodeRefs: React.MutableRefObject<Array<SVGCircleElement | null>>,
) {
  useEffect(() => {
    const root = rootRef.current;
    const main = root?.parentElement;
    const path = pathRef.current;
    if (!root || !main || !path) return;

    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = reducedQuery.matches;
    let frame = 0;
    let pathLength = 0;
    let active = true;

    const rebuild = () => {
      const geometry = measureGeometry(main);
      root.style.setProperty("--neural-width", String(geometry.width));
      root.style.setProperty("--neural-height", String(geometry.height));
      root.style.height = `${geometry.height}px`;
      const svg = root.querySelector<SVGSVGElement>("svg");
      svg?.setAttribute("viewBox", `0 0 ${geometry.width} ${geometry.height}`);
      path.setAttribute("d", geometry.primary);
      root.querySelectorAll<SVGPathElement>("[data-neural-branch]").forEach((branch, index) => {
        branch.setAttribute("d", geometry.branches[index] ?? "");
      });
      pathLength = path.getTotalLength();
      PATH_NODE_PROGRESS.forEach((progress, index) => {
        const node = nodeRefs.current[index];
        if (!node || !pathLength) return;
        const point = path.getPointAtLength(pathLength * progress);
        node.setAttribute("cx", String(point.x));
        node.setAttribute("cy", String(point.y));
      });
    };

    const update = () => {
      frame = 0;
      if (!active) return;
      const hero = main.querySelector<HTMLElement>("#hero");
      const cta = main.querySelector<HTMLElement>("#final-cta");
      if (!hero || !cta) return;

      const start = window.scrollY + hero.getBoundingClientRect().top;
      const end = window.scrollY + cta.getBoundingClientRect().top + cta.offsetHeight * 0.72 - window.innerHeight * 0.5;
      const progress = reducedMotion ? 1 : clamp((window.scrollY - start) / Math.max(1, end - start));
      const conduit = reducedMotion ? 1 : smoothStep(0.1, 0.92, progress);
      const late = reducedMotion ? 0.35 : smoothStep(0.68, 0.9, progress);
      const ctaActivation = reducedMotion ? 0.4 : smoothStep(0.86, 0.985, progress);

      main.style.setProperty("--neural-progress", progress.toFixed(4));
      main.style.setProperty("--neural-conduit", conduit.toFixed(4));
      main.style.setProperty("--neural-late", late.toFixed(4));
      main.style.setProperty("--neural-logo-scale", (1 + ctaActivation * 0.045).toFixed(4));
      main.style.setProperty("--neural-path-opacity", (0.12 + late * 0.16).toFixed(4));
      main.style.setProperty("--neural-branch-opacity", (0.08 + late * 0.18).toFixed(4));
      main.style.setProperty("--neural-cta-alpha", (0.08 + ctaActivation * 0.34).toFixed(4));
      main.style.setProperty("--neural-cta-blur", `${8 + ctaActivation * 24}px`);

      if (!pathLength) return;
      packetRefs.current.forEach((packet, index) => {
        if (!packet) return;
        const packetProgress = conduit * 1.12 - PACKET_OFFSETS[index];
        const frequencyGate = index < 3 ? 1 : late;
        const visible = packetProgress > 0.015 && packetProgress < 1 && !reducedMotion;
        if (!visible) {
          packet.style.opacity = "0";
          return;
        }
        const point = path.getPointAtLength(pathLength * clamp(packetProgress));
        packet.setAttribute("cx", String(point.x));
        packet.setAttribute("cy", String(point.y));
        packet.style.opacity = String((0.42 + late * 0.48) * frequencyGate);
      });

      PATH_NODE_PROGRESS.forEach((nodeProgress, index) => {
        const node = nodeRefs.current[index];
        if (!node) return;
        const activation = smoothStep(nodeProgress - 0.055, nodeProgress + 0.025, conduit);
        node.style.opacity = String(0.12 + activation * (0.32 + late * 0.2));
      });
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };
    const onPreferenceChange = () => {
      reducedMotion = reducedQuery.matches;
      requestUpdate();
    };
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
      if (active) requestUpdate();
    });
    const resizeObserver = new ResizeObserver(() => {
      rebuild();
      requestUpdate();
    });

    rebuild();
    update();
    visibilityObserver.observe(main);
    resizeObserver.observe(main);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    reducedQuery.addEventListener("change", onPreferenceChange);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reducedQuery.removeEventListener("change", onPreferenceChange);
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [nodeRefs, packetRefs, pathRef, rootRef]);
}

export function NeuralJourney() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const packetRefs = useRef<Array<SVGCircleElement | null>>([]);
  const nodeRefs = useRef<Array<SVGCircleElement | null>>([]);

  useNeuralScrollProgress(rootRef, pathRef, packetRefs, nodeRefs);

  return (
    <div ref={rootRef} className="neural-journey" aria-hidden="true">
      <svg className="neural-journey__svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="neural-path-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#582F08" />
            <stop offset="0.48" stopColor="#9D4D01" />
            <stop offset="0.82" stopColor="#B8621B" />
            <stop offset="1" stopColor="#D78A3D" />
          </linearGradient>
          <filter id="neural-packet-glow" x="-250%" y="-250%" width="600%" height="600%">
            <feGaussianBlur stdDeviation="3.2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <path ref={pathRef} pathLength="1" className="neural-path neural-path--primary" />
        {[0, 1, 2, 3].map((branch) => (
          <path key={branch} data-neural-branch pathLength="1" className="neural-path neural-path--branch" />
        ))}
        {PATH_NODE_PROGRESS.map((_, index) => (
          <circle
            key={`node-${index}`}
            ref={(node) => { nodeRefs.current[index] = node; }}
            r={index % 3 === 0 ? 3 : 2.2}
            className="neural-path-node"
          />
        ))}
        {PACKET_OFFSETS.map((_, index) => (
          <circle
            key={`packet-${index}`}
            ref={(packet) => { packetRefs.current[index] = packet; }}
            r={index === 0 ? 4 : 2.8}
            className="neural-data-packet"
            filter="url(#neural-packet-glow)"
          />
        ))}
      </svg>
    </div>
  );
}

export function CTAConvergence() {
  return (
    <div className="cta-convergence">
      <span className="cta-convergence__halo" />
      <div className="cta-convergence__content">
        <LogoMark className="cta-convergence__mark" />
        <p className="cta-convergence__description">
          We build the systems behind your biggest ideas
        </p>
      </div>
    </div>
  );
}
