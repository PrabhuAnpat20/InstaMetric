"use client";
import React from "react";
import { BackgroundBeams } from "../components/ui/background-beams";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimatedTooltipPreview } from "./Judges";
import { ArrowRight } from "lucide-react";

export function BackgroundBeamsDemo() {
  return (
    <div className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4 relative z-20">
        {" "}
        {/* Increased z-index */}
        <h1 className="text-4xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold mb-4">
          Stalk Your Judges
        </h1>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-xs md:text-sm text-center">
          Think your judges are all work and no play? Let’s snoop a little!,
          we’re here to uncover their social media shenanigans—because everyone
          leaves a digital footprint.
        </p>
        <div className="relative z-50  mt-6 md:mt-10">
          {" "}
          {/* Added relative positioning and higher z-index */}
          <AnimatedTooltipPreview />
        </div>
        <div className="mt-8 flex justify-center">
          <Button asChild>
            <Link href="/analyze">
              Start the Stalk Fest <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
      <BackgroundBeams className="z-10" /> {/* Lower z-index for background */}
    </div>
  );
}
