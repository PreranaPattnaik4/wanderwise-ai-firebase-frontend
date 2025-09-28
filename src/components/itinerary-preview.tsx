import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "./ui/button";

interface ItineraryPreviewProps {
  itinerary: string;
}

const parseItinerary = (itineraryText: string) => {
    const dayRegex = /Day \d+: .*/g;
    const days = itineraryText.match(dayRegex);
    if (!days) return [{ title: "Your Itinerary", content: itineraryText }];

    const contentBetweenDays = itineraryText.split(dayRegex).slice(1);
    
    return days.map((day, index) => {
        return {
            title: day.trim(),
            content: (contentBetweenDays[index] || "").trim()
        }
    });
}

const sampleItinerary = `
Day 1: Arrival in Paris & Montmartre
- Arrive at Charles de Gaulle Airport (CDG), take a taxi to your hotel in Le Marais.
- Check-in and freshen up.
- Afternoon: Explore the charming streets of Montmartre.
- Evening: Enjoy dinner at a classic French bistro.

Day 2: Iconic Landmarks
- Morning: Visit the Eiffel Tower (pre-book tickets!).
- Afternoon: Explore the Louvre Museum.
- Evening: Seine River cruise.

Day 3: Versailles & Departure
- Morning: Day trip to the Palace of Versailles.
- Afternoon: Return to Paris for some last-minute souvenir shopping.
- Evening: Depart from CDG.
`

export default function ItineraryPreview({ itinerary }: ItineraryPreviewProps) {
  const itineraryData = parseItinerary(itinerary || sampleItinerary);
  const isSample = !itinerary;

  return (
    <section id="itinerary">
      <Card className="w-full max-w-4xl mx-auto shadow-md rounded-2xl border-accent/50">
        <CardHeader className="text-center">
          <CardDescription>{isSample ? "Sample Plan" : "Your Personalized Plan"}</CardDescription>
          <CardTitle className="font-headline text-3xl">
            {isSample ? "A Glimpse of Your Next Adventure" : "Your Custom Itinerary"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {itineraryData.map((day, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="font-semibold">{day.title}</AccordionTrigger>
                <AccordionContent>
                  <div className="prose prose-sm max-w-none whitespace-pre-line">
                    {day.content}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          {isSample && (
            <div className="text-center mt-8">
              <Button size="lg" className="rounded-2xl">Generate My Trip</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
