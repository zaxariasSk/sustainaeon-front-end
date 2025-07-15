const apiUrl = process.env.REACT_APP_API_URL;

export const getHeader = async ({signal}) => {
    const res = await fetch(`${apiUrl}/header?populate=*`, {signal});
    console.log(res)
    if (!res.ok) throw new Error('Failed to fetch header');
    return res.json();
};
