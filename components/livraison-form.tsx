"use client";

import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const LivraisonForm = () => {
    const [ville, setVille] = useState('');
    const [commune, setCommune] = useState('');

    // Communes pour Kinshasa
    const kinshasaCommunes = [
        "Gombe", "Barumbu", "Kinshasa", "Lingwala", "Kalamu", "Bandalungwa",
        "Kintambo", "Ngiri-Ngiri", "Ndjili", "Kimbanseke", "Masina", "Nsele",
        "Mont Ngafula", "Selembao", "Bumbu", "Ngaba", "Makala", "Kisenso",
        "Matete", "Lemba", "Limete", "Ngaliema", "Selembao"
    ];

    // Communes pour Lubumbashi
    const lubumbashiCommunes = [
        "Lubumbashi", "Kamalondo", "Kenya", "Katuba", "Ruashi", "Annexe"
    ];

    // Obtenir la liste des communes en fonction de la ville sélectionnée
    const communesOptions = ville === "Kinshasa" ? kinshasaCommunes : ville === "Lubumbashi" ? lubumbashiCommunes : [];

    return (
        <div className="mt-8 bg-background rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Livraison</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pays (République Démocratique du Congo uniquement) */}
                <div>
                    <Label htmlFor="country">Pays</Label>
                    <Input id="country" className="mt-1.5" value="République Démocratique du Congo" readOnly />
                </div>

                {/* Ville */}
                <div>
                    <Label htmlFor="ville">Ville</Label>
                    <select
                        id="ville"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1.5"
                        value={ville}
                        onChange={(e) => setVille(e.target.value)}
                        required
                    >
                        <option value="">Sélectionner une ville</option>
                        <option value="Kinshasa">Kinshasa</option>
                        <option value="Lubumbashi">Lubumbashi</option>
                    </select>
                </div>

                {/* Commune */}
                <div>
                    <Label htmlFor="commune">Commune</Label>
                    <select
                        id="commune"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1.5"
                        value={commune}
                        onChange={(e) => setCommune(e.target.value)}
                        required
                        disabled={!ville}
                    >
                        <option value="">Sélectionner une commune</option>
                        {communesOptions.map((communeOption) => (
                            <option key={communeOption} value={communeOption}>{communeOption}</option>
                        ))}
                    </select>
                </div>

                {/* Code postal (optionnel, car pas toujours utilisé en RDC) */}
                <div>
                    <Label htmlFor="postal-code">Code postal (Optionnel)</Label>
                    <Input id="postal-code" className="mt-1.5" placeholder="Ex: 0000" />
                </div>
            </div>

            {/* Informations du client */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Informations du client</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label htmlFor="nom">Nom</Label>
                        <Input id="nom" className="mt-1.5" placeholder="Votre nom" required />
                    </div>
                    <div>
                        <Label htmlFor="adresse">Adresse complète</Label>
                        <Input id="adresse" className="mt-1.5" placeholder="Votre adresse complète" required />
                    </div>
                    <div>
                        <Label htmlFor="telephone">Numéro de téléphone</Label>
                        <Input id="telephone" className="mt-1.5" placeholder="+243" required />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LivraisonForm;