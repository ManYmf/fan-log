import { ArrowUpRight } from 'lucide-react';
import { SiteLink as Link } from '@/components/site-link';
import { formatDate, kindLabel, tagLabels, type Post } from '@/lib/content';

export function PostCard({ post, index }: { post: Post; index?: number }) {
  const kind = kindLabel(post.kind);
  return (
    <article className="post-card">
      <Link href={`/writing/${post.slug}/`}>
        <div className="post-card-meta">
          <span>{String(index ?? 1).padStart(3, '0')}</span>
          <span>{kind.en} / <span lang="zh-CN">{kind.zh}</span></span>
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, 'en')}</time>
        </div>
        <h2>{post.title.en}<span lang="zh-CN">{post.title.zh}</span></h2>
        <div className="post-card-summary">
          <p>{post.summary.en}</p>
          <p lang="zh-CN">{post.summary.zh}</p>
        </div>
        <div className="post-card-foot">
          <div className="tag-row">
            {post.tags.slice(0, 3).map((tag) => {
              const label = tagLabels[tag as keyof typeof tagLabels];
              return <span key={tag}>{label.en} · <span lang="zh-CN">{label.zh}</span></span>;
            })}
          </div>
          <ArrowUpRight size={18} aria-hidden="true" />
        </div>
      </Link>
    </article>
  );
}
