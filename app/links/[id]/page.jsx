import Link from "next/link";
import { notFound } from "next/navigation";

import { getLinkById } from "../../../lib/links";

export default async function LinkDetailPage({ params }) {
  const { id } = await params;
  const link = await getLinkById(id);

  if (!link) {
    notFound();
  }

  return (
    <main className="page-shell">
      <div className="detail-stack">
        <Link href="/" className="back-link">
          Back to inbox
        </Link>

        <article className="detail-card">
          <p className="detail-label">Saved link</p>
          <h1 className="detail-title">{link.title}</h1>
          <a href={link.url} target="_blank" rel="noreferrer" className="detail-url">
            {link.url}
          </a>
          <p className="detail-description">{link.description}</p>

          <dl className="detail-meta">
            <div>
              <dt>Link ID</dt>
              <dd>{link.id}</dd>
            </div>
          </dl>
        </article>
      </div>
    </main>
  );
}
