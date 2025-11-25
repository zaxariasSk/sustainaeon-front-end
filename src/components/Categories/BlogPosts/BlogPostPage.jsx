import {Navigate, useLoaderData, useLocation} from "react-router-dom";
import {getBlogPostBySlug} from "../../../api/blogPostApi";
import styles from "./blog-post.module.css";
import ReactMarkdown from "react-markdown";
import PageSEO from "../../Seo/PageSEO";
import {useEffect, useRef} from "react";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const BlogPostPage = () => {
    const {pathname} = useLocation();
    const post = useLoaderData();
    const galleryRef = useRef(null);

    useEffect(() => {
        if (galleryRef.current) {
            const lightbox = new SimpleLightbox(galleryRef.current.querySelectorAll("a"), {});
            return () => lightbox.destroy();
        }
    }, [post?.gallery]);

    if (!post) return <Navigate
        to="/blog"
        replace />;

    const formattedDate = post.date?.slice(0, 10);
    const localDate = post.date
        ? new Date(post.date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        : "";


    let galleryContent;
    if (post?.gallery) {
        console.log(post.gallery);
        galleryContent = (
            <>
                <h2 className={styles.galleryTitle}>Gallery</h2>
                <div
                    className={styles.gallery}
                    ref={galleryRef}>
                    {post.gallery.map(image => (
                        <a
                            key={image.id}
                            href={serverUrl + image.url} // full-size image
                            data-title={image.alternativeText || ""}
                        >
                            <img
                                src={serverUrl + image.formats.small.url} // small preview
                                alt={image.alternativeText}
                                width={image.formats.small.width}
                                height={image.formats.small.height}
                                loading="lazy"
                                decoding="async"
                            />
                        </a>
                    ))}
                </div>
            </>
        );
    }

    return (
        <>
            <PageSEO
                seo={post.seo[0]}
                path={pathname} />

            <article
                itemScope
                itemType="https://schema.org/BlogPosting"
                className={styles.articleContainer}
            >
                <header>
                    <h1 itemProp="headline">{post.title}</h1>

                    <div className={`flex-container ${styles.name_date_container}`}>
                        <address
                            className={styles.author}
                            itemProp="author"
                            itemScope
                            itemType="https://schema.org/Person"
                        >
                            <img
                                src={serverUrl + post.author.avatar.url}
                                alt={post.author.name}
                                width={post.author.avatar.width}
                                height={post.author.avatar.height}
                                loading="lazy"
                                decoding="async"
                            />
                            <span itemProp="name">by {post.author.name}</span>
                        </address>
                        <time
                            itemProp="datePublished"
                            dateTime={formattedDate}
                            aria-label={`Published on ${localDate}`}
                        >
                            {localDate}
                        </time>
                        <meta
                            itemProp="dateModified"
                            content={formattedDate} />
                    </div>
                </header>

                {post.mainImage && (
                    <img
                        src={serverUrl + post.mainImage}
                        alt={post.title} />
                )}

                <div
                    itemProp="description"
                    className={styles.blog_content}>
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>

                {galleryContent}
            </article>
        </>
    );
};

export default BlogPostPage;

export async function loader({params}) {
    const controller = new AbortController();
    const signal = controller.signal;

    return await getBlogPostBySlug({signal}, params.slug);
}
