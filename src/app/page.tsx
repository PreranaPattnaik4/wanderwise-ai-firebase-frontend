"use client";

import { useState } from 'react';
import Navbar from '@/components/layout/navbar';
import Hero from '@/components/hero';
import QuickPlannerForm from '@/components/quick-planner-form';
import SideAssistant from '@/components/side-assistant';
import { GeneratePersonalizedItineraryOutput } from '@/ai/flows/generate-personalized-itinerary';
import ItineraryPreview from '@/components/itinerary-preview';
import PackingList from '@/components/packing-list';

export default function Home() {
  const [itinerary, setItinerary] = useState<GeneratePersonalizedItineraryOutput | null>(null);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <div className="container mx-auto px-4 pb-8 md:pb-12">
          <div className="relative z-10 -mt-12 md:-mt-24">
            <QuickPlannerForm setItinerary={setItinerary} />
          </div>
          {(itinerary) && (
            <div className="mt-12 space-y-12">
              <ItineraryPreview itinerary={itinerary.itinerary} />
              <PackingList itinerary={itinerary.itinerary} />
            </div>
          )}
        </div>
      </main>
      <SideAssistant />
      {/* Footer can be added back if needed */}
    </div>
  );
}
