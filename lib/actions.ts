'use server';

import { revalidatePath } from 'next/cache';
import * as xlsx from 'xlsx';
import { writeFile, unlink, mkdir, readFile } from 'fs/promises';
import { join } from 'path';
import { unstable_noStore as noStore } from 'next/cache';
import {getCategories, getColors, getMarks, getProducts, getSegments, getSizes, getSubCategories,} from "@/lib/api";
import slugify from "slugify";
import {
    getImageData, getOrCreateEntityId, getUniqueProductInfoAndSlug, uploadImageToStrapi
} from "@/lib/helpers";
import {ActionResult, ExcelData, NewProductData, VariantData} from "@/types/types";


export async function importProducts(formData: FormData): Promise<ActionResult> {
    noStore();
    const excelFile = formData.get('excelFile') as File;
    const imageUrlColumn = formData.get('imageUrlColumn') as string;

    // --- Vérifications Initiales ---
    if (!excelFile || !imageUrlColumn) return { message: 'Veuillez sélectionner un fichier Excel et spécifier la colonne des URLs d\'images.', type: 'error' };
    if (!process.env.STRAPI_API_URL) return { message: 'URL API Strapi non configurée.', type: 'error' };
    if (!process.env.GOOGLE_API_KEY) return { message: 'Clé API Google non configurée.', type: 'error' };

    const tempDir = join(process.cwd(), '.tmp');
    const tempFilePath = join(tempDir, `${Date.now()}-${excelFile.name}`);
    const errorDetails: string[] = [];
    let successCount = 0; // Créations
    let updateCount = 0;  // Mises à jour
    let skippedCount = 0; // Réf manquante
    let errorCount = 0;   // Erreurs ligne

    // Sets pour suivre les noms/slugs utilisés DANS CE BATCH d'import
    const usedProductNamesInBatch = new Set<string>();

    try {
        // --- Préparation Fichier & Lecture Excel ---
        await mkdir(tempDir, { recursive: true });
        const buffer = await excelFile.arrayBuffer();
        await writeFile(tempFilePath, Buffer.from(buffer));
        const fileContent = await readFile(tempFilePath);
        const workbook = xlsx.read(fileContent, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data: ExcelData[] = xlsx.utils.sheet_to_json(sheet);

        console.log(`Début de l'import/màj de ${data.length} lignes...`);

        // --- Traitement des Lignes ---
        for (const [index, row] of data.entries()) {
            const rowNum = index + 2;
            const productReference = row['Reference']?.toString().trim();
            const productSubCategory = row['SubCategory']?.toString().trim();

            // --- Vérification Référence (inchangée) ---
            if (!productReference) {
                console.warn(`Ligne ${rowNum}: Référence produit manquante. Ligne ignorée.`);
                errorDetails.push(`Ligne ${rowNum}: Référence manquante.`);
                skippedCount++;
                continue;
            }

            console.log(`--- Traitement Ligne ${rowNum} (Ref: ${productReference}) ---`);

            // --- Isolation Erreur par Ligne ---
            let existingProductId: string | undefined = undefined; // Pour stocker l'ID si màj

            try {
                // 1. Vérifier si le produit existe déjà
                const existingProducts = await getProducts({ reference: productReference });
                existingProductId = existingProducts[0]?.documentId;

                // 2. Obtenir l'image
                const imageUrl = row[imageUrlColumn]?.toString().trim();
                if (!imageUrl) {
                    throw new Error(`Ligne ${rowNum}: URL d'image manquante dans la colonne ${imageUrlColumn}`);
                }
                const imageData = await getImageData(imageUrl); // Peut throw

                // 3. Obtenir Nom/Description/Slug UNIQUES via Gemini et vérifications
                const uniqueProductInfo = await getUniqueProductInfoAndSlug(
                    imageData,
                    productReference,
                    productSubCategory,
                    existingProductId, // Passer l'ID existant pour l'ignorer dans les checks
                    usedProductNamesInBatch,
                ); // Peut throw


                // 4. Get or Create Relations
                // Peut être optimisé avec Promise.all si beaucoup de relations et performance critique
                const segmentId = await getOrCreateEntityId(row['Segment'], getSegments, '/api/segments', 'Segment');
                const categoryId = await getOrCreateEntityId(row['Category'], getCategories, '/api/categories', 'Catégorie');
                const subCategoryId = await getOrCreateEntityId(row['SubCategory'], getSubCategories, '/api/sub-categories', 'Sous-catégorie');
                const markId = await getOrCreateEntityId(row['Mark'], getMarks, '/api/marks', 'Marque');

                // 5. Préparer le Payload de base
                const productPayload: NewProductData = {
                    name: `${row['SubCategory'] || ''} ${uniqueProductInfo.name}`.trim(),
                    description: uniqueProductInfo.description,
                    slug: uniqueProductInfo.slug, // Utiliser le slug validé
                    price: parseFloat(row['Price']?.toString() || '0') || 0,
                    reference: productReference,
                    variants: [], // Sera peuplé ensuite
                    ...(segmentId && { segment: { connect: [segmentId]} }),
                    ...(categoryId && { category: { connect: [categoryId] } }),
                    ...(subCategoryId && { sub_category: { connect: [subCategoryId] } }),
                    ...(markId && { mark: { connect: [markId] } }),
                };

                // 6. Traitement des Variants
                const colorNames = (row['Colors'] || '').split(',').map((c: string) => c.trim()).filter(Boolean);
                const sizeNames = (row['Sizes'] || '').split(',').map((s: string) => s.trim()).filter(Boolean);

                const variantPromises = colorNames.map(async (colorName): Promise<VariantData | null> => {
                    const colorId = await getOrCreateEntityId(colorName, getColors, '/api/colors', 'Couleur');
                    if (!colorId) {
                        console.warn(`Ligne ${rowNum}: Couleur "${colorName}" non traitée. Variant incomplet.`);
                        return null;
                    }
                    const sizeIdPromises = sizeNames.map(sizeName =>
                        getOrCreateEntityId(sizeName, getSizes, '/api/sizes', 'Taille', { shorten: slugify(sizeName, { lower: true }) })
                    );
                    const resolvedSizeIds = await Promise.all(sizeIdPromises);
                    const validSizeIds = resolvedSizeIds.filter((id): id is string => id !== null && id !== undefined);
                    if (validSizeIds.length !== sizeNames.length && sizeNames.length > 0) {
                        console.warn(`Ligne ${rowNum}: Certaines tailles pour ${colorName} non traitées.`);
                    }
                    return { color: { connect: [colorId]}, sizes: { connect: [...validSizeIds]} };
                });
                const resolvedVariantsOrNulls = await Promise.all(variantPromises);
                productPayload.variants = resolvedVariantsOrNulls.filter((v): v is VariantData => v !== null);

                // 7. Upload Image
                const imageId = await uploadImageToStrapi(imageData.rawBuffer, imageData.mimeType, productReference);
                if (imageId) {
                    productPayload.image = imageId;
                } else {
                    console.warn(`Ligne ${rowNum}: Image non uploadée pour ${productReference}.`);
                    // Si mise à jour, on ne veut pas écraser une image existante avec 'undefined'
                    // Si on met à jour, il vaut mieux ne pas inclure la clé 'image' dans le payload PUT
                    // si l'upload échoue, pour conserver l'ancienne image.
                    if (existingProductId) {
                        delete productPayload.image; // Ne pas envoyer la clé image si l'upload a échoué lors d'une MAJ
                    }
                }

                // 8. Décider: Créer ou Mettre à Jour ?
                if (existingProductId) {
                    // --- MISE À JOUR ---
                    console.log(`Ligne ${rowNum}: Mise à jour du produit ${productReference} (ID: ${existingProductId})...`);

                    const updateResponse = await fetch(`${process.env.STRAPI_API_URL}/api/products/${existingProductId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            // 'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}` // IMPORTANT
                        },
                        body: JSON.stringify({ data: productPayload }),
                    });

                    if (!updateResponse.ok) {
                        const errorBody = await updateResponse.text();
                        throw new Error(`Échec MàJ produit ${productReference}: ${updateResponse.status} - ${errorBody}`);
                    }
                    const updatedProduct = await updateResponse.json();
                    console.log(`Ligne ${rowNum}: Produit ${productReference} màj (ID: ${updatedProduct?.data?.documentId})`);
                    updateCount++;

                } else {
                    // --- CRÉATION ---
                    console.log(`Ligne ${rowNum}: Création du produit ${productReference}...`);
                    // S'assurer que le slug est bien présent pour la création
                    // (il l'est car il vient de uniqueProductInfo)

                    const createResponse = await fetch(`${process.env.STRAPI_API_URL}/api/products`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            // 'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}` // IMPORTANT
                        },
                        body: JSON.stringify({ data: productPayload }),
                    });

                    if (!createResponse.ok) {
                        const errorBody = await createResponse.text();
                        throw new Error(`Échec création produit ${productReference}: ${createResponse.status} - ${errorBody}`);
                    }
                    const createdProduct = await createResponse.json();
                    console.log(`Ligne ${rowNum}: Produit ${productReference} créé (ID: ${createdProduct?.data?.id})`);
                    successCount++;
                }
            } catch (error: any) {
                // --- Gestion Erreur Ligne (inchangée) ---
                console.error(`--- ERREUR Ligne ${rowNum} (Ref: ${productReference}) --- :`, error.message);
                errorDetails.push(`Ligne ${rowNum} (Ref: ${productReference}): ${error.message}`);
                errorCount++;
            }
        } // Fin de la boucle for

        // --- Nettoyage et Résultat (Mis à jour) ---
        console.log(`Import/MàJ terminé. Créés: ${successCount}, Mis à jour: ${updateCount}, Ignorés (ref manquante): ${skippedCount}, Erreurs: ${errorCount}`);
        await unlink(tempFilePath);
        revalidatePath('/admin'); // Ajustez le chemin si nécessaire

        return {
            message: `Import/MàJ terminé. ${successCount} produits créés, ${updateCount} mis à jour, ${skippedCount} ignorés (ref manquante), ${errorCount} erreurs.`,
            type: errorCount === 0 ? 'success' : 'error',
            details: errorDetails,
        };

    } catch (error: any) {
        // --- Gestion Erreur Globale (inchangée) ---
        console.error("Erreur générale lors de l'import:", error);
        try { await unlink(tempFilePath); } catch { /* Ignorer */ }
        return { message: `Erreur majeure durant l'import: ${error.message}`, type: 'error' };
    }
}