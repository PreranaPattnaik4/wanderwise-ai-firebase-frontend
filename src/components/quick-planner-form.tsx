
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Wallet, Calendar, Utensils, Heart, Languages, Sparkles, Loader2, Compass, Plane } from 'lucide-react';
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
      tripType: '',
      flightOptions: '',
      description: '',
      budget: '',
      duration: '',
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
    <Card className="w-full max-w-4xl mx-auto shadow-md rounded-2xl border-accent/20 bg-background/60 backdrop-blur-md">
      <CardHeader className="text-center">
        <CardDescription className="flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            Quick Planner
        </CardDescription>
        <CardTitle className="font-headline text-3xl">Tell us about your trip</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-8">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="from"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Compass className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="e.g. Bengaluru" {...field} className="pl-10 rounded-2xl" />
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
                    <FormLabel>To</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Plane className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="e.g. Goa or Bali" {...field} className="pl-10 rounded-2xl" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="tripType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trip type</FormLabel>
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
                    <FormLabel>Flight options</FormLabel>
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
                  <FormLabel>Describe your trip</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your trip (optional)" {...field} className="rounded-2xl" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget</FormLabel>
                    <FormControl>
                       <div className="relative">
                        <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="$1500" {...field} className="pl-10 rounded-2xl" />
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
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                       <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="5d" {...field} className="pl-10 rounded-2xl" />
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
                    <FormLabel>Food</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Utensils className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="No preference" {...field} className="pl-10 rounded-2xl" />
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
                    <FormLabel>Interests</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Heart className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="Museums, hiking" {...field} className="pl-10 rounded-2xl" />
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
                    <FormLabel>Language</FormLabel>
                    <FormControl>
                       <div className="relative">
                        <Languages className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="English" {...field} className="pl-10 rounded-2xl" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

          </CardContent>
          <CardFooter className="flex justify-end">
             <Button type="submit" disabled={isLoading} className="rounded-full px-8 transition-transform hover:scale-105">
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
