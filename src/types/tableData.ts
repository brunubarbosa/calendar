import {ContacDataType} from './contact';

export interface TableDataType
  extends Omit<ContacDataType, 'name' | 'recentlyAdded' | 'picture'> {
  name: React.ReactElement;
  isHighlighted: boolean;
  actions: React.ReactElement;
}

export interface TableColumnType {
  Header: string;
  accessor: string;
}
