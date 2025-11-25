import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Fade from 'embla-carousel-fade'
import './embla.css';
import CTA from "../UI/CTA";
import Autoplay from "embla-carousel-autoplay";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const SliderComponent = ({slider}) => {
    const [emblaRef] = useEmblaCarousel({
        loop: true,
        duration: 30
    }, [Fade(),
        Autoplay({
            playOnInit: true,
            delay: 6500
        })
    ]);

    return (
        <div className="embla">
            <div
                className="embla__viewport"
                ref={emblaRef}>
                <div className="embla__container embla__home">
                    {slider.map((el, index) => {
                        const imgBase = el.files; // easier reference

                        const content = (
                            <div
                                className="embla__slide"
                                key={el.id}>
                                <img
                                    src={serverUrl + imgBase.url} // fallback large image
                                    srcSet={`
                                        ${serverUrl + imgBase.formats.small?.url} 500w,
                                        ${serverUrl + imgBase.formats.medium?.url} 750w,
                                        ${serverUrl + imgBase.formats.large?.url} 1000w,
                                        ${serverUrl + imgBase.url} 1920w
                                    `}
                                    sizes="(max-width: 500px) 500px, (max-width: 750px) 750px, (max-width: 1000px) 1000px, 1920px"
                                    alt={imgBase.alternativeText || ''}
                                    width={imgBase.width}
                                    height={imgBase.height}
                                    fetchPriority={index === 0 ? 'high' : 'auto'}
                                    loading={index > 0 ? 'lazy' : 'eager'}
                                    decoding={index > 0 ? 'async' : 'sync'}
                                />

                                {el.title && (
                                    <div className="sliderCaption">
                                        <h2>{el.title}</h2>
                                        <p>{el.caption}</p>
                                    </div>
                                )}

                                <div className="embla__cta">
                                    <CTA label="Book a Free 15-Minute Consultation" />
                                </div>
                            </div>
                        );

                        return el.url ? (
                            <a
                                href={el.url}
                                key={el.id}>
                                {content}
                            </a>
                        ) : (
                            content
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default SliderComponent;
