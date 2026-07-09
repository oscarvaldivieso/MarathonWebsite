import { CLUB } from "@/lib/constants";
import Button from "@/components/ui/Button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-marathon-darkest px-4">
      <div className="text-center max-w-lg">
        {/* Mascot emoji */}
        <div className="text-8xl mb-6">🦖</div>

        {/* Error code */}
        <h1 className="text-7xl md:text-9xl font-heading font-black text-gradient mb-4">
          404
        </h1>

        {/* Message */}
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-marathon-light mb-4">
          ¡Fuera de juego!
        </h2>
        <p className="text-marathon-light/50 font-body mb-8">
          El {CLUB.mascot} no encontró esta página. Parece que te has
          perdido fuera del campo. ¡Volvamos al partido!
        </p>

        {/* CTA */}
        <Button variant="primary" size="lg" href="/">
          <Home size={20} />
          Volver al Inicio
        </Button>

        {/* Slogan */}
        <p className="mt-12 text-sm text-marathon-light/20 italic font-heading">
          &ldquo;{CLUB.slogan}&rdquo;
        </p>
      </div>
    </section>
  );
}
