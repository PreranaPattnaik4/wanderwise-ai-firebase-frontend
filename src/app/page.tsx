
"use client";

import { useState } from 'react';
import Navbar from '@/components/layout/navbar';
import Hero from '@/components/wanderwise/Hero';
import QuickPlannerForm from '@/components/quick-planner-form';
import SideAssistant from '@/components/side-assistant';
import { GeneratePersonalizedItineraryOutput } from '@/ai/flows/generate-personalized-itinerary';
import PackingList from '@/components/packing-list';
import TravelTimeline from '@/components/travel-timeline';
import Bookings from '@/components/bookings';
import Extras from '@/components/extras';
import Footer from '@/components/layout/footer';

export default function Home() {
  const [itinerary, setItinerary] = useState<GeneratePersonalizedItineraryOutput | null>(null);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <div id="onboarding" className="container mx-auto px-4 pb-12 pt-12">
          <div className="z-10">
            <QuickPlannerForm setItinerary={setItinerary} />
          </div>
          
          <div className="mt-12 space-y-16">
            {itinerary && (
              <>
                <PackingList itinerary={itinerary.itinerary} />
              </>
            )}

            <div className="lg:col-span-2">
              <TravelTimeline />
            </div>

            <Bookings />
            <Extras />
          </div>
        </div>
      </main>
      <SideAssistant />
      <Footer />
    </div>
  );
}
