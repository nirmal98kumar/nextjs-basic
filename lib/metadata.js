function decodeHtmlEntities(value) {
  return value
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&nbsp;/gi, " ");
}

function normalizeWhitespace(value) {
  return value.replace(/\s+/g, " ").trim();
}

function extractTagContent(html, pattern) {
  const match = html.match(pattern);

  if (!match?.[1]) {
    return "";
  }

  return normalizeWhitespace(decodeHtmlEntities(match[1]));
}

export async function fetchLinkMetadata(url) {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(5000),
    headers: {
      "User-Agent": "LinkInboxBot/1.0"
    }
  });

  if (!response.ok) {
    throw new Error("Could not load page metadata.");
  }

  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("text/html")) {
    throw new Error("URL did not return HTML.");
  }

  const html = await response.text();
  const title =
    extractTagContent(html, /<title[^>]*>([\s\S]*?)<\/title>/i) ||
    extractTagContent(
      html,
      /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']*)["']/i
    );
  const description =
    extractTagContent(
      html,
      /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i
    ) ||
    extractTagContent(
      html,
      /<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']*)["']/i
    );

  return {
    title,
    description
  };
}
