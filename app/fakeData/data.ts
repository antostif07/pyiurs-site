import {Segment} from "@/app/types/types";

const getFakeSegments = () => {
    let segments: Array<Segment>;
    segments = [
        {
            documentId: "jfkndldl", id: 1, name: "Femme", slug: "femme", categories: [], createdAt: "2025-02-20",
        },
        {
            documentId: "kklmkk", id: 1, name: "Pyiurs-kids", slug: "kids", categories: [], createdAt: "2025-02-20",
        }
    ];

    return segments
}

export {getFakeSegments}