import {useLoaderData} from "react-router-dom";
import {getServices} from "../../../api/api";
import styles from "../../Home/HomePage.module.css";
import ServicesComponent from "./ServicesComponent";

const ServicesPage = () => {
    const {services} = useLoaderData();

    return (
        <>
            {services && <section className={styles.services_outer_container}>
                <ServicesComponent services={services} isInnerPage={true} />
            </section>}
        </>
    );
};

export default ServicesPage;


export async function loader() {
    const controller = new AbortController();
    const signal = controller.signal;

    return await getServices({signal});
}