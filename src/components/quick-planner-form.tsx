
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Wallet, Calendar, Utensils, Heart, Languages, Sparkles, Loader2, Compass, Plane, Mic } from 'lucide-react';
import { generatePersonalizedItinerary, GeneratePersonalizedItineraryOutput } from '@/ai/flows/generate-personalized-itinerary';
import { useToast } from '@/hooks/use-toast';

const tripTypes = ["Leisure", "Adventure", "Business", "Family", "Romance"];
const flightOptions = ["Non-stop", "1 stop ok", "Economy", "Premium", "Business"];

const formSchema = z.object({
  from: z.string().min(1, 'Starting location is required'),
  to: z.string().min(1, 'Destination is required'),
  tripType: z.string().min(1, 'Please select a trip type'),
  flightOptions: z.string().min(1, 'Please select flight options'),
  description: z.string().optional(),
  budget: z.string().min(1, 'Budget is required'),
  duration: z.string().min(1, 'Duration is required'),
  food: z.string().optional(),
  interests: z.string().optional(),
  language: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface QuickPlannerFormProps {
    setItinerary: (itinerary: GeneratePersonalizedItineraryOutput | null) => void;
}

export default function QuickPlannerForm({ setItinerary }: QuickPlannerFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      from: '',
      to: '',
      tripType: 'Leisure',
      flightOptions: 'Economy',
      description: '',
      budget: '$1500',
      duration: '5d',
      food: 'No preference',
      interests: '',
      language: 'English',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setItinerary(null);
    try {
        const result = await generatePersonalizedItinerary({
            destination: values.to,
            tripType: values.tripType,
            flightOptions: values.flightOptions,
            description: `${values.description} (traveling from ${values.from})`,
            budget: values.budget,
            duration: values.duration,
            foodPreferences: values.food || 'any',
            interests: values.interests || 'any',
            language: values.language || 'English',
        });
        setItinerary(result);
        toast({
            title: "Itinerary Generated!",
            description: "Your personalized travel plan is ready below.",
        });
    } catch (error) {
        console.error("Failed to generate itinerary:", error);
        toast({
            variant: "destructive",
            title: "Oops! Something went wrong.",
            description: "We couldn't generate your itinerary. Please try again.",
        });
    } finally {
        setIsLoading(false);
    }
  }

  const renderTagSelector = (field: any, options: string[]) => (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <Button
          key={option}
          type="button"
          variant={field.value === option ? 'default' : 'outline'}
          className="rounded-full transition-transform hover:scale-105"
          onClick={() => field.onChange(option)}
        >
          {option}
        </Button>
      ))}
    </div>
  );

  return (
    <Card className="w-full max-w-5xl mx-auto shadow-xl rounded-2xl border-none bg-white/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="font-headline text-2xl font-bold">Tell us about your trip</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-8">
            <div>
              <FormDescription className="flex items-center gap-2 font-semibold text-foreground">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 4.5C3 4.22386 3.22386 4 3.5 4H11.5C11.7761 4 12 4.22386 12 4.5C12 4.77614 11.7761 5 11.5 5H3.5C3.22386 5 3 4.77614 3 4.5ZM3.5 7C3.22386 7 3 7.22386 3 7.5C3 7.77614 3.22386 8 3.5 8H11.5C11.7761 8 12 7.77614 12 7.5C12 7.22386 11.7761 7 11.5 7H3.5ZM5.5 10C5.22386 10 5 10.2239 5 10.5C5 10.7761 5.22386 11 5.5 11H9.5C9.77614 11 10 10.7761 10 10.5C10 10.2239 9.77614 10 9.5 10H5.5ZM2 13.5C2 13.2239 2.22386 13 2.5 13H12.5C12.7761 13 13 13.2239 13 13.5C13 13.7761 12.7761 14 12.5 14H2.5C2.22386 14 2 13.7761 2 13.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                  Quick Planner
              </FormDescription>
              <p className="text-muted-foreground text-sm mt-1">Write where you want to go and your preferences. We'll suggest a plan.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="from"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">From</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Compass className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="e.g. Bengaluru" {...field} className="pl-10 rounded-lg bg-secondary border-none" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="to"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">To</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Plane className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="e.g. Goa or Bali" {...field} className="pl-10 rounded-lg bg-secondary border-none" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="tripType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">Type of trip</FormLabel>
                    <FormControl>
                      {renderTagSelector(field, tripTypes)}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="flightOptions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">Flight options</FormLabel>
                    <FormControl>
                      {renderTagSelector(field, flightOptions)}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">Describe your trip (optional)</FormLabel>
                  <FormControl>
                    <div className="relative">
                        <Textarea placeholder="e.g., Weekend getaway from Bengaluru to Goa next month, beach + nightlife, nonstop flights" {...field} className="rounded-lg bg-secondary border-none pr-10" />
                        <Mic className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                       <div className="relative">
                        <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input {...field} className="pl-10 rounded-lg bg-secondary border-none" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                       <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input {...field} className="pl-10 rounded-lg bg-secondary border-none" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="food"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Utensils className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input {...field} className="pl-10 rounded-lg bg-secondary border-none" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Heart className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="Interests" {...field} className="pl-10 rounded-lg bg-secondary border-none" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                       <div className="relative">
                        <Languages className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input {...field} className="pl-10 rounded-lg bg-secondary border-none" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

          </CardContent>
          <CardFooter className="flex justify-end">
             <Button type="submit" disabled={isLoading} variant="default" className="rounded-full px-6 transition-transform hover:scale-105 bg-primary/80 hover:bg-primary text-primary-foreground font-semibold">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Suggest Plan
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

    