import { Link } from "@/components/Link";

export function SiteNav() {
  return (
    <nav className="nav">
      <div className="nav-logo">samarth@systems</div>
      <div className="nav-links">
        <Link to="/" hash="top">Notes</Link>
        <Link to="/" hash="community">Community</Link>
        <Link to="/" hash="projects">Projects</Link>
        <a href="https://github.com/Samarth-ITM" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://linkedin.com/in/samarthnavale" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <Link to="/" hash="contact">Contact</Link>
      </div>
    </nav>
  );
}
