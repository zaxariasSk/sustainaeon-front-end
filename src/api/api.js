const apiUrl = process.env.REACT_APP_API_URL;

export const getHeader = async ({signal}) => {
    const res = await fetch(`${apiUrl}/header?populate=*`, {signal});
    if (!res.ok) throw new Error('Failed to fetch header');
    let data = await res.json();
    return data;
};

export const getHomePageComponents = async ({signal}) => {
    const res = await fetch(`${apiUrl}/home?pLevel=3`, {signal});

    if (!res.ok) {
        throw new Error("Failed to fetch data.");
    }
    const {data} = await res.json();

    return {
        slider: data.slide,
        mission_statement: data.mission_statement,
        whoWeAre: data.who_we_are,
        why_work_with_us_header: data.why_work_with_us_header,
        why_work_with_us_outro: data.why_work_with_us_outro,
        why_work_with_us: data.why_work_with_us,
        seo: data.seo,
    };
}

export const getServices = async ({signal}) => {
    const res = await fetch(`${apiUrl}/services?pLevel=3`, {signal});

    if (!res.ok) {
        throw new Error("Failed to fetch data.");
    }
    const {data} = await res.json();

    return {
        services: data
    }
};

export const getBlogPostsPreview = async ({signal}, limit = 12) => {
    const res = await fetch(`${apiUrl}/blog-posts/preview?pagination[limit]=${limit}`);
    if (!res.ok) {
        throw new Error("Failed to fetch data.");
    }
    const {data} = await res.json();

    return {
        posts: data
    }
};

