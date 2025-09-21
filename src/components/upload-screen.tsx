'use client';

import { UploadCloud, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type UploadScreenProps = {
  onAnalyze: () => void;
  isLoading: boolean;
};

export function UploadScreen({ onAnalyze, isLoading }: UploadScreenProps) {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-12rem)]">
      <Card className="w-full max-w-lg text-center shadow-lg">
        <CardHeader>
          <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
            <UploadCloud className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="mt-4 text-2xl font-headline">Analyze Your Legal Document</CardTitle>
          <CardDescription>
            Upload a file or use our sample document to get a simplified summary, key section highlights, and answers to your questions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button size="lg" onClick={onAnalyze} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Analyze Sample Document'
            )}
          </Button>
          <p className="text-xs text-muted-foreground mt-4">
            For demo purposes, we will use a pre-loaded sample rental agreement.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
