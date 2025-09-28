import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CloudSun, Gift } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const eventsImage = PlaceHolderImages.find(img => img.id === 'local-events');
const weatherImage = PlaceHolderImages.find(img => img.id === 'weather-forecast');
const offersImage = PlaceHolderImages.find(img => img.id === 'special-offers');


export default function Extras() {
  return (
    <section>
        <h2 className="text-3xl font-headline font-bold text-center mb-8">Travel Extras</h2>
        <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-md rounded-2xl overflow-hidden">
                {eventsImage && (
                    <div className="relative h-32 w-full">
                        <Image src={eventsImage.imageUrl} alt="Local Events" fill className="object-cover" data-ai-hint={eventsImage.imageHint} />
                    </div>
                )}
                <CardHeader className="flex flex-row items-center gap-3">
                    <Calendar className="w-6 h-6 text-accent" />
                    <CardTitle className="text-lg">Local Events</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Paris Fashion Week starts soon!</p>
                </CardContent>
            </Card>
            <Card className="shadow-md rounded-2xl overflow-hidden">
                {weatherImage && (
                    <div className="relative h-32 w-full">
                        <Image src={weatherImage.imageUrl} alt="Weather" fill className="object-cover" data-ai-hint={weatherImage.imageHint} />
                    </div>
                )}
                <CardHeader className="flex flex-row items-center gap-3">
                    <CloudSun className="w-6 h-6 text-accent" />
                    <CardTitle className="text-lg">Weather</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">22°C, Sunny in Paris.</p>
                </CardContent>
            </Card>
            <Card className="shadow-md rounded-2xl overflow-hidden">
                 {offersImage && (
                    <div className="relative h-32 w-full">
                        <Image src={offersImage.imageUrl} alt="Offers" fill className="object-cover" data-ai-hint={offersImage.imageHint} />
                    </div>
                )}
                <CardHeader className="flex flex-row items-center gap-3">
                    <Gift className="w-6 h-6 text-accent" />
                    <CardTitle className="text-lg">Special Offers</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">15% off at select restaurants.</p>
                </CardContent>
            </Card>
        </div>
    </section>
  );
}
