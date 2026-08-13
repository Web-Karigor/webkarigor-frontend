"use client";

import {
  FormEvent,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type SVGProps,
} from "react";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import * as FlagIcons from "country-flag-icons/react/3x2";
import contactContent from "@/data/contact-content.json";
import {
  COUNTRY_OPTIONS,
  DEFAULT_DIAL_COUNTRY,
  type CountryOption,
} from "@/lib/countries";

const { titleLine1, titleAccent, benefits, fields, budgets, submitLabel } = contactContent.form;

type FlagComponent = ComponentType<SVGProps<SVGSVGElement>>;

function CountryFlag({
  iso2,
  className,
}: {
  iso2: string;
  className?: string;
}) {
  const Flag = (FlagIcons as Record<string, FlagComponent | undefined>)[iso2];
  if (!Flag) return null;
  return <Flag className={className} />;
}

function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  open: boolean,
  onClose: () => void,
) {
  useEffect(() => {
    if (!open) return;

    const onPointer = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (target && ref.current && !ref.current.contains(target)) {
        onClose();
      }
    };

    document.addEventListener("click", onPointer);
    return () => document.removeEventListener("click", onPointer);
  }, [open, onClose, ref]);
}

export default function ContactFormSection() {
  const [budget, setBudget] = useState(budgets[1] ?? budgets[0] ?? "");
  const [dialCountry, setDialCountry] = useState<CountryOption>(DEFAULT_DIAL_COUNTRY);
  const [dialOpen, setDialOpen] = useState(false);
  const dialRef = useRef<HTMLDivElement>(null);

  useClickOutside(dialRef, dialOpen, () => setDialOpen(false));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="contact-form-wrap" id="contact-form">
      <div className="contact-form-panel">
        <aside className="contact-form-intro">
          <h2 className="contact-form-intro-title">
            {titleLine1}{" "}
            <span className="contact-form-intro-accent">{titleAccent}</span>
          </h2>
          <ul className="contact-benefits">
            {benefits.map((item) => (
              <li key={item}>
                <span className="contact-benefit-icon" aria-hidden>
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </aside>

        <form className="contact-form-grid" onSubmit={handleSubmit} noValidate={false}>
          <div className="contact-field">
            <label className="contact-field-label" htmlFor="contact-full-name">
              {fields.fullName.label}
            </label>
            <input
              id="contact-full-name"
              name="fullName"
              type="text"
              required
              placeholder={fields.fullName.placeholder}
              className="contact-input"
            />
          </div>

          <div className="contact-form-row">
            <div className="contact-field">
              <label className="contact-field-label" htmlFor="contact-email">
                {fields.email.label}
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                placeholder={fields.email.placeholder}
                className="contact-input"
              />
            </div>

            <div className="contact-field">
              <label className="contact-field-label" htmlFor="contact-whatsapp">
                {fields.whatsapp.label}
              </label>
              <div className="contact-phone-row" ref={dialRef}>
                <button
                  type="button"
                  className="contact-dial-btn"
                  aria-expanded={dialOpen}
                  aria-haspopup="listbox"
                  aria-label={`Country code ${dialCountry.dialCode}`}
                  onClick={() => setDialOpen((open) => !open)}
                >
                  <CountryFlag iso2={dialCountry.iso2} className="contact-dial-flag" />
                  <span>{dialCountry.dialCode}</span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 text-[#6b7280] transition-transform ${
                      dialOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  />
                </button>
                <input
                  id="contact-whatsapp"
                  name="whatsapp"
                  type="tel"
                  required
                  placeholder={fields.whatsapp.placeholder}
                  className="contact-phone-input"
                />
                <input type="hidden" name="dialCode" value={dialCountry.dialCode} />

                {dialOpen ? (
                  <ul className="contact-dial-menu" role="listbox">
                    {COUNTRY_OPTIONS.map((option) => (
                      <li key={`dial-${option.iso2}`}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={dialCountry.iso2 === option.iso2}
                          className="contact-dial-option"
                          onClick={() => {
                            setDialCountry(option);
                            setDialOpen(false);
                          }}
                        >
                          <CountryFlag iso2={option.iso2} className="contact-dial-flag" />
                          <span className="min-w-0 flex-1 truncate">{option.name}</span>
                          <span className="shrink-0 text-[#6b7280]">{option.dialCode}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </div>

          <div className="contact-field">
            <span className="contact-field-label">{fields.budget.label}</span>
            <div className="contact-budget-grid" role="group" aria-label={fields.budget.label}>
              {budgets.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`contact-budget-chip${budget === option ? " is-active" : ""}`}
                  aria-pressed={budget === option}
                  onClick={() => setBudget(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <input type="hidden" name="budget" value={budget} />
          </div>

          <div className="contact-field">
            <label className="contact-field-label" htmlFor="contact-details">
              {fields.details.label}
            </label>
            <textarea
              id="contact-details"
              name="details"
              required
              rows={4}
              placeholder={fields.details.placeholder}
              className="contact-textarea"
            />
          </div>

          <button type="submit" className="contact-submit">
            {submitLabel}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </form>
      </div>
    </div>
  );
}
