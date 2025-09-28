"use client";

import { useState } from 'react';
import Navbar from '@/components/layout/navbar';
import Hero from '@/components/hero';
import QuickPlannerForm from '@/components/quick-planner-form';
import TravelTimeline from '@/components/travel-timeline';
import ItineraryPreview from '@/components/itinerary-preview';
import Bookings from '@/components/bookings';
import ProfileSnapshot from '@/components/profile-snapshot';
import Extras from '@/components/extras';
import Footer from '@/components/layout/footer';
import SideAssistant from '@/components/side-assistant';
import { GeneratePersonalizedItineraryOutput } from '@/ai/flows/generate-personalized-itinerary';

export default function Home() {
  const [itinerary, setItinerary] = useState<GeneratePersonalizedItineraryOutput | null>(null);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="space-y-12 md:space-y-24">
            <QuickPlannerForm setItinerary={setItinerary} />
            {(itinerary) && <ItineraryPreview itinerary={itinerary.itinerary} />}
            <TravelTimeline />
            <Bookings />
            <div className="grid gap-12 lg:grid-cols-3 lg:gap-8">
              <div className="lg:col-span-2">
                <Extras />
              </div>
              <div className="lg:col-span-1">
                <ProfileSnapshot />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <SideAssistant />
    </div>
  );
}
