import LinkInbox from "../components/LinkInbox";
import { getLinks } from "../lib/links";

export default async function HomePage() {
  const links = await getLinks();

  return (
    <main className="page-shell">
      <section className="intro">
        <p className="eyebrow">Next.js learning project</p>
        <h1>Link Inbox</h1>
        <p>
          Save useful links, fetch their metadata on the server, and organize
          them as the app grows.
        </p>
      </section>

      <LinkInbox initialLinks={links} />
    </main>
  );
}
