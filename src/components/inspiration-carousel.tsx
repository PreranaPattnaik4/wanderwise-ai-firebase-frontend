
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const inspirationImages = {
    goa: PlaceHolderImages.find(p => p.id === 'inspiration-goa'),
    paris: PlaceHolderImages.find(p => p.id === 'inspiration-paris'),
    california: PlaceHolderImages.find(p => p.id === 'inspiration-california'),
}

export default function InspirationCarousel() {
  return (
    <section className="container py-10 sm:py-14 scroll-mt-20" id="inspiration">
      <h3 className="text-xl sm:text-2xl font-bold font-headline">Travel Inspiration</h3>
      <div className="mt-4 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-4 snap-x snap-mandatory">
          {/* Goa */}
          {inspirationImages.goa && (
            <article className="relative snap-start min-w-[80%] sm:min-w-[420px] rounded-2xl overflow-hidden border border-border bg-card/60 group">
                <Image src={inspirationImages.goa.imageUrl} alt="Goa Beaches" width={420} height={224} className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105" data-ai-hint={inspirationImages.goa.imageHint} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute left-0 right-0 bottom-0 p-4 flex items-end justify-between">
                <div>
                    <h4 className="text-white font-semibold text-lg drop-shadow">Goa</h4>
                    <p className="text-white/90 text-sm drop-shadow">Best time to visit: Nov–Feb 🌴</p>
                </div>
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[0_0_30px_rgba(56,189,248,0.25)] opacity-0 group-hover:opacity-100 transition" />
            </article>
          )}

          {/* Paris */}
          {inspirationImages.paris && (
            <article className="relative snap-start min-w-[80%] sm:min-w-[420px] rounded-2xl overflow-hidden border border-border bg-card/60 group">
                <Image src={inspirationImages.paris.imageUrl} alt="Paris Eiffel Tower" width={420} height={224} className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105" data-ai-hint={inspirationImages.paris.imageHint} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs bg-black/50 text-white border border-white/20 backdrop-blur">Eiffel Tower Light Show</div>
                <div className="absolute left-0 right-0 bottom-0 p-4 flex items-end justify-between">
                <div>
                    <h4 className="text-white font-semibold text-lg drop-shadow">Paris</h4>
                    <p className="text-white/90 text-sm drop-shadow">Catch the Eiffel Tower light show ✨</p>
                </div>
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[0_0_30px_rgba(124,58,237,0.25)] opacity-0 group-hover:opacity-100 transition" />
            </article>
          )}

          {/* California, USA */}
          {inspirationImages.california && (
            <article className="relative snap-start min-w-[80%] sm:min-w-[420px] rounded-2xl overflow-hidden border border-border bg-card/60 group">
                <Image src={inspirationImages.california.imageUrl} alt="California Coast" width={420} height={224} className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105" data-ai-hint={inspirationImages.california.imageHint} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute left-0 right-0 bottom-0 p-4 flex items-end justify-between">
                <div>
                    <h4 className="text-white font-semibold text-lg drop-shadow">California, USA</h4>
                    <p className="text-white/90 text-sm drop-shadow">Drive Highway 1 coastal route 🚗</p>
                </div>
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[0_0_30px_rgba(34,197,94,0.25)] opacity-0 group-hover:opacity-100 transition" />
            </article>
          )}
        </div>
      </div>
    </section>
  );
}
