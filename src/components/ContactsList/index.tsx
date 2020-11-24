import React, {useContext} from 'react';
import styles from './ContactsList.module.scss';
import {StateContext} from '../../containers/Main';
import {useTable} from 'react-table';
import ContactPicture from '../ContactPicture';
import getFirstLetter from '../../utils/getFirstLetter';
interface ContactsListProps {
  contactData?: any;
}

const ContactsList: React.FunctionComponent<ContactsListProps> = ({}) => {
  const {
    contactData,
    editContact,
    setIsModalContactOpen,
    deleteContact,
  } = useContext(StateContext);

  const tableData = contactData.map((contact: any) => ({
    name: (
      <>
        {contact.picture}
        {contact.name}
      </>
    ),
    tel: contact.tel,
    email: contact.email,
    id: contact.id,
    isHighlighted: contact.recentlyAdded,
    actions: (
      <>
        {' '}
        <button
          onClick={() => {
            editContact(contact);
            setIsModalContactOpen(true);
          }}
        >
          editar
        </button>
        <button onClick={() => deleteContact(contact.id)}>excluir</button>
      </>
    ),
  }));

  const data = React.useMemo(() => tableData, [contactData]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Nome',
        accessor: 'name',
      },
      {
        Header: 'E-mail',
        accessor: 'email',
      },
      {
        Header: 'Telefone',
        accessor: 'tel',
      },
      {
        Header: '',
        accessor: 'actions',
      },
    ],
    [],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable<any>({columns, data});
  const isRowHighlighted = (row: any) => {
    const id = row.original.id;
    const {isHighlighted} = tableData.find((contact: any) => contact.id === id);
    return isHighlighted;
  };

  return (
    <table className={styles.table} {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              className={isRowHighlighted(row) ? styles.highlightedRow : ''}
            >
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ContactsList;
