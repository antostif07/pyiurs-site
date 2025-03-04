import BlogPost from "@/components/blog-post";
import {getArticles} from "@/lib/api";

export default async function BlogPostPage({params}: { params: Promise<{ slug: string }> }) {
    const {slug} = await params

    const articles = await getArticles({slug: slug})

    return <BlogPost post={articles[0]} />
}