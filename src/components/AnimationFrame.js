import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  animationFrame: {
    textAlign: "center",
    color: "#00C851",
    width: 100 + "%",
    height: 250 + "px",
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
    paddingTop: .5 + "em", 
  },
  text: {
    paddingTop: 70 + "px", 
    color: "#00C851",
    '@media (min-width: 750px)': {
      paddingTop: 50 + "px",
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

export default ({animations, inputValue, showMergeOptions, handleAnimation, stylesheet, icon}) => {

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

      { inputValue 
        ? <h1 className={`
            ${`
              ${css(styles.text, stylesheet[currentAnimation])}
              title is-2
            `}
          `}>
            {inputValue}
          </h1>
        : <i className={` 
              fa
              ${icon}
              ${css(styles.icon, stylesheet[currentAnimation])}
            `}
          />   
      }

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

  