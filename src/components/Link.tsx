import React from "react";

type LinkProps = {
  to: string;
  hash?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

export function Link({ to, hash, className, children, onClick }: LinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
      if (e.defaultPrevented) return;
    }

    // Ignore modified clicks (e.g., Command/Control click to open in a new tab)
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }

    e.preventDefault();

    const targetPath = to === "." ? window.location.pathname : to;
    const targetUrl = hash ? `${targetPath}#${hash}` : targetPath;
    
    window.history.pushState({}, "", targetUrl);

    // Dispatch a popstate event so the App router state updates
    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);

    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0 });
    }
  };

  const href = hash ? `${to}#${hash}` : to;
  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
