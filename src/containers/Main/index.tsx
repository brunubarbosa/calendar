import React from 'react';
import styles from './Main.module.scss';
import Header from '../../components/Header';
import Button from '../../components/Button';
import EmptyPage from '../../components/EmptyPage';
import emptyContent from '../../images/empty-content.png';

const App: React.FunctionComponent<{}> = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <EmptyPage />
    </div>
  );
};

export default App;
