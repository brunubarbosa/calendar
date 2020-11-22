import React, {useState, createContext} from 'react';
import styles from './Main.module.scss';
import Header from '../../components/Header';
import Button from '../../components/Button';
import EmptyPage from '../../components/EmptyPage';
import ContactForm from '../../components/ContactForm';
import {useForm} from 'react-hook-form';
import {v4 as uuidv4} from 'uuid';

export const StateContext = createContext<{
  createForm?: any;
  contactData?: any;
}>({});

interface FormDataTypes {
  name: string;
  email: string;
  tel: string;
}

const Main: React.FunctionComponent<{}> = () => {
  const [isModalContactOpen, setIsModalContactOpen] = useState<boolean>(false);
  const [contactData, setContactData] = useState<any>([]);
  const [editingContactId, setEditingContactId] = useState<string | null>(null);

  const onAddContact = () => {
    setIsModalContactOpen(true);
  };

  const replaceContact = (newContact: any, id: string) =>
    contactData.map((item: any) =>
      item.id === editingContactId ? {...newContact, id} : item,
    );

  const onSubmitContactForm = (data: any) => {
    setEditingContactId(null);
    setIsModalContactOpen(false);
    const newDataToAdd = editingContactId
      ? replaceContact(data, editingContactId)
      : [...contactData, {...data, id: uuidv4()}];
    setContactData(newDataToAdd);
  };

  const onCloseModal = () => {
    setIsModalContactOpen(false);
  };

  const deleteContact = (id: string) => {
    const removedContact = contactData.filter(
      (contact: any) => contact.id !== id,
    );
    setContactData(removedContact);
  };

  const createForm = useForm<FormDataTypes>({
    reValidateMode: 'onChange',
  });
  const editContact = (item: any) => {
    createForm.reset(item);
    setEditingContactId(item.id);
  };
  return (
    <StateContext.Provider value={{contactData, createForm}}>
      <div className={styles.wrapper}>
        <Header />
        {contactData.length ? (
          contactData.map((item: any) => (
            <div key={item.id}>
              <span>{item.name}</span>
              <span>{item.email}</span>
              <span>{item.tel}</span>
              <button
                onClick={() => {
                  editContact(item);
                  setIsModalContactOpen(true);
                }}
              >
                editar
              </button>
              <button onClick={() => deleteContact(item.id)}>excluir</button>
            </div>
          ))
        ) : (
          <EmptyPage onAddContact={onAddContact} />
        )}
        <ContactForm
          onCloseModal={onCloseModal}
          isOpen={isModalContactOpen}
          onSubmit={onSubmitContactForm}
        />
      </div>
    </StateContext.Provider>
  );
};

export default Main;
