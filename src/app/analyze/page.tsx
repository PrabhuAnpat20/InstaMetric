"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AnalysisFormatterProps {
  analysisText: string;
}

// Analysis Formatter Component
const AnalysisFormatter: React.FC<AnalysisFormatterProps> = ({
  analysisText,
}) => {
  const formatAnalysis = (text: string): string => {
    if (!text) return "";

    return (
      text
        // Format headers
        .replace(/={2,}/g, "") // Remove === lines
        .replace(
          /#{1,4} (.*?)[\r\n]/g,
          (_, title) =>
            `<h${
              title.startsWith(" ") ? 3 : 2
            } class="text-xl font-bold text-gray-100 mt-6 mb-3">${title.trim()}</h${
              title.startsWith(" ") ? 3 : 2
            }>\n`
        )
        // Format bullet points
        .replace(
          /\* (.*?)[\r\n]/g,
          '<li class="ml-4 mb-2 text-gray-300">$1</li>'
        )
        // Format numbered lists
        .replace(
          /(\d+)\. (.*?)[\r\n]/g,
          '<li class="ml-4 mb-2 text-gray-300">$2</li>'
        )
        // Format tables
        .replace(/\|(.*?)\|/g, (match) => {
          const cells = match.split("|").filter((cell) => cell.trim());
          return cells
            .map(
              (cell) =>
                `<td class="px-4 py-2 border border-gray-600 text-gray-300">${cell.trim()}</td>`
            )
            .join("");
        })
        .replace(
          /\n\|(.*?)\|\n/g,
          (match) => `<tr>${match.replace(/\|(.*?)\|/, "$1")}</tr>`
        )
        // Format bold text
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-400">$1</strong>')
        // Format plus signs as bullet points
        .replace(
          /\+ (.*?)[\r\n]/g,
          '<li class="ml-8 mb-2 text-gray-300">$1</li>'
        )
        // Wrap lists in ul tags
        .replace(/<li.*?>(.*?)<\/li>/g, (match) =>
          match.includes('class="ml-8"')
            ? match
            : `<ul class="list-disc mb-4">${match}</ul>`
        )
    );
  };

  return (
    <div className="prose prose-invert max-w-none">
      <div
        dangerouslySetInnerHTML={{
          __html: formatAnalysis(analysisText),
        }}
        className="text-gray-300 leading-relaxed"
      />
    </div>
  );
};

interface Judge {
  id: number;
  name: string;
  username: string;
  photo: string;
}

interface AnalysisResponse {
  text: string;
}

const judges: Judge[] = [
  {
    id: 1,
    name: "Hitesh Choudhary",
    username: "hiteshchoudharyofficial",
    photo: "/hitesh.jpg",
  },
  {
    id: 2,
    name: "Saksham Choudhary",
    username: "sakshamchoudharyofficial",
    photo: "/saksham.jpg",
  },
  {
    id: 3,
    name: "Ranveer Allahbadia",
    username: "beerbiceps",
    photo: "/beerbicep.jpg",
  },
  {
    id: 4,
    name: "Harshil Karia",
    username: "harshiljkaria",
    photo: "/Harshil.png",
  },
  {
    id: 5,
    name: "Ayush Anand",
    username: "aayushmisfiit",
    photo: "/Ayush.png",
  },
];

const postTypes = ["Reel", "Carousel", "Image"] as const;
type PostType = (typeof postTypes)[number];

const Home: React.FC = () => {
  const [selectedJudge, setSelectedJudge] = useState<number | null>(null);
  const [selectedPostType, setSelectedPostType] = useState<
    PostType | undefined
  >(undefined);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateAnalysis = async () => {
    if (!selectedJudge || !selectedPostType) return;

    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    const selectedJudgeData = judges.find((j) => j.id === selectedJudge);
    if (!selectedJudgeData) {
      setError("Selected judge not found");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedPostType,
          username: selectedJudgeData.username,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data: AnalysisResponse = await response.json();
      setAnalysis(data.text || "No analysis text available.");
    } catch (err) {
      console.error("Error generating analysis:", err);
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 px-8 md:p-8">
      <div className="flex flex-wrap lg:flex-nowrap gap-8">
        {/* Left Column */}
        <div className="w-full lg:w-1/3 md:mx-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8 mb-6">
            {judges.map((judge) => (
              <div
                key={judge.id}
                className={`relative cursor-pointer rounded-lg overflow-hidden transition-all duration-200 ${
                  selectedJudge === judge.id
                    ? "ring-2 ring-blue-500 scale-105 shadow-[0_0_10px_rgba(59,130,246,0.75)]"
                    : "hover:scale-105"
                }`}
                onClick={() => setSelectedJudge(judge.id)}
              >
                <div className="relative h-32 sm:h-48 w-full">
                  <Image
                    src={judge.photo}
                    alt={judge.name}
                    className="object-cover"
                    fill
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2">
                  <p className="text-white text-center font-semibold text-xs md:text-lg">
                    {judge.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Select
              onValueChange={(value: PostType) => setSelectedPostType(value)}
              value={selectedPostType}
            >
              <SelectTrigger className="w-full sm:w-72 bg-gray-800 text-white">
                <SelectValue
                  placeholder="Select post type"
                  className="text-white"
                />
              </SelectTrigger>
              <SelectContent>
                {postTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              className="w-full sm:w-72"
              onClick={generateAnalysis}
              disabled={!selectedJudge || !selectedPostType || isLoading}
            >
              {isLoading ? "Generating..." : "Generate Analysis"}
            </Button>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-2/3 md:mx-10">
          <Card className="h-[450px] overflow-y-scroll scrollable-container bg-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-50">Analysis Results</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p className="text-gray-100">Generating analysis...</p>
              ) : error ? (
                <p className="text-red-500">Error: {error}</p>
              ) : analysis ? (
                <AnalysisFormatter analysisText={analysis} />
              ) : (
                <p className="text-gray-500">
                  Select a judge and post type, then click Generate Analysis to
                  see results.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
