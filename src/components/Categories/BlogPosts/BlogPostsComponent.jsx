import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import styles from "./blog-post.module.css";
import BlogPostPreview from "./BlogPostPreview";
import useEmblaCarousel from "embla-carousel-react";
import "../../Home/embla.css";

const BlogPostsComponent = ({posts}) => {
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
        if (!isHomePage) return;

        const handleResize = () => setIsMobileView(window.innerWidth < 1250);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isHomePage]);

    const options = {
        containScroll: false,
        loop: true,
    };

    // Only create Embla if we are on the homepage and mobile
    const [emblaRef] = useEmblaCarousel(isHomePage && isMobileView ? options : false);

    if (!isHomePage) {
        return (
            <div className="outer-container">
                <h1 data-aos="fade-right">Blog</h1>
                <ul className={styles.blog_post_container}>
                    {posts.map((post, index) => (
                        <li
                            data-aos={index % 2 === 0 ? "fade-up" : "fade-down"}
                            key={post.id}
                        >
                            <BlogPostPreview
                                slug={post.slug}
                                title={post.title}
                                description={post.short_description}
                                author={post.author}
                                main_image={post.main_image}
                                date={post.publish_date}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <div className="outer-container">
            <h3 data-aos="fade-right">Blog</h3>

            {isMobileView ? (
                <div className={"embla embla__blog"}>
                    <div
                        className={"embla__viewport"}
                        ref={emblaRef}>
                        <div className={"embla__container"}>
                            {posts.map((post) => (
                                <div
                                    className={"embla__slide"}
                                    key={post.id}>

                                    <BlogPostPreview
                                        slug={post.slug}
                                        title={post.title}
                                        description={post.short_description}
                                        author={post.author}
                                        main_image={post.main_image}
                                        date={post.publish_date}
                                        emblaClass={"embla__slide"} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <ul className={styles.blog_post_container}>
                    {posts.map((post, index) => (
                        <li
                            data-aos={index % 2 === 0 ? "fade-up" : "fade-down"}
                            key={post.id}
                        >
                            <BlogPostPreview
                                slug={post.slug}
                                title={post.title}
                                description={post.short_description}
                                author={post.author}
                                main_image={post.main_image}
                                date={post.publish_date}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BlogPostsComponent;
