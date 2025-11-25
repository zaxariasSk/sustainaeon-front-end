import {Link} from "react-router-dom";
import styles from "./blog-post.module.css";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const BlogPostPreview = ({
                             main_image,
                             date,
                             title,
                             description,
                             slug,
                             author,
                             emblaClass
                         }) => {
    const formattedDate = date?.slice(0, 10);
    const localDate = date
        ? new Date(date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        : "";

    return (
        <article
            itemScope
            itemType="https://schema.org/BlogPosting"
            className={`${styles.blog_post} ${emblaClass ? styles.embla__slide_el : ""}`}
        >
            <header>
                <Link
                    to={"/blog/" + slug}
                    itemProp="url">
                    <img
                        src={serverUrl + main_image.formats.small.url}
                        alt={main_image.alternativeText || title}
                        width={main_image.formats.small.width}
                        height={main_image.formats.small.height}
                        loading="lazy"
                        decoding="async"
                        itemProp="image"
                    />
                </Link>

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
            </header>

            <h4 itemProp="headline">
                <Link to={"blog/" + slug}>{title}</Link>
            </h4>

            <p
                className={styles.intro_desc}
                itemProp="description">{description}</p>

            <address
                className={styles.author}
                itemProp="author"
                itemScope
                itemType="https://schema.org/Person"
            >
                <img
                    src={serverUrl + author.avatar.url}
                    alt={author.name}
                    width={author.avatar.width}
                    height={author.avatar.height}
                    loading="lazy"
                    decoding="async"
                />
                <span itemProp="name">{author.name}</span>
            </address>

            <p className={styles.read_more}>
                <Link
                    to={"/blog/" + slug}
                    rel={"bookmark"}
                    aria-label={`Read more about ${title}`}>
                    Read more →
                </Link>
            </p>
        </article>
    );
};

export default BlogPostPreview;
