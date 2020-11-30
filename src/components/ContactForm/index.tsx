import React, {useContext} from 'react';
import styles from './ContactForm.module.scss';
import Button from '../Button';
import Modal from '../Modal';
import {StateContext} from '../../containers/Main';
interface FormDataTypes {
  name: string;
  email: string;
  tel: string;
}

interface ContactFormProps {
  isOpen: boolean;
  onSubmit(data: FormDataTypes): void;
  onCloseModal(): void;
}

const ContactForm: React.FunctionComponent<ContactFormProps> = ({
  isOpen,
  onSubmit,
  onCloseModal,
}) => {
  const {createForm} = useContext(StateContext);
  return (
    <div className={styles.wrapper}>
      <Modal isOpen={isOpen} onClose={onCloseModal} clickOutsideToClose={true}>
        <form
          className={styles.form}
          onSubmit={createForm?.handleSubmit(onSubmit)}
        >
          <h1 className={styles.title}>Criar novo contato</h1>
          <div className={styles.fieldWrapper}>
            <label htmlFor="name">Nome</label>
            <input
              ref={createForm?.register}
              type="text"
              name="name"
              id="name"
            />
          </div>
          <div className={styles.fieldWrapper}>
            <label htmlFor="email">E-mail</label>
            <input
              ref={createForm?.register}
              type="text"
              name="email"
              id="email"
            />
          </div>
          <div className={`${styles.fieldWrapper} ${styles.tel}`}>
            <label htmlFor="tel">Telefone</label>
            <input ref={createForm?.register} type="text" name="tel" id="tel" />
          </div>
          <footer className={styles.footer}>
            <Button onClick={onCloseModal} text="Cancelar" kind="secondary" />
            <Button
              disabled={!createForm?.formState.isDirty}
              text="Salvar"
              type="submit"
              kind="accentPrimary"
            />
          </footer>
        </form>
      </Modal>
    </div>
  );
};

export default ContactForm;
