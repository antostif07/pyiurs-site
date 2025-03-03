"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  ChevronRight, 
  Calendar, 
  User, 
  Tag, 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Copy, 
  ArrowLeft, 
  ArrowRight,
  MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {toast} from 'sonner';

// Données des articles de blog
const blogPosts = [
  {
    id: "tendances-printemps-2025",
    title: "Les tendances mode du printemps 2025",
    excerpt: "Découvrez les couleurs, les coupes et les matières qui feront sensation cette saison. Notre guide complet des tendances à adopter dès maintenant.",
    content: `
      <p>Le printemps 2025 s'annonce comme une saison de renouveau et d'audace dans le monde de la mode. Après plusieurs années marquées par le confort et la praticité, les créateurs reviennent avec des propositions plus affirmées et colorées qui célèbrent l'optimisme et la joie de vivre.</p>
      
      <h2>Les couleurs qui domineront cette saison</h2>
      
      <p>Cette saison, les teintes pastel traditionnellement associées au printemps laissent place à des couleurs plus vives et saturées. Le jaune safran, le vert émeraude et le bleu cobalt seront omniprésents dans les collections. Ces couleurs éclatantes symbolisent l'énergie et le dynamisme que nous recherchons tous après les mois d'hiver.</p>
      
      <p>Pour celles qui préfèrent la subtilité, les tons neutres comme le beige, le crème et le blanc cassé restent des valeurs sûres, mais ils sont souvent rehaussés par des accessoires colorés pour créer un contraste intéressant.</p>
      
      <h2>Les matières à privilégier</h2>
      
      <p>Les tissus naturels continuent leur progression avec une forte présence du lin, du coton biologique et de la soie. La tendance éco-responsable se confirme avec l'utilisation croissante de matières recyclées et de procédés de fabrication plus respectueux de l'environnement.</p>
      
      <p>Les textures sont variées, allant du très fluide pour les robes et les blouses, au plus structuré pour les vestes et les pantalons. Les tissus techniques font également leur apparition dans le prêt-à-porter quotidien, apportant confort et praticité sans sacrifier le style.</p>
      
      <h2>Les coupes et silhouettes à adopter</h2>
      
      <p>La silhouette du printemps 2025 joue sur les contrastes : volumes amples et lignes épurées se côtoient harmonieusement. Les pantalons larges restent tendance, souvent associés à des hauts plus ajustés pour équilibrer la silhouette.</p>
      
      <p>Les robes midi et maxi continuent leur règne, avec des coupes qui mettent en valeur la taille. Les manches bouffantes et les détails romantiques comme les volants et les fronces apportent une touche de féminité et de légèreté très appréciée en cette saison.</p>
      
      <h2>Les imprimés à oser</h2>
      
      <p>Les motifs floraux, incontournables du printemps, se réinventent avec des proportions XXL et des coloris inattendus. Les imprimés géométriques et abstraits gagnent également du terrain, offrant une alternative moderne et graphique.</p>
      
      <p>La tendance color block fait son grand retour, permettant des associations audacieuses qui dynamisent instantanément une tenue. N'hésitez pas à mélanger les couleurs complémentaires pour un effet visuel saisissant.</p>
      
      <h2>Les accessoires indispensables</h2>
      
      <p>Côté accessoires, les bijoux statement en métal doré ou argenté viennent compléter les tenues les plus simples. Les sacs se font soit très grands, format cabas, soit très petits, façon mini-pochette.</p>
      
      <p>Les chaussures privilégient le confort avec des talons de hauteur moyenne, des mules faciles à enfiler et des sandales plates ornées de détails précieux. Les lunettes de soleil oversize et les foulards en soie noués de multiples façons sont les touches finales parfaites pour un look printanier réussi.</p>
      
      <h2>Comment adopter ces tendances ?</h2>
      
      <p>L'important est de ne pas suivre aveuglément toutes ces tendances, mais de sélectionner celles qui correspondent à votre style personnel et à votre morphologie. Commencez par intégrer une ou deux pièces tendance à votre garde-robe existante, puis expérimentez progressivement.</p>
      
      <p>N'oubliez pas que la mode doit avant tout vous faire vous sentir bien dans votre peau. Privilégiez les pièces dans lesquelles vous vous sentez à l'aise et qui vous ressemblent, tout en vous amusant à explorer de nouvelles possibilités stylistiques.</p>
      
      <p>Ce printemps 2025 s'annonce comme une saison riche en créativité et en couleurs, l'occasion parfaite pour renouveler votre garde-robe et exprimer votre personnalité à travers vos choix vestimentaires.</p>
    `,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
    author: "Sophie Martin",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    authorBio: "Rédactrice mode et styliste avec plus de 10 ans d'expérience dans l'industrie de la mode. Passionnée par les tendances émergentes et l'expression personnelle à travers le style.",
    date: "15 mars 2025",
    category: "Tendances",
    tags: ["Printemps", "Tendances", "Mode", "2025"],
    featured: true,
    readTime: "8 min",
    relatedPosts: ["accessoires-indispensables", "mode-ethique-durable", "comment-porter-couleurs-vives"]
  },
  {
    id: "accessoires-indispensables",
    title: "Les accessoires indispensables pour sublimer votre tenue",
    excerpt: "Comment choisir et associer les accessoires parfaits pour mettre en valeur votre style personnel et transformer une tenue simple en look remarquable.",
    content: `
      <p>Les accessoires sont souvent considérés comme la touche finale d'une tenue, mais leur importance va bien au-delà de ce simple rôle. Un accessoire bien choisi peut transformer complètement un look, lui donner du caractère et refléter votre personnalité. Dans cet article, nous explorons comment sélectionner et associer les accessoires pour sublimer vos tenues au quotidien.</p>
      
      <h2>Le pouvoir des bijoux</h2>
      
      <p>Les bijoux sont probablement les accessoires les plus transformateurs. Une paire de boucles d'oreilles statement peut à elle seule dynamiser une tenue minimaliste. Pour un style équilibré, suivez la règle du "moins c'est plus" : si vous portez des boucles d'oreilles imposantes, optez pour un collier discret ou n'en portez pas du tout.</p>
      
      <p>Les colliers superposés sont toujours tendance et permettent de personnaliser votre look. Mélangez différentes longueurs et styles pour un effet bohème chic. Les bracelets peuvent également être accumulés, en jouant sur les textures et les matières pour créer un contraste intéressant.</p>
      
      <h2>Le sac, bien plus qu'un accessoire fonctionnel</h2>
      
      <p>Le sac est l'accessoire quotidien par excellence, alliant praticité et style. Investir dans un sac de qualité est toujours judicieux, car il peut instantanément élever une tenue simple. Un sac coloré apporte une touche de gaieté à un ensemble neutre, tandis qu'un modèle classique en cuir s'accordera avec presque toutes vos tenues.</p>
      
      <p>Pour les occasions spéciales, une pochette élégante ou un mini-sac orné de détails précieux complètera parfaitement votre tenue de soirée. N'hésitez pas à sortir des sentiers battus avec des formes originales ou des textures inattendues qui feront de votre sac un véritable statement piece.</p>
      
      <h2>Les chaussures, fondation de votre style</h2>
      
      <p>Les chaussures définissent souvent l'allure générale d'une tenue. Des baskets donneront un aspect décontracté à une robe, tandis que des escarpins apporteront instantanément de l'élégance à un jean. Avoir quelques paires polyvalentes dans votre garde-robe est essentiel : des bottines pour la mi-saison, des sandales élégantes pour l'été, des escarpins pour les occasions formelles et des baskets confortables pour le quotidien.</p>
      
      <p>La tendance actuelle favorise le confort sans sacrifier le style, avec des talons de hauteur moyenne, des mules faciles à enfiler et des mocassins revisités. Les détails comme les boucles métalliques, les nœuds ou les broderies peuvent transformer une chaussure simple en pièce remarquable.</p>
      
      <h2>Les ceintures, pour structurer la silhouette</h2>
      
      <p>Souvent sous-estimée, la ceinture est pourtant un accessoire clé qui peut complètement transformer une silhouette. Une ceinture fine à la taille affinera votre silhouette dans une robe ample, tandis qu'une ceinture plus large créera un effet color block intéressant sur un manteau ou une veste oversize.</p>
      
      <p>Les ceintures ornées de boucles statement sont particulièrement tendance et peuvent devenir le point focal d'une tenue simple. N'hésitez pas à expérimenter en portant votre ceinture sur différentes pièces : robes, tuniques, vestes ou même par-dessus un cardigan long.</p>
      
      <h2>Les foulards, accessoires polyvalents par excellence</h2>
      
      <p>Le foulard est sans doute l'accessoire le plus polyvalent de votre garde-robe. Porté autour du cou, noué dans les cheveux, attaché à votre sac ou même utilisé comme ceinture improvisée, il apporte instantanément couleur et sophistication à n'importe quelle tenue.</p>
      
      <p>Les imprimés géométriques, floraux ou abstraits permettent d'ajouter de la personnalité à un look monochrome. Pour un style français intemporel, optez pour un carré de soie noué négligemment autour du cou avec une chemise blanche et un jean.</p>
      
      <h2>Les lunettes, pour un style affirmé</h2>
      
      <p>Qu'il s'agisse de lunettes de vue ou de soleil, cet accessoire a un impact considérable sur votre visage et donc sur l'impression générale que vous donnez. Choisissez une forme qui complète les traits de votre visage : des montures rondes adouciront un visage anguleux, tandis que des formes plus géométriques structureront un visage rond.</p>
      
      <p>Les lunettes de soleil oversize continuent d'être tendance et ajoutent instantanément une touche glamour à n'importe quelle tenue. Pour un look plus audacieux, osez les montures colorées ou les verres teintés qui apporteront une dimension ludique à votre style.</p>
      
      <h2>L'art de l'association</h2>
      
      <p>La clé d'une utilisation réussie des accessoires réside dans l'équilibre. Si vous portez plusieurs accessoires, assurez-vous qu'ils se complètent sans se concurrencer. Une bonne règle est de choisir une pièce statement et de garder les autres accessoires plus discrets.</p>
      
      <p>N'ayez pas peur d'expérimenter des combinaisons inattendues : un sac structuré avec une tenue fluide, des bijoux ethniques avec un look minimaliste, ou des chaussures colorées avec une tenue monochrome. Ces contrastes créent souvent les ensembles les plus intéressants.</p>
      
      <p>En définitive, les accessoires sont le moyen le plus simple et le plus efficace de renouveler votre garde-robe sans tout changer. Ils vous permettent d'exprimer votre créativité et de personnaliser même les tenues les plus basiques. Alors n'hésitez pas à investir dans quelques pièces de qualité qui reflètent votre personnalité et qui sublimeront vos tenues jour après jour.</p>
    `,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1976&auto=format&fit=crop",
    author: "Camille Dubois",
    authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
    authorBio: "Styliste personnelle et consultante en image. Spécialisée dans les accessoires et la façon dont ils peuvent transformer une tenue. Collabore régulièrement avec des magazines de mode.",
    date: "28 février 2025",
    category: "Conseils",
    tags: ["Accessoires", "Style", "Bijoux", "Sacs"],
    featured: true,
    readTime: "7 min",
    relatedPosts: ["tendances-printemps-2025", "entretien-vetements-qualite", "capsule-wardrobe-printemps"]
  },
  {
    id: "mode-ethique-durable",
    title: "Mode éthique et durable : notre engagement",
    excerpt: "Comment nous sélectionnons nos matières premières et travaillons avec des ateliers responsables pour créer une mode belle et respectueuse de l'environnement.",
    content: `
      <p>La mode est l'une des industries les plus polluantes au monde, juste après le pétrole. Face à ce constat alarmant, de plus en plus de marques, dont la nôtre, s'engagent dans une démarche éthique et durable. Dans cet article, nous vous expliquons notre vision de la mode responsable et les actions concrètes que nous mettons en place pour réduire notre impact environnemental tout en garantissant des conditions de travail équitables.</p>
      
      <h2>Notre philosophie : la slow fashion</h2>
      
      <p>Contrairement au modèle de la fast fashion qui propose des collections renouvelées toutes les semaines à des prix dérisoires, nous avons fait le choix de la slow fashion. Cette approche privilégie la qualité à la quantité, la durabilité à l'éphémère, et le respect des personnes et de la planète au profit à court terme.</p>
      
      <p>Nous concevons des vêtements intemporels, qui traversent les saisons et les années sans se démoder. Nos pièces sont pensées pour être polyvalentes et s'intégrer facilement dans votre garde-robe existante. L'objectif est de vous proposer moins de vêtements, mais des vêtements que vous garderez plus longtemps et que vous porterez plus souvent.</p>
      
      <h2>Le choix des matières premières</h2>
      
      <p>La sélection des matières est une étape cruciale dans notre démarche éco-responsable. Nous privilégions les fibres naturelles biologiques comme le coton bio, le lin et la laine, cultivés sans pesticides ni engrais chimiques. Ces cultures respectent les sols, préservent la biodiversité et utilisent moins d'eau que les cultures conventionnelles.</p>
      
      <p>Nous utilisons également des matières recyclées, comme le polyester issu de bouteilles en plastique récupérées dans les océans, ou des fibres innovantes comme le Tencel™ (lyocell), fabriqué à partir de pulpe de bois provenant de forêts gérées durablement dans un processus en circuit fermé qui recycle 99% des solvants utilisés.</p>
      
      <p>Chaque matière est soigneusement évaluée selon plusieurs critères : son impact environnemental, sa durabilité, son confort et son esthétique. Nous travaillons en étroite collaboration avec nos fournisseurs pour garantir la traçabilité de nos matières et nous visitons régulièrement les sites de production.</p>
      
      <h2>Des partenariats équitables avec nos ateliers</h2>
      
      <p>La dimension éthique est indissociable de notre démarche durable. Nous sélectionnons nos ateliers de confection selon des critères stricts : respect des droits des travailleurs, conditions de travail sécurisées, rémunération juste et absence de travail des enfants.</p>
      
      <p>La majorité de nos vêtements sont fabriqués en Europe, dans des ateliers familiaux avec lesquels nous entretenons des relations de long terme basées sur la confiance et le respect mutuel. Cette proximité nous permet de contrôler régulièrement les conditions de production et de réduire notre empreinte carbone liée au transport.</p>
      
      <p>Nous privilégions également le savoir-faire local et les techniques artisanales traditionnelles, contribuant ainsi à préserver des métiers d'art menacés de disparition et à soutenir les économies locales.</p>
      
      <h2>Une production raisonnée et anti-gaspillage</h2>
      
      <p>Pour éviter la surproduction et le gaspillage, nous avons adopté un modèle de production en petites séries, parfois même en pré-commande. Cette approche nous permet d'ajuster nos quantités au plus près de la demande réelle et de réduire les invendus.</p>
      
      <p>Les chutes de tissus sont récupérées pour créer des accessoires ou sont données à des associations qui les réutilisent dans des projets créatifs. Nous travaillons également à optimiser nos patrons pour minimiser les déchets lors de la coupe des tissus.</p>
      
      <p>Nos emballages sont conçus pour être minimalistes, recyclables ou compostables. Nous avons éliminé le plastique à usage unique de notre chaîne logistique et utilisons des matériaux d'emballage issus de sources durables.</p>
      
      <h2>La transparence comme principe fondamental</h2>
      
      <p>Nous croyons fermement que la transparence est essentielle pour permettre aux consommateurs de faire des choix éclairés. C'est pourquoi nous communiquons ouvertement sur l'origine de nos matières, nos processus de fabrication et notre structure de coûts.</p>
      
      <p>Sur notre site, chaque produit est accompagné d'informations détaillées sur sa composition, son lieu de fabrication et son impact environnemental. Nous publions également un rapport annuel sur nos progrès en matière de durabilité, incluant nos réussites mais aussi les défis auxquels nous sommes confrontés.</p>
      
      <h2>L'éducation et la sensibilisation</h2>
      
      <p>Au-delà de nos pratiques internes, nous nous engageons à sensibiliser notre communauté aux enjeux de la mode durable. À travers notre blog, nos réseaux sociaux et nos événements, nous partageons des informations sur l'entretien des vêtements pour prolonger leur durée de vie, les innovations en matière de textiles durables ou encore les initiatives inspirantes dans le domaine de la mode éthique.</p>
      
      <p>Nous encourageons également nos clients à adopter une consommation plus responsable en privilégiant la qualité à la quantité, en prenant soin de leurs vêtements et en leur donnant une seconde vie lorsqu'ils ne les portent plus (don, revente, recyclage).</p>
      
      <h2>Un engagement en constante évolution</h2>
      
      <p>Notre démarche éco-responsable n'est pas figée mais en constante évolution. Nous remettons régulièrement en question nos pratiques, nous nous tenons informés des dernières innovations et nous fixons des objectifs toujours plus ambitieux pour réduire notre impact.</p>
      
      <p>Nous sommes conscients que la perfection n'existe pas en matière de durabilité et que chaque choix implique des compromis. Cependant, nous sommes convaincus que chaque petit pas compte et que collectivement, nous pouvons transformer l'industrie de la mode pour qu'elle devienne plus respectueuse des personnes et de la planète.</p>
      
      <p>En choisissant nos vêtements, vous ne faites pas seulement l'acquisition d'une pièce belle et de qualité, vous soutenez également une vision plus éthique et durable de la mode. Et c'est ensemble, créateurs et consommateurs, que nous pourrons faire la différence.</p>
    `,
    image: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=1964&auto=format&fit=crop",
    author: "Marie Leroy",
    authorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop",
    authorBio: "Responsable développement durable chez Élégance. Titulaire d'un master en management environnemental et passionnée par la mode éthique et les innovations textiles durables.",
    date: "10 février 2025",
    category: "Éthique",
    tags: ["Durable", "Éthique", "Environnement", "Responsable"],
    featured: false,
    readTime: "10 min",
    relatedPosts: ["entretien-vetements-qualite", "tendances-printemps-2025", "histoire-mode-feminine"]
  },
  {
    id: "comment-porter-couleurs-vives",
    title: "Comment porter les couleurs vives avec élégance",
    excerpt: "Astuces et conseils pour intégrer des couleurs audacieuses dans votre garde-robe quotidienne, même si vous préférez habituellement les tons neutres.",
    content: `
      <p>Les couleurs vives ont le pouvoir de transformer instantanément une tenue et de refléter une personnalité joyeuse et confiante. Pourtant, nombreuses sont celles qui hésitent à les intégrer dans leur garde-robe, par peur de faire trop ou de ne pas savoir les associer. Dans cet article, nous vous proposons des conseils pratiques pour apprivoiser les couleurs audacieuses et les porter avec élégance au quotidien.</p>
      
      <h2>Comprendre les couleurs qui vous mettent en valeur</h2>
      
      <p>Avant de vous lancer dans l'aventure des couleurs vives, il est important de déterminer quelles teintes s'harmonisent naturellement avec votre carnation, la couleur de vos cheveux et de vos yeux. La théorie des saisons, qui classe les personnes en quatre catégories (printemps, été, automne, hiver), peut vous aider à identifier votre palette idéale.</p>
      
      <p>De manière générale, les personnes à la peau claire et aux cheveux blonds ou roux seront mises en valeur par des tons chauds comme le corail, le jaune doré ou le vert émeraude. Les personnes à la peau plus foncée ou aux cheveux bruns peuvent oser des couleurs plus froides et intenses comme le bleu cobalt, le violet ou le rouge vif.</p>
      
      <p>N'hésitez pas à essayer différentes couleurs près de votre visage et à observer l'effet qu'elles produisent : certaines teintes vous donneront bonne mine et feront ressortir votre teint naturel, tandis que d'autres pourront vous faire paraître fatiguée ou terne.</p>
      
      <h2>Commencer en douceur avec des touches de couleur</h2>
      
      <p>Si vous êtes habituée aux tons neutres (noir, blanc, beige, gris), l'introduction de couleurs vives peut se faire progressivement. Commencez par des accessoires colorés qui apporteront une touche de gaieté à vos tenues habituelles : un sac rouge vif avec une tenue noire, une écharpe turquoise sur un manteau beige, ou des chaussures jaunes avec un jean et un t-shirt blanc.</p>
      
      <p>Les bijoux colorés sont également un excellent moyen d'expérimenter : un collier aux perles multicolores ou des boucles d'oreilles en pierres colorées peuvent transformer une tenue simple en un look plus personnel et joyeux.</p>
      
      <h2>L'art du color blocking</h2>
      
      <p>Le color blocking, ou l'art d'associer des couleurs vives contrastantes, est une technique efficace pour créer des tenues impactantes. Pour réussir vos associations, vous pouvez vous référer au cercle chromatique :</p>
      
      <ul>
        <li>Les couleurs complémentaires (situées à l'opposé sur le cercle) créent un contraste dynamique : bleu et orange, violet et jaune, rouge et vert.</li>
        <li>Les couleurs analogues (situées côte à côte sur le cercle) offrent une harmonie plus douce : bleu et violet, jaune et orange, rouge et rose.</li>
        <li>Les couleurs triadiques (formant un triangle équilatéral sur le cercle) permettent un équilibre visuel intéressant : rouge, jaune et bleu, ou orange, vert et violet.</li>
      </ul>
      
      <p>Pour un look équilibré, limitez-vous à deux ou trois couleurs vives maximum dans une même tenue. Vous pouvez également intégrer des tons neutres comme le blanc, le noir ou le beige pour adoucir l'ensemble.</p>
      
      <h2>Jouer avec les différentes intensités</h2>
      
      <p>Toutes les couleurs vives ne sont pas égales en intensité. Vous pouvez jouer sur les différentes nuances d'une même couleur pour créer des looks ton sur ton élégants et sophistiqués. Par exemple, associez un pantalon bleu marine avec un top bleu ciel et une veste bleu cobalt, ou une jupe rose pâle avec un chemisier fuchsia.</p>
      
      <p>Cette approche est particulièrement flatteuse et plus facile à maîtriser que les contrastes de couleurs différentes. Elle permet de créer une silhouette élancée tout en apportant de la profondeur à votre tenue.</p>
      
      <h2>Tenir compte de la saison et de l'occasion</h2>
      
      <p>Certaines couleurs sont naturellement associées à des saisons spécifiques : les tons chauds comme le jaune, l'orange ou le corail évoquent le printemps et l'été, tandis que les tons plus profonds comme le bordeaux, le vert sapin ou le bleu marine sont parfaits pour l'automne et l'hiver.</p>
      
      <p>Cependant, ces règles ne sont pas figées et peuvent être transgressées avec style. Un pull jaune vif peut illuminer une tenue hivernale, tout comme un accessoire bordeaux peut apporter une touche sophistiquée à une tenue estivale.</p>
      
      <p>Concernant les occasions, certaines couleurs très vives peuvent être plus adaptées aux contextes décontractés ou créatifs qu'aux environnements professionnels formels. Dans ce dernier cas, privilégiez des couleurs plus sourdes ou limitez la couleur vive à un seul élément de votre tenue.</p>
      
      <h2>Les imprimés comme transition vers la couleur</h2>
      
      <p>Les imprimés qui mêlent couleurs vives et tons neutres sont un excellent moyen d'introduire de la couleur dans votre garde-robe. Une blouse à motifs floraux sur fond noir, une jupe à imprimé géométrique multicolore ou une robe à rayures colorées vous permettront d'apprivoiser les teintes vives sans vous sentir submergée.</p>
      
      <p>Ces pièces sont également très polyvalentes, car elles peuvent être associées aussi bien à des éléments neutres qu'à des pièces de couleur unie reprenant l'une des teintes de l'imprimé.</p>
      
      <h2>Adapter la couleur à votre morphologie</h2>
      
      <p>Les couleurs vives attirent naturellement le regard. Vous pouvez utiliser cette propriété à votre avantage en plaçant stratégiquement les couleurs pour mettre en valeur vos atouts ou détourner l'attention de zones que vous préférez dissimuler.</p>
      
      <p>Par exemple, si vous souhaitez mettre en valeur votre visage, optez pour un haut coloré avec un bas plus neutre. Si vous êtes fière de vos jambes, un pantalon ou une jupe de couleur vive avec un haut sobre sera parfait. Pour équilibrer une silhouette en forme de poire, privilégiez les couleurs vives sur le haut du corps et les tons plus sombres pour le bas.</p>
      
      <h2>Prendre confiance progressivement</h2>
      
      <p>Porter des couleurs vives demande une certaine assurance, car elles attirent l'attention. Si vous êtes de nature réservée, commencez par porter vos pièces colorées dans des contextes où vous vous sentez à l'aise, comme une sortie entre amis ou un week-end décontracté.</p>
      
      <p>Vous constaterez probablement que les couleurs vives ont un effet positif non seulement sur votre apparence mais aussi sur votre humeur et la façon dont les autres vous perçoivent. Les compliments que vous recevrez vous encourageront à être plus audacieuse dans vos choix chromatiques.</p>
      
      <h2>Conclusion : osez la couleur !</h2>
      
      <p>Intégrer des couleurs vives dans votre garde-robe est une démarche qui peut transformer non seulement votre style mais aussi votre attitude au quotidien. Les couleurs ont le pouvoir d'influencer notre humeur et de communiquer notre personnalité avant même que nous ayons prononcé un mot.</p>
      
      <p>N'ayez pas peur d'expérimenter, de faire des erreurs et d'affiner progressivement votre palette personnelle. La mode est avant tout un jeu et un moyen d'expression : amusez-vous avec les couleurs et laissez-les révéler une facette peut-être insoupçonnée de votre personnalité !</p>
    `,
    image: "https://images.unsplash.com/photo-1589810635657-232948472d98?q=80&w=1980&auto=format&fit=crop",
    author: "Émilie Bernard",
    authorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
    authorBio: "Consultante en colorimétrie et styliste personnelle. Spécialiste de l'utilisation des couleurs pour mettre en valeur la personnalité et la morphologie de chacun.",
    date: "5 février 2025",
    category: "Conseils",
    tags: ["Couleurs", "Style", "Conseils"],
    featured: false,
    readTime: "9 min",
    relatedPosts: ["tendances-printemps-2025", "accessoires-indispensables", "capsule-wardrobe-printemps"]
  },
  {
    id: "entretien-vetements-qualite",
    title: "Comment entretenir vos vêtements de qualité",
    excerpt: "Guide pratique pour prolonger la durée de vie de vos pièces préférées grâce à des méthodes d'entretien adaptées à chaque type de tissu.",
    content: `
      <p>Investir dans des vêtements de qualité est une démarche responsable, tant pour votre portefeuille que pour la planète. Mais pour que ces pièces durent dans le temps et conservent leur beauté originelle, un entretien adapté est essentiel. Dans cet article, nous vous proposons un guide complet pour prendre soin de vos vêtements selon leur matière et prolonger significativement leur durée de vie.</p>
      
      <h2>Les principes de base d'un bon entretien</h2>
      
      <p>Avant d'aborder les spécificités de chaque matière, voici quelques règles d'or qui s'appliquent à la plupart des vêtements :</p>
      
      <ul>
        <li>Lisez toujours les étiquettes d'entretien et respectez leurs indications</li>
        <li>Lavez vos vêtements moins souvent (sauf les sous-vêtements et vêtements de sport)</li>
        <li>Traitez les taches immédiatement plutôt que d'attendre le prochain lavage</li>
        <li>Triez votre linge par couleur et par type de tissu</li>
        <li>Fermez les fermetures éclair et retournez vos vêtements avant le lavage</li>
        <li>Privilégiez les cycles courts et les températures basses</li>
        <li>Évitez de surcharger votre machine à laver</li>
        <li>Limitez l'utilisation du sèche-linge</li>
      </ul>
      
      <h2>L'entretien du coton</h2>
      
      <p>Le coton est une fibre naturelle résistante qui supporte bien les lavages fréquents. Cependant, pour préserver sa qualité :</p>
      
      <p>Lavez votre coton à 30°C ou 40°C maximum pour éviter le rétrécissement et la décoloration. Les jeans et les t-shirts blancs peuvent occasionnellement être lavés à des températures plus élevées pour un nettoyage en profondeur.</p>
      
      <p>Séchez vos vêtements en coton à l'air libre si possible. Si vous utilisez un sèche-linge, optez pour un programme à basse température et sortez vos vêtements légèrement humides pour faciliter le repassage.</p>
      
      <p>Pour le repassage, utilisez une température moyenne à élevée selon l'épaisseur du tissu. Le coton se repasse idéalement lorsqu'il est encore légèrement humide.</p>
      
      <h2>Prendre soin de la soie</h2>
      
      <p>La soie est un tissu délicat qui nécessite une attention particulière :</p>
      
      <p>Privilégiez le lavage à la main dans une eau froide ou tiède avec un détergent spécial soie ou un shampooing doux. Si vous utilisez la machine, placez vos pièces en soie dans un filet de lavage et sélectionnez un programme délicat à froid.</p>
      
      <p>Ne tordez jamais la soie pour l'essorer. Pressez-la délicatement entre vos mains ou dans une serviette propre pour éliminer l'excès d'eau.</p>
      
      <p>Séchez la soie à plat et à l'ombre, loin des sources de chaleur directe qui pourraient l'endommager ou la faire jaunir.</p>
      
      <p>Pour le repassage, utilisez une température très basse et placez un linge fin entre le fer et la soie. Idéalement, repassez la soie sur l'envers lorsqu'elle est encore légèrement humide.</p>
      
      <h2>L'entretien de la laine et du cachemire</h2>
      
      <p>Les fibres animales comme la laine et le cachemire nécessitent des soins spécifiques pour éviter qu'elles ne se feutrent ou ne perdent leur forme :</p>
      
      <p>Aérez régulièrement vos pulls et vêtements en laine plutôt que de les laver après chaque port. La laine a des propriétés naturelles antibactériennes et se nettoie souvent d'elle-même simplement en l'exposant à l'air frais.</p>
      
      <p>Lorsqu'un lavage est nécessaire, optez pour un lavage à la main dans une eau froide avec un détergent spécial laine. Si vous utilisez la machine, choisissez impérativement le programme laine ou délicat à froid.</p>
      
      <p>Ne suspendez jamais vos pièces en laine mouillées, car elles risqueraient de se déformer sous leur propre poids. Séchez-les à plat sur une serviette propre, loin des sources de chaleur directe.</p>
      
      <p>Pour le stockage, pliez vos pulls en laine plutôt que de les suspendre, afin d'éviter qu'ils ne s'étirent. Protégez-les des mites avec des répulsifs naturels comme la lavande ou le cèdre.</p>
      
      <h2>Comment entretenir le lin</h2>
      
      <p>Le lin est une fibre naturelle appréciée pour sa fraîcheur et son aspect légèrement froissé qui fait partie de son charme :</p>
      
      <p>Lavez le lin à 30°C ou 40°C avec un détergent doux. Évitez de surcharger la machine pour permettre au tissu de bouger librement et de se nettoyer correctement.</p>
      
      <p>Le lin peut être séché en machine à basse température, mais un séchage à l'air libre préservera mieux ses fibres. Retirez-le légèrement humide pour faciliter le repassage.</p>
      
      <p>Si vous aimez l'aspect naturellement froissé du lin, secouez simplement vos vêtements après le lavage et laissez-les sécher à plat. Si vous préférez un aspect plus lisse, repassez le lin à température élevée lorsqu'il est encore humide.</p>
      
      <h2>L'entretien des fibres synthétiques</h2>
      
      <p>Les fibres synthétiques comme le polyester, l'acrylique ou le nylon sont généralement plus faciles à entretenir, mais elles ont leurs propres exigences :</p>
      
      <p>Lavez ces fibres à basse température (30°C maximum) pour éviter d'endommager leur structure et de libérer des microplastiques. Utilisez un cycle court et une vitesse d'essorage modérée.</p>
      
      <p>Les vêtements en fibres synthétiques sèchent rapidement et ne nécessitent généralement pas de passage au sèche-linge. Si vous l'utilisez néanmoins, optez pour une température basse.</p>
      
      <p>Ces fibres sont sensibles à la chaleur, alors repassez-les à basse température ou, mieux encore, suspendez-les soigneusement après le lavage pour éviter les plis.</p>
      
      <h2>Prendre soin des vêtements délicats et de la dentelle</h2>
      
      <p>Les pièces délicates comme la lingerie, les vêtements ornés de dentelle ou de perles nécessitent une attention toute particulière :</p>
      
      <p>Privilégiez systématiquement le lavage à la main dans une eau froide avec un détergent doux. Si vous utilisez la machine, placez ces pièces dans un filet de lavage fermé et sélectionnez le programme le plus délicat.</p>
      
      <p>Ne tordez jamais ces vêtements pour les essorer. Pressez-les délicatement entre vos mains ou dans une serviette propre pour éliminer l'excès d'eau.</p>
      
      <p>Séchez ces pièces à plat sur une serviette, en les remettant en forme si nécessaire. Évitez absolument le sèche-linge qui pourrait endommager irrémédiablement les fibres délicates et les ornements.</p>
      
      <h2>L'entretien du cuir et du daim</h2>
      
      <p>Les accessoires et vêtements en cuir ou en daim nécessitent un entretien spécifique pour conserver leur beauté :</p>
      
      <p>Protégez préventivement vos pièces en cuir avec un spray imperméabilisant adapté, particulièrement avant la saison des pluies.</p>
      
      <p>Nettoyez régulièrement le cuir avec un chiffon légèrement humide, puis appliquez une crème nourrissante spécifique pour éviter qu'il ne se dessèche et ne se craquelle.</p>
      
      <p>Pour le daim, utilisez une brosse spéciale pour éliminer les poussières et redresser les fibres. En cas de tache, utilisez une gomme pour daim ou consultez un professionnel.</p>
      
      <p>Stockez vos pièces en cuir dans un endroit sec et aéré, à l'abri de la lumière directe du soleil qui pourrait les décolorer. Utilisez des embauchoirs pour les chaussures et rembourrez les sacs pour qu'ils conservent leur forme.</p>
      
      <h2>Comment traiter les taches courantes</h2>
      
      <p>Malgré toutes les précautions, les accidents arrivent. Voici comment traiter efficacement quelques taches courantes :</p>
      
      <p><strong>Taches de vin rouge :</strong> Saupoudrez immédiatement de sel pour absorber le liquide, puis rincez à l'eau froide. Pour les tissus blancs, vous pouvez utiliser de l'eau gazeuse ou un mélange de bicarbonate de soude et de vinaigre blanc.</p>
      
      <p><strong>Taches de café ou de thé :</strong> Rincez rapidement à l'eau froide, puis tamponnez avec un mélange d'eau et de vinaigre blanc ou de jus de citron pour les tissus blancs.</p>
      
      <p><strong>Taches de gras :</strong> Saupoudrez de talc ou de fécule de maïs pour absorber le gras, laissez agir plusieurs heures puis brossez. Vous pouvez également frotter délicatement avec du liquide vaisselle avant le lavage normal.</p>
      
      <p><strong>Taches de maquillage :</strong> Utilisez un démaquillant sans huile ou un peu de liquide vaisselle doux, puis lavez normalement.</p>
      
      <h2>Le stockage saisonnier</h2>
      
      <p>Un bon stockage est aussi important qu'un bon entretien pour préserver vos vêtements entre les saisons :</p>
      
      <p>Assurez-vous que vos vêtements sont parfaitement propres avant de les ranger pour plusieurs mois. Les taches, même invisibles, peuvent s'oxyder avec le temps et attirer les mites.</p>
      
      <p>Stockez vos vêtements dans un endroit sec, à l'abri de la lumière directe du soleil et des variations de température. Utilisez des housses en tissu respirant plutôt que des housses en plastique qui peuvent favoriser l'humidité.</p>
      
      <p>Protégez vos pièces en laine et autres fibres animales avec des répulsifs naturels contre les mites comme la lavande, le cèdre ou les sachets anti-mites écologiques.</p>
      
      <h2>Conclusion : l'entretien, un geste écologique et économique</h2>
      
      <p>Prendre soin de ses vêtements n'est pas seulement une question d'esthétique ou d'économie, c'est aussi un geste écologique important. En prolongeant la durée de vie de vos pièces, vous réduisez votre consommation et l'impact environnemental associé à la production textile.</p>
      
      <p>Adoptez une approche minimaliste en investissant dans moins de vêtements mais de meilleure qualité, et entretenez-les avec soin. Vos pièces préférées vous accompagneront ainsi pendant de nombreuses années, développant avec le temps ce caractère unique et cette patine que seuls les vêtements bien-aimés et bien entretenus peuvent acquérir.</p>
    `,
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=1965&auto=format&fit=crop",
    author: " image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=1965&auto=format&fit=crop",
    author: "Julie Moreau",
    authorImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
    authorBio: "Experte en entretien textile et fondatrice d'une marque de produits d'entretien écologiques. Passionnée par la préservation des vêtements et la lutte contre la fast fashion.",
    date: "20 janvier 2025",
    category: "Conseils",
    tags: ["Entretien", "Qualité", "Durabilité"],
    featured: false,
    readTime: "11 min",
    relatedPosts: ["mode-ethique-durable", "accessoires-indispensables", "histoire-mode-feminine"]
  },
  {
    id: "interview-styliste",
    title: "Interview exclusive avec notre styliste en chef",
    excerpt: "Découvrez les inspirations, le processus créatif et les prévisions de tendances de notre styliste en chef pour les prochaines collections.",
    content: `
      <p>Dans les coulisses de notre maison de mode, une personne joue un rôle crucial dans la définition de notre identité visuelle et la création de nos collections : notre styliste en chef, Thomas Durand. Reconnu pour son œil aiguisé et sa capacité à anticiper les tendances tout en créant des pièces intemporelles, Thomas nous ouvre aujourd'hui les portes de son univers créatif dans cette interview exclusive.</p>
      
      <h2>Parcours et influences</h2>
      
      <p><strong>Élégance Magazine : Thomas, pouvez-vous nous parler de votre parcours et de ce qui vous a amené à devenir styliste ?</strong></p>
      
      <p>Thomas Durand : J'ai grandi dans une famille où l'art était omniprésent. Ma mère était peintre et mon père architecte, ce qui m'a naturellement sensibilisé à l'esthétique et aux formes dès mon plus jeune âge. Mais c'est ma grand-mère, couturière de métier, qui m'a véritablement transmis la passion du textile et du vêtement. Je passais des heures à l'observer transformer de simples tissus en pièces magnifiques.</p>
      
      <p>Après des études de design de mode à Paris et un passage chez plusieurs grandes maisons, j'ai ressenti le besoin de créer dans un environnement qui partageait ma vision d'une mode à la fois élégante, portée vers l'avenir mais respectueuse des traditions et des savoir-faire. C'est ce que j'ai trouvé ici.</p>
      
      <p><strong>EM : Quelles sont vos principales sources d'inspiration ?</strong></p>
      
      <p>TD : Je m'inspire de tout ce qui m'entoure. L'architecture est une source inépuisable d'inspiration pour moi, notamment pour les structures et les proportions. Je suis également très influencé par les voyages et la découverte de nouvelles cultures, leurs artisanats traditionnels et leurs codes vestimentaires.</p>
      
      <p>L'art contemporain nourrit aussi beaucoup mon travail, particulièrement pour les associations de couleurs et les textures. Et bien sûr, j'observe constamment les gens dans la rue, comment ils s'approprient les vêtements et les font vivre au quotidien. C'est fascinant de voir comment un même vêtement peut raconter des histoires différentes selon la personne qui le porte.</p>
      
      <h2>Processus créatif et philosophie</h2>
      
      <p><strong>EM : Comment se déroule votre processus créatif lorsque vous concevez une nouvelle collection ?</strong></p>
      
      <p>TD : Tout commence par une phase d'immersion et de recherche. Je constitue des moodboards, des collages d'images, de textures, de couleurs qui traduisent l'atmosphère que je souhaite créer. Je passe également beaucoup de temps à rechercher des matières, car pour moi, le choix du tissu est primordial et influence grandement la direction que prendra un vêtement.</p>
      
      <p>Ensuite vient la phase de croquis, où j'esquisse de nombreuses silhouettes, souvent bien plus que ce qui sera finalement produit. C'est un processus d'affinage constant. Je travaille ensuite étroitement avec les modélistes pour transformer ces dessins en prototypes, que nous ajustons ensemble jusqu'à obtenir exactement la coupe et le tombé recherchés.</p>
      
      <p>Je tiens également à être présent lors des essayages avec les mannequins, car c'est à ce moment que le vêtement prend véritablement vie et que l'on peut voir s'il fonctionne comme imaginé.</p>
      
      <p><strong>EM : Quelle est votre philosophie en matière de mode et de style ?</strong></p>
      
      <p>TD : Je crois profondément que les vêtements doivent être au service de celles qui les portent, et non l'inverse. Mon objectif est de créer des pièces qui permettent aux femmes de se sentir à la fois belles, confiantes et à l'aise. L'élégance véritable réside dans cet équilibre.</p>
      
      <p>Je m'oppose à l'idée d'une mode dictatoriale qui imposerait des standards impossibles à atteindre. Au contraire, je conçois des vêtements adaptables à différentes morphologies et différents styles de vie. Une belle pièce doit pouvoir traverser les saisons et les années, être portée et aimée longtemps.</p>
      
      <p>Enfin, je suis convaincu que la mode a une responsabilité environnementale et sociale. C'est pourquoi je m'engage à créer des collections plus réduites mais plus réfléchies, avec des matières durables et dans des conditions de production éthiques.</p>
      
      <h2>Tendances et prévisions</h2>
      
      <p><strong>EM : Quelles sont selon vous les grandes tendances qui vont marquer la mode dans les prochaines saisons ?</strong></p>
      
      <p>TD : Je vois se dessiner un retour à une forme d'élégance plus assumée après plusieurs années dominées par le streetwear et les tenues décontractées. Les silhouettes deviennent plus structurées, avec une attention particulière portée aux épaules et à la taille.</p>
      
      <p>Les couleurs vives et optimistes vont continuer à s'imposer, reflétant un désir collectif de légèreté et de joie après des périodes difficiles. Mais elles seront souvent associées à des tons neutres pour créer des looks équilibrés et portables au quotidien.</p>
      
      <p>Sur le plan des matières, nous assistons à une véritable révolution avec l'arrivée de nouveaux textiles issus de l'innovation durable : fibres recyclées de plus en plus performantes, matières biosourcées, teintures naturelles... Ces avancées vont profondément transformer notre façon de créer et de consommer la mode.</p>
      
      <p>Enfin, je crois que nous allons voir de plus en plus de pièces multifonctionnelles et transformables, répondant à un mode de vie nomade et à une conscience écologique croissante. L'idée n'est plus d'avoir beaucoup de vêtements, mais des vêtements polyvalents et durables.</p>
      
      <p><strong>EM : Comment voyez-vous évoluer la relation entre mode et technologie ?</strong></p>
      
      <p>TD : La technologie transforme déjà profondément notre industrie, et ce n'est que le début. Au niveau de la création, les outils numériques nous permettent d'explorer de nouvelles formes et de réduire le gaspillage en visualisant les pièces avant même de couper le premier morceau de tissu.</p>
      
      <p>Les textiles intelligents sont également en plein essor, avec des propriétés fascinantes : thermorégulation, protection UV, propriétés antibactériennes naturelles... Ces innovations nous permettent de créer des vêtements plus fonctionnels sans sacrifier l'esthétique.</p>
      
      <p>La personnalisation assistée par l'intelligence artificielle est une autre tendance majeure. Bientôt, nous pourrons proposer à chaque cliente des pièces adaptées non seulement à ses goûts mais aussi à sa morphologie précise, réduisant ainsi les retours et le gaspillage associé.</p>
      
      <p>Cependant, je reste convaincu que la technologie doit rester un outil au service de la créativité humaine et du savoir-faire artisanal, et non les remplacer. C'est dans cette complémentarité que réside l'avenir de la mode.</p>
      
      <h2>Conseils et inspirations personnelles</h2>
      
      <p><strong>EM : Quel est le conseil de style que vous donnez le plus souvent ?</strong></p>
      
      <p>TD : "Connaissez-vous vous-même." Cela peut sembler philosophique, mais c'est essentiel en matière de style. Comprenez votre morphologie, vos couleurs, mais aussi votre personnalité et votre mode de vie. Le style n'est pas une question de suivre aveuglément les tendances, mais de savoir ce qui vous met en valeur et vous fait vous sentir bien.</p>
      
      <p>J'encourage toujours les femmes à investir dans des pièces de qualité qui leur plaisent vraiment plutôt que d'accumuler des vêtements qui ne leur correspondent pas. Mieux vaut avoir moins de vêtements mais des pièces que l'on aime porter encore et encore.</p>
      
      <p>Enfin, n'ayez pas peur d'expérimenter et de sortir de votre zone de confort de temps en temps. Le style est un moyen d'expression qui peut et doit évoluer avec vous.</p>
      
      <p><strong>EM : Y a-t-il une pièce de votre garde-robe personnelle à laquelle vous êtes particulièrement attaché ?</strong></p>
      
      <p>TD : J'ai une veste en tweed que ma grand-mère a confectionnée il y a plus de 40 ans. Elle l'avait créée pour mon grand-père, puis mon père l'a portée, et maintenant c'est à mon tour. Elle a été légèrement modifiée au fil des générations, mais son essence reste la même.</p>
      
      <p>Cette veste est pour moi le symbole parfait de ce qu'est un vêtement réussi : une pièce intemporelle, fabriquée avec des matériaux de qualité et un savoir-faire exceptionnel, qui traverse les époques tout en restant pertinente. Elle me rappelle aussi pourquoi j'ai choisi ce métier : créer des pièces qui ont une âme et qui racontent une histoire.</p>
      
      <p><strong>EM : Pour conclure, quel message souhaiteriez-vous transmettre à nos lectrices ?</strong></p>
      
      <p>TD : J'aimerais les encourager à voir la mode non pas comme une dictature de ce qu'il faut porter ou ne pas porter, mais comme un formidable terrain de jeu et d'expression personnelle. Les vêtements ont ce pouvoir magique de nous transformer, de nous donner confiance, de nous permettre d'incarner différentes facettes de notre personnalité.</p>
      
      <p>Je les invite aussi à développer une relation plus consciente avec leurs vêtements : choisir des pièces qu'elles aimeront longtemps, en prendre soin, les réparer plutôt que les jeter. La mode la plus durable est celle que l'on garde et que l'on chérit.</p>
      
      <p>Enfin, je leur dirais de faire confiance à leur instinct. Au-delà des règles et des tendances, le style le plus authentique et le plus beau est celui qui vient de l'intérieur, celui qui vous ressemble vraiment.</p>
    `,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
    author: "Thomas Durand",
    authorImage: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop",
    authorBio: "Styliste en chef chez Élégance depuis 2020. Diplômé de l'École de la Chambre Syndicale de la Couture Parisienne, il a travaillé pour plusieurs maisons de haute couture avant de rejoindre notre équipe.",
    date: "12 janvier 2025",
    category: "Interview",
    tags: ["Styliste", "Création", "Coulisses", "Interview"],
    featured: false,
    readTime: "12 min",
    relatedPosts: ["tendances-printemps-2025", "mode-ethique-durable", "histoire-mode-feminine"]
  },
  {
    id: "capsule-wardrobe-printemps",
    title: "Créer une garde-robe capsule pour le printemps",
    excerpt: "Comment constituer une garde-robe minimaliste mais polyvalente avec seulement 15 pièces essentielles pour la saison printanière.",
    content: `
      <p>À l'approche du printemps, l'envie de renouveau se fait sentir, y compris dans notre garde-robe. Mais plutôt que de céder à la tentation d'achats impulsifs, pourquoi ne pas adopter l'approche de la garde-robe capsule ? Ce concept minimaliste consiste à sélectionner un nombre limité de pièces intemporelles et polyvalentes qui se combinent parfaitement entre elles. Dans cet article, nous vous proposons de créer une garde-robe capsule de 15 pièces essentielles pour le printemps, à la fois élégante, pratique et adaptée à toutes les occasions.</p>
      
      <h2>Qu'est-ce qu'une garde-robe capsule ?</h2>
      
      <p>Une garde-robe capsule est un ensemble restreint de vêtements soigneusement choisis pour leur polyvalence, leur qualité et leur intemporalité. L'objectif est de posséder moins de vêtements mais de meilleure qualité, qui peuvent être combinés de multiples façons pour créer de nombreuses tenues différentes.</p>
      
      <p>Cette approche présente de nombreux avantages : elle simplifie vos choix quotidiens, réduit votre impact environnemental, vous fait économiser de l'argent sur le long terme et vous encourage à développer un style personnel cohérent plutôt que de suivre chaque tendance éphémère.</p>
      
      <h2>Les principes de base d'une garde-robe capsule réussie</h2>
      
      <p>Avant de détailler les 15 pièces essentielles, voici quelques principes à garder à l'esprit pour créer une garde-robe capsule efficace :</p>
      
      <ul>
        <li><strong>Choisissez une palette de couleurs cohérente</strong> : Optez pour une base de couleurs neutres (blanc, beige, marine, gris) complétée par 1 ou 2 couleurs d'accent qui vous mettent en valeur et reflètent la saison.</li>
        <li><strong>Privilégiez la qualité à la quantité</strong> : Investissez dans des pièces bien coupées et fabriquées dans des matières durables qui vieilliront bien.</li>
        <li><strong>Pensez polyvalence</strong> : Chaque pièce doit pouvoir être associée à au moins trois autres éléments de votre garde-robe.</li>
        <li><strong>Adaptez à votre style de vie</strong> : Votre garde-robe doit refléter vos activités quotidiennes. Si vous travaillez dans un environnement formel, incluez plus de pièces élégantes ; si votre style de vie est décontracté, adaptez en conséquence.</li>
        <li><strong>Restez fidèle à votre style personnel</strong> : Une garde-robe capsule n'est pas un uniforme standard mais une expression concentrée de votre style unique.</li>
      </ul>
      
      <h2>Les 15 pièces essentielles pour le printemps</h2>
      
      <h3>Les hauts (5 pièces)</h3>
      
      <p><strong>1. La chemise blanche classique</strong></p>
      
      <p>Pièce intemporelle par excellence, la chemise blanche se porte aussi bien avec un jean décontracté qu'avec un pantalon habillé. Choisissez une coupe qui flatte votre silhouette et un tissu de qualité qui ne deviendra pas transparent. Pour le printemps, le coton léger ou le lin sont parfaits.</p>
      
      <p><strong>2. Le t-shirt blanc de qualité</strong></p>
      
      <p>Base essentielle de nombreuses tenues, investissez dans un t-shirt blanc en coton épais qui conservera sa forme et sa blancheur. Une coupe légèrement ajustée sera plus polyvalente qu'un modèle très ample ou très moulant.</p>
      
      <p><strong>3. Le pull fin en cachemire ou coton</strong></p>
      
      <p>Pour les journées fraîches du début du printemps, un pull fin dans une couleur neutre (beige, gris clair ou bleu marine) sera votre allié. Choisissez une matière naturelle comme le cachemire léger ou le coton qui respire bien et s'adapte aux variations de température.</p>
      
      <p><strong>4. Le chemisier imprimé</strong></p>
      
      <p>Pour apporter une touche de fantaisie à votre garde-robe, incluez un chemisier avec un imprimé intemporel (petits pois, rayures fines ou motif floral discret) dans des tons qui s'harmonisent avec le reste de votre palette.</p>
      
      <p><strong>5. Le cardigan léger</strong></p>
      
      <p>Parfait pour les superpositions, un cardigan léger dans une couleur neutre ou votre couleur d'accent principale vous permettra de transformer vos tenues et de vous adapter aux variations de température typiques du printemps.</p>
      
      <h3>Les bas (4 pièces)</h3>
      
      <p><strong>6. Le jean droit bleu foncé</strong></p>
      
      <p>Un jean bien coupé dans un bleu foncé classique est l'une des pièces les plus polyvalentes de votre garde-robe. Évitez les effets délavés ou déchirés trop marqués qui limiteraient sa versatilité. Une coupe droite ou légèrement fuselée conviendra à la plupart des morphologies et des occasions.</p>
      
      <p><strong>7. Le pantalon habillé</strong></p>
      
      <p>Choisissez un pantalon élégant dans une couleur neutre (noir, marine ou beige) avec une coupe qui vous met en valeur. Pour le printemps, optez pour des matières légères comme le coton, le lin ou un mélange avec un peu d'élasthanne pour le confort.</p>
      
      <p><strong>8. La jupe midi</strong></p>
      
      <p>Une jupe longueur midi dans une coupe A-line ou droite sera flatteuse pour toutes les morphologies. Choisissez une couleur neutre ou votre couleur d'accent pour plus de polyvalence. Pour le printemps, les matières fluides comme la viscose ou le tencel sont idéales.</p>
      
      <p><strong>9. La robe polyvalente</strong></p>
      
      <p>Une robe simple dans une coupe qui vous avantage peut se porter seule les jours chauds ou se superposer avec d'autres pièces. Optez pour une couleur unie ou un imprimé subtil qui s'accorde avec votre palette. Une robe chemise ou une robe droite mi-longue sont des options particulièrement versatiles.</p>
      
      <h3>Les vêtements d'extérieur (2 pièces)</h3>
      
      <p><strong>10. Le trench coat classique</strong></p>
      
      <p>Emblématique du printemps, le trench coat est à la fois élégant et pratique pour se protéger des averses. Le beige traditionnel est un choix sûr, mais le marine ou le vert olive peuvent être des alternatives intéressantes qui se marient bien avec de nombreuses tenues.</p>
      
      <p><strong>11. La veste légère</strong></p>
      
      <p>Complétez avec une veste plus décontractée pour les jours sans pluie. Selon votre style, il peut s'agir d'une veste en jean, d'un blazer structuré ou d'une veste style utility. Choisissez une pièce qui contraste avec votre trench pour plus de polyvalence.</p>
      
      <h3>Les chaussures (2 pièces)</h3>
      
      <p><strong>12. Les baskets blanches</strong></p>
      
      <p>Des baskets blanches propres et minimalistes se marient avec presque tout, des jeans aux robes. Investissez dans une paire de qualité en cuir véritable ou en alternatives durables qui se nettoie facilement et conservera son aspect impeccable.</p>
      
      <p><strong>13. Les ballerines ou mocassins</strong></p>
      
      <p>Pour une option plus habillée mais toujours confortable, incluez une paire de chaussures plates élégantes dans une couleur neutre ou votre couleur d'accent. Les ballerines, les mocassins ou les mules sont parfaits pour le printemps et apportent une touche de sophistication à vos tenues.</p>
      
      <h3>Les accessoires (2 pièces)</h3>
      
      <p><strong>14. L'écharpe légère</strong></p>
      
      <p>Une écharpe en soie ou en coton fin peut transformer instantanément une tenue basique. Choisissez un modèle avec un imprimé ou une couleur qui complète votre palette et qui peut également servir d'accessoire pour vos cheveux ou votre sac.</p>
      
      <p><strong>15. Le sac polyvalent</strong></p>
      
      <p>Un sac de taille moyenne dans une couleur neutre vous accompagnera dans toutes vos activités. Privilégiez un modèle structuré en cuir de qualité ou en matière durable qui se porte à l'épaule ou en bandoulière pour plus de polyvalence.</p>
      
      <h2>Comment combiner ces pièces</h2>
      
      <p>L'avantage d'une garde-robe capsule bien pensée est la multitude de combinaisons possibles. Voici quelques exemples de tenues que vous pourrez créer avec ces 15 pièces essentielles :</p>
      
      <ul>
        <li><strong>Pour une journée au bureau</strong> : Chemise blanche + pantalon habillé + ballerines + cardigan</li>
        <li><strong>Pour un week-end décontracté</strong> : T-shirt blanc + jean + baskets + veste légère</li>
        <li><strong>Pour une sortie entre amis</strong> : Chemisier imprimé + jupe midi + baskets blanches + écharpe comme accessoire</li>
        <li><strong>Pour une occasion spéciale</strong> : Robe + ballerines + trench coat + écharpe élégamment nouée</li>
        <li><strong>Pour une journée variable</strong> : T-shirt + jean + pull fin (à retirer si la température monte) + baskets</li>
      </ul>
      
      <h2>Personnaliser votre garde-robe capsule</h2>
      
      <p>Cette liste de 15 pièces est une base que vous devez adapter à votre style personnel, votre morphologie et votre mode de vie. N'hésitez pas à remplacer certains éléments par d'autres qui vous correspondent mieux :</p>
      
      <ul>
        <li>Si vous ne portez jamais de jupes, remplacez la jupe midi par un second pantalon dans une coupe ou une couleur différente.</li>
        <li>Si votre style est plus bohème, optez pour une robe longue fluide plutôt qu'une robe structurée.</li>
        <li>Si vous vivez dans une région particulièrement pluvieuse, privilégiez une veste imperméable plutôt qu'une veste légère classique.</li>
        <li>Si vous portez rarement des chaussures plates, remplacez les ballerines par des bottines à petit talon ou des sandales selon vos préférences.</li>
      </ul>
      
      <h2>Entretenir votre garde-robe capsule</h2>
      
      <p>Puisque votre garde-robe contient moins de pièces, chacune d'entre elles sera portée plus souvent. Il est donc essentiel d'en prendre soin pour qu'elles restent en bon état le plus longtemps possible :</p>
      
      <ul>
        <li>Suivez scrupuleusement les instructions d'entretien de chaque vêtement.</li>
        <li>Investissez dans des cintres de qualité qui préserveront la forme de vos vêtements.</li>
        <li>Laissez reposer vos vêtements entre deux ports pour qu'ils retrouvent leur forme.</li>
        <li>Traitez les taches immédiatement plutôt que d'attendre le prochain lavage.</li>
        <li>Réparez les petits accrocs ou boutons manquants rapidement avant qu'ils ne s'aggravent.</li>
      </ul>
      
      <h2>Conclusion : moins mais mieux</h2>
      
      <p>Créer une garde-robe capsule pour le printemps n'est pas seulement un moyen de simplifier votre quotidien, c'est aussi une démarche plus consciente et durable. En investissant dans moins de pièces mais de meilleure qualité, vous réduisez votre impact environnemental tout en affinant votre style personnel.</p>
      
      <p>Rappelez-vous que l'objectif n'est pas de vous limiter arbitrairement, mais de vous libérer du superflu pour ne garder que l'essentiel - des vêtements que vous aimez vraiment porter et qui vous font vous sentir bien. Avec ces 15 pièces soigneusement sélectionnées, vous serez prête à accueillir le printemps avec élégance et sérénité, sans vous poser chaque matin la sempiternelle question : "Qu'est-ce que je vais bien pouvoir mettre aujourd'hui ?"</p>
    `,
    image: "https://images.unsplash.com/photo-1560243563-062bfc001d68?q=80&w=1970&auto=format&fit=crop",
    author: "Sophie Martin",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    authorBio: "Rédactrice mode et styliste avec plus de 10 ans d'expérience dans l'industrie de la mode. Passionnée par les tendances émergentes et l'expression personnelle à travers le style.",
    date: "5 janvier 2025",
    category: "Conseils",
    tags: ["Garde-robe capsule", "Minimalisme", "Printemps", "Essentiels"],
    featured: false,
    readTime: "10 min",
    relatedPosts: ["tendances-printemps-2025", "accessoires-indispensables", "entretien-vetements-qualite"]
  },
  {
    id: "histoire-mode-feminine",
    title: "L'évolution de la mode féminine à travers les décennies",
    excerpt: "Un voyage fascinant à travers l'histoire de la mode féminine, des années 1920 à aujourd'hui, et comment les tendances passées influencent toujours notre style.",
    content: `
      <p>La mode est bien plus qu'un simple assemblage de tissus et de couleurs ; c'est un miroir de la société, reflétant les évolutions politiques, économiques, culturelles et sociales de chaque époque. À travers ce voyage dans le temps, nous explorerons comment la mode féminine s'est transformée au fil des décennies, depuis les années folles jusqu'à nos jours, et comment ces influences historiques continuent de façonner les tendances contemporaines.</p>
      
      <h2>Les années 1920 : La libération du corps féminin</h2>
      
      <p>Au sortir de la Première Guerre mondiale, les femmes, qui avaient pris une place importante dans la société pendant le conflit, refusent de retourner aux contraintes d'avant-guerre. Cette émancipation se traduit dans la mode par l'abandon du corset et l'apparition de silhouettes droites qui dissimulent les formes naturelles.</p>
      
      <p>La "garçonne", avec ses cheveux courts, ses robes droites tombant juste sous le genou et sa poitrine aplatie, incarne cette nouvelle femme libérée. Les créations de Coco Chanel, avec leur élégance décontractée et leur confort révolutionnaire, symbolisent parfaitement cette ère. Les accessoires comme les longs colliers de perles, les bandeaux ornés de plumes et les chaussures Mary Jane complètent ce look emblématique.</p>
      
      <p>L'influence des années 20 se retrouve régulièrement dans la mode contemporaine, notamment à travers les robes à franges, les détails Art Déco et l'esthétique glamour des soirées gatsby.</p>
      
      <h2>Les années 1930 : Le retour à l'élégance</h2>
      
      <p>La crise économique de 1929 marque un tournant dans la mode. L'exubérance des années folles laisse place à une élégance plus sobre et raffinée. La silhouette s'allonge et les formes féminines sont de nouveau mises en valeur, avec des robes qui épousent la taille et s'évasent légèrement vers le bas.</p>
      
      <p>Le biais, technique de coupe qui permet au tissu de mouler subtilement le corps, devient la signature de cette décennie. Les actrices hollywoodiennes comme Greta Garbo et Marlene Dietrich influencent considérablement la mode avec leur glamour sophistiqué et parfois androgyne.</p>
      
      <p>De cette époque, nous avons hérité le goût pour les robes longues fluides, les coupes impeccables et cette forme d'élégance discrète qui reste une référence intemporelle.</p>
      
      <h2>Les années 1940 : La mode en temps de guerre</h2>
      
      <p>La Seconde Guerre mondiale impose des restrictions qui transforment radicalement la mode. Le rationnement des tissus conduit à des silhouettes plus étroites et plus courtes. Les épaules sont structurées et anguleuses, créant une silhouette en triangle inversé qui symbolise la force et la résilience.</p>
      
      <p>L'esprit pratique domine : les femmes, qui remplacent les hommes dans les usines, adoptent des vêtements fonctionnels comme les pantalons et les combinaisons. Les accessoires deviennent cruciaux pour varier les tenues avec peu de moyens : foulards, chapeaux et bijoux fantaisie permettent de personnaliser un vestiaire limité.</p>
      
      <p>Cette période nous a légué le tailleur structuré, les imprimés à pois et rayures, ainsi qu'une certaine idée de la mode ingénieuse et adaptable qui résonne particulièrement à notre époque de consommation plus consciente.</p>
      
      <h2>Les années 1950 : Le New Look et la féminité exacerbée</h2>
      
      <p>Après les privations de la guerre, Christian Dior révolutionne la mode en 1947 avec son "New Look" : taille de guêpe, jupes amples et épaules douces créent une silhouette ultra-féminine qui célèbre l'abondance retrouvée. Cette esthétique, qui nécessite des mètres de tissu et des sous-vêtements structurants, symbolise le retour à une certaine idée de la féminité traditionnelle.</p>
      
      <p>Parallèlement, la culture adolescente émerge avec ses codes vestimentaires propres : jeans, t-shirts et blousons en cuir pour les rebelles inspirés par James Dean et Marlon Brando. Les femmes adoptent aussi le style pin-up avec ses jupes crayon, ses chemisiers ajustés et ses imprimés joyeux.</p>
      
      <p>L'héritage des années 50 est immense : robes de cocktail, jupes midi, imprimés à pois, cardigans et ballerines font toujours partie de notre garde-robe, régulièrement revisités par les créateurs contemporains.</p>
      
      <h2>Les années 1960 : La révolution jeune</h2>
      
      <p>Les années 60 marquent une rupture radicale avec les conventions. La jeunesse s'affirme comme force culturelle et impose son style. Mary Quant révolutionne la mode avec la mini-jupe, symbole de libération et de provocation. La silhouette devient géométrique, avec des formes A-line et des imprimés graphiques inspirés de l'art optique.</p>
      
      <p>Londres devient l'épicentre de la mode avec Carnaby Street et le style mod. Les bottes go-go, les collants colorés, les robes trapèze et les couleurs vives caractérisent cette période d'expérimentation joyeuse. À la fin de la décennie, le mouvement hippie introduit une esthétique plus naturelle et ethnique.</p>
      
      <p>L'influence des sixties reste prépondérante dans la mode contemporaine : mini-jupes, robes trapèze, imprimés psychédéliques et bottes montantes reviennent régulièrement sur les podiums et dans les rues.</p>
      
      <h2>Les années 1970 : Entre disco et bohème</h2>
      
      <p>Les années 70 sont marquées par une dualité stylistique. D'un côté, l'esthétique disco avec ses paillettes, ses matières synthétiques brillantes et ses plateformes vertigineuses. De l'autre, le style bohème inspiré du mouvement hippie, avec ses longues robes fluides, ses imprimés ethniques et ses accessoires artisanaux.</p>
      
      <p>Le pantalon pattes d'éléphant devient emblématique de cette décennie, porté aussi bien par les hommes que par les femmes. Les combinaisons, les chemises à col pelle à tarte, les gilets frangés et les chapeaux à larges bords complètent cette garde-robe éclectique.</p>
      
      <p>Cette décennie nous a légué un goût pour le mélange des genres, les influences ethniques et une certaine exubérance qui continue d'inspirer les créateurs, comme on le voit avec les récents retours du velours côtelé, des imprimés psychédéliques et des silhouettes seventies.</p>
      
      <h2>Les années 1980 : L'excès et le power dressing</h2>
      
      <p>Les années 80 sont celles de tous les excès : épaulettes surdimensionnées, couleurs fluo, accessoires imposants et coiffures volumineuses. Cette décennie voit l'émergence du "power dressing", incarné par le tailleur-pantalon structuré qui permet aux femmes d'affirmer leur autorité dans le monde professionnel.</p>
      
      <p>L'influence du sport et de la danse transforme également la mode : leggings, justaucorps, jambières et sweats oversize inspirés par le film Flashdance et la culture aérobic envahissent le quotidien. Les créateurs comme Jean-Paul Gaultier, Thierry Mugler et Claude Montana proposent des silhouettes architecturales et théâtrales.</p>
      
      <p>L'héritage des eighties se manifeste régulièrement dans la mode contemporaine à travers les épaulettes, les couleurs vives, les accessoires statement et une certaine audace dans les volumes et les associations.</p>
      
      <h2>Les années 1990 : Minimalisme et grunge</h2>
      
      <p>En réaction aux excès des années 80, les années 90 voient l'émergence du minimalisme porté par des créateurs comme Calvin Klein, Jil Sander et Helmut Lang. Les lignes épurées, les couleurs neutres et les coupes précises définissent cette esthétique sophistiquée.</p>
      
      <p>Parallèlement, la culture grunge influence profondément la mode avec son esthétique décontractée et délibérément négligée : chemises à carreaux, jeans déchirés, Dr. Martens et robes à fleurs portées avec des boots militaires. Les supermodels comme Kate Moss incarnent cette beauté naturelle et imparfaite qui contraste avec le glamour des années précédentes.</p>
      
      <p>Les années 90 nous ont aussi légué le style streetwear avec ses vêtements amples inspirés du hip-hop, ses sneakers et ses marques emblématiques qui continuent d'influencer fortement la mode actuelle.</p>
      
      <h2>Les années 2000 : Éclectisme et célébrités</h2>
      
      <p>Les années 2000 sont marquées par un certain éclectisme stylistique et l'influence croissante des célébrités sur la mode. Le jean taille basse, les tops courts exposant le ventre, les survêtements en velours et les accessoires bling-bling caractérisent cette période souvent qualifiée de "Y2K".</p>
      
      <p>C'est aussi l'ère du it-bag et des pièces de créateurs rendues accessibles par les collaborations avec la grande distribution. Les styles se mélangent, s'inspirant librement des décennies précédentes et des influences mondiales, facilitées par l'essor d'internet.</p>
      
      <p>Cette période, longtemps moquée pour certains de ses excès, connaît aujourd'hui un retour en force auprès de la génération Z, fascinée par cette esthétique du début du millénaire qu'elle redécouvre et réinterprète.</p>
      
      <h2>Les années 2010 à aujourd'hui : Durabilité et inclusivité</h2>
      
      <p>La dernière décennie a vu émerger des préoccupations majeures qui transforment l'industrie de la mode : durabilité, éthique et inclusivité. Les consommateurs, plus conscients de l'impact environnemental et social de leurs achats, privilégient des marques responsables et des pièces intemporelles.</p>
      
      <p>Le style athleisure, mêlant vêtements de sport et pièces du quotidien, s'est imposé comme une tendance majeure, reflétant notre quête de confort et de polyvalence. Les réseaux sociaux, particulièrement Instagram et plus récemment TikTok, ont démocratisé la mode et permis l'émergence de micro-tendances à un rythme accéléré.</p>
      
      <p>L'inclusivité est devenue une exigence, poussant l'industrie à représenter davantage de morphologies, d'âges et d'origines ethniques, tant dans ses créations que dans ses communications.</p>
      
      <h2>L'influence cyclique de la mode</h2>
      
      <p>En observant ce panorama historique, on constate que la mode fonctionne par cycles. Les tendances reviennent, réinterprétées à la lumière du présent. Ce phénomène s'est accéléré ces dernières années, avec des retours simultanés de différentes époques : les années 70 côtoient les années 90 et 2000 dans un joyeux mélange postmoderne.</p>
      
      <p>Cette cyclicité n'est pas un simple phénomène commercial, mais reflète notre rapport complexe au temps et à l'histoire. La nostalgie joue un rôle important, particulièrement en périodes d'incertitude où le passé offre un refuge rassurant.</p>
      
      <p>Comprendre l'histoire de la mode permet non seulement d'apprécier les références qui nourrissent les créations contemporaines, mais aussi de développer un style personnel plus conscient et intemporel, en s'appropriant les éléments du passé qui résonnent avec notre sensibilité actuelle.</p>
      
      <h2>Conclusion : La mode comme continuum</h2>
      
      <p>L'histoire de la mode féminine n'est pas une succession de tendances isolées, mais un continuum où chaque époque dialogue avec les précédentes et influence les suivantes. Les vêtements que nous portons aujourd'hui portent en eux les traces de cette riche histoire : la libération des années 20, l'élégance des années 30, la débrouillardise des années 40, la féminité des années 50, l'audace des années 60, l'éclectisme des années 70, l'exubérance des années 80, le minimalisme des années 90 et l'expérimentation des années 2000.</p>
      
      <p>En tant que consommatrices averties, nous pouvons puiser dans ce patrimoine stylistique pour créer notre propre langage vestimentaire, en choisissant consciemment les influences qui nous parlent et en les adaptant à notre époque et à notre personnalité.</p>
      
      <p>Car au-delà des tendances passagères, la véritable élégance réside dans cette capacité à transcender les époques pour exprimer authentiquement qui nous sommes, tout en rendant hommage à celles qui ont pavé le chemin de notre liberté vestimentaire.</p>
    `,
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop",
    author: "Camille Dubois",
    authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
    authorBio: "Historienne de la mode et professeure à l'Institut Français de la Mode. Auteure de plusieurs ouvrages sur l'évolution des tendances et l'impact sociologique de la mode.",
    date: "28 décembre 2024",
    category: "Histoire",
    tags: ["Histoire", "Évolution", "Tendances", "Décennies"],
    featured: false,
    readTime: "15 min",
    relatedPosts: ["tendances-printemps-2025", "mode-ethique-durable", "interview-styliste"]
  }
];

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const [copied, setCopied] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Trouver l'article correspondant à l'ID
  const post = blogPosts.find(post => post.id === params.id);
  
  // Articles liés
  const relatedPosts = post?.relatedPosts 
    ? blogPosts.filter(p => post.relatedPosts.includes(p.id)).slice(0, 3) 
    : [];

  // Trouver les articles précédent et suivant
  const currentIndex = blogPosts.findIndex(p => p.id === params.id);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  // Si l'article n'existe pas
  if (!post) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold mb-4">Article introuvable</h1>
            <p className="text-muted-foreground mb-8">
              L'article que vous recherchez n'existe pas ou a été déplacé.
            </p>
            <Link href="/blog">
              <Button>Retour aux articles</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      toast({
        title: "Lien copié !",
        description: "Le lien de l'article a été copié dans votre presse-papiers.",
      });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">
            Accueil
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link href="/blog" className="hover:text-foreground transition-colors">
            Blog
          </Link>
          <Ch evronRight className="h-4 w-4 mx-2" />
          <span className="text-foreground">{post.title}</span>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Article Header */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <Badge className="bg-primary text-primary-foreground">
                  {post.category}
                </Badge>
                <span className="mx-2 text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {post.date}
                </span>
                <span className="mx-2 text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">
                  {post.readTime} de lecture
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
              <p className="text-xl text-muted-foreground mb-6">
                {post.excerpt}
              </p>
            </div>

            {/* Featured Image */}
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-8">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none mb-12">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map(tag => (
                <Link key={tag} href={`/blog?tag=${tag}`}>
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>

            {/* Share */}
            <div className="flex items-center space-x-4 mb-12">
              <span className="font-medium">Partager :</span>
              <Button variant="outline" size="icon" className="rounded-full" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}>
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full" onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`, '_blank')}>
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full" onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`, '_blank')}>
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full" onClick={copyToClipboard}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>

            {/* Author */}
            <div className="bg-muted/30 rounded-lg p-6 mb-12">
              <div className="flex items-start sm:items-center flex-col sm:flex-row gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={post.authorImage} alt={post.author} />
                  <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg mb-1">À propos de {post.author}</h3>
                  <p className="text-muted-foreground mb-4">{post.authorBio}</p>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Voir tous ses articles
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Contacter
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation between posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              {prevPost && (
                <Link href={`/blog/${prevPost.id}`} className="group">
                  <div className="border rounded-lg p-4 h-full transition-colors hover:bg-muted/30">
                    <div className="flex items-center text-primary mb-2">
                      <ArrowLeft className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1" />
                      <span className="text-sm font-medium">Article précédent</span>
                    </div>
                    <h4 className="font-medium line-clamp-2">{prevPost.title}</h4>
                  </div>
                </Link>
              )}
              
              {nextPost && (
                <Link href={`/blog/${nextPost.id}`} className="group">
                  <div className="border rounded-lg p-4 h-full transition-colors hover:bg-muted/30">
                    <div className="flex items-center justify-end text-primary mb-2">
                      <span className="text-sm font-medium">Article suivant</span>
                      <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                    <h4 className="font-medium text-right line-clamp-2">{nextPost.title}</h4>
                  </div>
                </Link>
              )}
            </div>

            {/* Comments Section Placeholder */}
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-6">Commentaires (0)</h3>
              <div className="mb-6">
                <textarea 
                  className="w-full border rounded-md p-3 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Partagez votre avis sur cet article..."
                ></textarea>
              </div>
              <Button>Publier un commentaire</Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Table of Contents */}
              <div className="bg-background rounded-lg border p-6">
                <h3 className="font-semibold text-lg mb-4">Dans cet article</h3>
                <ul className="space-y-2 text-muted-foreground">
                  {post.content.match(/<h2>(.*?)<\/h2>/g)?.map((match, index) => {
                    const title = match.replace(/<h2>|<\/h2>/g, '');
                    const anchor = title.toLowerCase().replace(/\s+/g, '-');
                    return (
                      <li key={index} className="hover:text-primary transition-colors">
                        <a href={`#${anchor}`} className="block py-1">
                          {title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Related Posts */}
              <div className="bg-background rounded-lg border p-6">
                <h3 className="font-semibold text-lg mb-4">Articles similaires</h3>
                <div className="space-y-4">
                  {relatedPosts.map((relatedPost) => (
                    <div key={relatedPost.id} className="flex gap-3">
                      <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <Link href={`/blog/${relatedPost.id}`} className="font-medium hover:text-primary transition-colors line-clamp-2 text-sm">
                          {relatedPost.title}
                        </Link>
                        <p className="text-xs text-muted-foreground mt-1">{relatedPost.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="bg-background rounded-lg border p-6">
                <h3 className="font-semibold text-lg mb-4">Catégories</h3>
                <div className="space-y-2">
                  {[...new Set(blogPosts.map(post => post.category))].map((category) => (
                    <Link
                      key={category}
                      href={`/blog?category=${category}`}
                      className="block w-full text-left px-3 py-2 rounded-md transition-colors hover:bg-muted"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-background rounded-lg border p-6">
                <h3 className="font-semibold text-lg mb-4">Tags populaires</h3>
                <div className="flex flex-wrap gap-2">
                  {[...new Set(blogPosts.flatMap(post => post.tags))].map((tag) => (
                    <Link key={tag} href={`/blog?tag=${tag}`}>
                      <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                        {tag}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-primary text-primary-foreground rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">Restez informée</h3>
                <p className="text-primary-foreground/80 mb-4 text-sm">
                  Inscrivez-vous à notre newsletter pour recevoir nos derniers articles et conseils mode.
                </p>
                <div className="space-y-2">
                  <Input 
                    type="email" 
                    placeholder="Votre email" 
                    className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                  />
                  <Button variant="secondary" className="w-full">
                    S'inscrire
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}