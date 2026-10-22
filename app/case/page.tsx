import { redirect } from "next/navigation";

export const revalidate = 900;

export default function CaseRedirectPage() {
  redirect("/projects");
}
