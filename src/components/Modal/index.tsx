import React from 'react';
import Button, {Kind} from '../Button';

import styles from './Modal.module.scss';

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  buttonClose?: boolean;
  buttonFloatText?: string;
  onButtonFloatClick?: () => void;
  title?: string;
  isButtonFloatDisabled?: boolean;
  buttonKind?: Kind;
  vw?: number;
  vh?: number;
  clickOutsideToClose: boolean;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  buttonClose = true,
  title,
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
          {buttonClose || title ? (
            <div
              className={`${styles.header} ${title && styles.withTitle} ${
                buttonClose && styles.withButtonClose
              }`}
            >
              {title && <h4 className={styles.title}>{title}</h4>}

              {buttonClose && (
                <button
                  className={styles.buttonClose}
                  onClick={onClose}
                  data-testid="buttonClose"
                >
                  X
                </button>
              )}
            </div>
          ) : null}
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
