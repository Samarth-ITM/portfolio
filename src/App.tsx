import { useState, useEffect } from "react";
import Home from "./pages/Home";
import { SiteFooter } from "./components/SiteFooter";
import { Link } from "./components/Link";

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  if (currentPath === "/" || currentPath === "") {
    return <Home />;
  }

  // 404
  return (
    <div className="page">
      <main className="container-blog">
        <div className="not-found">
          <h1>404</h1>
          <h2>Page not found</h2>
          <p>The page you're looking for doesn't exist or has been moved.</p>
          <Link to="/">Go home</Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
