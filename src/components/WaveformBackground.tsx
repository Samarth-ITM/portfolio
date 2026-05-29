import { useEffect, useRef } from "react";

const BG_COLOR = "#091827";
const ROW_HEIGHT = 48;
const BASE_SPEED = Math.random() * 100 - Math.random() * 50 + 20; // Base speed with more variation

type TraceRow = {
  phase: number;
  freq: number;
  amp: number;
  speed: number;
  packets: number[];
  packetSpeeds: number[];
  packetBrightness: number[];
  packetIsShiny: boolean[];
  hue: number;
  chaosPhase: number;
  harmonic2Freq: number;
  harmonic3Freq: number;
};

function makeRow(seed: number, intensity: number = 1, screenWidth: number = 1200): TraceRow {
  let s = seed * 9301 + 49297;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };

  const packetCount = 8 + Math.floor(rand() * 12); // More packets for even distribution

  // Distribute packets evenly across screen width
  const packets = Array.from({ length: packetCount }, (_, i) =>
    (i / packetCount) * screenWidth + (rand() * screenWidth * 0.05) // Small random variation
  );

  const packetSpeeds = packets.map(() => (0.2 + rand() * 0.6) * intensity);
  const packetBrightness = packets.map(() => rand());

  // Make 30% of packets shiny (white and bright)
  const packetIsShiny = packets.map(() => rand() < 0.3);

  return {
    phase: rand() * Math.PI * 2,
    freq: 0.005 + rand() * 0.025,
    amp: (3 + rand() * 30) * intensity,
    speed: BASE_SPEED * (0.7 + rand() * 1.3) * intensity,
    packets,
    packetSpeeds,
    packetBrightness,
    packetIsShiny,
    hue: rand() * 360,
    chaosPhase: rand() * Math.PI * 2, // For unpredictable behavior
    harmonic2Freq: (0.005 + rand() * 0.025) * (0.7 + rand()), // Second harmonic
    harmonic3Freq: (0.005 + rand() * 0.025) * (1.3 + rand()), // Third harmonic
  };
}

