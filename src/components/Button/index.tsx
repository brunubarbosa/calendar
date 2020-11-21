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
  disabled,
  kind = 'primary',
  size = 'small',
  type = 'button',
  full = false,
}) => {
  return (
    <button
      className={`${styles.button}
        ${styles[size]}
        ${disabled ? styles.disabled : styles[kind]}
        ${full ? `${styles.full}` : ''}
        `}
      type={type}
      onClick={onClick}
      disabled={disabled || undefined}
    >
      {text || children}
    </button>
  );
};

export default Button;
