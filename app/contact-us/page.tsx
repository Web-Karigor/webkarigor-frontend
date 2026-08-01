import type { Metadata } from "next";
import Footer from "@/components/home/Footer";
import ServiceContact from "@/components/services/ServiceContact";

export const metadata: Metadata = {
  title: "Contact Us | Webkarigor",
  description:
    "Ready to transform your digital product? Reach out for a free consultation. Response within 24 hours.",
};

export default function ContactUsPage() {
  return (
    <div className="bg-[#FFFEFB] mt-20">
      <ServiceContact />
      <Footer />
    </div>
  );
}
