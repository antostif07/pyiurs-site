import React from 'react';
import {ApiResponse, Product} from "@/app/types/types";

const FeaturedProducts = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

  const response = await fetch(`${apiUrl}/api/products?populate=image&populate=variants&limit=4`, {
    cache: 'no-store'
  });

  // if (!response.ok) {
  //   throw new Error(`HTTP error! status: ${response.status}`);
  // }

  const json: ApiResponse<Product> = await response.json();

  if (json.error) {
    return <div>{`Erreur Interne. Contactez l'Administrateur.`}</div>;
  }

  const products: Product[] = json.data

  return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12 animate-fade-in">
          Explorez les Tendances Actuelles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
              <div
                  key={index}
                  className="group cursor-pointer rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 animate-slide-up"
              >
                <div className="relative h-[400px] overflow-hidden">
                  <img
                      src={`${apiUrl}${product.image.formats.medium?.url}`}
                      alt={product.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                  />
                  <div
                      className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <button
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-800 font-semibold px-6 py-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100">
                    Voir Plus
                  </button>
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-gray-500">${product.price}</p>
                </div>
              </div>
          ))}
        </div>
      </div>
  );
};

export default FeaturedProducts;