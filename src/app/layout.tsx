
import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/components/auth-provider';
import { Toaster as OldToaster } from '@/components/ui/toaster';
import { Toaster } from 'sonner';
import { cn } from '@/lib/utils';
import BackToTopButton from '@/components/back-to-top-button';

export const metadata: Metadata = {
  title: 'WanderWise AI',
  description: 'Your Smart AI Travel Planner',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="!scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased", "min-h-screen bg-background font-sans")} suppressHydrationWarning>
        <AuthProvider>
          {children}
          <OldToaster />
          <Toaster richColors />
          <BackToTopButton />
        </AuthProvider>
      </body>
    </html>
  );
}
