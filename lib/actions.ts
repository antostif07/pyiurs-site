'use server';

import { revalidatePath } from 'next/cache';
import * as xlsx from 'xlsx';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { writeFile, unlink, mkdir, readFile } from 'fs/promises'; // Import de readFile
import { join } from 'path';
import { unstable_noStore as noStore } from 'next/cache';
import {getProducts} from "@/lib/api";
import slugify from "slugify";

// Définition des types
interface ActionResult {
    message: string;
    type: 'success' | 'error';
}
async function getImageBuffer(imageUrl: string): Promise<{ buffer: string, mimeType: string }> {
    const response = await fetch(imageUrl);

    if (!response.ok) {
        throw new Error(`Erreur lors du téléchargement de l'image: ${response.status} ${response.statusText}`);
    }

    const mimeType = response.headers.get('content-type') || '';
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer).toString('base64'); // Convertit en base64

    return { buffer, mimeType };
}

export async function importProducts(formData: FormData): Promise<ActionResult> {
    noStore();

    const excelFile = formData.get('excelFile') as File;
    const imageUrlColumn = formData.get('imageUrlColumn') as string;

    if (!excelFile || !imageUrlColumn) {
        return { message: 'Veuillez sélectionner un fichier Excel et une colonne d\'URL.', type: 'error' };
    }

    try {
        // 1. Enregistrer le fichier temporairement sur le serveur
        const buffer = await excelFile.arrayBuffer();
        const tempDir = join(process.cwd(), '.tmp');

        // Créer le dossier temporaire s'il n'existe pas
        try {
            await mkdir(tempDir, { recursive: true }); // recursive: true crée les dossiers parents si nécessaire
        } catch (mkdirError: any) {
            console.error("Erreur lors de la création du dossier temporaire:", mkdirError);
            return { message: 'Erreur lors de la création du dossier temporaire.', type: 'error' };
        }

        const tempFilePath = join(tempDir, excelFile.name);

        try {
            await writeFile(tempFilePath, Buffer.from(buffer));
        } catch (writeError: any) {
            console.error("Erreur lors de l'écriture du fichier temporaire:", writeError);
            return { message: 'Erreur lors de l\'écriture du fichier temporaire.', type: 'error' };
        }

        // 2. Lire le fichier Excel
        let workbook: xlsx.WorkBook;
        try {
            // Lire le fichier de manière asynchrone
            const fileContent = await readFile(tempFilePath);
            workbook = xlsx.read(fileContent, { type: 'buffer' });
        } catch (readError: any) {
            console.error("Erreur lors de la lecture du fichier Excel:", readError);
            return { message: 'Erreur lors de la lecture du fichier Excel.', type: 'error' };
        }
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet);

        // 3. Configuration de Gemini Pro Vision
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");  // Assurez-vous d'avoir la clé dans .env.local
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Initialisation correcte du modèle

        // 4. Traitement des données
        for (const row of data) {
            // check if product exists
            // @ts-expect-error:  Le type de row[reference] peut être undefined
            const productExists = await getProducts({reference: row['Reference']})

            if(productExists.length > 0) {
                continue;
            }

            // @ts-expect-error:  Le type de row[imageUrlColumn] peut être undefined
            const imageUrl = row[imageUrlColumn] as string;
            if (imageUrl) {
                try {
                    // Télécharger l'image (avec fetch)
                    const { buffer: imageBuffer, mimeType } = await getImageBuffer(imageUrl);

                    const prompt: string = "Décris cet habit de façon détaillée pour une fiche produit de e-commerce.  Donne un nom court et une description longue. Sois créatif et mets en avant ses atouts et son style." +
                        "Réponds au format JSON suivant :\n" +
                        "{\n" +
                        "  \"name\": \"Nom court de l'habit\",\n" +
                        "  \"description\": \"Description longue de l'habit\"\n" +
                        "}"

                    // Préparation du contenu pour Gemini
                    const parts = [
                        { inlineData: { data: imageBuffer, mimeType: mimeType } }
                    ];

                    // Générer la description avec Gemini
                    const geminiResponse = await model.generateContent([prompt, ...parts]);
                    const text = geminiResponse.response.text();

                    const cleanedText = text.replace(/^```json\s*/, '').replace(/```$/, '');
                    // Essayer de parser la réponse JSON
                    const jsonData = JSON.parse(cleanedText);

                    const productName = jsonData.name;
                    const productDesc = jsonData.description;

                    // Ajouter l'Image dans strapi
                    // Préparer les données pour l'upload de l'image
                    // const imageFormData = new FormdataType();
                    // imageFormData.append('files', Buffer.from(imageBuffer, 'base64'), `product_${row['Reference']}.${mimeType.split('/')[1]}`);

                    // Uploader l'image dans Strapi
                    // const uploadResponse = await fetch(`${process.env.STRAPI_API_URL}/api/upload`, {
                    //     method: 'POST',
                    //     headers: {},
                    //     body: imageFormData as any,
                    // });

                    // if (!uploadResponse.ok) {
                    //     console.error("Erreur lors de l'upload de l'image dans Strapi:", uploadResponse.status, uploadResponse.statusText);
                    //     return { message: `Erreur lors de l'upload de l'image dans Strapi: ${uploadResponse.status} ${uploadResponse.statusText}`, type: 'error' };
                    // }
                    //
                    // const uploadData = await uploadResponse.json();
                    // const imageId = uploadData[0].id;

                    // Créer le produit dans Strapi
                    const newProductData = {
                        name: productName,
                        description: productDesc, slug: slugify(productName, {lower: true}),
                        // @ts-expect-error:  Le type de row[imageUrlColumn] peut être undefined
                        price: row['Price'], reference: row['Reference'],
                        // image: imageId,
                        // Ajoutez d'autres champs ici en fonction de la structure de votre type de contenu Strapi
                    };

                    const product = await fetch(`${process.env.STRAPI_API_URL}/api/products`, {
                        method: 'POST',
                        headers: {
                            // Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ data: newProductData }),
                    });

                    const j = await product.json()

                    console.log(j)
                    console.log(`Produit créé avec succès.`);
                } catch (error: any) {
                    console.error(`Erreur lors du traitement de l'image ${imageUrl}:`, error);
                }
            }
        }

        // 5. Supprimer le fichier temporaire
        try {
            await unlink(tempFilePath);
        } catch (unlinkError: any) {
            console.error("Erreur lors de la suppression du fichier temporaire:", unlinkError);
        }

        revalidatePath('/admin');
        return { message: 'Import terminé !', type: 'success' };

    } catch (error: any) {
        console.error("Erreur lors de l'import:", error);
        return { message: 'Erreur lors de l\'import.', type: 'error' };
    }
}