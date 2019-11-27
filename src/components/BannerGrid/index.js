import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Container } from './styles';

export default function BannerGrid({ banners, left, up, down }) {
  const listAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.15,
        delayChildren: 1,
      },
    },
  };

  const bannersAnimation = {
    hidden: {
      opacity: 0,
      scale: 1.25,
    },
    visible: {
      opacity: 1,
      scale: 1,
    },
  };

  return (
    <Container
      left={left}
      up={up}
      down={down}
      initial="hidden"
      animate="visible"
      variants={listAnimation}
    >
      {banners.map(banner => (
        <motion.div key={banner.img.alt} variants={bannersAnimation}>
          <a href={banner.link} target="_blank" rel="noopener noreferrer">
            <img src={banner.img.src} alt={banner.img.alt} />
          </a>
        </motion.div>
      ))}
    </Container>
  );
}

BannerGrid.propTypes = {
  banners: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string,
      img: PropTypes.shape({
        src: PropTypes.string,
        alt: PropTypes.string,
      }),
    })
  ).isRequired,
  left: PropTypes.bool,
  up: PropTypes.bool,
  down: PropTypes.bool,
};

BannerGrid.defaultProps = {
  left: false,
  up: false,
  down: false,
};
