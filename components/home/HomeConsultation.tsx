"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Globe,
} from "lucide-react";

const PROFILE_IMAGE = "/sm4.png";

const REGIONS = [
  { label: "United States", flag: "🇺🇸" },
  { label: "United Kingdom", flag: "🇬🇧" },
  { label: "Bangladesh", flag: "🇧🇩" },
  { label: "Canada", flag: "🇨🇦" },
  { label: "Australia", flag: "🇦🇺" },
];

const TIME_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

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

export default function HomeConsultation() {
  const [region, setRegion] = useState(REGIONS[0]);
  const [regionOpen, setRegionOpen] = useState(false);
  const [calendarDate, setCalendarDate] = useState(() => new Date(2026, 5, 12));
  const [selectedDay, setSelectedDay] = useState(12);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

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

  return (
    <section className="home-consultation-section">
      <div className="home-consultation-shell">
        <div className="home-consultation-card">
          <div className="home-consultation-layout">
            <aside className="home-consultation-copy">
              <span className="home-consultation-badge">Get Free Consultation</span>

              <h2 className="home-consultation-title">
                Let&apos;s Build Something Great Together
              </h2>

              <p className="home-consultation-desc">
                From your first message to project delivery, we keep the process
                clear, responsive, and focused on your goals.
              </p>

              <div className="home-consultation-founder">
                <div className="home-consultation-founder-photo">
                  <Image
                    src={PROFILE_IMAGE}
                    alt="Esther Howard"
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </div>
                <div>
                  <p className="home-consultation-founder-name">Esther Howard</p>
                  <p className="home-consultation-founder-role">CEO, Webkarigor</p>
                </div>
              </div>

              <p className="home-consultation-talk">Prefer to talk first?</p>

              <Link
                href="https://wa.me/8801624283328"
                target="_blank"
                rel="noopener noreferrer"
                className="home-consultation-whatsapp"
              >
                <WhatsAppIcon />
                <span>WhatsApp: 01624-283328</span>
              </Link>
            </aside>

            <form className="home-consultation-form" onSubmit={handleSubmit}>
              <div className="home-consultation-form-grid home-consultation-form-grid--two">
                <label className="home-consultation-field">
                  <span className="home-consultation-label">Full Name</span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Esther Howard"
                    className="home-consultation-input"
                    required
                  />
                </label>

                <label className="home-consultation-field">
                  <span className="home-consultation-label">Contact Email</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="your-mail@gmail.com"
                    className="home-consultation-input"
                    required
                  />
                </label>
              </div>

              <div className="home-consultation-form-grid home-consultation-form-grid--two">
                <label className="home-consultation-field">
                  <span className="home-consultation-label">Contact Number (WhatsApp)</span>
                  <span className="home-consultation-input-wrap">
                    <Globe className="home-consultation-input-icon" aria-hidden />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="123 4567 890"
                      className="home-consultation-input home-consultation-input--with-icon"
                      required
                    />
                  </span>
                </label>

                <div className="home-consultation-field">
                  <span className="home-consultation-label">Your Current Region</span>
                  <div className="home-consultation-select-wrap">
                    <button
                      type="button"
                      className="home-consultation-select"
                      onClick={() => setRegionOpen((open) => !open)}
                      aria-expanded={regionOpen}
                      aria-haspopup="listbox"
                    >
                      <span className="home-consultation-select-value">
                        <span aria-hidden>{region.flag}</span>
                        {region.label}
                      </span>
                      <ChevronDown className="home-consultation-select-chevron" aria-hidden />
                    </button>

                    {regionOpen && (
                      <ul className="home-consultation-select-menu" role="listbox">
                        {REGIONS.map((option) => (
                          <li key={option.label}>
                            <button
                              type="button"
                              role="option"
                              aria-selected={region.label === option.label}
                              className="home-consultation-select-option"
                              onClick={() => {
                                setRegion(option);
                                setRegionOpen(false);
                              }}
                            >
                              <span aria-hidden>{option.flag}</span>
                              {option.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              <label className="home-consultation-field">
                <span className="home-consultation-label">Project Details</span>
                <textarea
                  name="details"
                  rows={4}
                  placeholder="I need to build my ecommerce dashboard..."
                  className="home-consultation-textarea"
                  required
                />
              </label>

              <div className="home-consultation-schedule">
                <div className="home-consultation-schedule-panel">
                  <p className="home-consultation-schedule-title">Select a date</p>

                  <div className="home-consultation-calendar">
                    <div className="home-consultation-calendar-head">
                      <button
                        type="button"
                        className="home-consultation-calendar-nav"
                        onClick={() => shiftMonth(-1)}
                        aria-label="Previous month"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <span>{monthLabel}</span>
                      <button
                        type="button"
                        className="home-consultation-calendar-nav"
                        onClick={() => shiftMonth(1)}
                        aria-label="Next month"
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
                          <span key={`empty-${index}`} className="home-consultation-calendar-day is-empty" />
                        ),
                      )}
                    </div>
                  </div>
                </div>

                <div className="home-consultation-schedule-panel">
                  <p className="home-consultation-schedule-title">
                    Pick any time <span>(Optional)</span>
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
                <span>Let&apos;s Do It</span>
                <ArrowRight className="h-5 w-5" aria-hidden />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
