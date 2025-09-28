import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const pastTripImage = PlaceHolderImages.find(img => img.id === 'past-trip');
const upcomingTripImage = PlaceHolderImages.find(img => img.id === 'upcoming-trip');

const trips = [
  {
    title: 'Parisian Adventure',
    date: '15-22 June 2023',
    status: 'Past Trip',
    image: pastTripImage
  },
  {
    title: 'Kyoto Serenity',
    date: '10-18 September 2024',
    status: 'Upcoming Trip',
    image: upcomingTripImage
  },
  {
    title: 'Rome Expedition',
    date: '05-12 March 2023',
    status: 'Past Trip',
    image: { ...pastTripImage, imageUrl: 'https://picsum.photos/seed/11/400/300', imageHint: 'colosseum rome' }
  },
    {
    title: 'NYC Getaway',
    date: '20-25 December 2024',
    status: 'Upcoming Trip',
    image: { ...upcomingTripImage, imageUrl: 'https://picsum.photos/seed/12/400/300', imageHint: 'new york' }
  },
];

export default function TravelTimeline() {
  return (
    <section>
      <h2 className="text-3xl font-headline font-bold text-center mb-8">Your Travel Timeline</h2>
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {trips.map((trip, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="shadow-md rounded-2xl overflow-hidden h-full">
                  {trip.image && (
                     <div className="relative h-48 w-full">
                        <Image
                            src={trip.image.imageUrl}
                            alt={trip.title}
                            fill
                            className="object-cover"
                            data-ai-hint={trip.image.imageHint}
                        />
                     </div>
                  )}
                  <CardHeader>
                    <CardDescription>{trip.status}</CardDescription>
                    <CardTitle>{trip.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{trip.date}</p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-12" />
        <CarouselNext className="mr-12" />
      </Carousel>
    </section>
  );
}
