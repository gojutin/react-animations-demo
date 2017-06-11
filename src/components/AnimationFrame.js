import React from 'react';
import _ from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  animationFrame: {
    textAlign: "center",
    color: "#00C851",
    width: 100 + "%",
    height: 300 + "px",
    position: "fixed",
    background: "#2E2E2E",
    zIndex: 9999,
    padding: 10 + "px",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  replayButton: {
    position: "absolute",
    bottom: 0,
    left: 45 + "%",
    right: 45 + "%",
    background: "none",
    cursor: "pointer",
    outline: "none",
    padding: "0px 5px",
    color: "#bdbdbd",
    overflowY: "scroll",
  },
  icon: {
    fontSize: 7 + "em",
    paddingTop: .6 + "em", 
  },
  text: {
    paddingTop: 100 + "px", 
    fontSize: 30 + 'px',
    '@media (min-width: 750px)': {
      paddingTop: 70 + "px",
      fontSize: 80 + 'px',
    },
  },
  anchor: {
    color: "white",
    padding: "0px 5px",
    ":hover": {
      color:"lightgray",
    }
  }
});

const AnimationFrame = ({animations, inputValue, showMergeOptions, handleAnimation, stylesheet, icon, color}) => {

  const { currentAnimation, mergedAnimations } = animations;

  return (
    <div className={css(styles.animationFrame)}>
      <p>Interactive demo for 
        <a 
          href="https://github.com/FormidableLabs/react-animations" 
          rel="noopener noreferrer" 
          target="_blank"
          className={css(styles.anchor)}
        >
          react-animations 
        </a>
      </p>
      <div style={{color}}>
      { inputValue 
        ? <h1 
            style={{color}}
            className={`
              ${`
                ${css(styles.text, stylesheet[currentAnimation])}
                title is-2
              `}
            `}
          >
            {inputValue}
          </h1>
        : <i className={` 
              fa
              ${icon}
              ${css(styles.icon, stylesheet[currentAnimation])}
            `}
          />   
      }
      </div>

      { mergedAnimations.length === 2 && 
        <div 
          className={css(styles.replayButton)} 
          onClick={handleAnimation}
        >
          <i 
            className="fa fa-repeat fa-2x"
          />
        </div>
      }

    </div>
  );
}

AnimationFrame.propTypes = {
  showMergeOptions: _.bool, 
  inputValue: _.bool,
  handleAnimation: _.func,
  stylesheet: _.object,
  icon: _.string,
  animations: _.shape({
    currentAnimations: _.object,
    mergedAnimations: _.array,
  }),
}


export default AnimationFrame;