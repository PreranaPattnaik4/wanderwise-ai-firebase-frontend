
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Languages, Shield, Camera, Leaf, Sun, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import FeatureModal from "./feature-modal";
import { getDynamicUpdates } from "@/ai/flows/dynamic-updates";
import { getLanguageAssistance } from "@/ai/flows/language-assistance";
import { getTravelSafetyInfo } from "@/ai/flows/travel-safety";


type Feature = {
  icon: React.ElementType;
  title: string;
  description: string;
  isInteractive: boolean;
  flow?: (input: any) => Promise<any>;
  placeholder?: string;
};


const features: Feature[] = [
  {
    icon: Zap,
    title: "Dynamic Updates",
    description: "Real-time adjustments for flight delays, weather changes, and local events.",
    isInteractive: true,
    flow: getDynamicUpdates,
    placeholder: "e.g., 'Flight status for AA123' or 'Weather in Paris'"
  },
  {
    icon: Languages,
    title: "Language Assistance",
    description: "Instant translation, etiquette tips, and voice-activated conversations.",
    isInteractive: true,
    flow: getLanguageAssistance,
    placeholder: "e.g., 'Translate 'thank you' to Japanese' or 'Tipping etiquette in Italy'"
  },
  {
    icon: Shield,
    title: "Travel Safety & Alerts",
    description: "Personal risk monitoring, emergency assistance, and crowd avoidance.",
    isInteractive: true,
    flow: getTravelSafetyInfo,
    placeholder: "e.g., 'Hospitals near the Eiffel Tower' or 'Is it safe to walk at night in Rome?'"
  },
  {
    icon: Camera,
    title: "AR/VR Experience",
    description: "AR guides for landmarks and virtual previews of hotels and attractions.",
    isInteractive: false,
  },
  {
    icon: Leaf,
    title: "Sustainable Travel",
    description: "Eco-friendly suggestions for accommodations, transport, and tours.",
    isInteractive: false,
  },
  {
    icon: Sun,
    title: "Smarter Sightseeing",
    description: "AI predicts peak times at popular spots to help you avoid long queues.",
    isInteractive: false,
  }
];

export default function Extras() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  const handleOpenModal = (feature: Feature) => {
    if (feature.isInteractive) {
      setSelectedFeature(feature);
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedFeature(null);
  };

  return (
    <section className="container py-10 sm:py-14 scroll-mt-20" id="extras">
      <h2 className="text-3xl font-headline font-bold text-center mb-8">Your Smart Travel Companion</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card key={index} className="shadow-md rounded-2xl overflow-hidden bg-card/70 border-white/15 hover:border-accent/60 hover:shadow-lg transition-all duration-300 flex flex-col">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-3 bg-accent/20 rounded-full">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>
              <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
              <p className="text-sm text-muted-foreground flex-grow">{feature.description}</p>
              {feature.isInteractive && (
                <div className="mt-4">
                  <Button onClick={() => handleOpenModal(feature)} className="w-full rounded-full">Try Now</Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedFeature && (
        <FeatureModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          feature={selectedFeature}
        />
      )}
    </section>
  );
}
