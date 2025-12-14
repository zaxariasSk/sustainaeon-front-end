import {Link} from "react-router-dom";

const serverUrl = process.env.REACT_APP_SERVER_URL;
const baseUrl = "https://www.sustainaeon.com";

const Footer = () => {
    return (
        <footer
            className="footer"
            itemScope
            itemType="https://schema.org/Organization"
        >
            <div className="outer-container">
                {/* Logo */}
                <div className="footer_logo">
                    <a
                        href={baseUrl}
                        itemProp="url">
                        <img
                            src={`${serverUrl}/uploads/sustainaeon_white_a3e7c2cb42.png`}
                            alt="Sustainaeon logo"
                            width="320"
                            height="209"
                            itemProp="logo"
                            loading="lazy"
                            decoding="async"
                        />
                    </a>
                </div>

                <div className="footer_info">
                    {/* Contact Info */}
                    <div
                        itemProp="contactPoint"
                        itemScope
                        itemType="https://schema.org/ContactPoint"
                    >
                        <h5>Contact</h5>
                        <p>
                            <a
                                href="mailto:info@sustainaeon.com"
                                itemProp="email"
                                aria-label="Send us an email"
                            >
                                info@sustainaeon.com
                            </a>
                        </p>
                        <p>
                            <a
                                href="tel:+447926959141"
                                itemProp="telephone">
                                +44 7926 959 141
                            </a>
                        </p>
                        <p>
                            <span itemProp="addressLocality">London</span>,{" "}
                            <span itemProp="addressCountry">United Kingdom</span>
                        </p>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h5>Follow Us</h5>
                        <ul className="socials">
                            <li>
                                <a
                                    href="https://linkedin.com/company/sustainaeon"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    itemProp="sameAs"
                                    aria-label="Visit Sustainaeon on LinkedIn"
                                >
                                    LinkedIn
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://twitter.com/sustainaeon"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    itemProp="sameAs"
                                    aria-label="Visit Sustainaeon on Twitter"
                                >
                                    Twitter
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h5>Legal</h5>
                        <ul>
                            <li>
                                <Link to="/privacy">Privacy Policy</Link>
                            </li>
                            <li>
                                <Link to="/terms">Terms & Conditions</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom note */}
            <div className="bottomNote">
                <p>
                    © {new Date().getFullYear()}{" "}
                    <span itemProp="name">Sustainaeon</span> — Carbon-Free Website 🌱
                </p>
            </div>
        </footer>
    );
};

export default Footer;