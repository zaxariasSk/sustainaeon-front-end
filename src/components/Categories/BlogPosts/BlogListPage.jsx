import {useLoaderData} from "react-router-dom";
import styles from "../../Home/HomePage.module.css";
import BlogPostsComponent from "./BlogPostsComponent";
import {getBlogPostsPreview} from "../../../api/api";
import blogStyles from "../../Categories/BlogPosts/blog-post.module.css";

const BlogListPage = () => {
    const {posts} = useLoaderData();

    return (
        <div>
            <section className={`${styles.blog_post_outer_container} ${blogStyles.blog_innerpage}`}>
                <BlogPostsComponent posts={posts} />
            </section>
        </div>
    );
};

export default BlogListPage;

export async function loader() {
    const controller = new AbortController();
    const signal = controller.signal;

    return await getBlogPostsPreview({signal}, 12)
}