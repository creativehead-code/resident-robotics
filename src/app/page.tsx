import Nav from "@/components/Nav";
import StickyApply from "@/components/StickyApply";
import Hero from "@/components/sections/Hero";
import Program from "@/components/sections/Program";
import VideoSection from "@/components/sections/VideoSection";
import WhyUs from "@/components/sections/WhyUs";
import RobotShowcase from "@/components/sections/RobotShowcase";
import Curriculum from "@/components/sections/Curriculum";
import Experience from "@/components/sections/Experience";
import Legacy from "@/components/sections/Legacy";
import ApplySection from "@/components/sections/ApplySection";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Program />
        <VideoSection />
        <WhyUs />
        <RobotShowcase />
        <Curriculum />
        <Experience />
        <Legacy />
        <ApplySection />
      </main>
      <Footer />
      <StickyApply />
    </>
  );
}
