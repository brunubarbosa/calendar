import React from 'react';

import styles from './Button.module.scss';

export type Kind =
  | 'primary'
  | 'secondary'
  | 'accentPrimary'
  | 'accentSecondary'
  | 'negativePrimary'
  | 'negativeSecondary';

export type Size = 'small' | 'large';

export type Type = 'button' | 'submit' | 'reset';

export interface ButtonProps {
  text?: string;
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  kind?: Kind;
  size?: Size;
  type?: Type;
  full?: boolean;
}
const Button: React.FC<ButtonProps> = ({
  text,
  children,
  onClick,
  isLoading = false,
  disabled = false,
  kind = 'primary',
  size = 'small',
  type = 'button',
  full = false,
}) => (
  <button
    data-testid="defaultButton"
    className={`${styles.button}
        ${styles[size]}
        ${isLoading || disabled ? styles.disabled : styles[kind]}
        ${full ? `${styles.full}` : ''}
        `}
    type={type}
    onClick={onClick}
    disabled={isLoading || disabled}
  >
    {text || children}
  </button>
);

export default Button;
