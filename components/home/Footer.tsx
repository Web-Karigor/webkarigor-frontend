"use client";

import Link from "next/link";
import { 
  Linkedin, 
  Facebook, 
  Github, 
  MessageCircle, 
  MessageSquare, 
  Send, 
  Instagram, 
  Youtube, 
  Palette, 
  Music, 
  Twitter 
} from "lucide-react";

const socialMediaIcons = [
  { name: "LinkedIn", href: "#", Icon: Linkedin },
  { name: "Facebook", href: "#", Icon: Facebook },
  { name: "GitHub", href: "#", Icon: Github },
  { name: "Discord", href: "#", Icon: MessageCircle },
  { name: "WhatsApp", href: "#", Icon: MessageSquare },
  { name: "Telegram", href: "#", Icon: Send },
  { name: "Instagram", href: "#", Icon: Instagram },
  { name: "YouTube", href: "#", Icon: Youtube },
  { name: "Behance", href: "#", Icon: Palette },
  { name: "TikTok", href: "#", Icon: Music },
  { name: "X", href: "#", Icon: Twitter },
];

const footerLinks = {
  services: [
    { href: "/services/product-design", text: "Product Design" },
    { href: "/services/product-development", text: "Product Development" },
    { href: "/services/branding", text: "Branding" },
    { href: "/services/marketing", text: "Marketing" },
    { href: "/services/consultancy", text: "Consultancy" },
  ],
  industries: [
    { href: "/industries/e-commerce", text: "E-commerce" },
    { href: "/industries/healthcare", text: "Healthcare" },
    { href: "/industries/fintech", text: "Fintech" },
    { href: "/industries/edtech", text: "Edtech" },
    { href: "/industries/cms", text: "CMS" },
  ],
  importantLinks: [
    { href: "/team", text: "Team" },
    { href: "/products", text: "Products" },
    { href: "/about", text: "About Us" },
    { href: "/contact", text: "Contact Us" },
    { href: "/policies", text: "Our Policies" },
  ],
};

export default function Footer() {
  return (
    <>
      <footer className="footer-section">
        {/* Main Footer Content with Earth Background */}
        <div className="footer-main-container">
          {/* Earth Video Background */}
          <div className="footer-video-wrapper">
            <video
              loop
              autoPlay
              muted
              playsInline
              className="footer-video"
            >
              <source
                src="https://github.com/designmonks/webvideos/raw/refs/heads/main/footer_globe.mp4"
                type="video/mp4"
              />
            </video>
          </div>

          {/* Content Overlay */}
          <div className="footer-content-overlay">
            {/* Descriptive Text Section */}
            <div className="footer-description-section mb-0">
              <p className="footer-description-text text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                Let's build what your users will love and your business will grow with
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="footer-social-icons mb-[550px]">
              {socialMediaIcons.map((social, index) => {
                const IconComponent = social.Icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="footer-social-icon"
                    aria-label={social.name}
                  >
                    <IconComponent size={20} className="footer-social-icon-svg" />
                  </a>
                );
              })}
            </div>

            {/* Footer Links Section - Centered in Middle */}
            <div className="w-full flex items-center justify-center min-h-[1px] mt-80">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-[1200px] text-start">
                {/* Services Column */}
                <div className="footer-links-column flex flex-col items-center text-center">
                  <h3 className="footer-links-heading">Services</h3>
                  <ul className="footer-links-list">
                    {footerLinks.services.map((link, index) => (
                      <li key={index}>
                        <Link href={link.href} className="footer-link">
                          {link.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Industries Column */}
                <div className="footer-links-column flex flex-col items-center text-center">
                  <h3 className="footer-links-heading">Industries</h3>
                  <ul className="footer-links-list">
                    {footerLinks.industries.map((link, index) => (
                      <li key={index}>
                        <Link href={link.href} className="footer-link">
                          {link.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Important Link Column */}
                <div className="footer-links-column flex flex-col items-center text-center">
                  <h3 className="footer-links-heading">Important Link</h3>
                  <ul className="footer-links-list">
                    {footerLinks.importantLinks.map((link, index) => (
                      <li key={index}>
                        <Link href={link.href} className="footer-link">
                          {link.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* WEBKARIGOR Text Section */}
        <div className="relative flex justify-center items-center my-0 w-full">
          <img
            src="/frame.png"
            alt="Frame background"
            className="w-full h-auto"
            style={{ minHeight: 0, minWidth: 0 }}
          />
          <span
            className="absolute mt-40 inset-0 flex justify-center items-center font-montserrat font-bold select-none pointer-events-none text-[48px] md:text-[120px] lg:text-[180px] xl:text-[240px] text-white"
            style={{
              lineHeight: '1.08',
              letterSpacing: '0',
              opacity: 0.84,
            }}
          >
            WEBKARIGOR
          </span>
        </div>
      </footer>
    </>
  );
}
