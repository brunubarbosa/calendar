import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Main from './index';

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
  it('Should find add item form fields', () => {
    const {getByText, getByLabelText} = render(<Main />);
    fireEvent.click(getByText('Criar contato'));
    expect(getByLabelText('Nome')).toBeTruthy();
    expect(getByLabelText('E-mail')).toBeTruthy();
    expect(getByLabelText('Telefone')).toBeTruthy();
  });
  it('Should find save button disabled with no data filled', () => {
    const {getByText} = render(<Main />);
    fireEvent.click(getByText('Criar contato'));
    const saveButton = getByText('Salvar');
    expect(saveButton).toBeDisabled();
  });
  it('Should test if is able to submit form after fill an input', async () => {
    const {getByText, getByLabelText} = render(<Main />);
    fireEvent.click(getByText('Criar contato'));
    const saveButton = getByText('Salvar');
    const nameValue = 'Maria';
    const nameInput = getByLabelText('Nome', {selector: 'input'});
    fireEvent.input(nameInput, {target: {value: nameValue}});
    expect(saveButton).not.toBeDisabled();
  });
});
