import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, Sparkles } from 'lucide-react';

type DocumentViewerProps = {
  originalText: string;
  highlightedText: string;
};

export function DocumentViewer({ originalText, highlightedText }: DocumentViewerProps) {
  return (
    <Card className="shadow-md h-[calc(100vh-10rem)] flex flex-col">
      <CardHeader>
        <CardTitle>Document Viewer</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col min-h-0">
        <Tabs defaultValue="highlighted" className="flex-grow flex flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="highlighted">
              <Sparkles className="mr-2" />
              Key Sections
            </TabsTrigger>
            <TabsTrigger value="original">
              <FileText className="mr-2" />
              Original Text
            </TabsTrigger>
          </TabsList>
          <div className="flex-grow mt-4 min-h-0">
            <TabsContent value="highlighted" className="h-full">
              <ScrollArea className="h-full pr-4">
                <div
                  className="prose prose-sm dark:prose-invert max-w-none [&amp;_b]:bg-primary/20 [&amp;_b]:text-primary-foreground [&amp;_b]:p-0.5 [&amp;_b]:rounded-sm"
                  dangerouslySetInnerHTML={{ __html: highlightedText.replace(/\n/g, '<br />') }}
                />
              </ScrollArea>
            </TabsContent>
            <TabsContent value="original" className="h-full">
              <ScrollArea className="h-full pr-4">
                <p className="whitespace-pre-wrap text-sm text-muted-foreground">{originalText}</p>
              </ScrollArea>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
