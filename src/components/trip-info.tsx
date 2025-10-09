
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Sparkles, Bot, PlaneTakeoff, CalendarClock } from "lucide-react";
import Image from "next/image";

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

export default function TripInfo() {
  return (
    <section className="container py-10 sm:py-14" id="trip-info">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-3xl font-headline font-bold mb-4">Everything you need for planning your trip</h2>
        <p className="max-w-3xl mx-auto text-muted-foreground mb-12">
          Seamlessly manage your itinerary all in one page with WanderWise AI — from reordering your plans, introducing new destinations, or removing plans as needed.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
                <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
                >
                    <div className="inline-block p-4 bg-accent/20 rounded-full mb-4">
                        <feature.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
            ))}
        </div>
      </motion.div>
      <div className="my-16 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
}
