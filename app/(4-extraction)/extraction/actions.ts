"use server";

import {generateObject} from "ai";
import {openai} from "@ai-sdk/openai";
import {z} from "zod";

export const extractAppointment = async (input: string) => {
  const result = await generateObject({
    model: openai("gpt-4o-mini"),
    prompt: "Extract appointment info for the following input: " + input,
    schema: z.object({
      title: z
        .string()
        .describe(
          "The title of the event. This should be the main purpose of the event. No need to mention names. Clean up formatting (capitalise)."
        ),
      startTime: z.string().nullable().describe("format HH:MM"),
      endTime: z
        .string()
        .nullable()
        .describe("format HH:MM - note: default meeting duration is 1 hour"),
      attendees: z
        .array(z.string())
        .nullable()
        .describe("comma separated list of attendees"),
      location: z.string().nullable(),
      date: z
        .string()
        .describe("Today's date is: " + new Date().toISOString().split("T")[0]),
    }),
  });
  return result.object;
};
