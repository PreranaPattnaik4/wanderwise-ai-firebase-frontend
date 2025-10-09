
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Sparkles, Bot, PlaneTakeoff, CalendarClock } from "lucide-react";

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
        className="grid md:grid-cols-2 gap-12 items-center"
      >
        <div className="bg-secondary/30 rounded-2xl p-8">
          <h2 className="text-3xl font-headline font-bold mb-4">Everything you need for planning your trip</h2>
          <p className="text-muted-foreground mb-6">Adjust your itinerary as needed</p>
          <p className="text-foreground/80">
            Seamlessly manage your itinerary all in one page with WanderWise AI — from reordering your plans, introducing new destinations, or removing plans as needed.
          </p>
        </div>
        
        <div>
          <Card className="rounded-2xl shadow-lg border-border/80 bg-card/80">
            <CardContent className="p-6">
              <h4 className="font-semibold text-lg mb-4">What WanderWise AI can do</h4>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4"
                  >
                    <div className="p-2 bg-accent/20 rounded-full">
                        <feature.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium">{feature.title}</p>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
      <div className="my-16 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
}
