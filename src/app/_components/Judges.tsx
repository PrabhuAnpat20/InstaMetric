"use client";
import React from "react";
import { AnimatedTooltip } from "../components/ui/animated-tooltip";

const people = [
  {
    id: 1,
    name: "Hitesh Choudhary",
    designation: "Software Engineer",
    image: "/Judges/hitesh.jpg", // Image from the public folder
  },
  {
    id: 2,
    name: "Saksham Choudhary",
    designation: "Product Manager",
    image: "/Judges/saksham.jpg", // Image from the public folder
  },
  {
    id: 3,
    name: "Ranveer Allahbadia",
    designation: "Data Scientist",
    image: "/Judges/beerbicep.jpg", // Image from the public folder
  },
  {
    id: 4,
    name: "Harshil Karia",
    designation: "UX Designer",
    image: "/Judges/Harshil.png", // Image from the public folder
  },
  {
    id: 5,
    name: "Ayush Anand",
    designation: "Soap Developer",
    image: "/Judges/Ayush.png", // Image from the public folder
  },
];

export function AnimatedTooltipPreview() {
  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
}