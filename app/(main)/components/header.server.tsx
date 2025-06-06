// app/components/HeaderServer.tsx
import { getSegments } from "@/lib/api";
import HeaderClient from "@/app/(main)/components/header.client";

export default async function HeaderServer() {
    const segments = await getSegments();

    return (
        <HeaderClient segments={segments} />
    );
}