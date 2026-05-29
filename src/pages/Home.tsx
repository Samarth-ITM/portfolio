import { useEffect } from "react";
import { WaveformBackground } from "@/components/WaveformBackground";
import { SiteFooter } from "@/components/SiteFooter";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function Home() {
  useEffect(() => {
    const existing = document.querySelector(
      'script[src="https://embed.reddit.com/widgets.js"]'
    );
    if (!existing) {
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://embed.reddit.com/widgets.js";
      script.charset = "UTF-8";
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="page">
      <WaveformBackground />

      <a href="#projects" className="skip-link">Skip to projects</a>

      <div className="page-inner">
        <main className="container">
          {/* Hero */}
          <section className="hero" id="top">
            <h1>Systems | Automation</h1>

            <div className="hero-desc">
              <p>
                Experimenting system behaviour under extreme load, where bottlenecks emerge, and fixing leaky abstractions.
              </p>
              <p>
                My work ranges from high-throughput networking experiments and large-scale workflow automation to AI system evaluation and human-in-the-loop automations.
              </p>
              <p>
                Where most of it is driven by a desire to push through beyond their limits.
              </p>
            </div>

            <p className="hero-cta" style={{ fontSize: "1rem" }}>
              Interested in systems, infrastructure, performance, or just want to yap about AI wrappers or breakthroughs?
            </p>
            <p className="hero-cta" style={{ fontSize: "1.5rem", marginTop: "0.5rem" }}>
              Let's Talk.
            </p>

            <div className="hero-contact" id="contact">
              <div className="contact-item">
                <span className="label">email:</span>
                <a
                  href="mailto:2025.samarths@isu.ac.in"
                  className="value"
                >
                  2025 [dot] samarths @ isu [dot] ac [dot] in
                </a>
              </div>
              <div className="contact-item">
                <span className="label">alt:</span>
                <a
                  href="mailto:rougeparrot@gmail.com"
                  className="value"
                >
                  rougeparrot @ gmail [dot] com
                </a>
              </div>
              <div className="contact-item">
                <span className="label">github:</span>
                <a
                  href="https://github.com/Samarth-ITM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="value"
                >
                  github [dot] com + Samarth-ITM
                </a>
              </div>
              <div className="contact-item">
                <span className="label">linkedin:</span>
                <a
                  href="https://linkedin.com/in/samarthnavale"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="value"
                >
                  linkedin [dot] com + in + samarthnavale
                </a>
              </div>
            </div>
          </section>

          <section id="community" className="section">
            <div className="section-head">
              <h2 className="section-title">Python Mentorship</h2>
              <p className="section-desc">
                Over the past few months, I have conducted free Python guidance sessions for
                beginners and early-stage developers. What started as a simple Reddit post
                evolved into dozens of conversations about learning, career direction, interview
                preparation, and problem solving.
              </p>
            </div>
            <div className="community-embed">
              <blockquote
                className="reddit-embed-bq"
                style={{ height: "316px" }}
                data-embed-theme="dark"
                data-embed-height="316"
              >
                <a href="https://www.reddit.com/r/PythonLearning/comments/1s6t6ff/i_am_hosting_a_free_python_interviewguidance_for/">
                  I am hosting a free python interview/guidance for beginners/intermediates
                </a>
                <br /> by
                <a href="https://www.reddit.com/user/No_Photograph_1506/">
                  u/No_Photograph_1506
                </a>
                {" "}in
                <a href="https://www.reddit.com/r/PythonLearning/">PythonLearning</a>
              </blockquote>
            </div>
          </section>

          {/* Projects */}
          <section id="projects" className="section">
            <div className="projects-grid">
              {projects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </section>

          {/* Notable Achievements */}
          <section id="achievements" className="section">
            <div className="achievements-grid">
              <div className="achievement-row">
                <p className="achievement-item">
                  <span className="achievement-text text-lg font-bold">
                    Top 10 Finalist — Google for Developers GenAI Hackathon Mumbai
                  </span>
                </p>
              </div>
              <div className="achievement-row achievement-row-double">
                <p className="achievement-item">
                  <span className="achievement-text">National Finalist, SIH All India Hackathon</span>
                </p>
                <p className="achievement-item">
                  <span className="achievement-text">National Finalist, Fintech Olympiad</span>
                </p>
              </div>
              <div className="achievement-row">
                <p className="achievement-item">
                  <span className="achievement-text">1st Place, Intra-College Competitive Coding</span>
                </p>
              </div>
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}
