import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useAuth } from "./auth-provider";

const avatarImage = PlaceHolderImages.find(img => img.id === 'profile-avatar');

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
            <CardTitle>{user?.displayName || "Profile"}</CardTitle>
            <CardDescription>Your travel profile</CardDescription>
            </div>
        </CardHeader>
        <CardContent>
            {/* Content removed as requested */}
        </CardContent>
        </Card>
    </section>
  );
}
