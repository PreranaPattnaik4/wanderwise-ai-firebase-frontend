
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const heroImage = {
  imageUrl: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=2070&auto=format&fit=crop',
  description: 'Man taking a photo of hot air balloons',
  imageHint: 'travel photography'
};

export default function Hero() {

  const handleScroll = () => {
    const element = document.getElementById('onboarding');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <section className="relative h-[80vh] w-full flex items-center justify-start text-left scroll-mt-20" id="home">
      <Image
        src={heroImage.imageUrl}
        alt={heroImage.description}
        fill
        className="object-cover object-center"
        priority
        data-ai-hint={heroImage.imageHint}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
      <div className="relative z-10 container px-4 md:px-12 lg:px-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-gray-900 mb-4">
              Plan Your Perfect <br/> Trip with AI <br/> Assistance.
            </h1>
            <p className="max-w-xl text-gray-700 mb-8">
              Interactive itineraries, voice chat, live updates, and bookings in one place.
              With Google’s Agentic AI and Gemini, WanderWise transforms
              aspirations into unforgettable adventures.
            </p>
            <Button onClick={handleScroll} size="lg" className="rounded-full shadow-lg transition-transform active:scale-95">
              Start Planning
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
      </div>
    </section>
  );
}
