'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { getPackingListSuggestions } from '@/ai/flows/get-packing-list-suggestions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Loader2, Sparkles, CheckSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from './ui/input';

interface PackingListProps {
  itinerary: string;
}

export default function PackingList({ itinerary }: PackingListProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [preferences, setPreferences] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGetSuggestions = async () => {
    setIsLoading(true);
    setSuggestions([]);
    try {
      const result = await getPackingListSuggestions({
        itinerary,
        preferences,
      });
      setSuggestions(result.suggestions);
      toast({
        title: 'Packing List Ready!',
        description: 'We have generated some packing suggestions for you.',
      });
    } catch (error) {
      console.error('Failed to get packing suggestions:', error);
      toast({
        variant: 'destructive',
        title: 'Oops! Something went wrong.',
        description: 'We couldn\'t get packing suggestions. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="packing-list">
      <Card className="w-full max-w-4xl mx-auto shadow-md rounded-2xl border-accent/50">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl">Packing Assistant</CardTitle>
          <CardDescription>Get AI-powered packing suggestions for your trip.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
             <label htmlFor="preferences" className="text-sm font-medium">Packing Preferences (optional)</label>
            <Input
                id="preferences"
                placeholder="e.g., lightweight, photography gear, formal events"
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                className="rounded-2xl"
            />
          </div>
          <div className="text-center">
            <Button onClick={handleGetSuggestions} disabled={isLoading} className="rounded-2xl">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Get Packing Suggestions
                </>
              )}
            </Button>
          </div>

          {suggestions.length > 0 && (
            <div className="pt-6">
              <h4 className="font-semibold text-lg mb-4 text-center">Your Packing Checklist</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
                {suggestions.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckSquare className="h-5 w-5 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
