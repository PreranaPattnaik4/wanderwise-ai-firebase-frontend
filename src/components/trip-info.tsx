
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
        className="flex flex-col gap-12 items-center"
      >
        {tripInfoImage && (
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative h-80 lg:h-96 w-full max-w-4xl rounded-2xl overflow-hidden"
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
        
        <div className="w-full max-w-4xl text-center">
            <div className="bg-primary/20 text-primary-foreground p-8 rounded-2xl mb-12">
                <h2 className="text-3xl font-headline font-bold mb-4">Everything you need for planning your trip</h2>
                <p className="max-w-3xl mx-auto text-primary-foreground/80">
                Seamlessly manage your itinerary all in one page with WanderWise AI — from reordering your plans, introducing new destinations, or removing plans as needed.
                </p>
            </div>
            
            <ul className="grid md:grid-cols-2 gap-x-8 gap-y-10 text-left">
                {features.map((feature, index) => (
                    <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-4 items-start"
                    >
                        <div className="inline-flex p-3 bg-accent/20 rounded-full">
                            <feature.icon className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                    </motion.li>
                ))}
            </ul>
        </div>
      </motion.div>
    </section>
  );
}
