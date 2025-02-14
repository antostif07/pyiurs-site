import SegmentServer from './components/segment.server';
import Hero from './components/HeroSection';
import FeaturedProducts from './components/FeaturedProducts';
import HeaderServer from "@/app/components/header.server";

export default function HomePage() {
  return (
  <div className="relative min-h-screen">
    <div className='absolute w-full z-20'>
      {/*<Header />*/}
      <HeaderServer />
    </div>
    <Hero />
    <SegmentServer />
    <FeaturedProducts />
  </div>
  );
};