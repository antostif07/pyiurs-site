// components/Banner.tsx
import React from 'react';
import Image from 'next/image';

export default function Banner() {
  return (
    <div className="relative w-full"> {/* Make it take full width */}
      <Image
        src="/images/banner.png"
        alt="Promotion Banner"
        width={1920} // Set the actual width of your image
        height={300} // Set the actual height of your image
        style={{
          width: '100%',   // Make it responsive
          height: 'auto',  // Maintain aspect ratio
        }}
          priority // loading priority
        />
    </div>
  );
};