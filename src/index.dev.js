import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.dev.scss';
import Slider from './Slider/Slider';

function TestComponent() {
  const [value, setValue] = useState(0);

  return (
    <Slider
      value={value}
      min={0}
      max={100}
      step={10}
      onChange={value => setValue(value)}
    />
  );
}

ReactDOM.render(
  <React.StrictMode>
    <TestComponent />
  </React.StrictMode>,
  document.getElementById('root')
);
