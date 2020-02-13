import * as React from 'react';
import { render } from '@testing-library/react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const selectMock = jest.fn();

const Test = () => {
  const [selectValue, setSelectValue] = React.useState('1');
  const selectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectValue(event.target.value as string);
    selectMock();
  };
  return (
    <Select
      value={selectValue}
      onChange={selectChange}
      inputProps={{ 'data-testid': 'select-input' }}
      SelectDisplayProps={{ 'data-testid': 'select-button' } as {}}
    >
      <MenuItem value={1}>One</MenuItem>
      <MenuItem value={2}>Two</MenuItem>
      <MenuItem value={3}>Three</MenuItem>
    </Select>
  );
};

//Note that the Input has the Value and the Button is being clicked
test('Select', () => {
  const container = render(<Test />);
  const selectInput = container.getByTestId('select-input');
  const selectButton = container.getByTestId('select-button');

  expect(selectInput).toHaveProperty('value', '1');

  //getByText("One").click() would also work
  selectButton.click();

  container.getByText('Two').click();

  expect(selectInput).toHaveProperty('value', '2');
  expect(selectMock.mock.calls).toHaveLength(1);
});
