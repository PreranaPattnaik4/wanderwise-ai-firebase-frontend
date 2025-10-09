import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Languages, Shield, Camera, Leaf, Sun, Calendar } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Dynamic Updates",
    description: "Real-time adjustments for flight delays, weather changes, and local events.",
  },
  {
    icon: Languages,
    title: "Language Assistance",
    description: "Instant translation, etiquette tips, and voice-activated conversations.",
  },
  {
    icon: Shield,
    title: "Travel Safety & Alerts",
    description: "Personal risk monitoring, emergency assistance, and crowd avoidance.",
  },
  {
    icon: Camera,
    title: "AR/VR Experience",
    description: "AR guides for landmarks and virtual previews of hotels and attractions.",
  },
  {
    icon: Leaf,
    title: "Sustainable Travel",
    description: "Eco-friendly suggestions for accommodations, transport, and tours.",
  },
  {
    icon: Sun,
    title: "Smarter Sightseeing",
    description: "AI predicts peak times at popular spots to help you avoid long queues.",
  }
];

export default function Extras() {
  return (
    <section className="container py-10 sm:py-14 scroll-mt-20" id="extras">
      <h2 className="text-3xl font-headline font-bold text-center mb-8">Your Smart Travel Companion</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card key={index} className="shadow-md rounded-2xl overflow-hidden bg-card/70 border-white/15 hover:border-accent/60 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-3 bg-accent/20 rounded-full">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>
              <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
