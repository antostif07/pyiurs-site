import React from 'react';
import {getHeroSection} from "@/lib/api";
import dynamic from "next/dynamic";


const Hero = dynamic(() => import('./HeroSection'))

export default async function HeroSectionServer() {
    const response = await getHeroSection()

    return (
        <Hero blocks={response} />
    );
}
