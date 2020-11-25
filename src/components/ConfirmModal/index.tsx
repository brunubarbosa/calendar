import React, {FormEvent} from 'react';
import styles from './ConfirmModal.module.scss';
import logo from '../../images/logo.png';
import Button from '../Button';
import Modal from '../Modal';

interface ConfirmModalType {
  onClose?(): void;
  onConfirm(): void;
  onCancel(): void;
  isOpen: boolean;
  title: string;
  message: string;
}
const ConfirmModal: React.FunctionComponent<ConfirmModalType> = ({
  onClose,
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
          <Button text="Cancelar" />
          <Button onClick={onConfirm} text="Excluir" />
        </footer>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
