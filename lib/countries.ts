import { getCountryDataList } from "countries-list";
import { hasFlag } from "country-flag-icons";

export type CountryOption = {
  iso2: string;
  name: string;
  dialCode: string;
};

/** Sorted countries that have both dial codes and flag icons */
export const COUNTRY_OPTIONS: CountryOption[] = getCountryDataList()
  .filter(
    (country) =>
      Boolean(country.iso2) &&
      hasFlag(country.iso2) &&
      Array.isArray(country.phone) &&
      country.phone.length > 0,
  )
  .map((country) => ({
    iso2: country.iso2,
    name: country.name,
    dialCode: `+${country.phone[0]}`,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

export const DEFAULT_COUNTRY =
  COUNTRY_OPTIONS.find((c) => c.iso2 === "BD") ?? COUNTRY_OPTIONS[0];

export const DEFAULT_DIAL_COUNTRY =
  COUNTRY_OPTIONS.find((c) => c.iso2 === "BD") ?? DEFAULT_COUNTRY;
