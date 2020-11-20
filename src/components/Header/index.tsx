import React, {FormEvent} from 'react';
import styles from './Header.module.scss';
import logo from '../../images/logo.png';

const Header: React.FunctionComponent<{}> = () => {
  const onSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchValue = event.currentTarget.searchValue.value;
    console.log(searchValue);
  };
  return (
    <header className={styles.header}>
      <img alt="logo" src={logo} />
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
