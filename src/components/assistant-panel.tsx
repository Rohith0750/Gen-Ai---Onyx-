import type { Dispatch, SetStateAction } from 'react';
import type { SummarizeLegalDocumentOutput } from '@/ai/flows/summarize-legal-document';
import type { ChatMessage } from '@/app/page';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BookText, MessageSquare } from 'lucide-react';
import { Chatbot } from '@/components/chatbot';

type AssistantPanelProps = {
  summary: SummarizeLegalDocumentOutput;
  documentText: string;
  chatHistory: ChatMessage[];
  setChatHistory: Dispatch<SetStateAction<ChatMessage[]>>;
};

export function AssistantPanel({
  summary,
  documentText,
  chatHistory,
  setChatHistory,
}: AssistantPanelProps) {
  return (
    <Card className="shadow-md h-[calc(100vh-10rem)] flex flex-col">
      <CardHeader>
        <CardTitle>AI Assistant</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col min-h-0">
        <Tabs defaultValue="summary" className="flex-grow flex flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="summary">
              <BookText className="mr-2" />
              Summary
            </TabsTrigger>
            <TabsTrigger value="qa">
              <MessageSquare className="mr-2" />
              Q&amp;A
            </TabsTrigger>
          </TabsList>
          <div className="flex-grow mt-4 min-h-0">
            <TabsContent value="summary" className="h-full">
              <ScrollArea className="h-full pr-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Simplified Summary</h3>
                    <p className="text-sm text-muted-foreground">{summary.summary}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Key Sections Identified</h3>
                    <p className="text-sm text-muted-foreground">{summary.keySections}</p>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="qa" className="h-full">
              <Chatbot
                documentText={documentText}
                chatHistory={chatHistory}
                setChatHistory={setChatHistory}
              />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
