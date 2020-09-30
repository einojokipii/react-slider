import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.dev.scss';
import Slider from './Slider/Slider';
import MuiSlider from '@material-ui/core/Slider';

const min = 0;
const max = 100;
const step = 1;

const customStyles = {
  rail: {
    width: 240
  }
};

function TestComponent() {
  const [value, setValue] = useState(0);

  const handleChange = value => {
    console.log(value);
    setValue(value);
  };

  const handleChangeMui = (e, value) => {
    console.log(value);
    setValue(value);
  };

  return (
    <>
      <MuiSlider
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={handleChangeMui}
      />
      <Slider
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        styles={customStyles}
      />
    </>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <TestComponent />
  </React.StrictMode>,
  document.getElementById('root')
);
