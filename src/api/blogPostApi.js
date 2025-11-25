const apiUrl = process.env.REACT_APP_API_URL;

export async function getBlogPostBySlug({signal}, slug) {
    const res = await fetch(`${apiUrl}/blog-posts?filters[slug][$eq]=${slug}&pLevel=3`, {signal});
    const json = await res.json();
    if (!json.data || json.data.length === 0) return null;
    const post = json.data[0];

    return {
        slug: post.slug,
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        date: post.publish_date,
        mainImage: post.main_image?.formats.large.url || null,
        author: post.author,
        gallery: post.gallery?.length > 0 ? post.gallery : null,
        seo: post.seo
    };
}