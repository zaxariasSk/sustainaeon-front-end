import {getHeader} from "../../api/headerApi";
import {Link, useLoaderData} from "react-router-dom";
import NavElement from "./NavElement";
import CTA from "../UI/CTA";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const Header = () => {
    const header = useLoaderData();

    return (
        <header className={"flex-container outer-container"}>
            <div>
                <Link
                    to={'/'}
                    end={"true"}>
                    <img
                        src={serverUrl + header.logo.url}
                        alt={header.logo.alternativeText}
                        width={header.logo.width}
                        height={header.logo.height} />
                </Link>
            </div>
            <nav>
                <ul className={"flex-container nav-container"}>
                    {header.navigation_links.map((el) => {
                        return (
                            <li key={el.id}>
                                <NavElement
                                    label={el.label}
                                    url={el.url} />
                            </li>
                        )
                    })}
                </ul>
            </nav>
            <CTA
                label={header.cta_button.text}
                url={header.cta_button.url} />
        </header>
    );
};

export const headerLoader = async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    const res = await getHeader({signal});
    return res.data;
};

export default Header;
