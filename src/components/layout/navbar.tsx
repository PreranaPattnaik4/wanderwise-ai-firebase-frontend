"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { WanderwiseLogo } from "../icons";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#itinerary", label: "Itinerary" },
  { href: "#bookings", label: "Bookings" },
  { href: "#profile", label: "Profile" },
];

export default function Navbar() {
  const { user, loading, signIn, signOut } = useAuth();
  const isMobile = useIsMobile();
  const [activeLink, setActiveLink] = useState("Home");

  const renderAuthButton = () => {
    if (loading) {
      return <Button variant="ghost" disabled>Loading...</Button>;
    }

    if (user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'User'} />
                <AvatarFallback>{user.displayName?.charAt(0) ?? 'U'}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" forceMount>
            <DropdownMenuItem onClick={signOut}>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return <Button onClick={signIn} variant="outline" className="rounded-full">Sign in</Button>;
  };
  
  const NavLinks = ({ inSheet }: { inSheet?: boolean }) => (
    <nav className={`flex items-center gap-6 ${inSheet ? 'flex-col' : ''}`}>
      {navLinks.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          onClick={() => setActiveLink(link.label)}
          className={`text-sm font-medium transition-colors hover:text-primary-foreground ${
            activeLink === link.label ? 'text-primary-foreground' : 'text-muted-foreground'
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <header id="home" className="absolute top-0 z-50 w-full bg-transparent">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <WanderwiseLogo className="h-6 w-auto" />
        </Link>

        {isMobile ? (
          <div className="flex items-center gap-2">
            {renderAuthButton()}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                  <div className="flex flex-col items-center justify-center h-full gap-8">
                      <NavLinks inSheet />
                  </div>
              </SheetContent>
            </Sheet>
          </div>
        ) : (
          <div className="flex items-center gap-8">
            <NavLinks />
            {renderAuthButton()}
          </div>
        )}
      </div>
    </header>
  );
}
