import React, {useContext} from 'react';
import styles from './ContactsList.module.scss';
import {StateContext} from '../../containers/Main';
import {useTable} from 'react-table';
import {TableDataType} from '../../types/tableData';
import {columns} from '../../constants/tableData';
import {FaPencilAlt, FaTrashAlt} from 'react-icons/fa';

const ContactsList: React.FunctionComponent<{}> = ({}) => {
  const {
    contactData,
    editContact,
    setIsModalContactOpen,
    deleteContact,
  } = useContext(StateContext);

  const tableData: TableDataType[] =
    contactData?.map(
      ({picture, name, tel, email, recentlyAdded, id}): TableDataType => ({
        name: (
          <>
            {picture}
            {name}
          </>
        ),
        tel: tel,
        email: email,
        id: id,
        isHighlighted: recentlyAdded,
        actions: (
          <>
            {' '}
            <button
              className={styles.actionButton}
              onClick={() => {
                editContact(id);
                setIsModalContactOpen(true);
              }}
            >
              <FaPencilAlt />
            </button>
            <button
              className={styles.actionButton}
              onClick={() => deleteContact(id)}
            >
              <FaTrashAlt />
            </button>
          </>
        ),
      }),
    ) || [];

  const data = React.useMemo(() => tableData || [], [contactData]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable<any>({columns, data});

  const isRowHighlighted = (row: any) => {
    const id = row.original.id;
    const item = tableData?.find((contact) => contact.id === id);
    return item?.isHighlighted;
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
