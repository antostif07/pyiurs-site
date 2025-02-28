import React from 'react';
import {getHeroSection} from "@/lib/api";
import {Hero as HeroClient} from "@/components/hero";

export default async function Hero() {
    const response = await getHeroSection()

    return (
        <HeroClient blocks={response} />
    );
}