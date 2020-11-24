import React, {FormEvent} from 'react';
import styles from './Header.module.scss';
import logo from '../../images/logo.png';
import Button from '../Button';

const Header: React.FunctionComponent<any> = ({addNewContact}) => {
  const onSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchValue = event.currentTarget.searchValue.value;
  };
  return (
    <header className={styles.header}>
      <img alt="logo" src={logo} />
      <Button onClick={addNewContact} text="===== " />
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
