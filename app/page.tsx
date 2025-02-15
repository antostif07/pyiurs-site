import SegmentServer from './components/segment.server';
import Hero from './components/HeroSection';
import FeaturedProducts from './components/FeaturedProducts';
import {Button} from "@/app/components/ui/button";

export default function HomePage() {
  return (
  <div className="relative min-h-screen">
    <Hero />
    <SegmentServer />
    <FeaturedProducts />
    <section className="py-16 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Restez informé</h2>
        <p className="mb-8">Inscrivez-vous à notre newsletter pour recevoir nos dernières offres</p>
        <form className="max-w-md mx-auto flex gap-4">
          <input
              type="email"
              placeholder="Votre email"
              className="flex-1 px-4 py-2 rounded-md text-gray-900"
          />
          <Button>{`S'inscrire`}</Button>
        </form>
      </div>
    </section>
  </div>
  );
};