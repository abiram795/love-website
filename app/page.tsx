import { Navbar } from "@/components/Navbar";
import { FloatingHearts } from "@/components/FloatingHearts";
import { Hero } from "@/components/Hero";
import { ScratchCard } from "@/components/ScratchCard";
import { MemorySection } from "@/components/MemorySection";
import { LoveLetter } from "@/components/LoveLetter";
import { RelationshipTimer } from "@/components/RelationshipTimer";
import { ChatAnalytics } from "@/components/ChatAnalytics";
import { LoveReasons } from "@/components/LoveReasons";
import { WheelGame } from "@/components/WheelGame";
import { Compatibility } from "@/components/Compatibility";
import { MusicSection } from "@/components/MusicSection";
import { MoonPhase } from "@/components/MoonPhase";
import { FinalMessage } from "@/components/FinalMessage";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-x-hidden max-w-full">
      <Navbar />
      <FloatingHearts />
      <Hero />
      <ScratchCard />
      <MemorySection />
      <LoveLetter />
      <RelationshipTimer />
      <ChatAnalytics />
      <LoveReasons />
      <WheelGame />
      <Compatibility />
      <MusicSection />
      <MoonPhase />
      <FinalMessage />
      <Footer />
    </main>
  );
}