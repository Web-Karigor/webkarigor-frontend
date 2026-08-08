import type { Metadata } from "next";
import "@/components/contact/ContactPage.css";
import ContactBottomCta from "@/components/contact/ContactBottomCta";
import ContactCompanyDeck from "@/components/contact/ContactCompanyDeck";
import ContactConnect from "@/components/contact/ContactConnect";
import ContactFormSection from "@/components/contact/ContactFormSection";
import ContactHero from "@/components/contact/ContactHero";
import ContactStories from "@/components/contact/ContactStories";
import FAQ from "@/components/home/FAQ";
import Footer from "@/components/home/Footer";
import contactContent from "@/data/contact-content.json";

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
