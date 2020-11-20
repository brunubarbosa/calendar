import React from 'react';
import styles from './Main.module.scss';
import Header from '../../components/Header';
import Button from '../../components/Button';

const App: React.FunctionComponent<{}> = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div>
        <span>Nenhum contato foi criado ainda.</span>
      </div>
      <Button text="Criar contato" />
    </div>
  );
};

export default App;
