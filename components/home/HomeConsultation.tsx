"use client";

import "./HomeConsultation.css";

import Image from "next/image";
import Link from "next/link";
import {
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type SVGProps,
} from "react";
import * as FlagIcons from "country-flag-icons/react/3x2";
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Globe,
} from "lucide-react";
import homeContent from "@/data/home-content.json";
import {
  COUNTRY_OPTIONS,
  DEFAULT_COUNTRY,
  DEFAULT_DIAL_COUNTRY,
  type CountryOption,
} from "@/lib/countries";

const {
  badge,
  title,
  description,
  founder,
  talkPrompt,
  whatsapp,
  fields,
  schedule,
  submitLabel,
  timeSlots: TIME_SLOTS,
  weekdays: WEEKDAYS,
} = homeContent.consultation;

const PROFILE_IMAGE = founder.image;

type FlagComponent = ComponentType<SVGProps<SVGSVGElement>>;

function CountryFlag({
  iso2,
  className,
  title,
}: {
  iso2: string;
  className?: string;
  title?: string;
}) {
  const Flag = (FlagIcons as Record<string, FlagComponent | undefined>)[iso2];
  if (!Flag) return null;
  return <Flag className={className} title={title ?? iso2} />;
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function getCalendarCells(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: Array<number | null> = [];

  for (let i = 0; i < firstDay; i += 1) cells.push(null);
  for (let day = 1; day <= daysInMonth; day += 1) cells.push(day);
  while (cells.length % 7 !== 0) cells.push(null);

  return cells;
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

    // Use click (not mousedown) so toggle button can open first
    document.addEventListener("click", onPointer);
    return () => document.removeEventListener("click", onPointer);
  }, [open, onClose, ref]);
}

