import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useAuth } from "./auth-provider";

const avatarImage = PlaceHolderImages.find(img => img.id === 'profile-avatar');

const checklistItems = [
    { id: "check1", label: "Book Flights", checked: true },
    { id: "check2", label: "Book Hotel", checked: true },
    { id: "check3", label: "Pack Bags", checked: false },
    { id: "check4", label: "Confirm Visa", checked: true },
    { id: "check5", label: "Buy Travel Insurance", checked: false },
]

export default function ProfileSnapshot() {
  const { user } = useAuth();
  return (
    <section id="profile">
        <Card className="shadow-md rounded-2xl h-full">
        <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-16 w-16">
            <AvatarImage src={user?.photoURL || avatarImage?.imageUrl} data-ai-hint={avatarImage?.imageHint} />
            <AvatarFallback>{user?.displayName?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div>
            <CardTitle>{user?.displayName || "Wanderer"}</CardTitle>
            <CardDescription>Trip Summary: 2 Upcoming</CardDescription>
            </div>
        </CardHeader>
        <CardContent>
            <h4 className="font-semibold mb-4">Pre-Travel Checklist</h4>
            <div className="space-y-3">
            {checklistItems.map(item => (
                <div key={item.id} className="flex items-center space-x-3">
                <Checkbox id={item.id} checked={item.checked} />
                <Label htmlFor={item.id} className={`${item.checked ? 'line-through opacity-50' : ''}`}>
                    {item.label}
                </Label>
                </div>
            ))}
            </div>
        </CardContent>
        </Card>
    </section>
  );
}
