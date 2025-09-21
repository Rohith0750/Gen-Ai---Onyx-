'use client';

import { useState } from 'react';
import type { SummarizeLegalDocumentOutput } from '@/ai/flows/summarize-legal-document';
import { analyzeDocumentAction } from '@/app/actions';
import { mockDocumentText } from '@/lib/mock-document';
import { Header } from '@/components/header';
import { UploadScreen } from '@/components/upload-screen';
import { MainDisplay } from '@/components/main-display';
import { useToast } from '@/hooks/use-toast';

export type AppState = 'unloaded' | 'loading' | 'loaded';
export type ChatMessage = {
  role: 'user' | 'ai';
  content: string;
};

export default function Home() {
  const [appState, setAppState] = useState<AppState>('unloaded');
  const [summary, setSummary] = useState<SummarizeLegalDocumentOutput | null>(null);
  const [highlightedText, setHighlightedText] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const { toast } = useToast();

  const handleAnalyzeDocument = async () => {
    setAppState('loading');
    setChatHistory([]); // Reset chat history on new analysis
    const result = await analyzeDocumentAction(mockDocumentText);

    if (result.success) {
      setSummary(result.summary);
      setHighlightedText(result.highlightedText);
      setAppState('loaded');
      setChatHistory([
        {
          role: 'ai',
          content: "Hello! I've summarized and analyzed the document. What questions do you have?",
        },
      ]);
    } else {
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: result.error,
      });
      setAppState('unloaded');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        {appState !== 'loaded' ? (
          <UploadScreen onAnalyze={handleAnalyzeDocument} isLoading={appState === 'loading'} />
        ) : summary && highlightedText ? (
          <MainDisplay
            documentText={mockDocumentText}
            summary={summary}
            highlightedText={highlightedText}
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
          />
        ) : null}
      </main>
    </div>
  );
}
