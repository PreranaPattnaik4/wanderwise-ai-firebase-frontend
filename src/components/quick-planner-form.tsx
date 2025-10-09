
"use client";

import { useMemo, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plane, MapPin, SlidersHorizontal, Sparkles, Mic, Settings2, Loader2, Wallet, Calendar, Utensils, Heart, Languages, Compass } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from '@/hooks/use-toast';
import { generatePersonalizedItinerary, GeneratePersonalizedItineraryOutput } from '@/ai/flows/generate-personalized-itinerary';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';

const tripTypes = [
  { key: "leisure", label: "Leisure" },
  { key: "adventure", label: "Adventure" },
  { key: "business", label: "Business" },
  { key: "family", label: "Family" },
  { key: "romance", label: "Romance" },
];

const flightPrefs = [
  { key: "nonstop", label: "Non‑stop" },
  { key: "onestop", label: "1 stop ok" },
  { key: "economy", label: "Economy" },
  { key: "premium", label: "Premium" },
  { key: "business", label: "Business" },
];

const interests = [
  { key: "adventure", label: "Adventure" },
  { key: "heritage", label: "Heritage" },
  { key: "food", label: "Food" },
  { key: "nightlife", label: "Nightlife" },
  { key: "activities", label: "Activities" },
  { key: "office", label: "Office Tour" },
] as const;

interface QuickPlannerFormProps {
    setItinerary: (itinerary: GeneratePersonalizedItineraryOutput | null) => void;
}

