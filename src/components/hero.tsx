import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');

  return (
    <section className="relative h-[500px] w-full overflow-hidden rounded-b-2xl text-white">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
        <div className="max-w-4xl rounded-2xl bg-black/20 p-8 backdrop-blur-sm">
            <h1 className="font-headline text-4xl font-bold drop-shadow-lg md:text-6xl lg:text-7xl">
            Your Smart AI Travel Planner.
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl">
            AI-powered travel planning with WanderWise
            </p>
            <Button size="lg" className="mt-8 rounded-full px-8 text-lg">
            Start Your Journey
            </Button>
        </div>
      </div>
    </section>
  );
}
