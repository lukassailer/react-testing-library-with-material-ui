import * as React from "react";
import { render } from "@testing-library/react";
import Demo from "./Demo";

//It is best to query by something the User can see
//For a List of Querys see:
//https://testing-library.com/docs/guide-which-query
const setup = () => {
  const props = {
    checkboxChange: jest.fn(),
    radioGroupChange: jest.fn(),
    selectChange: jest.fn()
  };
  const wrapper = render(<Demo {...props} />);
  return {
    //queryByLabelText("Yes") would also work
    getCheckbox() {
      return wrapper.queryByRole("checkbox") as HTMLInputElement;
    },
    getRadioButton(label: string) {
      return wrapper.queryByLabelText(label) as HTMLInputElement;
    },
    getSelectInput() {
      return wrapper.queryByTestId("select-input") as HTMLInputElement;
    },
    getSelectButton() {
      return wrapper.queryByTestId("select-button") as HTMLElement;
    },
    wrapper,
    checkboxChange: props.checkboxChange,
    radioGroupChange: props.radioGroupChange,
    selectChange: props.selectChange
  };
};

//Avoid using fireEvent.change(Checkbox, {target: {checked: true}})
//because that is not how a User would use the Component
test("Checkbox", () => {
  const { getCheckbox, checkboxChange } = setup();
  const checkbox = getCheckbox();

  expect(checkbox).toHaveProperty("checked", false);
  checkbox.click();
  expect(checkbox).toHaveProperty("checked", true);
  checkbox.click();
  expect(checkbox).toHaveProperty("checked", false);

  expect(checkboxChange.mock.calls).toHaveLength(2);
});

test("Radio Group", () => {
  const { getRadioButton, radioGroupChange } = setup();
  const radioButtonA = getRadioButton("A");
  const radioButtonB = getRadioButton("B");

  expect(radioButtonA).toHaveProperty("checked", true);
  expect(radioButtonB).toHaveProperty("checked", false);
  radioButtonB.click();
  expect(radioButtonA).toHaveProperty("checked", false);
  expect(radioButtonB).toHaveProperty("checked", true);

  expect(radioGroupChange.mock.calls).toHaveLength(1);
});

//Note that the Input has the Value and the Button is being clicked
test("Select", () => {
  const {
    getSelectInput,
    getSelectButton,
    selectChange,
    wrapper: { getByText }
  } = setup();
  const selectInput = getSelectInput();
  const selectButton = getSelectButton();

  expect(selectInput).toHaveProperty("value", "1");

  //getByText("One").click() would also work
  selectButton.click();

  getByText("Two").click();

  expect(selectInput).toHaveProperty("value", "2");
  expect(selectChange.mock.calls).toHaveLength(1);
});
