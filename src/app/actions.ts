'use server';

import { summarizeLegalDocument } from '@/ai/flows/summarize-legal-document';
import { highlightKeySections } from '@/ai/flows/highlight-key-sections';
import { answerQuestionsAboutDocument } from '@/ai/flows/answer-questions-about-document';

export async function analyzeDocumentAction(documentText: string) {
  try {
    const [summaryResult, highlightResult] = await Promise.all([
      summarizeLegalDocument({ documentText }),
      highlightKeySections({ legalDocument: documentText }),
    ]);

    return {
      success: true,
      summary: summaryResult,
      highlightedText: highlightResult.highlightedDocument,
    };
  } catch (error) {
    console.error('Error analyzing document:', error);
    return {
      success: false,
      error: 'An unexpected error occurred during document analysis.',
    };
  }
}

export async function askQuestionAction(documentContent: string, question: string) {
  try {
    const result = await answerQuestionsAboutDocument({ documentContent, question });
    return {
      success: true,
      answer: result.answer,
    };
  } catch (error) {
    console.error('Error asking question:', error);
    return {
      success: false,
      error: 'An unexpected error occurred while getting an answer.',
    };
  }
}
