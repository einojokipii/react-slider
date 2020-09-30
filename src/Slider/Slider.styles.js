const sliderRailHeight = 4;
const sliderThumbSize = 18;
const sliderThumbTranslateY = (sliderThumbSize - sliderRailHeight) / -2;

export default {
  root: {
    display: 'inline-block',
    boxSizing: 'content-box',
    padding: 8,
    cursor: 'pointer',

    '*, *::before, *::after': {
      boxSizing: 'border-box'
    }
  },

  rail: {
    width: 400,
    height: sliderRailHeight,
    backgroundColor: '#eaeaea',
    position: 'relative'
  },

  track: {
    height: sliderRailHeight,
    backgroundColor: '#09f',
    position: 'absolute',
    left: 0
  },

  thumb: {
    width: sliderThumbSize,
    height: sliderThumbSize,
    backgroundColor: '#fff',
    border: '2px solid #09f',
    borderRadius: '100%',
    display: 'inline-block',
    position: 'absolute',
    left: 0,
    transform: `translate(-50%, ${sliderThumbTranslateY}px)`
  }
};
