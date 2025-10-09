
"use client";

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Loader2, Download, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from './ui/card';

interface FeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: {
    icon: React.ElementType;
    title: string;
    flow?: (input: { request: string }) => Promise<{ response:string }>;
    placeholder?: string;
  };
}

export default function FeatureModal({ isOpen, onClose, feature }: FeatureModalProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Reset state when the modal is opened for a new feature
    if (isOpen) {
      setInput('');
      setOutput('');
      setIsLoading(false);
    }
  }, [isOpen, feature]);

  const handleSubmit = async (requestInput?: string) => {
    const currentInput = requestInput || input;
    if (!currentInput.trim() || !feature.flow) return;

    if (!requestInput) {
        setInput(currentInput);
    }

    setIsLoading(true);
    setOutput('');
    try {
      const result = await feature.flow({ request: currentInput });
      setOutput(result.response);
    } catch (error) {
      console.error(`Error with ${feature.title}:`, error);
      toast({
        variant: 'destructive',
        title: 'Oops! Something went wrong.',
        description: `We couldn't get a response for ${feature.title}. Please try again.`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${feature.title.toLowerCase().replace(/\s+/g, '-')}-response.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Download Started', description: 'Your AI response is being downloaded.' });
  };

  const handleShare = () => {
    const text = `WanderWise AI - ${feature.title}:\n\n${output}`;
    if (navigator.share) {
      navigator.share({
        title: `WanderWise AI - ${feature.title}`,
        text: output,
      }).catch(err => console.error('Share failed', err));
    } else if (navigator.canShare && navigator.canShare({ text })) {
       navigator.share({ text });
    }
    else {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, '_blank');
    }
  };

  const isSafetyFeature = feature.title === 'Travel Safety & Alerts';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/20 rounded-full">
              <feature.icon className="w-5 h-5 text-accent" />
            </div>
            <DialogTitle>{feature.title}</DialogTitle>
          </div>
          <DialogDescription>
            Enter your request below to get AI-powered assistance.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {isSafetyFeature && (
              <div className="grid gap-2 sm:grid-cols-3">
                <Button variant="outline" size="sm" onClick={() => handleSubmit('Hospitals Nearby')}>Hospitals</Button>
                <Button variant="outline" size="sm" onClick={() => handleSubmit('Embassies Nearby')}>Embassies</Button>
                <Button variant="outline" size="sm" onClick={() => handleSubmit('Police Stations Nearby')}>Police</Button>
              </div>
          )}
          <Input
            placeholder={feature.placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            disabled={isLoading}
          />
          <Button onClick={() => handleSubmit()} disabled={isLoading} className="w-full">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Get Response'}
          </Button>
          {output && (
            <Card>
              <CardContent className="p-4 space-y-3">
                <p className="text-sm text-foreground/90 whitespace-pre-line">{output}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" /> Download
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 className="mr-2 h-4 w-4" /> Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
