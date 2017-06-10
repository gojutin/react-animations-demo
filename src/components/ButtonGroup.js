import React from 'react';
import _ from 'prop-types';
import { css, StyleSheet } from 'aphrodite';
import Button from './Button';

const styles = StyleSheet.create({
  animationButton: {
    backgroundColor: "#f4f4f4",
    height: 38 + "px",
    padding: "7px 5px 0px 5px",
    margin:"2px 2px",
    borderRadius: 5 + "px",
    width: 98 + "%",
    maxWidth: 98 + "%",
    border: "1px solid #bdbdbd",
    outline: "none",
    cursor: "pointer",
    overflowY: "hidden",
    ':hover': {
      background: "#eeeeee",
    }
  },
  newAnimation: {
    color: "#0277bd",
  },
  mergeBorder: {
    border: "1px dashed #bdbdbd"
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

const ButtonGroup = (props) => {
  const {animations, showMergeOptions, handleMerge, handleAnimation} = props;
  const {animationsObject, mergedAnimations, originalAnimations } = animations;

  return (
    <div className="columns is-multiline is-mobile">
    { Object.keys(animationsObject).sort().map(key => {
        const name = animationsObject[key]["name"];
        const isSelected = mergedAnimations.find(animation => animation.name === name);
        const isOriginal = originalAnimations[name];
        const isDone = mergedAnimations.length === 2;
        const buttonClass = css(
          styles.animationButton,
          showMergeOptions && !isDone && styles.mergeBorder,
          isSelected && styles.animationButtonSelected,
          !isOriginal && !isDone && styles.newAnimation,
          !isSelected && isDone && styles.animationButtonGrayedOut,
        )
        return (
          <Button
            key={name}
            className={buttonClass}
            onClick={
              showMergeOptions 
                ? () => handleMerge(name, animationsObject[key])
                : () => handleAnimation(name)
            }
          >
            {name}
          </Button>
        )
      }
    )}
  </div>
  );
}

ButtonGroup.propTypes = {
  showMergeOptions: _.bool, 
  handleMerge: _.func,
  handleAnimation:  _.func,
  animations: _.shape({
    animationsObject: _.object,
    originalAnimations: _.object,
    mergedAnimations: _.array,
  }),
}

export default ButtonGroup;