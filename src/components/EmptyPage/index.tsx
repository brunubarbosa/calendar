import React from 'react';
import styles from './EmptyPage.module.scss';
import Button from '../../components/Button';
import emptyContent from '../../images/empty-content.png';

const EmptySpace: React.FunctionComponent<{}> = () => {
  return (
    <div className={styles.wrapper}>
      <img alt="emptyContent" src={emptyContent} />
      <span>Nenhum contato foi criado ainda.</span>
      <Button size="small" text="Criar contato" />
    </div>
  );
};

export default EmptySpace;
