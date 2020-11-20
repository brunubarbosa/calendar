import React, {FormEvent} from 'react';
import styles from './Header.module.scss';
import logo from '../../images/logo.png';
import emptyContent from '../../images/empty-content.png';

const App: React.FunctionComponent<{}> = () => {
  const onSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchValue = event.currentTarget.searchValue.value;
    console.log(searchValue);
  };
  return (
    <header className={styles.wrapper}>
      <img alt="logo" src={logo} />
      <form onSubmit={onSubmitForm}>
        <input name="searchValue" type="text" placeholder="Buscar..." />
      </form>
      <img alt="emptyContent" src={emptyContent} />
    </header>
  );
};

export default App;
