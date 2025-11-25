import styles from "./HomePage.module.css";
import ReactMarkdown from 'react-markdown';

const serverUrl = process.env.REACT_APP_SERVER_URL;

const WhyWorkWithUs = ({
                           introTxt,
                           outroTxt,
                           data
                       }) => {
    return (
        <div className={`outer-container ${styles.why_us_outer_container}`}>
            <h2 data-aos="fade-right">
                {introTxt}
            </h2>
            <div>
                <ul className={`flex-container ${styles.why_us_container}`}>
                    {data.map((el, index) =>
                        <li data-aos={index % 2 === 0 ? "fade-up" : "fade-down" } key={el.id}>
                            <h3>{el.title}</h3>
                            <div className={styles.why_us_img}>
                                <div className={styles.image_bg}>
                                    <img
                                        src={serverUrl + el.icon.url}
                                        alt={el.icon.alternativeText}
                                        width={el.icon.width}
                                        height={el.icon.height}
                                        loading={"lazy"}
                                        decoding={"async"} />
                                </div>
                            </div>
                            <ReactMarkdown>{el.description}</ReactMarkdown>
                        </li>
                    )}
                </ul>
            </div>
            <p>{outroTxt}</p>
        </div>
    )
}

export default WhyWorkWithUs;