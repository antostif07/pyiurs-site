// --- Helper: download Image & Conversion Base64 ---
import {GoogleGenerativeAI} from "@google/generative-ai";
import slugify from "slugify";
import {UniqueProductInfo,} from "@/types/types";
import {getProducts} from "@/lib/api";

export async function getImageData(imageUrl: string): Promise<{ buffer: string, mimeType: string, rawBuffer: Buffer }> {
    const response = await fetch(imageUrl);
    if (!response.ok) {
        throw new Error(`Error fetch image ${imageUrl}: ${response.statusText}`);
    }
    const mimeType = response.headers.get('content-type') || 'application/octet-stream'; // default mime type
    const arrayBuffer = await response.arrayBuffer();
    const rawBuffer = Buffer.from(arrayBuffer);
    const buffer = rawBuffer.toString('base64');
    return { buffer, mimeType, rawBuffer };
}

// --- Helper: Gemini API Call---
// --- Helper: Appel Gemini (avec gestion des exclusions) ---
export async function getProductInfoWithGemini(
    imageData: { buffer: string, mimeType: string },
    excludedNames: string[] = []
): Promise<{ name: string, description: string }> {

    if (!process.env.GOOGLE_API_KEY) {
        throw new Error("Clé API Google (GOOGLE_API_KEY) non configurée.");
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    // Vérifiez le modèle exact que vous souhaitez utiliser (pro-vision, 1.5-flash, etc.)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    let prompt = "Décris cet habit détaillé pour e-commerce. Donne nom court (prénom français, anglais, espagnol ou italien inspiré de preference femini, pas des couleur) & description (max 3 phrases, style).";
    if (excludedNames.length > 0) {
        const namesToAvoid = excludedNames.join('", "');
        prompt += `\n\nIMPORTANT: Évite les noms suivants (déjà utilisés/rejetés pour CE produit): "${namesToAvoid}". Propose un nom différent.`;
    }
    prompt += "renvoi seulement le json sans aucun n'autre texte ou formatage markdown.\n"
    prompt += "\n\nFormat JSON: {\"name\": \"NomCourt\", \"description\": \"DescriptionLongue\"}";

    const parts = [{ inlineData: { data: imageData.buffer, mimeType: imageData.mimeType } }];

    try {
        // console.log("Appel Gemini avec prompt:", prompt);
        const result = await model.generateContent([prompt, ...parts]);
        const text = result?.response?.text?.();

        if (!text) throw new Error("Réponse vide ou invalide de Gemini.");

        const cleanedText = text.replace(/^```json\s*/, '').replace(/```$/, '');
        const jsonData = JSON.parse(cleanedText);

        if (!jsonData.name || !jsonData.description) {
            throw new Error("Format JSON invalide ou champs manquants (name/description) dans réponse Gemini.");
        }
        // console.log("Réponse Gemini reçue:", jsonData); // Décommentez pour déboguer la réponse
        return { name: jsonData.name, description: jsonData.description };
    } catch (error: any) {
        console.error("Erreur appel/parsing Gemini:", error);
        throw new Error(`Erreur Gemini: ${error.message || 'Inconnue'}`); // Renvoyer pour être attrapée plus haut
    }
}

// --- Helper: Get or Create Entity ID ---
export async function getOrCreateEntityId(
    name: string | undefined,
    getFunction: (filter: { name: string }) => Promise<{ documentId: string }[]>,
    createApiPath: string, // ex: /api/segments
    entityDisplayName: string, // ex: "Segment"
    additionalData: Record<string, any> = {} // Pour les champs comme 'shorten' pour Size
): Promise<string | undefined> { // Retourne undefined si nom vide ou erreur non bloquante
    if (!name?.trim()) return undefined;
    const trimmedName = name.trim();

    try {
        const existing = await getFunction({ name: trimmedName });

        if (existing.length > 0) {
            return existing[0].documentId;
        } else {
            console.log(`Création ${entityDisplayName}: ${trimmedName}`);
            const slug = slugify(trimmedName, { lower: true, strict: true });
            const newData = { name: trimmedName, slug, ...additionalData };

            const response = await fetch(`${process.env.STRAPI_API_URL}${createApiPath}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // IMPORTANT: Décommentez et configurez l'Authorization si nécessaire
                    // 'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`
                },
                body: JSON.stringify({ data: newData }),
            });

            if (!response.ok) {
                const errorBody = await response.text();
                // Log l'erreur mais retourne undefined pour ne pas bloquer toute la ligne
                console.error(`Échec création ${entityDisplayName} "${trimmedName}": ${response.status} - ${errorBody}`);
                return undefined; // Échec non bloquant pour cette entité
            }

            const j = await response.json();
            if (!j.data?.documentId) {
                console.error(`Réponse invalide création ${entityDisplayName} "${trimmedName}"`);
                return undefined;
            }
            return j.data.documentId;
        }
    } catch (error) {
        console.error(`Erreur Get/Create ${entityDisplayName} "${trimmedName}":`, error);
        return undefined; // Erreur non bloquante
    }
}

