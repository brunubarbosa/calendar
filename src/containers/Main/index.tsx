import React, {useState} from 'react';
import styles from './Main.module.scss';
import Header from '../../components/Header';
import Button from '../../components/Button';
import EmptyPage from '../../components/EmptyPage';
import ContactForm from '../../components/ContactForm';
import emptyContent from '../../images/empty-content.png';

const Main: React.FunctionComponent<{}> = () => {
  const [isModalContactOpen, setIsModalContactOpen] = useState<boolean>(false);
  const onAddContact = () => {
    setIsModalContactOpen(true);
  };

  const onSubmitContactForm = (data: any) => {
    console.log(data);
  };

  const onCloseModal = () => {
    setIsModalContactOpen(false);
  };
  return (
    <div className={styles.wrapper}>
      <Header />
      <EmptyPage onAddContact={onAddContact} />
      <ContactForm
        onCloseModal={onCloseModal}
        isOpen={isModalContactOpen}
        onSubmit={onSubmitContactForm}
        initialValues={undefined}
      />
    </div>
  );
};

export default Main;
