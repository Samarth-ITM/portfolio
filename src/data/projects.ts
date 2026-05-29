export type ProjectStatus =
  | "Active Research"
  | "Maintained"
  | "Active"
  | "Contributor"
  | "Prototype"
  | "Community";

export type ProjectSource = "open source" | "closed source";

export type ProjectLink = { label: string; href: string };

export type RichSpan =
  | string
  | { text: string; href: string }
  | { text: string; italic: true };

export type Project = {
  id: string;
  name: string;
  titleHref?: string;
  status: ProjectStatus;
  statusHref?: string;
  source: ProjectSource;
  date: string;
  thumbnail?: { src: string; alt: string; href?: string };
  openCta?: { label: string; href: string };
  tagline: string;
  description: RichSpan[];
  tech: string[];
  links?: ProjectLink[];
  closedNote?: string;
};

const t = (s: string): RichSpan => s;
const a = (text: string, href: string): RichSpan => ({ text, href });
const i = (text: string): RichSpan => ({ text, italic: true });

export const projects: Project[] = [
  {
    id: "1mil1sec",
    name: "1Mil1Sec",
    status: "Active Research",
    source: "closed source",
    date: "2026",
    tagline: "Exploring packet processing limits on commodity hardware.",
    description: [
      t(
        "A networking experimentation project focused on pushing low-end hardware to its absolute packet-processing limits.",
      ),
      t(
        " Built on a Dell i3 system running Debian Minimal, the project explores high-throughput UDP networking, kernel tuning, socket-level optimization, multithreading, batching strategies, and performance bottlenecks.",
      ),
      t(
        " Current experiments have reached approximately 250,000 packets per second before hardware limitations become dominant. The primary bottleneck discovered so far is the system's legacy 100 Mbps network interface.",
      ),
      t(
        " The long-term goal is to understand high-performance networking from first principles rather than relying on existing frameworks.",
      ),
    ],
    tech: ["Rust", "Linux", "Debian Minimal", "UDP Sockets", "Networking", "Performance Engineering"],
  },
  {
    id: "10k-workflow-archive",
    name: "n8n Workflows",
    titleHref: "https://github.com/Samarth-ITM/n8nWorkflows",
    status: "Maintained",
    source: "open source",
    date: "2025 · ongoing",
    thumbnail: { src: "/assets/n8n.mp4", alt: "n8n workflows demo" },
    tagline: "Workflow preservation and archival",
    description: [
      t(
        "Preserving automation knowledge beyond individual deployments.",
      ),
      t(
        " While building automation systems during my internship at Jin Labs, I found myself repeatedly collecting and reusing workflow templates from different sources. Over time, this grew into a personal archive containing workflows gathered from internship projects, college communities, employers, public repositories, and workflows discovered across the web.",
      ),
      t(
        " Today, the repository contains more than 10,500 archived n8n workflows, each preserved with metadata, documentation, importable JSON definitions, and preview assets. The project focuses on preventing workflow knowledge from becoming fragmented, difficult to discover, or lost over time.",
      ),
      t(
        " I continue to actively archive, organize, and maintain workflows, treating the repository as a long-term knowledge base for automation builders and engineers.",
      ),
    ],
    tech: ["Python", "n8n", "Automation", "Data Archiving", "Open Source", "Knowledge Management"],
  },
  {
    id: "tokenmiser",
    name: "TokenMiser",
    status: "Active",
    source: "closed source",
    date: "2026 · active",
    tagline: "Reducing unnecessary LLM token consumption.",
    description: [
      t(
        "An experimentation platform focused on measuring, optimizing, and reducing token usage across LLM workflows.",
      ),
      t(
        " The project explores prompt compression, routing strategies, context reduction techniques, caching mechanisms, and cost-aware inference pipelines.",
      ),
      t(
        " Rather than treating token usage as an afterthought, TokenMiser treats every token as a measurable resource that should be accounted for.",
      ),
    ],
    tech: ["Python", "LLMs", "Prompt Engineering", "Optimization", "AI Infrastructure"],
  },
  {
    id: "git-noir",
    name: "Git Noir",
    titleHref: "https://github.com/ilianrusev/GitNoir",
    status: "Contributor",
    source: "open source",
    date: "2026",
    thumbnail: { src: "/assets/gitnoir.png", alt: "Git Noir hero" },
    tagline: "Learning Git through detective stories.",
    description: [
      t(
        "Contributed to Git Noir, an educational game that teaches Git concepts through mystery-driven investigations.",
      ),
      t(
        " Players solve repository crimes involving missing commits, suspicious branches, merge conflicts, and lost files by using real Git commands inside realistic scenarios.",
      ),
      t(
        " My contributions focused on expanding gameplay content and improving the learning experience for new developers.",
      ),
    ],
    tech: ["Git", "Open Source", "TypeScript", "Game Design"],
  },
  {
    id: "atm-system",
    name: "ATM System",
    titleHref: "https://github.com/Samarth-ITM/Sample_ATM",
    status: "Prototype",
    source: "open source",
    date: "2025",
    thumbnail: { src: "/assets/ATM.png", alt: "ATM system" },
    tagline: "A client-server banking simulation.",
    description: [
      t(
        "A secure ATM simulation implementing client-server architecture, authentication, transaction logging, monitoring, and persistent storage.",
      ),
      t(
        " The system supports deposits, withdrawals, PIN verification, blacklisting after repeated failures, transaction auditing, and server observability.",
      ),
      t(
        " The project was built primarily to understand networking fundamentals, state management, concurrency, and backend system design rather than banking itself.",
      ),
    ],
    tech: ["Python", "Sockets", "MySQL", "Monitoring", "Distributed Systems"],
  },
  {
    id: "kamyab-ai-qa",
    name: "Kamyab AI chatbot QA",
    status: "Maintained",
    source: "open source",
    date: "2026",
    thumbnail: { src: "/assets/Kamyab.png", alt: "Kamyab AI evaluation" },
    tagline: "Adversarial QA for a production AI assistant.",
    description: [
      t(
        "Evaluated a production AI assistant through adversarial testing, jailbreak attempts, context-retention analysis, and long-session conversational stress tests.",
      ),
      t(
        " Explored failure modes related to instruction following, hallucinations, prompt injection, context loss, and safety boundaries. Documented reproducible weaknesses and suggested improvements to system prompts, context handling, and overall user experience.",
      ),
      t(
        " The project provided practical exposure to how modern LLM-based systems behave outside controlled benchmark environments and highlighted the gap between model capability and production reliability.",
      ),
    ],
    tech: [
      "LLMs",
      "Prompt Engineering",
      "AI Safety",
      "Red Teaming",
      "Evaluation",
      "Conversational AI",
    ],
  },
];
