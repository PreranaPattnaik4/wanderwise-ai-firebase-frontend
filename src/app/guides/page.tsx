
import Guides from "@/components/guides";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";

export default function GuidesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Guides />
      </main>
      <Footer />
    </div>
  );
}