export default function HomeConsultation() {
  const [dialCountry, setDialCountry] = useState<CountryOption>(DEFAULT_DIAL_COUNTRY);
  const [region, setRegion] = useState<CountryOption>(DEFAULT_COUNTRY);
  const [dialOpen, setDialOpen] = useState(false);
  const [regionOpen, setRegionOpen] = useState(false);
  const [calendarDate, setCalendarDate] = useState(() => new Date(2026, 5, 12));
  const [selectedDay, setSelectedDay] = useState(12);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const dialRef = useRef<HTMLDivElement>(null);
  const regionRef = useRef<HTMLDivElement>(null);

  useClickOutside(dialRef, dialOpen, () => setDialOpen(false));
  useClickOutside(regionRef, regionOpen, () => setRegionOpen(false));

  const calendarCells = useMemo(
    () => getCalendarCells(calendarDate.getFullYear(), calendarDate.getMonth()),
    [calendarDate],
  );

  const monthLabel = calendarDate.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const shiftMonth = (delta: number) => {
    setCalendarDate((current) => {
      const next = new Date(current);
      next.setMonth(current.getMonth() + delta);
      return next;
    });
    setSelectedDay(1);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const phoneLabelMain = fields.phone.label.replace(/\s*\(.*\)\s*$/, "");
  const phoneLabelHint = fields.phone.label.match(/\(([^)]+)\)/)?.[1];

  return (
    <section className="home-consultation-section">
      <div className="home-consultation-shell">
        <div className="home-consultation-card">
          <div className="home-consultation-layout">
            <aside className="home-consultation-copy">
              <div className="home-consultation-copy-top">
                <span className="home-consultation-badge">
                  <span className="home-consultation-badge-text">{badge}</span>
                </span>

                <h2 className="home-consultation-title">{title}</h2>
                <p className="home-consultation-desc">{description}</p>

                <div className="home-consultation-founder">
                  <div className="home-consultation-founder-photo">
                    <Image
                      src={PROFILE_IMAGE}
                      alt={founder.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 160px"
                    />
                  </div>
                  <p className="home-consultation-founder-name">{founder.name}</p>
                  <p className="home-consultation-founder-role">{founder.role}</p>
                </div>
              </div>

              <div className="home-consultation-copy-bottom">
                <p className="home-consultation-talk">{talkPrompt}</p>
                <Link
                  href={whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-consultation-whatsapp"
                >
                  <WhatsAppIcon />
                  <span>{whatsapp.label}</span>
                </Link>
              </div>
            </aside>

            <form className="home-consultation-form" onSubmit={handleSubmit}>
              <div className="home-consultation-form-grid home-consultation-form-grid--two">
                <label className="home-consultation-field">
                  <span className="home-consultation-label">{fields.fullName.label}</span>
                  <input
                    type="text"
                    name="name"
                    placeholder={fields.fullName.placeholder}
                    className="home-consultation-input"
                    required
                  />
                </label>

                <label className="home-consultation-field">
                  <span className="home-consultation-label">{fields.email.label}</span>
                  <input
                    type="email"
                    name="email"
                    placeholder={fields.email.placeholder}
                    className="home-consultation-input"
                    required
                  />
                </label>
              </div>

              <div className="home-consultation-form-grid home-consultation-form-grid--two">
                <div className="home-consultation-field">
                  <span className="home-consultation-label">
                    {phoneLabelMain}
                    {phoneLabelHint ? (
                      <span className="home-consultation-label-hint">
                        {" "}
                        ({phoneLabelHint})
                      </span>
                    ) : null}
                  </span>

                  <div className="home-consultation-phone-row">
                    <div className="home-consultation-select-wrap" ref={dialRef}>
                      <button
                        type="button"
                        className="home-consultation-code-btn"
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          setRegionOpen(false);
                          setDialOpen((open) => !open);
                        }}
                        aria-expanded={dialOpen}
                        aria-haspopup="listbox"
                        aria-label={`Country code ${dialCountry.dialCode}`}
                      >
                        <Globe className="home-consultation-code-globe" aria-hidden />
                        <span className="home-consultation-code-value">
                          {dialCountry.dialCode}
                        </span>
                        <ChevronDown className="home-consultation-code-chevron" aria-hidden />
                      </button>

                      {dialOpen ? (
                        <ul
                          className="home-consultation-select-menu"
                          role="listbox"
                          onMouseDown={(event) => event.stopPropagation()}
                        >
                          {COUNTRY_OPTIONS.map((option) => (
                            <li key={`dial-${option.iso2}`}>
                              <button
                                type="button"
                                role="option"
                                aria-selected={dialCountry.iso2 === option.iso2}
                                className="home-consultation-select-option"
                                onClick={() => {
                                  setDialCountry(option);
                                  setDialOpen(false);
                                }}
                              >
                                <CountryFlag
                                  iso2={option.iso2}
                                  className="home-consultation-flag"
                                  title={option.name}
                                />
                                <span className="home-consultation-option-name">
                                  {option.name}
                                </span>
                                <span className="home-consultation-option-code">
                                  {option.dialCode}
                                </span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>

                    <input
                      type="tel"
                      name="phone"
                      placeholder={fields.phone.placeholder}
                      className="home-consultation-input home-consultation-input--phone"
                      required
                    />
                    <input type="hidden" name="dialCode" value={dialCountry.dialCode} />
                  </div>
                </div>

                <div className="home-consultation-field">
                  <span className="home-consultation-label">{fields.region.label}</span>
                  <div className="home-consultation-select-wrap" ref={regionRef}>
                    <button
                      type="button"
                      className="home-consultation-select"
                      onClick={() => {
                        setRegionOpen((open) => !open);
                        setDialOpen(false);
                      }}
                      aria-expanded={regionOpen}
                      aria-haspopup="listbox"
                    >
                      <span className="home-consultation-select-value">
                        <CountryFlag
                          iso2={region.iso2}
                          className="home-consultation-flag"
                          title={region.name}
                        />
                        <ChevronDown className="home-consultation-inline-chevron" aria-hidden />
                        <span>{region.name}</span>
                      </span>
                    </button>

                    {regionOpen ? (
                      <ul className="home-consultation-select-menu" role="listbox">
                        {COUNTRY_OPTIONS.map((option) => (
                          <li key={`region-${option.iso2}`}>
                            <button
                              type="button"
                              role="option"
                              aria-selected={region.iso2 === option.iso2}
                              className="home-consultation-select-option"
                              onClick={() => {
                                setRegion(option);
                                setRegionOpen(false);
                              }}
                            >
                              <CountryFlag
                                iso2={option.iso2}
                                className="home-consultation-flag"
                                title={option.name}
                              />
                              <span className="home-consultation-option-name">
                                {option.name}
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                  <input type="hidden" name="region" value={region.name} />
                </div>
              </div>

              <label className="home-consultation-field">
                <span className="home-consultation-label">{fields.details.label}</span>
                <textarea
                  name="details"
                  rows={4}
                  placeholder={fields.details.placeholder}
                  className="home-consultation-textarea"
                  required
                />
              </label>

              <div className="home-consultation-schedule">
                <div className="home-consultation-schedule-panel">
                  <p className="home-consultation-schedule-title">{schedule.dateTitle}</p>

                  <div className="home-consultation-calendar">
                    <div className="home-consultation-calendar-head">
                      <button
                        type="button"
                        className="home-consultation-calendar-nav"
                        onClick={() => shiftMonth(-1)}
                        aria-label={schedule.prevMonthAria}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <span>{monthLabel}</span>
                      <button
                        type="button"
                        className="home-consultation-calendar-nav"
                        onClick={() => shiftMonth(1)}
                        aria-label={schedule.nextMonthAria}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="home-consultation-calendar-weekdays">
                      {WEEKDAYS.map((day, index) => (
                        <span key={`${day}-${index}`}>{day}</span>
                      ))}
                    </div>

                    <div className="home-consultation-calendar-grid">
                      {calendarCells.map((day, index) =>
                        day ? (
                          <button
                            key={`${day}-${index}`}
                            type="button"
                            className={`home-consultation-calendar-day${
                              selectedDay === day ? " is-selected" : ""
                            }`}
                            onClick={() => setSelectedDay(day)}
                          >
                            {day}
                          </button>
                        ) : (
                          <span
                            key={`empty-${index}`}
                            className="home-consultation-calendar-day is-empty"
                          />
                        ),
                      )}
                    </div>
                  </div>
                </div>

                <div className="home-consultation-schedule-panel">
                  <p className="home-consultation-schedule-title">
                    {schedule.timeTitle} <span>{schedule.timeOptional}</span>
                  </p>

                  <div className="home-consultation-times">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        className={`home-consultation-time${
                          selectedTime === slot ? " is-selected" : ""
                        }`}
                        onClick={() =>
                          setSelectedTime((current) => (current === slot ? null : slot))
                        }
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button type="submit" className="home-consultation-submit">
                <span>{submitLabel}</span>
                <ArrowRight className="h-5 w-5" aria-hidden />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
