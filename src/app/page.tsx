"use client";

import { useState } from 'react';
import Navbar from '@/components/layout/navbar';
import Hero from '@/components/hero';
import QuickPlannerForm from '@/components/quick-planner-form';
import SideAssistant from '@/components/side-assistant';
import { GeneratePersonalizedItineraryOutput } from '@/ai/flows/generate-personalized-itinerary';
import ItineraryPreview from '@/components/itinerary-preview';
import PackingList from '@/components/packing-list';
import ProfileSnapshot from '@/components/profile-snapshot';
import TravelTimeline from '@/components/travel-timeline';
import Bookings from '@/components/bookings';
import Extras from '@/components/extras';
import Footer from '@/components/layout/footer';

export default function Home() {
  const [itinerary, setItinerary] = useState<GeneratePersonalizedItineraryOutput | null>(null);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <div className="container mx-auto px-4 pb-12">
          <div className="relative z-10 -mt-24">
            <QuickPlannerForm setItinerary={setItinerary} />
          </div>
          
          <div className="mt-12 space-y-16">
            {itinerary ? (
              <>
                <ItineraryPreview itinerary={itinerary.itinerary} />
                <PackingList itinerary={itinerary.itinerary} />
              </>
            ) : (
              <ItineraryPreview itinerary="" />
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <ProfileSnapshot />
              </div>
              <div className="lg:col-span-2">
                <TravelTimeline />
              </div>
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
