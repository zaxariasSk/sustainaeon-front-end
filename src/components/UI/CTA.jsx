import NavElement from "../Header/NavElement";

const CTA = ({label, url}) => {
    return (
        <div className={"cta_container"}>
            <NavElement label={label} url={url}/>
        </div>
    )
}

export default CTA;