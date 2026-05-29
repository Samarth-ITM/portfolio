import { Link } from "@/components/Link";
import { SiteFooter } from "@/components/SiteFooter";
import { getPost, posts, type Post } from "@/data/posts";

type Props = { slug: string };

export default function BlogPost({ slug }: Props) {
  const post = getPost(slug);

  if (!post) {
    return (
      <div className="page">
        <main className="container-blog" style={{ paddingTop: "4rem", textAlign: "center" }}>
          <div className="not-found">
            <h1>404</h1>
            <h2>Post not found</h2>
            <p><Link to="/blog">← Back to blog</Link></p>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const idx = posts.findIndex((p) => p.slug === post.slug);
  const prev = idx >= 0 ? posts[idx + 1] : undefined;

  const shareUrl = typeof window !== "undefined" ? window.location.href : `https://thavlik.dev/blog/${post.slug}`;
  const shareText = encodeURIComponent(post.title);
  const encodedUrl = encodeURIComponent(shareUrl);

  return (
    <div className="page">
      <main className="container-blog">
        <p className="back-link"><Link to="/blog">← Back to blog</Link></p>

        <h1 className="post-title">{post.title}</h1>
        <p className="post-date">{post.date}</p>

        <hr className="post-divider" />

        <article className="post-body">
          {(post.body ?? [post.excerpt]).map(
            (block: NonNullable<Post["body"]>[number] | string, i: number) => {
              if (typeof block === "string") return <p key={i}>{block}</p>;
              if (block.type === "quote")
                return <blockquote key={i}>{block.text}</blockquote>;
              if (block.type === "image")
                return <img key={i} src={block.src} alt={block.alt} loading="lazy" />;
              if (block.type === "sign")
                return <p key={i} className="post-sign">{block.text}</p>;
              return null;
            }
          )}
        </article>

        <hr className="post-divider" />

        <section className="share-section">
          <p className="share-title">Share this post</p>
          <div className="share-links">
            <a className="share-btn" href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodedUrl}`} target="_blank" rel="noopener noreferrer">X (Twitter)</a>
            <a className="share-btn" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className="share-btn" href={`https://reddit.com/submit?url=${encodedUrl}&title=${shareText}`} target="_blank" rel="noopener noreferrer">Reddit</a>
            <button
              className="share-btn"
              onClick={() => navigator.clipboard?.writeText(shareUrl)}
            >
              Copy link
            </button>
          </div>
        </section>

        {prev && (
          <p className="prev-post">
            <Link to={`/blog/${prev.slug}`}>← {prev.title}</Link>
          </p>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
