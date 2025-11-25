
const apiUrl = process.env.REACT_APP_API_URL;

export async function getAboutPage() {
    const res = await fetch(`${apiUrl}/about?pLevel=3`);

    if (!res.ok) throw new Error('Failed to fetch about');

    let {data} = await res.json();

    return {
        content: data.blocks[0].body,
        title: data.title,
        seo: data.seo[0]
    };
}