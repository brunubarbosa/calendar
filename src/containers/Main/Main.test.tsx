import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Main from './index';

const mockfc = jest.fn();

describe('The button', () => {
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
