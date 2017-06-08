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
    padding: 0,
  },
  playButton: {
    marginTop: 30 + "px",
    background: "none",
    cursor: "pointer",
    outline: "none",
    padding: "0px 5px",
    color: "#bdbdbd",
    overflowY: "scroll",
  },
  child: {
    fontSize: 7 + "em",
    paddingTop: .5 + "em", 
  },
  text: {
    fontSize: 4.5 + "em",
    paddingTop: 61 + "px", 
  },
});

export default ({currentAnimation, inputValue, showMergeOptions, mergedAnimations, handleAnimation, newAnimation, stylesheet, icon}) => 
  <div className={css(styles.animationFrame)}>
    { inputValue 
      ? <h1 className={`
          ${css(styles.text)}
          ${css(stylesheet[currentAnimation])}
        `}>
          {inputValue}
        </h1>
      : <i className={` 
            fa
            ${icon}
            ${css(styles.child)}
            ${css(stylesheet[currentAnimation])}
          `}
        />   
    }
    { showMergeOptions && 
      <div className={css(styles.playButton)} style={{display: mergedAnimations.length === 2 ? "block" : "none" }} >
          <i 
            className={`fa fa-repeat fa-2x `}
            onClick={handleAnimation} 
          />
          <div>{newAnimation}</div>
      </div>
    }

  </div>