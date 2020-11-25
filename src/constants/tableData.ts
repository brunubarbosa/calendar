import {TableColumnType} from '../types/tableData';

export const columns: TableColumnType[] = [
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
];
