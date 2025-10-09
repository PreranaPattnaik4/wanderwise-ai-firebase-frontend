
"use client";

import ProfileSnapshot from "@/components/profile-snapshot";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <ProfileSnapshot />
        </div>
      </main>
      <Footer />
    </div>
  );
}
