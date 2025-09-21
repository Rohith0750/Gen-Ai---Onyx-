// src/ai/flows/answer-questions-about-document.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for answering questions about a legal document.
 *
 * It takes a document ID and a question as input, retrieves the document content,
 * and uses a language model to generate an answer based on the document content.
 *
 * @exports answerQuestionsAboutDocument - The main function to call to answer questions.
 * @exports AnswerQuestionsAboutDocumentInput - The input type for the answerQuestionsAboutDocument function.
 * @exports AnswerQuestionsAboutDocumentOutput - The output type for the answerQuestionsAboutDocument function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerQuestionsAboutDocumentInputSchema = z.object({
  documentContent: z
    .string()
    .describe('The content of the legal document to answer questions about.'),
  question: z.string().describe('The question to ask about the legal document.'),
});
export type AnswerQuestionsAboutDocumentInput = z.infer<
  typeof AnswerQuestionsAboutDocumentInputSchema
>;

const AnswerQuestionsAboutDocumentOutputSchema = z.object({
  answer: z.string().describe('The AI-powered answer to the question.'),
});
export type AnswerQuestionsAboutDocumentOutput = z.infer<
  typeof AnswerQuestionsAboutDocumentOutputSchema
>;

export async function answerQuestionsAboutDocument(
  input: AnswerQuestionsAboutDocumentInput
): Promise<AnswerQuestionsAboutDocumentOutput> {
  return answerQuestionsAboutDocumentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerQuestionsAboutDocumentPrompt',
  input: {schema: AnswerQuestionsAboutDocumentInputSchema},
  output: {schema: AnswerQuestionsAboutDocumentOutputSchema},
  prompt: `You are an AI assistant helping users understand legal documents.

  Answer the following question based on the content of the document provided.
  If the answer is not explicitly in the document, inform the user that the document does not contain the answer.

  Document Content: {{{documentContent}}}
  Question: {{{question}}}

  Answer:`,
});

const answerQuestionsAboutDocumentFlow = ai.defineFlow(
  {
    name: 'answerQuestionsAboutDocumentFlow',
    inputSchema: AnswerQuestionsAboutDocumentInputSchema,
    outputSchema: AnswerQuestionsAboutDocumentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
