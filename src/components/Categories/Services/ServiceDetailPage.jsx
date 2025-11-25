import {useLoaderData, Navigate, useLocation} from "react-router-dom";
import {getServiceBySlug} from "../../../api/servicesApi";
import ReactMarkdown from "react-markdown";
import PageSEO from "../../Seo/PageSEO";
import './ServicesPage.css';

const serverUrl = process.env.REACT_APP_SERVER_URL;

const ServiceDetailPage = () => {
    const {pathname} = useLocation();
    const service = useLoaderData();
    // Redirect if service doesn't exist
    if (!service) return <Navigate
        to="/services"
        replace />;

    return (
        <>
            <PageSEO
                seo={service.seo[0]}
                path={pathname} />

            <article
                itemScope
                itemType="https://schema.org/Service"
                className={"articleContainer"}
            >
                <header>
                    <h1 itemProp="name">{service.title}</h1>
                </header>

                {service.mainImage && <img
                    src={serverUrl + service.mainImage.formats.large.url}
                    alt={service.mainImage.alternativeText}
                    width={service.mainImage.formats.large.width}
                    height={service.mainImage.formats.large.height}
                    itemProp="image"/>}
                <div
                    itemProp="description"
                    className={"service_content"}>
                    <ReactMarkdown>{service.content}</ReactMarkdown>
                </div>

            </article>
        </>
    );
};

export default ServiceDetailPage;

export async function loader({params}) {
    return await getServiceBySlug(params.slug);
}