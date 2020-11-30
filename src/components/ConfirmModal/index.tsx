import React from 'react';
import styles from './ConfirmModal.module.scss';
import Button from '../Button';
import Modal from '../Modal';

interface ConfirmModalType {
  onConfirm(): void;
  onCancel(): void;
  isOpen: boolean;
  title: string;
  message: string;
}
const ConfirmModal: React.FunctionComponent<ConfirmModalType> = ({
  onConfirm,
  onCancel,
  isOpen,
  title,
  message,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} clickOutsideToClose={true}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{title}</h1>
        <span className={styles.message}>{message}</span>
        <footer className={styles.footer}>
          <Button onClick={onCancel} kind="secondary" text="Cancelar" />
          <Button onClick={onConfirm} kind="accentPrimary" text="Excluir" />
        </footer>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
