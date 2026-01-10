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
            <div className="footer-description-section">
              <p className="footer-description-text">
                We help you move forward with modern, intuitive products by guiding you from design through product innovation to turn ideas into scalable success.
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="footer-social-icons">
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

            {/* Footer Links Section */}
            <div className="footer-links-section">
              {/* Services Column */}
              <div className="footer-links-column">
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
              <div className="footer-links-column">
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
              <div className="footer-links-column">
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

        {/* WEBKARIGOR Text Section */}
        <div className="webkarigor-hero-section">
          <div className="webkarigor-hero-background">
            <div className="webkarigor-hero-text">
              WEBKARIGOR
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
