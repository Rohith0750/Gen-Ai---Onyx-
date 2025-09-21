'use client';

import { useState, useRef, useEffect, type Dispatch, type SetStateAction } from 'react';
import { Send, Loader2, Sparkles, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import type { ChatMessage } from '@/app/page';
import { askQuestionAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

type ChatbotProps = {
  documentText: string;
  chatHistory: ChatMessage[];
  setChatHistory: Dispatch<SetStateAction<ChatMessage[]>>;
};

export function Chatbot({ documentText, chatHistory, setChatHistory }: ChatbotProps) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [chatHistory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setChatHistory((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const result = await askQuestionAction(documentText, input);

    if (result.success) {
      const aiMessage: ChatMessage = { role: 'ai', content: result.answer };
      setChatHistory((prev) => [...prev, aiMessage]);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
      // remove optimistic user message on failure
      setChatHistory((prev) => prev.slice(0, prev.length -1));
    }
    setIsLoading(false);
  };

  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-grow pr-4 -mr-4" ref={scrollAreaRef}>
        <div className="space-y-6">
          {chatHistory.map((message, index) => (
            <div
              key={index}
              className={cn('flex items-start gap-3', message.role === 'user' ? 'justify-end' : '')}
            >
              {message.role === 'ai' && (
                <Avatar className="h-8 w-8 border-2 border-primary">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Sparkles className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'rounded-lg p-3 max-w-sm text-sm',
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                <p>{message.content}</p>
              </div>
               {message.role === 'user' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
             <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8 border-2 border-primary">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Sparkles className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="rounded-lg p-3 max-w-sm text-sm bg-muted flex items-center">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <form onSubmit={handleSubmit} className="mt-4 flex gap-2 pt-2 border-t">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about the document..."
          disabled={isLoading}
          autoComplete="off"
        />
        <Button type="submit" disabled={isLoading || !input.trim()} size="icon" aria-label="Send message">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
