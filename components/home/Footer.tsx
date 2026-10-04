"use client";

import "./Footer.css";
import Link from "next/link";
import type { ReactNode } from "react";
import FooterBrand from "@/components/home/FooterBrand";
import homeContent from "@/data/home-content.json";

const { headingLines, headingLinesMobile, taglineParts, linkColumns, socialLinks, copyright } =
  homeContent.footer;

const socialIcons: Record<string, ReactNode> = {
  linkedin: <LinkedInIcon />,
  facebook: <FacebookIcon />,
  github: <GitHubIcon />,
  whatsapp: <WhatsAppIcon />,
  instagram: <InstagramIcon />,
  youtube: <YouTubeIcon />,
  behance: <BehanceIcon />,
  dribbble: <DribbbleIcon />,
  x: <XIcon />,
};

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1-.004-4.123 2.062 2.062 0 0 1 .004 4.123zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden>
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.744.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}


function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function BehanceIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden>
      <path d="M6.938 5.016h4.78v1.664H6.938V5.016Zm-.099 3.696h5.234c0 .96-.176 1.664-.528 2.112-.352.448-.96.672-1.824.672H6.84V8.712Zm8.234 4.224c.512-.448.768-1.088.768-1.92 0-.704-.224-1.248-.672-1.632-.448-.384-1.088-.576-1.92-.576h-3.84v7.008h4.032c.832 0 1.472-.192 1.92-.576.448-.384.672-.928.672-1.632 0-.832-.256-1.472-.768-1.92l-.192-.16Zm-2.016 1.056h-1.536v-2.112h1.536c.512 0 .896.096 1.152.288.256.192.384.48.384.864 0 .384-.128.672-.384.864-.256.192-.64.288-1.152.288ZM0 0v24h24V0H0Zm14.784 6.72c.512-.384 1.152-.576 1.92-.576.768 0 1.408.192 1.92.576.512.384.768.928.768 1.632 0 .704-.256 1.248-.768 1.632-.512.384-1.152.576-1.92.576-.768 0-1.408-.192-1.92-.576-.512-.384-.768-.928-.768-1.632 0-.704.256-1.248.768-1.632Z" />
    </svg>
  );
}

function DribbbleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden>
      <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm7.931 5.545c1.316 1.611 2.126 3.65 2.215 5.86-2.577-.546-4.94-.546-7.073.015-.145-.351-.3-.702-.475-1.047 2.247-1.01 4.096-2.4 5.333-4.828zM12 2.16c2.294 0 4.39.81 6.035 2.154-1.07 2.17-2.74 3.41-4.83 4.32A24.87 24.87 0 0 0 10.3 3.3C10.85 2.56 11.41 2.16 12 2.16zM8.39 4.02c.55.72 1.12 1.5 1.7 2.34-2.31.78-4.93 1.17-7.86 1.17-.03-.5.01-1 .12-1.49 1.77-1.4 4.03-2.25 6.04-2.02zm-6.22 8.82c0-.31.02-.62.05-.92 3.27 0 6.2-.45 8.8-1.34.2.4.39.81.56 1.23-3.67 1.16-6.37 3.53-8.1 7.1A9.82 9.82 0 0 1 2.17 12.84zm4.07 6.99c1.52-3.2 3.9-5.32 7.16-6.36.86 2.23 1.48 4.6 1.85 7.1A9.8 9.8 0 0 1 12 21.84c-2.13 0-4.09-.73-5.76-2.01zm10.5-1.01c-.34-2.28-.9-4.45-1.68-6.49 1.86-.12 3.9.2 6.12.97A9.86 9.86 0 0 1 16.74 18.82z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="footer-shell">
      <div className="footer-wrap">


        <div className="footer-card">
          <div className="footer-content">
            <div className="footer-intro">
              <h2 className="footer-heading font-extrabold">
                {headingLines.map((line) => (
                  <span key={line} className="footer-heading-line footer-heading-line--desktop">
                    {line}
                  </span>
                ))}
                {headingLinesMobile.map((line) => (
                  <span key={line} className="footer-heading-line footer-heading-line--mobile">
                    {line}
                  </span>
                ))}
              </h2>
              <p className="footer-tagline">
                {taglineParts.map((part, index) => (
                  <span key={part} className="footer-tagline-item">
                    {index > 0 ? (
                      <span className="footer-tagline-sep" aria-hidden="true">
                        •
                      </span>
                    ) : null}
                    <span>{part}</span>
                  </span>
                ))}
              </p>
            </div>

            <div className="footer-social-row">
              {socialLinks.map((item) => {
                const isPlaceholder = item.href === "#";
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={isPlaceholder ? undefined : "_blank"}
                    rel={isPlaceholder ? undefined : "noopener noreferrer"}
                    aria-label={item.label}
                    className="footer-social-link"
                    onClick={
                      isPlaceholder
                        ? (event) => {
                            event.preventDefault();
                          }
                        : undefined
                    }
                  >
                    {socialIcons[item.id]}
                  </a>
                );
              })}
            </div>

            <div className="footer-links-grid">
              {linkColumns.map((column) => (
                <div key={column.title} className="footer-links-column">
                  <h3 className="footer-links-title">{column.title}</h3>
                  <ul className="footer-links-list">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href} className="footer-link">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <FooterBrand />
        </div>

        <p className="footer-copyright">{copyright}</p>
      </div>
    </footer>
  );
}
