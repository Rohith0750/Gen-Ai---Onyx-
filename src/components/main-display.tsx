import type { Dispatch, SetStateAction } from 'react';
import type { SummarizeLegalDocumentOutput } from '@/ai/flows/summarize-legal-document';
import type { ChatMessage } from '@/app/page';
import { DocumentViewer } from '@/components/document-viewer';
import { AssistantPanel } from '@/components/assistant-panel';

type MainDisplayProps = {
  documentText: string;
  summary: SummarizeLegalDocumentOutput;
  highlightedText: string;
  chatHistory: ChatMessage[];
  setChatHistory: Dispatch<SetStateAction<ChatMessage[]>>;
};

export function MainDisplay({
  documentText,
  summary,
  highlightedText,
  chatHistory,
  setChatHistory,
}: MainDisplayProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      <DocumentViewer originalText={documentText} highlightedText={highlightedText} />
      <AssistantPanel
        summary={summary}
        documentText={documentText}
        chatHistory={chatHistory}
        setChatHistory={setChatHistory}
      />
    </div>
  );
}
