import { Link } from "@/components/Link";
import { SiteFooter } from "@/components/SiteFooter";
import { posts } from "@/data/posts";

export default function BlogIndex() {
  return (
    <div className="page">
      <main className="container-blog">
        <hr className="blog-divider" />
        <ul className="blog-list">
          {posts.map((p) => (
            <li key={p.slug} className="blog-list-item">
              <h2 className="blog-list-title">
                <Link to={`/blog/${p.slug}`}>{p.title}</Link>
              </h2>
              <p className="blog-list-date">{p.date}</p>
              <p className="blog-list-excerpt">{p.excerpt}</p>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </div>
  );
}
