import NavElement from "../Header/NavElement";
import styles from "./CTA.module.css";

const CTA = ({label, url}) => {
    return (
        <div className={styles.cta_container}>
            <NavElement label={label} url={url}/>
        </div>
    )
}

export default CTA;