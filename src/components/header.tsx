import { Gavel, CircleUserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <Gavel className="h-6 w-6 text-primary" />
          <span className="ml-2 font-bold text-lg">LegalEase Simplified</span>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="ghost" size="icon">
            <CircleUserRound className="h-5 w-5" />
            <span className="sr-only">User Profile</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
