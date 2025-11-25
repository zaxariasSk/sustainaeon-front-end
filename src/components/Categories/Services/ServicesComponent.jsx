import Service from "./Service";
import "../Services/ServicesPage.css";
import styles from "../../Home/HomePage.module.css";


const ServicesComponent = ({services, isInnerPage}) => {
    const innerPageClass = isInnerPage ? "services_innerpage" : "";
    return (
        <div className={`outer-container ${innerPageClass}`}>
            {isInnerPage ? (
                <h1 data-aos="fade-right">Our Services</h1>
            ) : (
                <h3 data-aos="fade-right">Our Services</h3>
            )}
            <div>
                <ul className={styles.service_container}>
                    {services.map((service, index) => (
                        <li data-aos="zoom-in" data-aos-delay={index * 150} data-aos-offset={"100"}  className={styles.service} key={service.id}>
                            <Service
                                slug={service.slug}
                                title={service.title}
                                shortDescription={service.shortDescription}
                                icon={{
                                    image: service.icon.url,
                                    alternativeText: service.icon.alternativeText,
                                    height: service.icon.height,
                                    width: service.icon.width,
                                }}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ServicesComponent;