import type { Metadata } from "next";
import dynamic from "next/dynamic";
import "@/components/contact/ContactPage.css";
import ContactHero from "@/components/contact/ContactHero";
import ContactFormSection from "@/components/contact/ContactFormSection";
import contactContent from "@/data/contact-content.json";

const ContactConnect = dynamic(() => import("@/components/contact/ContactConnect"));
const ContactCompanyDeck = dynamic(
  () => import("@/components/contact/ContactCompanyDeck"),
);
const ContactStories = dynamic(() => import("@/components/contact/ContactStories"));
const FAQ = dynamic(() => import("@/components/home/FAQ"));
const ContactBottomCta = dynamic(() => import("@/components/contact/ContactBottomCta"));
const Footer = dynamic(() => import("@/components/home/Footer"));

export const metadata: Metadata = {
  title: contactContent.metadata.title,
  description: contactContent.metadata.description,
};

export default function ContactUsPage() {
  return (
    <div className="contact-page">
      <ContactHero />
      <ContactFormSection />
      <ContactConnect />
      <ContactCompanyDeck />
      <ContactStories />
      <FAQ className="bg-[#FFFEFB]" />
      <ContactBottomCta />
      <Footer />
    </div>
  );
}
