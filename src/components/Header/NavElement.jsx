import {Link} from "react-router-dom";

const NavElement = ({
                        label,
                        url,
                        onClick
                    }) => {
    return (
        <Link onClick={onClick} to={url}>
            {label}
        </Link>
    )
}

export default NavElement;