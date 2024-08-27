import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = ({ slides }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    useTransform: false,
    cssEase: 'ease-in-out',
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: false, // Hide dots on smaller screens
        }
      }
    ]
  };

  const carouselStyle = {
    margin: '0 auto',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    padding: '0'
  };

  const imageStyle = {
    width: '100%',
    height: '500px',
    borderRadius: '8px 8px 0 0',
    objectFit: 'cover',
  };

  const slideStyle = {
    position: 'relative',
  };

  const captionStyle = {
    position: 'relative',
    bottom: '0',
    left: '0',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    fontWeight: 'bold',
    color: 'rgba(46, 55, 164, 1)',
    padding: '24px',
    boxSizing: 'border-box',
    height: '150px',
    marginTop: '-150px',
    overflowY: 'auto', 
    fontSize: 'calc(1rem)'
  };

  const descriptionStyle = {
    fontWeight: "normal",
    color: '#000'
  };

  return (
    <div style={carouselStyle} className="custom-carousel">
      <Slider {...settings} className='custom-slider'>
        {slides.map((slide, index) => (
          <div key={index} style={slideStyle}>
            <img src={slide.image} alt={slide.altText} style={imageStyle} />
            <div style={captionStyle}>
              <p style={{ margin: '0', padding: '0', fontSize: '18px' }}>{slide.title}<span style={descriptionStyle}> - {slide.description}</span></p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;