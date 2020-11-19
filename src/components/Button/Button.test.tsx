import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Button from './index';

const mockfc = jest.fn();

describe('The button', () => {
  it('Should take a snapshot', () => {
    const {container} = render(<Button onClick={mockfc}>Default</Button>);

    expect(container).toMatchSnapshot();
  });
  it('Should renders with full width', () => {
    const {container} = render(
      <Button full onClick={mockfc}>
        Default
      </Button>,
    );

    expect(container).toMatchSnapshot();
  });

  it('Should calls the onCLick callback', () => {
    const {getByText} = render(
      <Button onClick={mockfc}>it is a button</Button>,
    );

    fireEvent.click(getByText('it is a button'));

    expect(mockfc).toHaveBeenCalledTimes(1);
  });

  it('is unclickable when disabled', () => {
    render(
      <Button onClick={mockfc} disabled>
        testButton
      </Button>,
    );

    expect(mockfc).toHaveBeenCalledTimes(0);
  });
});
