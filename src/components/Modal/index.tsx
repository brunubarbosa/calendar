import React from 'react';

import styles from './Modal.module.scss';

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  buttonFloatText?: string;
  onButtonFloatClick?: () => void;
  title?: string;
  isButtonFloatDisabled?: boolean;
  vw?: number;
  vh?: number;
  clickOutsideToClose: boolean;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  buttonFloatText,
  onButtonFloatClick,
  children,
  clickOutsideToClose,
  vw,
  vh,
}) => {
  const style: React.CSSProperties = {
    width: vw && `${vw}vw`,
    height: vh && `${vh}vh`,
  };

  const hasButtonFloat = buttonFloatText && onButtonFloatClick;

  return (
    <div
      data-testid="container"
      className={`${styles.container} ${isOpen ? styles.open : ''}`}
    >
      {isOpen && (
        <div className={`${styles.modal}`} role="dialog">
          <div className={styles.content} style={style}>
            <div
              className={`${styles.children} ${
                hasButtonFloat ? styles.hasButtonFloat : ''
              }`}
            >
              {children}
            </div>
          </div>
        </div>
      )}
      <div
        data-testid="background"
        className={styles.background}
        onMouseDown={clickOutsideToClose ? onClose : undefined}
        role="presentation"
      />
    </div>
  );
};

export default Modal;
