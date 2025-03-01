import {getSegments} from "@/lib/api";
import HeaderClient from "@/components/header.client";

export default async function Header() {
    const segments = await getSegments()

    return (
        <HeaderClient  mainCategories={segments}/>
    )
}