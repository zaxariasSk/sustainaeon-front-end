import {Helmet} from "react-helmet-async";

const serverUrl = process.env.REACT_APP_SERVER_URL;
const siteUrl = "https://sustainaeon.com";

const PageSEO = ({
                     seo,
                     path = "/"
                 }) => {
    if (!seo) return null;

    const {
        metaTitle = "SustainAeon – Sustainability Consulting & Training",
        metaDescription = "SustainAeon helps businesses implement practical, measurable, and meaningful sustainability strategies.",
        keywords,
        metaImage,
        structuredData,
        canonicalURL,
        noIndex,
    } = seo;

    const imageUrl = metaImage?.url
        ? `${serverUrl}${metaImage.url}`
        : `${serverUrl}/default-og-image.jpg`;

    const canonical = canonicalURL || `${siteUrl.replace(/\/$/, "")}${path}`;

    // Default Organization JSON-LD if none provided
    const defaultStructuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "SustainAeon",
        url: siteUrl,
        logo: `${siteUrl}/logo.png`,
        founder: "Dr Marianna Kornilaki",
        foundingDate: "2025",
    };

    return (
        <Helmet>
            {/* Basic */}
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1" />
            <meta
                name="language"
                content="en" />
            <meta
                name="author"
                content="Dr Marianna Kornilaki" />
            <title>{metaTitle}</title>
            <meta
                name="description"
                content={metaDescription} />
            {keywords && <meta
                name="keywords"
                content={keywords} />}
            {noIndex && <meta
                name="robots"
                content="noindex, nofollow" />}
            <link
                rel="canonical"
                href={canonical} />

            {path === "/" &&
                <link
                    rel="preload"
                    as="image"
                    href="https://api.sustainaeon.com/uploads/slider1_5c13c992c4.jpg"
                    fetchPriority="high"
                    imageSrcSet="https://api.sustainaeon.com/uploads/slider1_5c13c992c4.jpg 1920w"
                    imageSizes="100vw" />
            }
            {/* Open Graph */}
            <meta
                property="og:type"
                content="website" />
            <meta
                property="og:locale"
                content="en_US" />
            <meta
                property="og:site_name"
                content="SustainAeon" />
            <meta
                property="og:url"
                content={`${siteUrl}${path}`} />
            <meta
                property="og:title"
                content={metaTitle} />
            <meta
                property="og:description"
                content={metaDescription} />
            <meta
                property="og:image"
                content={imageUrl} />
            {metaImage?.alternativeText && (
                <meta
                    property="og:image:alt"
                    content={metaImage.alternativeText} />
            )}

            {/* Twitter */}
            <meta
                name="twitter:card"
                content="summary_large_image" />
            <meta
                name="twitter:site"
                content="@Sustainaeon" />
            <meta
                name="twitter:creator"
                content="@Sustainaeon" />
            <meta
                name="twitter:title"
                content={metaTitle} />
            <meta
                name="twitter:description"
                content={metaDescription} />
            <meta
                name="twitter:image"
                content={imageUrl} />
            {metaImage?.alternativeText && (
                <meta
                    name="twitter:image:alt"
                    content={metaImage.alternativeText} />
            )}

            {/* Structured Data JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData || defaultStructuredData),
                }}
            />
        </Helmet>
    );
};

export default PageSEO;
