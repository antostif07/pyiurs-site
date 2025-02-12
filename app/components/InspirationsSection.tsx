interface Inspiration {
    id: number;
    image: string;
    quote: string;
  }
  
  export default function InspirationsSection() {
    const inspirations: Inspiration[] = [
      { id: 1, image: '/inspiration1.jpg', quote: 'La beauté est dans le détail.' },
      { id: 2, image: '/inspiration2.jpg', quote: "L'art inspire la mode." },
      { id: 3, image: '/inspiration3.jpg', quote: 'Un voyage, une idée.' },
    ];
  
    return (
      <section className="py-16 bg-boheme-beige">
        <div className="container mx-auto">
          <h2 className="text-3xl font-playfair font-bold mb-8 text-center">Nos Inspirations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {inspirations.map((inspiration) => (
              <div key={inspiration.id} className="relative overflow-hidden rounded-lg shadow-md">
                <img src={inspiration.image} alt="Inspiration" className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110" />
                <div className="absolute inset-0 bg-black opacity-0 hover:opacity-70 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-lg font-semibold">{inspiration.quote}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }