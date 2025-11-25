import {Link} from "react-router-dom";
import styles from "./HomePage.module.css";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const WhoWeAreComponent = ({data}) => {
    const {
        profile_picture,
        title,
        description,
        link_label,
        link_url
    } = data;

    const descriptionContent = description[0].children.map((el, index) =>
        el.bold ? (<strong key={index}>{el.text}</strong>) : el.text)

    return (
        <div className={`${styles.who_we_are_container} outer-container flex-container`}>
            <div className={styles.who_we_are_img}>
                <Link to={link_url}>
                    <img
                        src={serverUrl + profile_picture.url}
                        alt={"Dr Marianna Kornilaki"}
                        width={profile_picture.width}
                        height={profile_picture.height}
                        loading={"lazy"}
                        decoding={"async"} />
                </Link>
            </div>

            <div className={styles.who_we_are_txt}>
                <div>
                    <h2>{title}</h2>
                    <p>{descriptionContent}</p>
                    <Link
                        to={link_url}
                        className="learn-more">{link_label}</Link>
                </div>
            </div>
        </div>
    )
}

export default WhoWeAreComponent;