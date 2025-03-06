"use client";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import cases from "./cases.json";
import {generateStats, generateChart} from "./actions";
import {useState} from "react";
import {Card} from "@/components/ui/card";
import {StatsCard} from "./stats-card";
import {AreaChartComponent} from "./area-chart";
import {PieChartComponent} from "./pie-chart";
import {motion} from "framer-motion";

export default function Home() {
  const [stats, setStats] = useState<Awaited<
    ReturnType<typeof generateStats>
  > | null>(null);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const filterCategories = [
    {label: "Civil Cases", icon: "⚖️"},
    {label: "Criminal Cases", icon: "👨‍⚖️"},
    {label: "Family Law", icon: "👨‍👩‍👧‍👦"},
    {label: "Corporate Law", icon: "🏢"},
    {label: "Real Estate", icon: "🏠"},
  ];

  const commonActions = [
    {
      title: "Damages Analysis",
      description: "Damages Sought Over Time",
      category: "Civil Cases",
      prompt: "What is the correlation between damages sought over time?",
    },
    {
      title: "Insurance Analysis",
      description: "Insurance Involvement Over Time",
      category: "Criminal Cases",
      prompt:
        "What is the correlation with cases involving insurance over time?",
    },
    {
      title: "Gender Analysis",
      description: "Gender vs Damages Sought Over Time",
      category: "Corporate Law",
      prompt:
        "What is the correlation between gender and damages sought over time?",
    },
  ];

  return (
    <main className="container mx-auto py-8 flex flex-col items-center justify-center h-screen gap-4">
      {/* Header */}
      <h1 className="text-3xl font-bold">DataGavel</h1>

      {/* Search Input */}
      <div className="w-full max-w-2xl flex items-center justify-center gap-4">
        <Input
          placeholder="What can I help you do?"
          className="h-12 text-lg"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button
          variant={"secondary"}
          disabled={loading}
          onClick={async () => {
            setLoading(true);
            // generate summary
            setStats(await generateStats(cases, inputValue));
            // setStats(await generateChart(cases, inputValue));
            setLoading(false);
          }}
        >
          Generate{loading ? "ing..." : ""}
        </Button>
      </div>

      {/* Filter Categories */}
      <div className="flex gap-4 flex-wrap justify-center">
        {filterCategories.map((category) => (
          <Button
            key={category.label}
            variant="outline"
            className="flex items-center gap-2"
          >
            <span>{category.icon}</span>
            {category.label}
          </Button>
        ))}
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {commonActions.map((action) => (
          <Card
            key={action.title}
            className="p-6 hover:shadow-lg transition-shadow"
            onClick={async () => {
              setLoading(true);
              // generate summary
              setStats(await generateStats(cases, action.prompt));
              setLoading(false);
            }}
          >
            <h3 className="font-semibold mb-2">{action.title}</h3>
            <p className="text-sm text-gray-600">{action.description}</p>
            <div className="mt-4">
              <Button variant="secondary" size="sm">
                Start
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl">
        {stats && <AreaChartComponent {...stats} />}
        {/* {stats && <PieChartComponent {...stats} />} */}
      </div>
    </main>
  );
}
