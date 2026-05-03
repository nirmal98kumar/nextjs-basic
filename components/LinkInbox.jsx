"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function isValidUrl(value) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export default function LinkInbox({ initialLinks }) {
  const router = useRouter();
  const [links, setLinks] = useState(initialLinks);
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  useEffect(() => {
    setLinks(initialLinks);
  }, [initialLinks]);

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedUrl = url.trim();

    if (!trimmedUrl) {
      setError("Enter a URL first.");
      return;
    }

    if (!isValidUrl(trimmedUrl)) {
      setError("Use a full URL like https://nextjs.org.");
      return;
    }

    setIsSaving(true);
    setError("");

    try {
      const response = await fetch("/api/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url: trimmedUrl })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Could not save that link.");
        return;
      }

      setLinks((currentLinks) => [data.link, ...currentLinks]);
      setUrl("");
      router.refresh();
    } catch {
      setError("Something went wrong while saving.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(linkId) {
    setDeletingId(linkId);
    setError("");

    try {
      const response = await fetch("/api/links", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: linkId })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Could not delete that link.");
        return;
      }

      setLinks((currentLinks) =>
        currentLinks.filter((link) => link.id !== linkId)
      );
      router.refresh();
    } catch {
      setError("Something went wrong while deleting.");
    } finally {
      setDeletingId("");
    }
  }

  return (
    <>
      <form className="toolbar" aria-label="Link actions" onSubmit={handleSubmit}>
        <div className="field-stack">
          <input
            type="url"
            name="url"
            placeholder="https://example.com"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            disabled={isSaving}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? "url-error" : undefined}
          />
          {error ? (
            <p className="field-error" id="url-error">
              {error}
            </p>
          ) : null}
        </div>

        <button type="submit" disabled={isSaving}>
          {isSaving ? "Saving and fetching..." : "Save link"}
        </button>
      </form>

      <section className="link-list" aria-label="Saved links">
        {links.map((link) => (
          <article className="link-card" key={link.id}>
            <div className="link-card-header">
              <div className="link-card-content">
                <h2>
                  <Link href={`/links/${link.id}`} className="card-link">
                    {link.title}
                  </Link>
                </h2>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.url}
                </a>
              </div>

              <button
                type="button"
                className="danger-button"
                onClick={() => handleDelete(link.id)}
                disabled={deletingId === link.id || isSaving}
              >
                {deletingId === link.id ? "Deleting..." : "Delete"}
              </button>
            </div>
            <p>{link.description}</p>
          </article>
        ))}
      </section>
    </>
  );
}
