
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const guidesData = [
  {
    title: "Live Trip Intelligence",
    description: "Keeps your itinerary resilient with proactive, real-time adjustments and smarter routing recommendations.",
    points: [
      "Monitors flights, weather, and local events, rebalancing your agenda the moment plans shift.",
      "Forecasts transit delays and proposes alternate routes before disruptions impact you.",
      "Syncs with companions so the latest update reaches everyone instantly on any device."
    ]
  },
  {
    title: "Language & Culture Concierge",
    description: "Feel at home anywhere with on-demand communication tools tailored to your exact context.",
    points: [
      "Instant translation for text, voice, and signage through the camera in over 140 dialects.",
      "Context-aware etiquette prompts suggesting the right phrases, gestures, and dos and don'ts.",
      "Hands-free interpreter mode to facilitate live conversations with locals in real time."
    ]
  },
  {
    title: "Safety & Awareness Command",
    description: "Stay informed and protected with intelligence drawn from trusted global and local sources.",
    points: [
      "Continuously evaluates news, weather, political climate, and natural risks for each stop.",
      "Provides rapid-access directories to nearby hospitals, embassies, and police contacts.",
      "Signals peak crowd hours at attractions so you can schedule around queues and hotspots."
    ]
  },
  {
    title: "Local Discovery Engine",
    description: "Curates the experiences that matter—culinary highlights, iconic sights, and logistics built for you.",
    points: [
      "Spotlights signature dishes, street-food gems, and acclaimed restaurants matched to your taste.",
      "Maps must-visit locations with route guidance, distance, and travel time estimates in one view.",
      "Highlights trusted hotels by budget, safety scores, dress guidance by gender, and cultural sensitivities to note.",
      "Flags areas or customs to avoid, while surfacing quick language tips for each neighborhood you explore."
    ]
  },
  {
    title: "Immersive Reality Companion",
    description: "Preview adventures before they happen and enrich every on-site moment with AR and VR enhancements.",
    points: [
      "Scan landmarks to reveal layered historical, artistic, and cultural storytelling on demand.",
      "Explore virtual tours of hotels, restaurants, and excursions before booking to confirm the fit.",
      "Blend AR overlays with navigation so you never miss a hidden entrance or panoramic lookout."
    ]
  },
  {
    title: "Responsible Travel Blueprint",
    description: "Travel sustainably with guidance that balances unforgettable memories and mindful impact.",
    points: [
      "Recommends eco-certified stays, community-led tours, and low-impact activity alternatives.",
      "Optimises carbon-friendly transport routes, from rail journeys to e-mobility suggestions.",
      "Shares local conservation projects, volunteer slots, and etiquette for supporting resident communities."
    ]
  }
];

const travelTipsData = [
  {
    title: "Before Your Trip: The Planning Phase",
    description: "Smart planning sets the stage for a stress-free adventure. Here’s what to focus on first.",
    points: [
      "Define Your Budget: Know your spending limits for flights, stays, food, and fun.",
      "Research & Prioritize: Use WanderWise to discover must-see spots and hidden gems.",
      "Book Smart: Reserve flights and hotels 1-3 months in advance for better rates.",
      "Stay Flexible: Sketch out a plan, but leave room for spontaneous discoveries.",
      "Get Insured: Travel insurance is non-negotiable for peace of mind."
    ]
  },
  {
    title: "After Planning: Pre-Departure Checklist",
    description: "Your trip is booked! Now, get everything in order for a smooth departure.",
    points: [
      "Share Your Itinerary: Keep a friend or family member informed of your plans.",
      "Pack Light, Pack Right: Use our AI Packing Assistant to get a tailored list.",
      "Go Digital & Offline: Download tickets, confirmations, and offline maps.",
      "Handle Your Finances: Inform your bank of your travel dates to avoid blocked cards.",
      "Learn a Little: Master a few local phrases like 'Hello,' 'Thank you,' and 'Goodbye.'"
    ]
  },
  {
    title: "During Your Trip: Travel Smarter",
    description: "You've arrived! Make the most of every moment with these on-the-go tips.",
    points: [
      "Stay Alert & Aware: Keep an eye on your belongings, especially in crowded areas.",
      "Embrace Local Culture: Try new foods, respect customs, and engage with locals.",
      "Stay Connected (or Not): Use local SIMs or eSIMs, but don't forget to disconnect and enjoy.",
      "Trust Your Gut: If a situation feels off, remove yourself from it.",
      "Document, But Live: Capture memories, but don't forget to experience them beyond the lens."
    ]
  }
];

export default function Guides() {
  return (
    <section className="container py-10 sm:py-14" id="guides">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold font-headline mb-4">Travel Intelligence Extras</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Elevate every journey with concierge-level insights that adapt to real-time conditions, celebrate local culture, and prioritise safety, sustainability, and unforgettable experiences.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {guidesData.map((guide, index) => (
          <Card key={index} className="shadow-md rounded-2xl overflow-hidden bg-card/70 border-white/15 hover:border-accent/60 hover:shadow-lg transition-all duration-300 flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{guide.title}</CardTitle>
              <CardDescription>{guide.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
              <ul className="space-y-3">
                {guide.points.map((point, pIndex) => (
                  <li key={pIndex} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-sm text-foreground/80">{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center my-16">
        <h2 className="text-3xl sm:text-4xl font-bold font-headline mb-4">Travel Tips for Every Stage</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          From planning to packing and exploring, here are the tips you need for a seamless journey.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {travelTipsData.map((tip, index) => (
          <Card key={index} className="shadow-md rounded-2xl overflow-hidden bg-card/70 border-white/15 hover:border-accent/60 hover:shadow-lg transition-all duration-300 flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{tip.title}</CardTitle>
              <CardDescription>{tip.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
              <ul className="space-y-3">
                {tip.points.map((point, pIndex) => (
                  <li key={pIndex} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-sm text-foreground/80">{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
