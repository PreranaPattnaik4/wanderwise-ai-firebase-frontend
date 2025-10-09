
"use client";

import Bookings from "@/components/bookings";
import Extras from "@/components/extras";
import Itinerary from "@/components/itinerary";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";

export default function ItineraryPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Itinerary />
        <div className="container mx-auto px-4 pb-12 pt-16 space-y-16">
            <Bookings />
            <Extras />
        </div>
      </main>
      <Footer />
    </div>
  );
}

