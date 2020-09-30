import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useUncontrolled } from 'uncontrollable';
import defaultStyles from './Slider.styles';

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function valueToPct(value, min, max) {
  return ((value - min) * 100) / (max - min);
}

function pctToValue(pct, min, max) {
  return (max - min) * (pct / 100) + min;
}

function roundToStep(value, min, step) {
  return Math.round((value - min) / step) * step + min;
}

export default function Slider(props) {
  const {
    value: propValue,
    min,
    max,
    step,
    onChange,
    styles: propStyles
  } = useUncontrolled(props, {
    value: 'onChange'
  });

  const value = clamp(propValue, min, max);
  const sliderRef = useRef();
  const railRef = useRef();

  const handleInput = e => {
    const { left, right } = railRef.current.getBoundingClientRect();
    const xPct = valueToPct(e.clientX, left, right);

    let newValue = pctToValue(xPct, min, max); // value ..
    newValue = roundToStep(newValue, min, step); // ..to rounded value ..
    newValue = clamp(newValue, min, max); // ..to clamped value

    onChange(newValue);
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
    root: { ...defaultStyles.root, ...propStyles.root },
    rail: { ...defaultStyles.rail, ...propStyles.rail },
    track: { ...defaultStyles.track, ...propStyles.track },
    thumb: { ...defaultStyles.thumb, ...propStyles.thumb }
  };

  const inlineStyles = {
    track: {
      width: valueToPct(value, min, max) + '%'
    },
    thumb: {
      left: valueToPct(value, min, max) + '%'
    }
  };

  return (
    <div
      className="Slider"
      ref={sliderRef}
      onMouseDown={handleMouseDown}
      css={styles.root}
    >
      <div className="Slider__rail" css={styles.rail} ref={railRef}>
        <span
          className="Slider__track"
          css={styles.track}
          style={inlineStyles.track}
        ></span>
        <span
          className="Slider__thumb"
          role="slider"
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          tabIndex="0"
          css={styles.thumb}
          style={inlineStyles.thumb}
        ></span>
      </div>
    </div>
  );
}

Slider.propTypes = {
  value: PropTypes.number,
  defaultValue: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  onChange: PropTypes.func,
  styles: PropTypes.object
};

Slider.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  styles: {}
};