export default function QuickPlannerForm({ setItinerary }: QuickPlannerFormProps) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [query, setQuery] = useState("");
  const [listening, setListening] = useState(false);
  const [recogRef, setRecogRef] = useState<any>(null);

  const [types, setTypes] = useState<Record<string, boolean>>({ leisure: true });
  const [prefs, setPrefs] = useState<Record<string, boolean>>({ economy: true, nonstop: true });

  const [budget, setBudget] = useState(1500);
  const [days, setDays] = useState(5);
  const [language, setLanguage] = useState("English");
  const [diet, setDiet] = useState("No preference");
  const [interestActive, setInterestActive] = useState<Record<string, boolean>>({ adventure: true });
  const [interestChoices, setInterestChoices] = useState<Record<string, Record<string, boolean>>>(() => ({
    adventure: { Hiking: false, "Water sports": false, "Road trips": false, Safari: false },
    heritage: { Museums: false, Temples: false, "Historic walks": false, Architecture: false },
    food: { "Street food": false, "Fine dining": false, Cafes: false, "Local markets": false },
    nightlife: { Clubs: false, Bars: false, "Live music": false, Rooftops: false },
    activities: { Spa: false, Shopping: false, Photography: false, Workshops: false },
    office: { "Meet the team": false, "Workspace tour": false, "Tech talk": false, "Cafeteria lunch": false, "Commute guidance": false },
  }));
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const typeKeys = useMemo(() => Object.keys(types).filter((k) => types[k]), [types]);
  const prefKeys = useMemo(() => Object.keys(prefs).filter((k) => prefs[k]), [prefs]);
  
  const toggle = (setter: (u: any) => void) => (key: string) => setter((s: Record<string, boolean>) => ({ ...s, [key]: !s[key] }));

  useEffect(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SR) {
      const rec = new SR();
      rec.continuous = false;
      rec.interimResults = true;
      rec.lang = "en-US";
      
      rec.onstart = () => setListening(true);
      rec.onresult = (e: any) => {
        let text = "";
        for (let i = e.resultIndex; i < e.results.length; i++) text += e.results[i][0].transcript;
        setQuery(text);
      };
      rec.onerror = () => setListening(false);
      rec.onend = () => setListening(false);
      setRecogRef(rec);
    }
  }, []);

  const startVoice = () => {
    if (recogRef) {
        recogRef.start();
    } else {
        alert("Voice input not supported in this browser.");
    }
  };
  const stopVoice = () => {
    if (recogRef) {
        try { recogRef.stop(); } catch {}
    }
    setListening(false);
  };
  const toggleVoice = () => { listening ? stopVoice() : startVoice(); };

  const parseQuery = async () => {
    setIsLoading(true);
    setItinerary(null);

    const allInterests = Object.entries(interestChoices).flatMap(([category, choices]) => 
        interestActive[category]
        ? Object.entries(choices).filter(([,isActive]) => isActive).map(([choice]) => choice)
        : []
    ).join(', ');

    try {
        const result = await generatePersonalizedItinerary({
            destination: to,
            tripType: typeKeys.join(', '),
            flightOptions: prefKeys.join(', '),
            description: `${query} (traveling from ${from})`,
            budget: `$${budget}`,
            duration: `${days}d`,
            foodPreferences: diet,
            interests: allInterests || 'any',
            language: language || 'English',
        });
        setItinerary(result);
        toast({
            title: "Itinerary Generated!",
            description: "Your personalized travel plan is ready below.",
        });
    } catch (error) {
        console.error("Failed to generate itinerary:", error);
        toast({
            variant: "destructive",
            title: "Oops! Something went wrong.",
            description: "We couldn't generate your itinerary. Please try again.",
        });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-4">
      <Card className="w-full max-w-5xl mx-auto shadow-xl rounded-2xl border-none bg-white/70 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="font-headline text-lg flex items-center gap-2"><SlidersHorizontal className="size-4" /> Quick Planner</CardTitle>
          <CardDescription>Write where you want to go and your preferences. We’ll suggest a plan.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <label className="grid gap-1 text-sm">
              <span className="text-foreground/70">From</span>
              <div className="relative">
                <Compass className="size-4 absolute left-2.5 top-2.5 text-foreground/50" />
                <Input
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  placeholder="e.g., Bengaluru"
                  className="pl-8"
                />
              </div>
            </label>
            <label className="grid gap-1 text-sm">
              <span className="text-foreground/70">To</span>
              <div className="relative">
                <Plane className="size-4 absolute left-2.5 top-2.5 text-foreground/50" />
                <Input
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="e.g., Goa or Bali"
                  className="pl-8"
                />
              </div>
            </label>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-border p-3 bg-background/60">
              <div className="text-xs font-medium mb-2">Type of trip</div>
              <div className="flex flex-wrap gap-2">
                {tripTypes.map((t) => (
                  <Button
                    key={t.key}
                    size="sm"
                    variant={types[t.key] ? 'default' : 'outline'}
                    onClick={() => toggle(setTypes)(t.key)}
                    className="rounded-full px-3 py-1.5 text-xs h-auto"
                  >
                    {t.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border p-3 bg-background/60">
              <div className="text-xs font-medium mb-2">Flight options</div>
              <div className="flex flex-wrap gap-2">
                {flightPrefs.map((f) => (
                  <Button
                    key={f.key}
                    size="sm"
                    variant={prefs[f.key] ? 'secondary' : 'outline'}
                    onClick={() => toggle(setPrefs)(f.key)}
                    className="rounded-full px-3 py-1.5 text-xs h-auto"
                  >
                    {f.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <label className="grid gap-1 text-sm">
            <span className="text-foreground/70">Describe your trip (optional)</span>
            <div className="relative">
              <Textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., Weekend getaway from Bengaluru to Goa next month, beach + nightlife, nonstop flights"
                rows={3}
                className="pr-12"
              />
              <Button
                type="button"
                aria-label="Voice input"
                aria-pressed={listening}
                onClick={toggleVoice}
                variant="ghost"
                size="icon"
                className={"absolute right-2 bottom-2 h-9 w-9 " + (listening ? "animate-pulse ring-2 ring-primary rounded-full" : "")}
              >
                <Mic className="size-4" />
              </Button>
            </div>
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="rounded-full text-xs justify-start gap-2"><Settings2 className="size-4 text-muted-foreground" /> Budget: ${budget}</Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-60">
                <div className="text-xs font-semibold mb-2">Budget ($)</div>
                <input type="range" min={200} max={10000} value={budget} onChange={(e) => setBudget(parseInt(e.target.value))} className="w-full" />
                <div className="mt-2 text-sm text-center">${budget}</div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="rounded-full text-xs justify-start gap-2"><Settings2 className="size-4 text-muted-foreground" /> Duration: {days}d</Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-60">
                <div className="text-xs font-semibold mb-2">Trip Duration (days)</div>
                <input type="range" min={1} max={30} value={days} onChange={(e) => setDays(parseInt(e.target.value))} className="w-full" />
                <div className="mt-2 text-sm text-center">{days} days</div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="rounded-full text-xs justify-start gap-2 truncate"><Settings2 className="size-4 text-muted-foreground" /> Language: {language}</Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-60">
                <div className="text-xs font-semibold mb-2">Language</div>
                <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full rounded-md border border-border bg-background p-2 text-sm">
                  {['English','Spanish','French','German','Hindi','Mandarin'].map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="rounded-full text-xs justify-start gap-2 truncate"><Settings2 className="size-4 text-muted-foreground" /> Food: {diet}</Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-60">
                <div className="text-xs font-semibold mb-2">Food preference</div>
                <select value={diet} onChange={(e) => setDiet(e.target.value)} className="w-full rounded-md border border-border bg-background p-2 text-sm">
                  {['No preference','Vegetarian','Vegan','Halal','Jain','Gluten-free'].map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="rounded-full text-xs justify-start gap-2"><Settings2 className="size-4 text-muted-foreground" /> Interests</Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-[600px] rounded-2xl bg-white/70 dark:bg-black/70 backdrop-blur-sm border-white/20">
                <div className="text-xs font-semibold mb-2 p-4 pb-0">Interests</div>
                <ScrollArea className="h-72">
                  <div className="grid grid-cols-2 gap-4 p-4">
                    {interests.map((it) => {
                      const choices = interestChoices[it.key] || {};
                      const selected = Object.values(choices).filter(Boolean).length;
                      return (
                        <div key={it.key} className="rounded-md border border-border/50 p-3 bg-background/50">
                          <div className="flex items-center justify-between">
                            <label className="inline-flex items-center gap-2 text-sm">
                              <Checkbox checked={!!interestActive[it.key]} onCheckedChange={() => setInterestActive((s) => ({ ...s, [it.key]: !s[it.key] }))} />
                              <span className="font-medium">{it.label}</span>
                            </label>
                            <span className="text-xs text-foreground/70">{selected ? `${selected} selected` : ""}</span>
                          </div>
                          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
                            {Object.keys(choices).map((opt) => (
                              <label key={opt} className="flex items-center gap-2 text-xs">
                                <Checkbox checked={!!interestChoices[it.key][opt]} onCheckedChange={(v) => setInterestChoices((prev) => ({ ...prev, [it.key]: { ...prev[it.key], [opt]: !!v } }))} />
                                <span>{opt}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </PopoverContent>
            </Popover>
          </div>

          <div className="pt-1 flex items-center justify-end">
            <Button
              onClick={parseQuery}
              disabled={isLoading}
              className="rounded-full shadow-lg transition-transform active:scale-95 bg-primary text-primary-foreground hover:bg-primary/90"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Suggest Plan
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
