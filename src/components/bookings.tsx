import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plane, Hotel, Ticket } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const flightImage = PlaceHolderImages.find(img => img.id === 'flight-booking');
const hotelImage = PlaceHolderImages.find(img => img.id === 'hotel-booking');
const activityImage = PlaceHolderImages.find(img => img.id === 'activity-booking');


export default function Bookings() {
  return (
    <section id="bookings">
      <h2 className="text-3xl font-headline font-bold text-center mb-8">Manage Your Bookings</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <Card className="shadow-md rounded-2xl overflow-hidden">
            {flightImage && (
                <div className="relative h-48 w-full">
                    <Image src={flightImage.imageUrl} alt="Flight" fill className="object-cover" data-ai-hint={flightImage.imageHint} />
                </div>
            )}
            <CardHeader className="flex flex-row items-center gap-4">
                <Plane className="w-8 h-8 text-accent"/>
                <div>
                    <CardTitle>Flights</CardTitle>
                    <CardDescription>Your upcoming flights</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <p><strong>JFK to CDG</strong> - Sept 10, 2024</p>
                <p className="text-sm text-muted-foreground">Confirmation: #A1B2C3</p>
            </CardContent>
        </Card>
        <Card className="shadow-md rounded-2xl overflow-hidden">
             {hotelImage && (
                <div className="relative h-48 w-full">
                    <Image src={hotelImage.imageUrl} alt="Hotel" fill className="object-cover" data-ai-hint={hotelImage.imageHint} />
                </div>
            )}
            <CardHeader className="flex flex-row items-center gap-4">
                <Hotel className="w-8 h-8 text-accent"/>
                <div>
                    <CardTitle>Hotels</CardTitle>
                    <CardDescription>Your accommodations</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <p><strong>Hotel Le Marais</strong> - Sept 10-18, 2024</p>
                <p className="text-sm text-muted-foreground">Confirmation: #D4E5F6</p>
            </CardContent>
        </Card>
        <Card className="shadow-md rounded-2xl overflow-hidden">
             {activityImage && (
                <div className="relative h-48 w-full">
                    <Image src={activityImage.imageUrl} alt="Activity" fill className="object-cover" data-ai-hint={activityImage.imageHint} />
                </div>
            )}
            <CardHeader className="flex flex-row items-center gap-4">
                <Ticket className="w-8 h-8 text-accent"/>
                <div>
                    <CardTitle>Activities</CardTitle>
                    <CardDescription>Your booked activities</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <p><strong>Louvre Museum Tour</strong> - Sept 12, 2024</p>
                <p className="text-sm text-muted-foreground">Confirmation: #G7H8I9</p>
            </CardContent>
        </Card>
      </div>
    </section>
  );
}
