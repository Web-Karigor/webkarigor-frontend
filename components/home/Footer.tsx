import Link from "next/link";
import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import FooterBrand from "@/components/home/FooterBrand";

const linkColumns = [
  {
    title: "Services",
    links: [
      { label: "Product Design", href: "/services/product-design" },
      { label: "Product Development", href: "/services/product-development" },
      { label: "Branding", href: "/services/branding" },
      { label: "Marketing", href: "/services/marketing" },
      { label: "Consultancy", href: "/services/consultancy" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "E-commerce", href: "/industries/e-commerce" },
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Fintech", href: "/industries/fintech" },
      { label: "Edtech", href: "/industries/edtech" },
      { label: "CMS", href: "/industries/cms" },
    ],
  },
  {
    title: "Important Link",
    links: [
      { label: "Team", href: "/team" },
      { label: "Products", href: "/products" },
      { label: "About Us", href: "/about-us" },
      { label: "Contact Us", href: "/contact-us" },
      { label: "Our Policies", href: "/policies" },
    ],
  },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: <Linkedin className="h-[18px] w-[18px]" strokeWidth={1.75} />,
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: <Facebook className="h-[18px] w-[18px]" strokeWidth={1.75} />,
  },
  {
    label: "GitHub",
    href: "https://github.com",
    icon: <Github className="h-[18px] w-[18px]" strokeWidth={1.75} />,
  },
  {
    label: "VS Code",
    href: "https://code.visualstudio.com",
    icon: <VsCodeIcon />,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/",
    icon: <WhatsAppIcon />,
  },
  {
    label: "Telegram",
    href: "https://t.me/",
    icon: <TelegramIcon />,
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: <Instagram className="h-[18px] w-[18px]" strokeWidth={1.75} />,
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: <Youtube className="h-[18px] w-[18px]" strokeWidth={1.75} />,
  },
  {
    label: "Behance",
    href: "https://behance.net",
    icon: <BehanceIcon />,
  },
  {
    label: "TikTok",
    href: "https://tiktok.com",
    icon: <TikTokIcon />,
  },
  {
    label: "X",
    href: "https://x.com",
    icon: <XIcon />,
  },
];

function VsCodeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden>
      <path d="M15.5 2.5 22 8.8l-1.2 1.3-5.8-5.1-5.8 5.1L8 8.8l6.5-6.3Zm-7 19L2 15.2l1.2-1.3 5.8 5.1 5.8-5.1 1.2 1.3-6.5 6.3Z" />
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

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
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

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.01c0 3.18-2.59 5.77-5.77 5.77-1.56 0-3.01-.62-4.08-1.74-1.07-1.12-1.66-2.62-1.66-4.2 0-3.18 2.59-5.77 5.77-5.77.38 0 .76.04 1.13.11v4.12a2.77 2.77 0 0 0-1.13-.24c-1.53 0-2.77 1.24-2.77 2.77 0 1.53 1.24 2.77 2.77 2.77 1.53 0 2.77-1.24 2.77-2.77V.02Z" />
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
                <span className="footer-heading-line">
                  Let&apos;s build what your users will love
                </span>
                <span className="footer-heading-line">
                  and your business will grow with
                </span>
              </h2>
              <p className="footer-tagline">
                <span>Build Smarter</span>
                <span className="footer-tagline-sep" aria-hidden="true">
                  •
                </span>
                <span>Launch Stronger</span>
                <span className="footer-tagline-sep" aria-hidden="true">
                  •
                </span>
                <span>Scale Faster</span>
              </p>
            </div>

            <div className="footer-social-row">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="footer-social-link"
                >
                  {item.icon}
                </a>
              ))}
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
      </div>
    </footer>
  );
}
