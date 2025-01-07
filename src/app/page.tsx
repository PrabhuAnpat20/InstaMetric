import Image from "next/image";
import { BackgroundBeamsDemo } from "./_components/Background";
import { AnimatedTooltipPreview } from "./_components/Judges";

export default function Home() {
  return (
    <div className=" font-[family-name:var(--font-geist-sans)]">
      <BackgroundBeamsDemo />
    </div>
  );
}
