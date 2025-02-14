// app/components/HeaderServer.tsx
import { getSegments } from "@/lib/actions";
import HeaderClient from "@/app/components/header.client";

export default async function HeaderServer() {
    const segments = await getSegments();

    return (
        <HeaderClient segments={segments} />
    );
}