import Header20 from "@/components/header/Header20";
import Footer14 from "@/components/footer/Footer14";
import BusinessLanding from "@/components/business/BusinessLanding";
export const metadata = {
  title: "Skilllinkup for Business",
  description: "Explore company hiring, freelance projects and local work in the Skilllinkup beta. Request a demo for your team.",
  alternates: { canonical: "/business" },
};
export default function BusinessPage() {
  return <><Header20 /><BusinessLanding /><Footer14 /></>;
}
