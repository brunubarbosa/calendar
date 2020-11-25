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
import ConfirmModal from '../../components/ConfirmModal/index';

export const StateContext = createContext<{
  createForm?: UseFormMethods<Partial<FormDataType>>;
  contactData?: ContacDataType[];
  editContact?: any;
  setIsModalContactOpen?: any;
  setDeleteContactId?: any;
}>({});

const Main: React.FunctionComponent<{}> = () => {
  const [isModalContactOpen, setIsModalContactOpen] = useState<boolean>(false);
  const [contactData, setContactData] = useState<ContacDataType[]>([]);
  const [editingContactId, setEditingContactId] = useState<string | null>(null);
  const [deleteContactId, setDeleteContactId] = useState<string | null>(null);

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

  const deleteContact = () => {
    const removedContact = contactData.filter(
      (contact) => contact.id !== deleteContactId,
    );
    setContactData(removedContact);
    setDeleteContactId(null);
  };

  const createForm = useForm<Partial<FormDataType>>({
    reValidateMode: 'onChange',
  });
  const editContact = (id: string) => {
    const itemToEdit = contactData.find((contact) => contact.id === id);
    createForm.reset(itemToEdit);
    setEditingContactId(id);
  };
  return (
    <StateContext.Provider
      value={{
        contactData,
        createForm,
        editContact,
        setIsModalContactOpen,
        setDeleteContactId,
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
        <ConfirmModal
          isOpen={!!deleteContactId}
          onCancel={() => setDeleteContactId(null)}
          onConfirm={deleteContact}
          message="Deseja realmente excluir o contato?"
          title="Excluir contato"
        />
      </div>
    </StateContext.Provider>
  );
};

export default Main;
