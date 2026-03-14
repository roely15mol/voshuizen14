import Hero from "@/components/Hero";
import Welcome from "@/components/Welcome";
import Location from "@/components/Location";
import LocalArea from "@/components/LocalArea";
import Contact from "@/components/Contact";
import LandingFooter from "@/components/LandingFooter";

export const revalidate = 3600;

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <Welcome />
      <Location />
      <LocalArea />
      <Contact />
      <LandingFooter />
    </main>
  );
}
