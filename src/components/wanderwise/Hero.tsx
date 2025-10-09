
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
    <section className="relative h-[70vh] w-full flex items-center justify-start text-left text-white">
      <Image
        src={heroImage.imageUrl}
        alt={heroImage.description}
        fill
        className="object-cover object-center"
        priority
        data-ai-hint={heroImage.imageHint}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      <div className="relative z-10 flex flex-col items-start p-4 md:p-12 lg:p-24">
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-gray-900 mb-4">
            Plan Your Perfect <br/> Trip with AI Assistance.
          </h1>
          <p className="max-w-xl text-gray-600 mb-8">
            Interactive itineraries, voice chat, live updates, and bookings in one place.
            With Google’s Agentic AI and Gemini, WanderWise transforms
            aspirations into unforgettable adventures.
          </p>
          <Button onClick={handleScroll} className="rounded-full bg-gradient-to-r from-[#A4BFB2] to-[#D4D3BC] hover:brightness-105 text-black shadow-lg transition-transform active:scale-95" size="lg">
            Start Planning
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
      </div>
    </section>
  );
}
