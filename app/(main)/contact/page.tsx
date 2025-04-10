"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    ArrowRight,
    ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link";

const ContactPage = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const boutiqueAddresses = [
        {
            name: "Pyiurs 24",
            address: "24 Novembre, en face de la station Ariana, diagonale de l'Académie des Beaux-Arts. Kinshasa, RDC",
            phone: "+243 896 139 999",
            email: "contact@pyiurs.com",
            hours: "Lun-Sam: 9h-20h, Dim: Fermé",
        },
        {
            name: "Pyiurs Kintambo",
            address: "Rond point Kintambo – Magasin, en face du Balcon. Kinshasa, RDC",
            phone: "+243 843 799 999 ",
            email: "conatct@pyiurs.com",
            hours: "Lun-Sam: 9h-20h, Dim: Fermé",
        },
        {
            name: "Boutique Lemba",
            address: "Lemba, super Arrêt 9 région. Réf. Entrée communale. Kinshasa, RDC",
            phone: "+243 843 799 999",
            email: "contact@pyiurs.com",
            hours: "Lun-Sam: 9h-20h, Dim: Fermé",
        },
        {
            name: "Pyiurs Météo",
            address: "Sur Nguma 186, avant l’entrée Météo. Réf. Antenne Vodacom. Kinshasa, RDC",
            phone: "️ +243 891 829 999",
            email: "contact@pyiurs.com",
            hours: "Lun-Sam: 9h-20h, Dim: Fermé",
        },
    ];

    return (
        <div className="pt-24 pb-16">
            <div className="container mx-auto md:px-24 px-4">
                <div className="flex items-center text-sm text-muted-foreground mb-8">
                    <Link href="/" className="hover:text-foreground transition-colors">
                        Accueil
                    </Link>
                    <ChevronRight className="h-4 w-4 mx-2" />
                    <span className="text-foreground">Contact</span>
                </div>

                <motion.div
                    ref={ref}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                >
                    {/* Contact Form */}
                    <div className="bg-background rounded-lg border p-6">
                        <h2 className="text-2xl font-semibold mb-4">Contactez-nous</h2>
                        <p className="text-muted-foreground mb-6">
                            {`N'hésitez pas à nous contacter pour toute question ou demande d'information.`}
                        </p>
                        <form className="space-y-4">
                            <div>
                                <Label htmlFor="name">Nom</Label>
                                <Input id="name" type="text" placeholder="Votre nom" className="mt-1.5" required />
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="Votre email" className="mt-1.5" required />
                            </div>
                            <div>
                                <Label htmlFor="message">Message</Label>
                                <Textarea id="message" placeholder="Votre message" className="mt-1.5" rows={4} required />
                            </div>
                            <Button size="lg" className="w-full gap-2">
                                Envoyer le message
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </form>
                    </div>

                    {/* Boutique Addresses */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Nos Boutiques</h2>
                        <div className="space-y-6">
                            {boutiqueAddresses.map((boutique, index) => (
                                <div key={index} className="bg-background rounded-lg border p-4">
                                    <h3 className="font-semibold">{boutique.name}</h3>
                                    <div className="text-muted-foreground text-sm space-y-2 mt-2">
                                        <div className="flex items-center">
                                            <MapPin className="h-4 w-4 mr-2" />
                                            <span>{boutique.address}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Phone className="h-4 w-4 mr-2" />
                                            <span>{boutique.phone}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Mail className="h-4 w-4 mr-2" />
                                            <span>{boutique.email}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Clock className="h-4 w-4 mr-2" />
                                            <span>{boutique.hours}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ContactPage;