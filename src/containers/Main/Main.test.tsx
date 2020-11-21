import React from 'react';
import {
  render,
  fireEvent,
  getByPlaceholderText,
  getByLabelText,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Main from './index';

const mockfc = jest.fn();

describe('Test Main component empty state', () => {
  it('Should find image logo', () => {
    const {getByAltText} = render(<Main />);
    expect(getByAltText('logo')).toBeTruthy();
  });
  it('Should click on Criar contato button', () => {
    const {getByText} = render(<Main />);
    fireEvent.click(getByText('Criar contato'));
  });
  it('Should find empty message', () => {
    const {getByText} = render(<Main />);
    fireEvent.click(getByText('Nenhum contato foi criado ainda.'));
  });

  it('Should fund search input and change its value', () => {
    const {getByPlaceholderText} = render(<Main />);
    const searchInput = getByPlaceholderText('Buscar...');
    const searchValue = 'Carla maria';
    fireEvent.change(searchInput, {
      target: {value: searchValue},
    });
    expect(searchInput).toHaveValue(searchValue);
  });
});
describe('Test main component add item action', () => {
  it('Should find add item form', () => {
    const {getByDisplayValue, getByText} = render(<Main />);
    fireEvent.click(getByText('Criar contato'));
    expect(getByDisplayValue('name')).toBeTruthy();
    expect(getByDisplayValue('email')).toBeTruthy();
    expect(getByDisplayValue('tel')).toBeTruthy();
  });
  it('Should find save button disabled with no data filled', () => {
    const {getByText} = render(<Main />);
    fireEvent.click(getByText('Criar contato'));
    const saveButton = getByText('Salvar');
    expect(saveButton).toBeDisabled();
  });
  it('Should ', () => {
    const {getByText, getByLabelText} = render(<Main />);
    fireEvent.click(getByText('Criar contato'));
    const saveButton = getByText('Salvar');
    const nameValue = 'Maria';
    fireEvent.change(getByLabelText('Nome'), {
      target: {value: nameValue},
    });
    expect(saveButton).not.toBeDisabled();
  });
});
