import "./globals.css";

export const metadata = {
  title: "Link Inbox",
  description: "A small Next.js app for saving useful links."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
