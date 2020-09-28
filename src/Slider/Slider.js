import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import './Slider.scss';

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function valueToPct(value, min, max) {
  return ((value - min) * 100) / (max - min);
}

function pctToValue(pct, min, max) {
  return (max - min) * (pct / 100) + min;
}

function roundToStep(value, step) {
  const rem = value % step;

  if (rem < step / 2) {
    return value - rem;
  } else {
    return value + (step - rem);
  }
}

export default function Slider({ value, min, max, step, onChange }) {
  const railRef = useRef(null);

  const handleInput = e => {
    const { left, right } = railRef.current.getBoundingClientRect();
    const x = clamp(e.clientX, left, right);
    const pct = valueToPct(x, left, right);
    const newValue = roundToStep(pctToValue(pct, min, max), step);
    newValue !== value && onChange(newValue);
  };

  const handleMouseDown = e => {
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleInput);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleInput);
    document.addEventListener('mouseup', handleMouseUp);

    handleInput(e);
  };

  const styles = {
    track: {
      width: valueToPct(value, min, max) + '%'
    },
    thumb: {
      left: valueToPct(value, min, max) + '%'
    }
  };

  return (
    <div className="Slider" onMouseDown={handleMouseDown}>
      <div className="Slider__rail" ref={railRef}>
        <span className="Slider__track" style={styles.track}></span>
        <span
          className="Slider__thumb"
          role="slider"
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          style={styles.thumb}
        ></span>
      </div>
    </div>
  );
}

Slider.propTypes = {
  value: PropTypes.number.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  onChange: PropTypes.func.isRequired
};

Slider.defaultProps = {
  min: 0,
  max: 100,
  step: 1
};