export function WaveformBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    scrollIntensity: 0,
    targetScrollIntensity: 0,
    clickIntensity: 0,
    time: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let cssW = 0, cssH = 0;
    let rows: TraceRow[] = [];
    const state = stateRef.current;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      cssW = Math.max(1, Math.floor(rect.width));
      cssH = Math.max(1, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = cssW * dpr;
      canvas.height = cssH * dpr;
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const rowCount = Math.ceil(cssH / ROW_HEIGHT) + 3;
      rows = Array.from({ length: rowCount }, (_, i) => makeRow(i + 1, 1 + state.scrollIntensity * 0.5, cssW));
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // Scroll handler
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      state.targetScrollIntensity = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;
    };

    // Click handler - create wave intensity spike
    const handleClick = () => {
      state.clickIntensity = 1;
      // Regenerate rows with increased intensity
      const rowCount = Math.ceil(cssH / ROW_HEIGHT) + 3;
      rows = Array.from({ length: rowCount }, (_, i) => makeRow(i + state.time + Math.random() * 1000, 1 + state.clickIntensity));
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("click", handleClick);

    let raf = 0, startTs = 0;
    let visible = !document.hidden;
    const onVis = () => {
      visible = !document.hidden;
      if (visible) { startTs = 0; raf = requestAnimationFrame(draw); }
    };
    document.addEventListener("visibilitychange", onVis);

    const draw = (ts: number) => {
      if (!startTs) startTs = ts;
      const elapsed = (ts - startTs) / 1000;
      state.time = elapsed;

      // Smooth scroll intensity with easing (damping effect)
      const scrollDamping = 0.08; // Controls smoothness (lower = smoother but slower response)
      state.scrollIntensity += (state.targetScrollIntensity - state.scrollIntensity) * scrollDamping;

      // Decay click intensity
      state.clickIntensity *= 0.98;

      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, cssW, cssH);

      // Draw grid with varying opacity based on interaction
      const gridOpacity = 0.08 * (0.7 + state.scrollIntensity * 0.3 + state.clickIntensity * 0.5);
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(0, 212, 170, ${gridOpacity})`;
      for (let x = 0; x < cssW; x += 32) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, cssH);
        ctx.stroke();
      }
      for (let y = 0; y < cssH; y += 32) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(cssW, y);
        ctx.stroke();
      }

      ctx.lineWidth = 1.2 + state.scrollIntensity * 0.5;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";

      // Draw interconnected waves
      rows.forEach((row, idx) => {
        const yBase = idx * ROW_HEIGHT + ROW_HEIGHT / 2;

        // Vary trace color opacity based on interaction - much more visible
        const traceOpacity = 0.45 * (0.8 + state.scrollIntensity * 0.2 + state.clickIntensity * 0.6);
        ctx.strokeStyle = `rgba(0, 212, 170, ${traceOpacity})`;

        ctx.beginPath();
        for (let x = 0; x < cssW; x += 16) {
          // Add interconnection with adjacent rows
          const rowInfluence = idx > 0 ? Math.sin(rows[idx - 1].phase) * 0.1 : 0;

          // Multiple harmonic waves for more complex curviness
          const wave1 = Math.sin(x * row.freq + row.phase + elapsed * (0.6 + state.scrollIntensity * 0.2)) * row.amp;
          const wave2 = Math.sin(x * row.harmonic2Freq + row.phase * 1.3 + elapsed * (0.8 + state.scrollIntensity * 0.15)) * row.amp * 0.6;
          const wave3 = Math.sin(x * row.harmonic3Freq + row.phase * 0.7 + elapsed * (0.4 + state.scrollIntensity * 0.1)) * row.amp * 0.3;

          // Chaotic perturbation for unpredictability
          const chaos = Math.sin(elapsed * 2 + row.chaosPhase + x * 0.001) * (row.amp * 0.4) * (0.5 + state.scrollIntensity * 0.2);

          const y = yBase + wave1 + wave2 + wave3 + chaos + rowInfluence;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Draw packets that follow the waveforms with gradient brightness on scroll
        row.packets.forEach((p, pIdx) => {
          // Linear movement with wrapping - reduced scroll intensity effect for smoother motion
          let x = (p + elapsed * row.speed * (1 + state.scrollIntensity * 0.5)) % (cssW + 100);
          if (x < -50) x = cssW;

          // Calculate packet y position following the wave
          const rowInfluence = idx > 0 ? Math.sin(rows[idx - 1].phase) * 0.1 : 0;
          const wave1 = Math.sin(x * row.freq + row.phase + elapsed * (0.6 + state.scrollIntensity * 0.2)) * row.amp;
          const wave2 = Math.sin(x * row.harmonic2Freq + row.phase * 1.3 + elapsed * (0.8 + state.scrollIntensity * 0.15)) * row.amp * 0.6;
          const wave3 = Math.sin(x * row.harmonic3Freq + row.phase * 0.7 + elapsed * (0.4 + state.scrollIntensity * 0.1)) * row.amp * 0.3;
          const chaos = Math.sin(elapsed * 2 + row.chaosPhase + x * 0.001) * (row.amp * 0.4) * (0.5 + state.scrollIntensity * 0.2);
          const y = yBase + wave1 + wave2 + wave3 + chaos + rowInfluence;

          // Determine brightness based on whether packet is shiny
          let totalBrightness;
          let packetColor;

          if (row.packetIsShiny[pIdx]) {
            // Shiny packets: WHITE and bright with gradient on scroll
            totalBrightness = 0.6 + state.scrollIntensity * 1.8; // Gradient to max brightness on scroll
            packetColor = `rgba(255, 255, 255, ${Math.min(1, totalBrightness)})`;
          } else {
            // Regular packets: dim cyan
            totalBrightness = 0.3 + state.scrollIntensity * 0.4;
            packetColor = `rgba(0, 212, 170, ${Math.min(1, totalBrightness)})`;
          }

          // Draw diamond shape
          const size = 8;
          ctx.fillStyle = packetColor;
          ctx.beginPath();
          ctx.moveTo(x, y - size); // Top
          ctx.lineTo(x + size, y); // Right
          ctx.lineTo(x, y + size); // Bottom
          ctx.lineTo(x - size, y); // Left
          ctx.closePath();
          ctx.fill();
        });
      });

      if (visible) raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div ref={wrapRef} aria-hidden className="waveform-wrap">
      <canvas ref={canvasRef} />
      <div className="waveform-fade" />
    </div>
  );
}
