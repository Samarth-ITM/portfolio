import type { Project, RichSpan } from "@/data/projects";

function renderRich(parts: RichSpan[]) {
  return parts.map((p, idx) => {
    if (typeof p === "string") return <span key={idx}>{p}</span>;
    if ("href" in p) {
      const external = /^https?:\/\//.test(p.href);
      return (
        <a
          key={idx}
          href={p.href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {p.text}
        </a>
      );
    }
    return <em key={idx}>{p.text}</em>;
  });
}

function pillClass(status: Project["status"]) {
  if (status === "Active Research") return "pill pill-research";
  if (status === "Maintained") return "pill pill-maintained";
  if (status === "Active") return "pill pill-active";
  if (status === "Contributor") return "pill pill-contrib";
  if (status === "Prototype") return "pill pill-proto";
  return "pill pill-community";
}

function getTechColor(tech: string): string {
  const lower = tech.toLowerCase();
  // Languages & Runtimes
  if (lower.includes("rust")) return "rust";
  if (lower.includes("python")) return "python";
  if (lower.includes("javascript") || lower.includes("typescript") || lower.includes("ts") || lower.includes("js")) return "js";
  if (lower.includes("git")) return "git";
  // Frameworks & UI
  if (lower.includes("react")) return "react";
  if (lower.includes("svelte")) return "svelte";
  // Databases
  if (lower.includes("postgres") || lower.includes("sql")) return "postgres";
  if (lower.includes("mysql")) return "mysql";
  // Messaging & Networking
  if (lower.includes("kafka")) return "kafka";
  if (lower.includes("nats") || lower.includes("jetstream")) return "nats";
  if (lower.includes("udp") || lower.includes("socket")) return "network";
  if (lower.includes("linux") || lower.includes("debian")) return "linux";
  // Kubernetes & DevOps
  if (lower.includes("kubernetes") || lower.includes("k8s")) return "k8s";
  // AI & ML
  if (lower.includes("llm")) return "llm";
  if (lower.includes("prompt") || lower.includes("engineering")) return "prompt";
  if (lower.includes("ai") || lower.includes("safety") || lower.includes("red team")) return "ai";
  // Infrastructure & Tools
  if (lower.includes("n8n") || lower.includes("automation")) return "automation";
  if (lower.includes("monitoring") || lower.includes("observ")) return "monitoring";
  if (lower.includes("archiv")) return "archiving";
  if (lower.includes("collection")) return "collection";
  if (lower.includes("distributed") || lower.includes("infrastructure")) return "infrastructure";
  if (lower.includes("optimization") || lower.includes("performance")) return "performance";
  if (lower.includes("game")) return "gaming";
  if (lower.includes("evaluation") || lower.includes("conversational")) return "ai";
  return "default";
}

function StatusPill({ status, href }: { status: Project["status"]; href?: string }) {
  const el = <span className={pillClass(status)}>{status}</span>;
  return href ? <a href={href} target="_blank" rel="noopener noreferrer">{el}</a> : el;
}

export function ProjectCard({ project: p }: { project: Project }) {
  return (
    <article className="card" id={p.id}>
      <header className="card-header">
        <div className="card-title-wrap">
          <h3 className="card-title">
            {p.titleHref ? (
              <a href={p.titleHref} target="_blank" rel="noopener noreferrer">{p.name}</a>
            ) : p.name}
          </h3>
          <p className="card-date">{p.date}</p>
        </div>
        <div className="card-status">
          <StatusPill status={p.status} href={p.statusHref} />
          <span className={`source-tag ${p.source === "closed source" ? "source-closed" : "source-open"}`}>
            {p.source}
          </span>
        </div>
      </header>

      {p.thumbnail ? (
        <div className="card-media">
          {p.thumbnail.src.endsWith('.mp4') ? (
            <video
              src={p.thumbnail.src}
              autoPlay
              muted
              loop
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : p.thumbnail.href ? (
            <a href={p.thumbnail.href} target="_blank" rel="noopener noreferrer">
              <img src={p.thumbnail.src} alt={p.thumbnail.alt} loading="lazy" />
            </a>
          ) : (
            <img src={p.thumbnail.src} alt={p.thumbnail.alt} loading="lazy" />
          )}
        </div>
      ) : p.openCta ? (
        <div className="card-media-placeholder">
          <a href={p.openCta.href} target="_blank" rel="noopener noreferrer">
            {p.openCta.label}
          </a>
        </div>
      ) : null}

      <p className="card-tagline">{p.tagline}</p>
      <p className="card-desc">{renderRich(p.description)}</p>

      <div className="card-footer">
        <div className="card-tech">
          {p.tech.map((t) => (
            <span key={t} className={`tech-tag tech-${getTechColor(t)}`}>{t}</span>
          ))}
        </div>
        {p.closedNote && <p className="card-closed-note">{p.closedNote}</p>}
        {p.links && p.links.length > 0 && (
          <div className="card-links">
            {p.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
