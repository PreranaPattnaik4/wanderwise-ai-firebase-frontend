import Image from 'next/image';

const heroImage = {
  imageUrl: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=2070&auto=format&fit=crop',
  description: 'Man taking a photo of hot air balloons',
  imageHint: 'travel photography'
};

export default function Hero() {

  return (
    <section className="relative h-[400px] w-full text-white">
      <Image
        src={heroImage.imageUrl}
        alt={heroImage.description}
        fill
        className="object-cover object-center"
        priority
        data-ai-hint={heroImage.imageHint}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
    </section>
  );
}
