import { promises as fs } from "fs";
import path from "path";
import { fetchLinkMetadata } from "./metadata";

const linksFilePath = path.join(process.cwd(), "data", "links.json");

export async function getLinks() {
  const fileContent = await fs.readFile(linksFilePath, "utf8");
  const links = JSON.parse(fileContent);

  return links;
}

export async function getLinkById(id) {
  const links = await getLinks();

  return links.find((link) => link.id === id) || null;
}

export async function addLink({ url }) {
  const parsedUrl = new URL(url);
  const hostname = parsedUrl.hostname.replace(/^www\./, "");
  const currentLinks = await getLinks();
  let metadata = null;

  try {
    metadata = await fetchLinkMetadata(parsedUrl.toString());
  } catch {
    metadata = null;
  }

  const nextLink = {
    id: crypto.randomUUID(),
    title: metadata?.title || hostname,
    url: parsedUrl.toString(),
    description:
      metadata?.description ||
      "Saved through a Next.js route handler into a local JSON file."
  };

  const nextLinks = [nextLink, ...currentLinks];

  await fs.writeFile(linksFilePath, JSON.stringify(nextLinks, null, 2));

  return nextLink;
}

export async function deleteLink(id) {
  const currentLinks = await getLinks();
  const nextLinks = currentLinks.filter((link) => link.id !== id);

  if (nextLinks.length === currentLinks.length) {
    return false;
  }

  await fs.writeFile(linksFilePath, JSON.stringify(nextLinks, null, 2));

  return true;
}
