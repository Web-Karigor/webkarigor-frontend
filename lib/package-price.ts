import type { HomepagePackage } from "@/types/homepage-package";

function toAmount(value?: string | null) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function formatAmount(amount: number) {
  if (amount <= 0) return "";
  return `৳${Math.round(amount).toLocaleString("en-US")}`;
}

export function packageBaseAmount(pkg: HomepagePackage) {
  return toAmount(pkg.price);
}

/** Prefer discounted_price when it is a real discount; otherwise use price. */
export function packageDisplayAmount(pkg: HomepagePackage) {
  const base = packageBaseAmount(pkg);
  const discounted = toAmount(pkg.discounted_price);
  if (discounted > 0 && (base <= 0 || discounted < base)) return discounted;
  return base;
}

/** True only when discounted_price is a real reduction from price. */
export function packageHasDiscount(pkg: HomepagePackage) {
  const base = packageBaseAmount(pkg);
  const discounted = toAmount(pkg.discounted_price);
  return base > 0 && discounted > 0 && discounted < base;
}

export function packageDiscountPercent(pkg: HomepagePackage) {
  if (!packageHasDiscount(pkg)) return 0;
  return Math.round(
    (1 - toAmount(pkg.discounted_price) / packageBaseAmount(pkg)) * 100,
  );
}

export function maxPackageDiscountPercent(packages: HomepagePackage[]) {
  if (!packages.length) return 0;
  return Math.max(0, ...packages.map(packageDiscountPercent));
}

export function formatPackagePrice(pkg: HomepagePackage) {
  return formatAmount(packageDisplayAmount(pkg));
}

/** Original/list price — only set when a discount is applied. */
export function formatPackageOriginalPrice(pkg: HomepagePackage) {
  if (!packageHasDiscount(pkg)) return "";
  return formatAmount(packageBaseAmount(pkg));
}

export function isCustomPackagePrice(pkg: HomepagePackage) {
  return packageDisplayAmount(pkg) <= 0;
}
