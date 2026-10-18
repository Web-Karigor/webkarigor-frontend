"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { useMemo } from "react";
import { useContactPageQuery } from "@/hooks/queries/useContactPageQuery";
import {
  contactSectionItem,
  parseContactOffice,
  splitContactConnectTitle,
} from "@/lib/contact-page";

/** Section chrome — not provided by pages/contact-us. */
const BADGE = "Connect Now";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export default function ContactConnect() {
  const { data } = useContactPageQuery();
  const item = contactSectionItem(data?.data?.sections?.connect);

  const view = useMemo(() => {
    if (!item) return null;
    const title = item.title?.trim() ?? "";
    if (!title) return null;

    const { line1, accent } = splitContactConnectTitle(title);
    const emails = [
      {
        title: item.email_info_title?.trim() ?? "",
        email: item.email_info_email?.trim() ?? "",
      },
      {
        title: item.career_email_title?.trim() ?? "",
        email: item.career_email?.trim() ?? "",
      },
    ].filter((entry) => entry.title && entry.email);

    const office = parseContactOffice(
      item.address?.trim() ?? "",
      item.whatsapp?.trim() ?? "",
    );

    if (!emails.length || !office.address || !office.phone || !office.whatsappHref) {
      return null;
    }

    return { line1, accent, emails, office };
  }, [item]);

  if (!view) return null;

  const { line1, accent, emails, office } = view;

  return (
    <section className="contact-connect" aria-labelledby="contact-connect-heading">
      <div className="contact-connect-inner">
        <span className="contact-section-badge">
          <span className="contact-section-badge-text">{BADGE}</span>
        </span>
        <h2 id="contact-connect-heading" className="contact-connect-title">
          {line1}{" "}
          <span className="contact-title-accent">{accent}</span>
        </h2>

        <div className="contact-info-grid">
          {emails.map((entry) => (
            <div key={entry.email} className="contact-email-card">
              <p className="contact-email-card-title">{entry.title}</p>
              <Link href={`mailto:${entry.email}`}>
                <Mail className="h-5 w-5 shrink-0 opacity-80" strokeWidth={1.75} aria-hidden />
                {entry.email}
              </Link>
            </div>
          ))}

          <article
            key={office.country || office.phone}
            className="contact-office-card"
          >
            {office.country ? (
              <h3 className="contact-office-country">{office.country}</h3>
            ) : null}
            <p className="contact-office-address">{office.address}</p>
            <a
              href={office.whatsappHref}
              className="contact-office-phone"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
              {office.phone}
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
