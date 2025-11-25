const apiUrl = process.env.REACT_APP_API_URL;

export async function getServiceBySlug(slug) {
    const res = await fetch(`${apiUrl}/services?filters[slug][$eq]=${slug}&pLevel=3`);
    const json = await res.json();
    if (!json.data || json.data.length === 0) return null;
    const s = json.data[0];

    return {
        slug: s.slug,
        title: s.title,
        shortDescription: s.shortDescription,
        content: s.fullDescription,
        mainImage: s.main_image,
        seo: s.seo,
    };
}