// --- Helper: Upload Image to Strapi ---
export async function uploadImageToStrapi(
    imageBuffer: Buffer,
    mimeType: string,
    reference: string
): Promise<number | undefined> {
    try {
        const formData = new FormData();
        // Construire un nom de fichier (peut être amélioré)
        const filename = `product_${reference}_${Date.now()}.${mimeType.split('/')[1] || 'jpg'}`;
        formData.append('files', new Blob([imageBuffer], { type: mimeType }), filename);
        // Vous pouvez ajouter 'ref', 'refId', 'field' si nécessaire pour lier l'image
        // formData.append('ref', 'api::product.product'); // Exemple si votre collection s'appelle 'product'
        // formData.append('refId', productId); // Besoin de l'ID produit si vous liez ici
        // formData.append('field', 'image'); // Nom du champ image dans le produit

        const response = await fetch(`${process.env.STRAPI_API_URL}/api/upload`, {
            method: 'POST',
            headers: {
                // IMPORTANT: Authorization si l'upload n'est pas public
                // 'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`
            },
            body: formData,
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error(`Échec upload image pour ${reference}: ${response.status} - ${errorBody}`);
            return undefined;
        }
        const uploadData = await response.json();
        // Strapi renvoie souvent un tableau, même pour un seul fichier
        if (!Array.isArray(uploadData) || uploadData.length === 0 || !uploadData[0].id) {
            console.error(`Réponse invalide de l'upload Strapi pour ${reference}`);
            return undefined;
        }
        console.log(`Image uploadée pour ${reference}, ID: ${uploadData[0].id}`);
        return uploadData[0].id;

    } catch (error) {
        console.error(`Erreur lors de l'upload de l'image pour ${reference}:`, error);
        return undefined;
    }
}

// Cette fonction factorise la logique commune de préparation des données
// export async function prepareProductPayload(
//     row: ExcelData,
//     imageUrlColumn: string,
//     rowNum: number
// ): Promise<{ payload: NewProductData, imageData: Awaited<ReturnType<typeof getImageData>> }> {
//     // 1. Obtenir l'URL de l'image et les infos produit via Gemini
//     const imageUrl = row[imageUrlColumn]?.toString().trim();
//     if (!imageUrl) {
//         throw new Error(`Ligne ${rowNum}: URL d'image manquante dans la colonne ${imageUrlColumn}`);
//     }
//
//     const imageData = await getImageData(imageUrl); // Peut throw
//     const productInfo = await getProductInfoWithGemini(imageData); // Peut throw
//
//     // 2. Get or Create Relations
//     // Note: Promise.all peut accélérer ceci si nécessaire, mais séquentiel est plus simple à lire
//     const segmentId = await getOrCreateEntityId(row['Segment'], getSegments, '/api/segments', 'Segment');
//     const categoryId = await getOrCreateEntityId(row['Category'], getCategories, '/api/categories', 'Catégorie');
//     const subCategoryId = await getOrCreateEntityId(row['SubCategory'], getSubCategories, '/api/sub-categories', 'Sous-catégorie');
//     const markId = await getOrCreateEntityId(row['Mark'], getMarks, '/api/marks', 'Marque');
//
//     // 3. Préparer les données de base du produit
//     const productName = `${row['SubCategory'] || ''} ${productInfo.name}`.trim();
//     const productSlug = slugify(`${row['Reference']}-${productInfo.name}`, { lower: true, strict: true, trim: true });
//
//     const productPayload: NewProductData = {
//         name: productName,
//         description: productInfo.description,
//         slug: productSlug, // Inclure pour création, optionnel pour màj (Strapi le garde souvent)
//         price: parseFloat(row['Price']?.toString() || '0') || 0,
//         reference: row['Reference'].toString().trim(), // Assurer que la référence est bien là
//         variants: [], // Sera peuplé ci-dessous
//         // Assignation conditionnelle des IDs trouvés
//         ...(segmentId && { segment: { "connect": [segmentId]} }),
//         ...(categoryId && { category: { "connect": [categoryId]} }),
//         ...(subCategoryId && { sub_category: { "connect": [subCategoryId]} }),
//         ...(markId && { mark: { "connect": [markId]} }),
//         // Le champ 'image' sera ajouté après l'upload
//     };
//
//     // 4. Traitement des Variants
//     const colorNames = (row['Colors'] || '').split(',').map((c: string) => c.trim()).filter(Boolean);
//     const sizeNames = (row['Sizes'] || '').split(',').map((s: string) => s.trim()).filter(Boolean);
//
//     const variantPromises = colorNames.map(async (colorName): Promise<VariantData | null> => {
//         const colorId = await getOrCreateEntityId(colorName, getColors, '/api/colors', 'Couleur');
//         if (!colorId) {
//             console.warn(`Ligne ${rowNum}: Impossible d'obtenir/créer l'ID pour la couleur "${colorName}". Variant incomplet.`);
//             return null;
//         }
//
//         const sizeIdPromises = sizeNames.map(sizeName =>
//             getOrCreateEntityId(sizeName, getSizes, '/api/sizes', 'Taille', { shorten: slugify(sizeName, { lower: true }) })
//         );
//         const resolvedSizeIds = await Promise.all(sizeIdPromises);
//         const validSizeIds = resolvedSizeIds.filter((id): id is string => id !== null && id !== undefined);
//
//         if (validSizeIds.length !== sizeNames.length && sizeNames.length > 0) {
//             console.warn(`Ligne ${rowNum}: Certaines tailles pour la couleur ${colorName} n'ont pas pu être traitées.`);
//         }
//
//         return {
//             color: {
//                 "connect": [colorId]
//             },
//             sizes: {
//                 "connect": [...validSizeIds]
//             }
//         };
//     });
//
//     const resolvedVariantsOrNulls = await Promise.all(variantPromises);
//     productPayload.variants = resolvedVariantsOrNulls.filter((v): v is VariantData => v !== null);
//
//     return { payload: productPayload, imageData };
// }


// --- NOUVEAU Helper: Obtenir Nom/Description/Slug Unique ---
export async function getUniqueProductInfoAndSlug(
    imageData: Awaited<ReturnType<typeof getImageData>>,
    productReference: string,
    productSubCategory: string,
    currentProductId: string | undefined, // ID du produit si on met à jour (pour ignorer lors du check)
    usedNamesInBatch: Set<string>,
    maxRetries = 3
): Promise<UniqueProductInfo> {

    let attempt = 0;
    while (attempt < maxRetries) {
        attempt++;
        console.log(`Tentative ${attempt}/${maxRetries} pour générer nom/slug unique pour Ref: ${productReference}`);
        const productInfo = await getProductInfoWithGemini(imageData); // Peut throw

        const potentialName = productSubCategory + " " + productInfo.name;
        const potentialSlug = slugify(`${productReference}-${potentialName}`, { lower: true, strict: true, trim: true });

        // --- Vérifications d'Unicité ---
        let isDuplicate = false;
        let duplicateReason = '';

        // 1. Check in current batch (excluding self if updating)
        if (usedNamesInBatch.has(potentialName)) {
            isDuplicate = true;
            duplicateReason = `Nom "${potentialName}" déjà utilisé dans ce batch.`;
        }

        // 2. Check in Strapi DB (excluding self if updating)
        if (!isDuplicate) {
            try {
                // Check name (excluding self)
                const existingByName = await getProducts({ name: potentialName });

                if (existingByName.length > 0) {
                    isDuplicate = true;
                    duplicateReason = `Nom "${potentialName}" existe déjà en BDD (autre produit).`;
                }
            } catch (dbCheckError) {
                console.error(`Erreur vérification unicité BDD pour Ref ${productReference}:`, dbCheckError);
            }
        }

        // --- Décision ---
        if (isDuplicate) {
            console.warn(`Ref ${productReference}: ${duplicateReason} Régénération...`);
            continue; // Prochaine tentative de la boucle while
        } else {
            // Nom/Slug est unique !
            console.log(`Nom/Slug uniques trouvés pour Ref ${productReference}: "${potentialName}" / "${potentialSlug}"`);

            usedNamesInBatch.add(potentialName);
            return { ...productInfo, slug: potentialSlug }; // Retourner les infos validées
        }
    } // Fin While

    // Si on atteint la fin de la boucle sans succès
    throw new Error(`Impossible de générer nom/slug unique pour Ref ${productReference} après ${maxRetries} tentatives.`);
}