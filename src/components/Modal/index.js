import React, { useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';

import { MdClose } from 'react-icons/md';

import { AnimatePresence, motion } from 'framer-motion';
import { FullScreen } from './styles';
import { spring } from '../../utils/animations';

export default function Modal({
  open,
  title,
  icon,
  success,
  footerButtons,
  children,
  closeAction,
}) {
  const modal = useRef();

  // Handle the key press close modal on 'ESC' event.
  const handleKeyUp = useCallback(
    e => {
      const keys = {
        27: () => {
          e.preventDefault();
          closeAction();
          window.removeEventListener('keyup', handleKeyUp, false);
        },
      };

      if (keys[e.keyCode]) {
        keys[e.keyCode]();
      }
    },
    [closeAction]
  );

  // Handle the mouse click on overlay to close modal.
  const handleOutsideClick = useCallback(
    e => {
      if (modal.current && modal.current.parentNode === e.target) {
        closeAction();
        document.removeEventListener('click', handleOutsideClick, false);
      }
    },
    [closeAction]
  );

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp, false);
    document.addEventListener('click', handleOutsideClick, false);

    return () => {
      window.removeEventListener('keyup', handleKeyUp, false);
      document.removeEventListener('click', handleOutsideClick, false);
    };
  }, [handleKeyUp, handleOutsideClick, open]);

  const fullscreenAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        ...spring,
        staggerChildren: 3,
      },
    },
  };

  const modalAnimation = {
    hidden: { y: -120, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        ...spring,
      },
    },
  };

  return (
    <AnimatePresence>
      {open && (
        <FullScreen
          success={!!success}
          footerButtons={!!footerButtons}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={fullscreenAnimation}
        >
          <motion.div ref={modal} variants={modalAnimation}>
            <header>
              {icon && icon}
              <h3>{title}</h3>
              {children[0]}
            </header>
            {children[1]}
            <button
              className="btn__transparent"
              type="button"
              onClick={() => closeAction()}
            >
              <MdClose size={28} />
            </button>
          </motion.div>
        </FullScreen>
      )}
    </AnimatePresence>
  );
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.element,
  success: PropTypes.bool,
  footerButtons: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  closeAction: PropTypes.func,
};

Modal.defaultProps = {
  icon: undefined,
  success: false,
  footerButtons: false,
  closeAction: null,
};
