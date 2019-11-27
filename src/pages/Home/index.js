import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { shuffle } from 'lodash';
import { motion } from 'framer-motion';
import { Container, Header, Partner, Partners } from './styles';

import BannerGrid from '../../components/BannerGrid';

import partnersList from '../../services/partners';
import banners from '../../services/banners';
import Button from '../../components/Button';
import { spring } from '../../utils/animations';

export default function Home() {
  const [partners, setPartners] = useState(partnersList);

  const listAnimation = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ...spring,
        delay: 0.5,
        staggerChildren: 0.075,
        delayChildren: 0.7,
      },
    },
  };

  const itemsAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <Container>
        <Header>
          <motion.a
            href="https://rocketseat.com.br/experience"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ x: -500 }}
            animate={{ x: 0 }}
            transition={{ ...spring, mass: 1.8 }}
          >
            <img
              src="https://rocketseat.com.br/static/images/experience/logo.svg"
              alt="RS/XP"
            />
          </motion.a>
          <Button secondary as={Link} to="/signup">
            Nova Conta
          </Button>
        </Header>
        <BannerGrid banners={banners} />
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'tween', delay: 0.25, ease: 'easeInOut' }}
        >
          Apoiadores
          <Button inline onClick={() => setPartners(shuffle(partnersList))}>
            Randomizar
          </Button>
        </motion.h2>
        <Partners initial="hidden" animate="visible" variants={listAnimation}>
          {partners.map(partner => (
            <Partner
              key={partner.name}
              variants={itemsAnimation}
              layoutTransition={spring}
            >
              <img alt={partner.name} src={partner.src} />
            </Partner>
          ))}
        </Partners>
      </Container>
    </>
  );
}
