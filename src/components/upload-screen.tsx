'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { UploadCloud, Loader2, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { mockDocumentText } from '@/lib/mock-document';

type UploadScreenProps = {
  onAnalyze: (documentText: string) => void;
  isLoading: boolean;
};

export function UploadScreen({ onAnalyze, isLoading }: UploadScreenProps) {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === 'text/plain' && selectedFile.size <= 5 * 1024 * 1024) {
        setFile(selectedFile);
      } else {
        toast({
          variant: 'destructive',
          title: 'Invalid File',
          description: 'Please upload a plain text (.txt) file under 5MB.',
        });
      }
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      onAnalyze(text);
    };
    reader.onerror = () => {
        toast({
            variant: 'destructive',
            title: 'File Read Error',
            description: 'Could not read the selected file.',
        });
    }
    reader.readAsText(file);
  };

  const handleAnalyzeSample = () => {
    onAnalyze(mockDocumentText);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };
  
  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
     if (droppedFile) {
      if (droppedFile.type === 'text/plain' && droppedFile.size <= 5 * 1024 * 1024) {
        setFile(droppedFile);
      } else {
        toast({
          variant: 'destructive',
          title: 'Invalid File',
          description: 'Please upload a plain text (.txt) file under 5MB.',
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-12rem)]">
      <Card className="w-full max-w-lg text-center shadow-lg">
        <CardHeader>
          <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
            <UploadCloud className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="mt-4 text-2xl font-headline">Analyze Your Legal Document</CardTitle>
          <CardDescription>
            Upload a .txt file to get a simplified summary, key section highlights, and answers to your questions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 mb-4 transition-colors hover:border-primary/50 hover:bg-accent"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".txt"
              disabled={isLoading}
            />
            {file ? (
              <div className="flex items-center justify-center text-sm font-medium">
                <FileText className="mr-2 h-5 w-5 text-primary" />
                <span>{file.name}</span>
                <Button variant="ghost" size="icon" className="ml-2 h-6 w-6" onClick={(e) => { e.stopPropagation(); setFile(null); }}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <p className="text-muted-foreground">Drag & Drop or Click to Upload (.txt file)</p>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button size="lg" onClick={handleAnalyze} disabled={isLoading || !file}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Analyze Document'
              )}
            </Button>
            <Button size="lg" variant="outline" onClick={handleAnalyzeSample} disabled={isLoading}>
              Use Sample Document
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Max file size: 5MB. Only .txt files are supported.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
