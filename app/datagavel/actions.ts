"use server";

import {generateObject} from "ai";
import {openai} from "@ai-sdk/openai";
import {z} from "zod";

export const generateStats = async (cases: any[], userPrompt: string) => {
  const result = await generateObject({
    model: openai("gpt-4o"),
    prompt: `Based on the following cases and the user's request: "${userPrompt}", generate a data analysis summary and chart data.

    ---
    Cases:
    ${JSON.stringify(cases)}
    ---
    Format the response to include both summary information and chart data.
    Make sure the values are actual numbers from the data numbers.`,
    schema: z.object({
      summary: z.string().describe("Summary of the cases"),
      chartData: z
        .array(
          z.object({
            month: z.string().describe("Month in calendar year"),
            metric1: z.number().describe("First metric value"),
            metric2: z.number().describe("Second metric value"),
          })
        )
        .describe("Data points for the area chart"),
      chartConfig: z
        .object({
          metric1: z.object({
            label: z.string().describe("Label for metric1"),
            color: z
              .string()
              .default("hsl(var(--chart-1))")
              .describe("Color for metric1"),
          }),
          metric2: z.object({
            label: z.string().describe("Label for metric2"),
            color: z
              .string()
              .default("hsl(var(--chart-2))")
              .describe("Color for metric2"),
          }),
        })
        .describe("Configuration for chart metrics"),
    }),
  });
  return result.object;
};

export const generateChart = async (cases: any[], userPrompt: string) => {
  const result = await generateObject({
    model: openai("gpt-4o"),
    prompt: `Based on the following cases and the user's request: "${userPrompt}", generate a data analysis summary and chart data.

    ---
    Cases:
    ${JSON.stringify(cases)}
    ---
    Format the response to include both summary information and chart data.
    The chartData should contain 5 data points, each with a category name, value, and a fill color.
    The chartConfig should define the display configuration for each category.
    Make sure the values are actual numbers from the data.`,
    schema: z.object({
      summary: z.string().describe("Summary of the cases"),
      chartData: z
        .array(
          z.object({
            category: z.string().describe("Category name"),
            value: z.number().describe("Numeric value for this category"),
            fill: z
              .string()
              .describe(
                "HSL color variable 1 through 5: hsl(var(--chart-1)) through hsl(var(--chart-5))"
              ),
          })
        )
        .min(1)
        .describe("Data points for the pie chart"),
      chartConfig: z
        .object({
          value: z.object({
            label: z.string().describe("Label for the value metric"),
            color: z
              .string()
              .describe(
                "HSL color variable 1 through 5: hsl(var(--chart-1)) through hsl(var(--chart-5))"
              ),
          }),
        })
        .and(
          z.record(
            z.object({
              label: z.string().describe("Display label for the category"),
              color: z
                .string()
                .describe(
                  "HSL color variable 1 through 5: hsl(var(--chart-1)) through hsl(var(--chart-5))"
                ),
            })
          )
        )
        .describe("Configuration for chart categories and metrics"),
    }),
  });
  return result.object;
};
