import React from 'react';
import ReactDOM from 'react-dom';
import Demo from './Demo';

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Demo
    checkboxChange={(event: string) => {
      console.log("onCheckboxChange " + event);
    }}
    radioGroupChange={(event: string) => {
      console.log("onRadioGroupChange " + event);
    }}
    selectChange={(event: string) => {
      console.log("onSelectChange " + event);
    }}
  />,
  rootElement
);


