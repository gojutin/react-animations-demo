import React from 'react';
import { css, StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  animationButton: {
    height: 38 + "px",
    paddingTop: 8 + "px",
    margin:"2px 2px",
    borderRadius: 5 + "px",
    width: 98 + "%",
    border: "1px solid #bdbdbd",
    outline: "none",
    cursor: "pointer",
    overflowY: "auto",
    // display: "inline-block",
    ':hover': {
      background: "#eeeeee",
    }
  },
  newAnimation: {
    color: "#0277bd",
  },
  mergeBorder: {
    border: "1px solid #00C851"
  },
  animationButtonGrayedOut: {
    background: "#bdbdbd",
    cursor: "not-allowed",
    color: "transparent",
    textShadow: "0 0 3px white",
    ':hover': {
      background: "#bdbdbd",
    },
  },
  animationButtonSelected: {
    background: "#00C851",
    color: "white",
    ':hover': {
      background: "#00C851",
    }
  },
});

export default ({animations, showMergeOptions, handleMerge, handleAnimation}) => {
  const {animationsObject, mergedAnimations, originalAnimations } = animations;
  return (
    <div className="columns is-multiline">
      { Object.keys(animationsObject).map(key => {
          const name = animationsObject[key]["name"];
          const isSelected = mergedAnimations.find(animation => animation.name === name);
          const isOriginal = originalAnimations[name];
          const isDone = mergedAnimations.length === 2;
          return (
            <div key={name} className="column is-2" style={{padding: 2 + "px"}}>
              <div
                className={`
                  ${showMergeOptions && !isDone && css(styles.mergeBorder)}
                  ${css(styles.animationButton)}
                  ${isSelected && css(styles.animationButtonSelected)}
                  ${!isOriginal && !isDone && css(styles.newAnimation)}
                  ${!isSelected && isDone && css(styles.animationButtonGrayedOut)}
                `}
                onClick={
                  showMergeOptions 
                    ? () => handleMerge(name, animationsObject[key])
                    : () => handleAnimation(name)
                }
              >
                {name}
              </div>
            </div>
          )
        }
      )}
  </div>
  );
}

  