import Banner from './components/Banner';
import Header from './components/Header';
import Hero from './components/HeroSection';

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {

  return (
  <div className="relative min-h-screen">
    <div className='absolute w-full z-20'>
      <Header />
    </div>
    <Hero />
    <Banner />
  </div>
  );
};

export default HomePage;