import React, {FormEvent} from 'react';
import styles from './Header.module.scss';
import logo from '../../images/logo.png';
import Button from '../Button';
import {FaPlus} from 'react-icons/fa';

interface HeaderType {
  addNewContact(): void;
  showAddNewButton: boolean;
}

const Header: React.FunctionComponent<HeaderType> = ({
  addNewContact,
  showAddNewButton,
}) => {
  const onSubmitForm = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  };
  return (
    <header className={styles.header}>
      <img alt="logo" src={logo} />
      {showAddNewButton && (
        <Button onClick={addNewContact}>
          <FaPlus /> Criar contato
        </Button>
      )}
      <form onSubmit={onSubmitForm} className={styles.form}>
        <input
          className={styles.inputSearch}
          name="searchValue"
          type="text"
          placeholder="Buscar..."
        />
      </form>
    </header>
  );
};

export default Header;
