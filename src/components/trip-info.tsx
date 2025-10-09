
"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { motion } from "framer-motion";

const beachImage = PlaceHolderImages.find(p => p.id === 'beach-walk-activity');
const cafeImage = PlaceHolderImages.find(p => p.id === 'cafe-activity');

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
        <div className="bg-secondary/50 rounded-2xl p-8">
          <h2 className="text-3xl font-headline font-bold mb-4">Everything you need for planning your trip</h2>
          <p className="text-muted-foreground mb-6">Adjust your itinerary as needed</p>
          <p className="text-foreground/80">
            Seamlessly manage your itinerary all in one page with WanderWise AI — from reordering your plans, introducing new destinations, or removing plans as needed.
          </p>
        </div>
        
        <div>
          <Card className="rounded-2xl shadow-lg border-border/80">
            <CardContent className="p-6">
              <h4 className="font-semibold text-lg mb-4">Day 1: Coastal Relaxation</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  {beachImage && 
                    <Image src={beachImage.imageUrl} alt="Beach walk" width={64} height={64} className="rounded-lg object-cover" data-ai-hint={beachImage.imageHint}/>
                  }
                  <div>
                    <p className="font-medium">Beach Walk</p>
                    <p className="text-sm text-muted-foreground">Duration: 1.5 hours</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {cafeImage &&
                    <Image src={cafeImage.imageUrl} alt="Local cafe" width={64} height={64} className="rounded-lg object-cover" data-ai-hint={cafeImage.imageHint} />
                  }
                  <div>
                    <p className="font-medium">Local Café Visit</p>
                    <p className="text-sm text-muted-foreground">Duration: 1 hour</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
      <div className="my-16 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
}
