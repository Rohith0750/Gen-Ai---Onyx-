'use client';

import { useState } from 'react';
import type { SummarizeLegalDocumentOutput } from '@/ai/flows/summarize-legal-document';
import { analyzeDocumentAction } from '@/app/actions';
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
  const [originalDocument, setOriginalDocument] = useState<string>('');

  const { toast } = useToast();

  const handleAnalyzeDocument = async (documentText: string) => {
    setAppState('loading');
    setChatHistory([]); // Reset chat history on new analysis
    setOriginalDocument(documentText);
    const result = await analyzeDocumentAction(documentText);

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

  const handleReset = () => {
    setAppState('unloaded');
    setSummary(null);
    setHighlightedText('');
    setChatHistory([]);
    setOriginalDocument('');
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header onNewDocument={appState === 'loaded' ? handleReset : undefined} />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        {appState !== 'loaded' ? (
          <UploadScreen onAnalyze={handleAnalyzeDocument} isLoading={appState === 'loading'} />
        ) : summary && highlightedText ? (
          <MainDisplay
            documentText={originalDocument}
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
