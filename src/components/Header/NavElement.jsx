import {Link} from "react-router-dom";

const NavElement = ({
                        label,
                        url
                    }) => {
    return (
        <Link to={url}>
            {label}
        </Link>
    )
}

export default NavElement;