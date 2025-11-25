import {getAboutPage} from "../../../api/aboutApi";
import {useLoaderData} from "react-router-dom";
import PageSEO from "../../Seo/PageSEO";
import ReactMarkdown from "react-markdown";
import "./about-page.css";

const AboutPage = () => {
    const {
        title,
        content,
        seo
    } = useLoaderData();

    return (
        <>
            <PageSEO
                seo={seo}
                path={"/about"} />
            <section
                itemScope
                itemType="https://schema.org/Organization"
                className="about-section outer-container"
            >
                <h1 itemProp="name">{title}</h1>

                <div
                    itemProp="description"
                    className="about-content service_content"
                >
                    <ReactMarkdown>{content}</ReactMarkdown>
                </div>
            </section>
        </>
    );
}

export default AboutPage;

export async function loader() {
    return await getAboutPage();
}