import * as React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { render } from '@testing-library/react';

const radioMock = jest.fn();

const Test = () => {
  const [radioGroupValue, setRadioGroupValue] = React.useState('A');
  const radioGroupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioGroupValue((event.target as HTMLInputElement).value);
    radioMock();
  };
  return (
    <RadioGroup value={radioGroupValue} onChange={radioGroupChange}>
      <FormControlLabel control={<Radio />} value="A" label="A" />
      <FormControlLabel control={<Radio />} value="B" label="B" />
    </RadioGroup>
  );
};

test('Radio Group', () => {
  const container = render(<Test />);
  const radioButtonA = container.getByLabelText('A');
  const radioButtonB = container.getByLabelText('B');

  expect(radioButtonA).toHaveProperty('checked', true);
  expect(radioButtonB).toHaveProperty('checked', false);
  radioButtonB.click();
  expect(radioButtonA).toHaveProperty('checked', false);
  expect(radioButtonB).toHaveProperty('checked', true);

  expect(radioMock.mock.calls).toHaveLength(1);
});
