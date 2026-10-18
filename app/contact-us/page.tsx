import type { Metadata } from "next";
import dynamic from "next/dynamic";
import "@/components/contact/ContactPage.css";
import ContactHero from "@/components/contact/ContactHero";
import contactContent from "@/data/contact-content.json";

const ContactConnect = dynamic(() => import("@/components/contact/ContactConnect"));
const ContactCompanyDeck = dynamic(
  () => import("@/components/contact/ContactCompanyDeck"),
);
const ContactStories = dynamic(() => import("@/components/contact/ContactStories"));
const ContactFAQ = dynamic(() => import("@/components/contact/ContactFAQ"));
const HomeConsultation = dynamic(
  () => import("@/components/home/HomeConsultation"),
);

export const metadata: Metadata = {
  title: contactContent.metadata.title,
  description: contactContent.metadata.description,
};

export default function ContactUsPage() {
  return (
    <div className="contact-page">
      <ContactHero />
      <ContactConnect />
      <ContactCompanyDeck />
      <ContactStories />
      <ContactFAQ className="bg-[#FFFEFB]" />
      <HomeConsultation />
    </div>
  );
}
