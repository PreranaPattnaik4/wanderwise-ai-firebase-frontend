
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Sparkles, Bot, PlaneTakeoff, CalendarClock } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const features = [
    {
      icon: Sparkles,
      title: "Personalized Itineraries",
      description: "AI crafts unique plans based on your interests and budget.",
    },
    {
      icon: Bot,
      title: "Smart Suggestions",
      description: "Get real-time recommendations for activities and dining.",
    },
    {
      icon: PlaneTakeoff,
      title: "All-in-One Bookings",
      description: "Manage flights, hotels, and activities in one place.",
    },
    {
      icon: CalendarClock,
      title: "Real-time Updates",
      description: "Your itinerary adapts to changes and local conditions.",
    },
];

const tripInfoImage = PlaceHolderImages.find(p => p.id === 'trip-info-camera');

export default function TripInfo() {
  return (
    <section className="container py-10 sm:py-14" id="trip-info">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="grid lg:grid-cols-2 gap-12 items-center"
      >
        <div className="text-center lg:text-left">
            <h2 className="text-3xl font-headline font-bold mb-4">Everything you need for planning your trip</h2>
            <p className="max-w-xl mx-auto lg:mx-0 text-muted-foreground mb-12">
              Seamlessly manage your itinerary all in one page with WanderWise AI — from reordering your plans, introducing new destinations, or removing plans as needed.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
                {features.map((feature, index) => (
                    <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center lg:text-left"
                    >
                        <div className="inline-block lg:inline-flex p-4 bg-accent/20 rounded-full mb-4">
                            <feature.icon className="w-6 h-6 text-accent" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
        
        {tripInfoImage && (
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative h-80 lg:h-full w-full rounded-2xl overflow-hidden"
            >
                <Image 
                    src={tripInfoImage.imageUrl} 
                    alt={tripInfoImage.description}
                    data-ai-hint={tripInfoImage.imageHint}
                    fill
                    className="object-cover"
                />
            </motion.div>
        )}
      </motion.div>
    </section>
  );
}
