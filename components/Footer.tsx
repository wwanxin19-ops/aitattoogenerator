import Link from "next/link";
import { footerLinks, siteUrl } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link className="wordmark" href="/">
            AI Tattoo<span>Generator</span>
          </Link>
          <p style={{ marginTop: 8, fontSize: 14 }}>Preview your tattoo idea before you ink it.</p>
        </div>
        <div className="footer-links">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
