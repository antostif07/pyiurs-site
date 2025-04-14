import HeaderClient from "@/components/header.client";
import {getSegments} from "@/lib/api";

export default async function Header() {
    const segments = await getSegments()

    return (
        <HeaderClient  mainCategories={segments}/>
    )
}