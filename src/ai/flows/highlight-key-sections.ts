'use server';

/**
 * @fileOverview This file defines a Genkit flow for highlighting key sections (rights, duties, risks, deadlines) within a legal document.
 *
 * - highlightKeySections - A function that takes a legal document as input and returns the document with key sections highlighted.
 * - HighlightKeySectionsInput - The input type for the highlightKeySections function.
 * - HighlightKeySectionsOutput - The return type for the highlightKeySections function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HighlightKeySectionsInputSchema = z.object({
  legalDocument: z
    .string()
    .describe('The legal document to be analyzed.'),
});
export type HighlightKeySectionsInput = z.infer<
  typeof HighlightKeySectionsInputSchema
>;

const HighlightKeySectionsOutputSchema = z.object({
  highlightedDocument: z
    .string()
    .describe('The legal document with key sections highlighted.'),
});
export type HighlightKeySectionsOutput = z.infer<
  typeof HighlightKeySectionsOutputSchema
>;

export async function highlightKeySections(
  input: HighlightKeySectionsInput
): Promise<HighlightKeySectionsOutput> {
  return highlightKeySectionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'highlightKeySectionsPrompt',
  input: {schema: HighlightKeySectionsInputSchema},
  output: {schema: HighlightKeySectionsOutputSchema},
  prompt: `You are an AI assistant specializing in legal document analysis.
  Your task is to identify and highlight the key sections within the given legal document.
  The key sections to highlight are:
  - Rights
  - Duties
  - Risks
  - Deadlines

  Highlight these sections by wrapping them in HTML bold tags <b></b>.

  Legal Document: {{{legalDocument}}}
  `,
});

const highlightKeySectionsFlow = ai.defineFlow(
  {
    name: 'highlightKeySectionsFlow',
    inputSchema: HighlightKeySectionsInputSchema,
    outputSchema: HighlightKeySectionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
