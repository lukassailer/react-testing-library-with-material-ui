import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input from '@material-ui/core/Input';

const inputMock = jest.fn();

const Test = () => (
  <Input type="number" placeholder="Enter Number" onChange={inputMock} />
);

test('Input', () => {
  const container = render(<Test />);

  const input = container.getByPlaceholderText(
    'Enter Number'
  ) as HTMLInputElement;

  fireEvent.change(input, { target: { value: 'Hello World' } });
  expect(input.value).toBe('');
  expect(inputMock.mock.calls).toHaveLength(0);

  fireEvent.change(input, { target: { value: '42' } });
  expect(input.value).toBe('42');
  expect(inputMock.mock.calls).toHaveLength(1);
});
