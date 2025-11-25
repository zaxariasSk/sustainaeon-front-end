import styles from "../../Home/HomePage.module.css";
import {Link} from "react-router-dom";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const Service = ({
                     slug,
                     title,
                     shortDescription,
                     icon
                 }) => {

    return (
        <Link to={"/services/" + slug}>
            <div className={styles.service_icon}>
                <img
                    src={serverUrl + icon.image}
                    alt={icon.alternativeText}
                    width={icon.width}
                    height={icon.height}
                    loading="lazy"
                    decoding={"async"} />
            </div>
            <h4>{title}</h4>
            <p>
                {shortDescription}
            </p>
        </Link>
    )
}

export default Service;