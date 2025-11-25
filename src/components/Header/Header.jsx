import { getHeader } from "../../api/api";
import {Link, useLoaderData, useLocation} from "react-router-dom";
import NavElement from "./NavElement";
import CTA from "../UI/CTA";
import { useEffect, useState } from "react";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const Header = () => {
    const header = useLoaderData();
    const {pathname} = useLocation();

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 100 || pathname !== "/");

        handleScroll(); // check on load
        window.addEventListener("load", handleScroll);
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("load", handleScroll);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Handle responsive breakpoint
    useEffect(() => {
        const checkScreenSize = () => {
            const mobile = window.innerWidth < 700;
            setIsMobileView(mobile);
            if (!mobile && isMobileMenuOpen) setIsMobileMenuOpen(false);
        };
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, [isMobileMenuOpen]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
        return () => (document.body.style.overflow = "unset");
    }, [isMobileMenuOpen]);

    const handleNavClick = () => {
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    };

    return (
        <header
            className={`header-container ${isScrolled ? "scrolled" : ""} ${isMobileMenuOpen ? "menu-open" : ""}`}
            itemScope
            itemType="https://schema.org/Organization"
            aria-label="Site header"
        >
            <div className="flex-container outer-container">
                {/* Logo with org microdata */}
                <Link
                    to="/"
                    end="true"
                    itemProp="url"
                    id="logo"
                    aria-label="Go to homepage"
                >
                    <img
                        src={serverUrl + header.logo.url}
                        alt={header.logo.alternativeText || "Sustainaeon logo"}
                        width={header.logo.width}
                        height={header.logo.height}
                        itemProp="logo"
                        loading="eager"
                        decoding="sync"
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav
                    className="desktop-nav"
                    role="navigation"
                    aria-label="Main Navigation"
                >
                    <ul className="flex-container nav-container">
                        {header.navigation_links.map((el) => (
                            <li
                                key={el.id}
                                itemProp="hasPart"
                                itemScope
                                itemType="https://schema.org/SiteNavigationElement"
                            >
                                <NavElement label={el.label} url={el.url} />
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Desktop CTA */}
                <div
                    className="cta-btn desktop-cta"
                    itemProp="potentialAction"
                    itemScope
                    itemType="https://schema.org/Action"
                >
                    <CTA
                        label={header.cta_button.text}
                        url={header.cta_button.url}
                        aria-label={`CTA: ${header.cta_button.text}`}
                    />
                </div>

                {/* Mobile Burger Button */}
                <button
                    className={`burger-menu ${isMobileMenuOpen ? "active" : ""}`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
                    aria-expanded={isMobileMenuOpen}
                    aria-controls="mobile-navigation"
                    aria-haspopup="true"
                >
                    <span className="burger-line" aria-hidden="true"></span>
                    <span className="burger-line" aria-hidden="true"></span>
                    <span className="burger-line" aria-hidden="true"></span>
                </button>

                {/* Mobile Nav Overlay */}
                <div
                    className={`mobile-nav-overlay ${isMobileMenuOpen ? "active" : ""}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-hidden={!isMobileMenuOpen}
                ></div>

                {/* Mobile Navigation */}
                <nav
                    id="mobile-navigation"
                    className={`mobile-nav ${isMobileMenuOpen ? "active" : ""}`}
                    role="navigation"
                    aria-label="Mobile Navigation"
                >
                    <ul className="mobile-nav-container">
                        {header.navigation_links.map((el) => (
                            <li
                                key={el.id}
                                itemProp="hasPart"
                                itemScope
                                itemType="https://schema.org/SiteNavigationElement"
                            >
                                <NavElement
                                    label={el.label}
                                    url={el.url}
                                    onClick={handleNavClick}
                                />
                            </li>
                        ))}
                    </ul>

                    <div
                        className="mobile-cta"
                        itemProp="potentialAction"
                        itemScope
                        itemType="https://schema.org/Action"
                    >
                        <CTA
                            label={header.cta_button.text}
                            url={header.cta_button.url}
                            onClick={handleNavClick}
                            aria-label={`CTA: ${header.cta_button.text}`}
                        />
                    </div>
                </nav>
            </div>
        </header>
    );
};

export const headerLoader = async () => {
    const controller = new AbortController();
    const res = await getHeader({ signal: controller.signal });
    return res.data;
};

export default Header;