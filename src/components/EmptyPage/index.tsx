import React from 'react';
import styles from './EmptyPage.module.scss';
import Button from '../../components/Button';
import emptyContent from '../../images/empty-content.png';

interface EmptySpaceProps {
  onAddContact(): void;
}

const EmptySpace: React.FunctionComponent<EmptySpaceProps> = ({
  onAddContact,
}) => {
  return (
    <div className={styles.wrapper}>
      <img
        className={styles.emptyImage}
        alt="emptyContent"
        src={emptyContent}
      />
      <span className={styles.emptyMessage}>
        Nenhum contato foi criado ainda.
      </span>
      <Button onClick={onAddContact} size="small" text="Criar contato" />
    </div>
  );
};

export default EmptySpace;
