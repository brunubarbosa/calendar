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

  const editContactData = (newData: FormDataType): FormDataType => {
    const editedData: ContacDataType | undefined = contactData.find(
      ({id}) => editingContactId === id,
    );
    return {...editedData, ...newData};
  };
  const removeHighlight = (itemId: string, newItemId: string) =>
    itemId === newItemId;

  const toggleHighlight = (contact: ContacDataType) => ({
    ...contact,
    recentlyAdded: !contact.recentlyAdded,
  });

  const scheduleHighlight = (newContact: ContacDataType) => {
    setTimeout(() => {
      setContactData((contactData) =>
        contactData.map((contact) =>
          removeHighlight(contact.id, newContact.id)
            ? toggleHighlight(contact)
            : contact,
        ),
      );
    }, 5000);
  };

  const mountNewContactData = (contactData: any) => {
    const picture = (
      <ContactPicture content={getFirstLetter(contactData.name)} />
    );
    const contactId = uuidv4();

    return {
      ...contactData,
      id: contactId,
      recentlyAdded: true,
      picture,
    };
  };

  const onSubmitContactForm = (data: FormDataType) => {
    setIsModalContactOpen(false);
    const isCreatingNewContact = !Boolean(editingContactId);

    if (isCreatingNewContact) {
      const newDataToAdd = mountNewContactData(data);
      setContactData([...contactData, newDataToAdd]);

      scheduleHighlight(newDataToAdd);
    } else {
      const editedData = editContactData(data) as ContacDataType;
      const newContactData = contactData.map((contact) =>
        contact.id === editedData.id ? editedData : contact,
      );
      setContactData(newContactData);
      setEditingContactId(null);
    }
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
        <Header
          showAddNewButton={!!contactData.length}
          addNewContact={onAddContact}
        />
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
