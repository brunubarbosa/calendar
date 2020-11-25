import React, {useState, createContext} from 'react';
import styles from './Main.module.scss';
import Header from '../../components/Header';
import EmptyPage from '../../components/EmptyPage';
import ContactForm from '../../components/ContactForm';
import {useForm, UseFormMethods} from 'react-hook-form';
import {v4 as uuidv4} from 'uuid';
import ContactsList from '../../components/ContactsList';
import getFirstLetter from '../../utils/getFirstLetter';
import ContactPicture from '../../components/ContactPicture';
import {ContacDataType, FormDataType} from '../../types/contact';

export const StateContext = createContext<{
  createForm?: UseFormMethods<Partial<FormDataType>>;
  contactData?: ContacDataType[];
  editContact?: any;
  setIsModalContactOpen?: any;
  deleteContact?: any;
}>({});

const Main: React.FunctionComponent<{}> = () => {
  const [isModalContactOpen, setIsModalContactOpen] = useState<boolean>(false);
  const [contactData, setContactData] = useState<ContacDataType[]>([]);
  const [editingContactId, setEditingContactId] = useState<string | null>(null);

  const onAddContact = () => {
    setIsModalContactOpen(true);
  };

  const replaceContact = (newContact: FormDataType) => {
    return contactData.map((item: any) =>
      item.id === editingContactId ? {...item, ...newContact} : item,
    );
  };

  const scheduleHighlight = (
    newContact: ContacDataType,
    allContacts: ContacDataType[],
  ) => {
    console.log(allContacts);
    setTimeout(() => {
      setContactData([...allContacts, {...newContact, recentlyAdded: false}]);
    }, 1000);
  };

  const onSubmitContactForm = (data: FormDataType) => {
    setEditingContactId(null);
    setIsModalContactOpen(false);
    const contactId = uuidv4();
    //melhorar
    const picture = <ContactPicture content={getFirstLetter(data.name)} />;
    const newDataToAdd = editingContactId
      ? replaceContact(data)
      : [
          ...contactData,
          {
            ...data,
            id: contactId,
            recentlyAdded: true,
            picture,
          },
        ];
    if (!editingContactId)
      scheduleHighlight(
        {
          ...data,
          id: contactId,
          recentlyAdded: true,
          picture,
        },
        contactData,
      );
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

  const createForm = useForm<Partial<FormDataType>>({
    reValidateMode: 'onChange',
  });
  const editContact = (id: string) => {
    createForm.reset();
    setEditingContactId(id);
  };
  return (
    <StateContext.Provider
      value={{
        contactData,
        createForm,
        editContact,
        setIsModalContactOpen,
        deleteContact,
      }}
    >
      <div className={styles.wrapper}>
        <Header addNewContact={onAddContact} />
        {contactData.length ? (
          <ContactsList />
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
