import { getSegments } from "@/lib/api";
import { Segments as SegmentsClient } from "./segments.client"

export default async function Segments() {
    const segments = await getSegments();

    return (
        <SegmentsClient segments={segments} />
    )
}