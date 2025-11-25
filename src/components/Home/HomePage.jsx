import {getBlogPostsPreview, getHomePageComponents, getServices} from "../../api/api";
import {useLoaderData} from "react-router-dom";
import SliderComponent from "./SliderComponent";
import styles from "./HomePage.module.css";
import WhoWeAreComponent from "./WhoWeAreComponent";
import WhyWorkWithUs from "./WhyWorkWithUs";
import ServicesComponent from "../Categories/Services/ServicesComponent";
import BlogPostsComponent from "../Categories/BlogPosts/BlogPostsComponent";
import PageSEO from "../Seo/PageSEO";

const HomePage = () => {
    const {
        slider,
        mission_statement,
        whoWeAre,
        why_work_with_us_header,
        why_work_with_us_outro,
        why_work_with_us,
        services,
        posts,
        seo
    } = useLoaderData();

    return (
        <>
            <PageSEO
                seo={seo}
                path="/" />

            <section>
                <SliderComponent slider={slider} />
            </section>

            <h1
                data-aos="fade-up"
                className={styles.mission_statement}>{mission_statement}</h1>

            <section
                data-aos="fade-up"
                className={styles.who_we_are_outer_container}>
                <WhoWeAreComponent data={whoWeAre} />
            </section>

            <section>
                <WhyWorkWithUs
                    introTxt={why_work_with_us_header}
                    outroTxt={why_work_with_us_outro}
                    data={why_work_with_us} />
            </section>

            {services && <section className={styles.services_outer_container}>
                <ServicesComponent services={services} />
            </section>}

            {posts && <section className={styles.blog_post_outer_container}>
                <BlogPostsComponent posts={posts} />
            </section>}
        </>
    );
}

export async function loader() {
    const controller = new AbortController();
    const signal = controller.signal;

    const {
        slider,
        mission_statement,
        whoWeAre,
        why_work_with_us_header,
        why_work_with_us_outro,
        why_work_with_us,
        seo,
    } = await getHomePageComponents({signal});

    const {services} = await getServices({signal});
    const {posts} = await getBlogPostsPreview({signal}, 6);

    return {
        slider,
        mission_statement,
        whoWeAre,
        why_work_with_us_header,
        why_work_with_us_outro,
        why_work_with_us,
        services,
        posts,
        seo,
    }
}

export default HomePage;