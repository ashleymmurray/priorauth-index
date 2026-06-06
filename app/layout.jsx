import "./globals.css";
import { siteMetadata } from "@/lib/siteMetadata";

export const metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
