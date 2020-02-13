import * as React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { render } from '@testing-library/react';

const checkboxMock = jest.fn();

const Test = () => {
  const [checked, setChecked] = React.useState(false);
  const checkboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    checkboxMock();
  };
  return (
    <FormControlLabel
      label="Yes"
      control={<Checkbox checked={checked} onChange={checkboxChange} />}
    />
  );
};

//Avoid using fireEvent.change(Checkbox, {target: {checked: true}})
//because that is not how a User would use the Component
test('Checkbox', () => {
  const container = render(<Test />);
  //getByLabelText("Yes") would also work
  const checkbox = container.getByRole('checkbox') as HTMLInputElement;

  expect(checkbox).toHaveProperty('checked', false);
  checkbox.click();
  expect(checkbox).toHaveProperty('checked', true);
  checkbox.click();
  expect(checkbox).toHaveProperty('checked', false);

  expect(checkboxMock.mock.calls).toHaveLength(2);
});
