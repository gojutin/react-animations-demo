import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import * as react_animations from 'react-animations';
import styles from './appStyles';
import ScrollToTop from 'react-scroll-up';

// components
import AnimationFrame from './components/AnimationFrame';
import Options from './components/Options';
import Merge from './components/Merge';
import AnimationButtons from './components/AnimationButtons';

export default class App extends Component {

  state = {
    animationsObject: {},
    originalAnimations: {},
    currentAnimation: "",
    mergedAnimations: [],
    inputValue: "",
    showMergeOptions: false,
    showOptions: false,
    duration: '1',
    newAnimation: "",
    icon: "fa-child",
  }

  componentWillMount() {
    this.resetAnimations();
  }

  resetAnimations = () => {
    let animationsObject = {};
    Object.keys(react_animations).forEach(key => {
      if (key !== "merge") {
        return animationsObject[key] = {
          animationName: react_animations[key],
          animationDuration: '1s',
          name: key,
        }
      }
    })
    this.setState({
      animationsObject,
      originalAnimations: animationsObject,
    })
  }


  handleAnimation = animation => {
    this.setState(prevState => ({
        currentAnimation: "",
    }), () => {
      if (this.state.showMergeOptions) {
        this.setState({
          currentAnimation: this.state.newAnimation,
        })
      } else {
        this.setState({
          currentAnimation: animation,
        })
      }
    })
  }

  toggleMergeOptions = () => {
    this.setState(prevState => ({
      showMergeOptions: !prevState.showMergeOptions,
      currentAnimation: "",
      mergedAnimations: [],
    }));
  }

  toggleShowOptions = () => {
    this.setState(prevState => ({
      showOptions: !prevState.showOptions,
    }));
  }

  handleMerge = (name, animation) => {
    const { mergedAnimations } = this.state;
    let mergeSlice = mergedAnimations.slice();
    const exists = mergedAnimations.findIndex(animation => animation.name === name);

    if (exists !== -1) {
      mergeSlice.splice(exists,1);
    } else {
      if (mergedAnimations.length === 2) {
        return;
      }
      mergeSlice.push(animation);
    }
    this.setState({
      mergedAnimations: mergeSlice,
    }, () => {
      if (mergeSlice.length === 2) {
        const newAnimationName= this.state.mergedAnimations[0]["name"] + this.state.mergedAnimations[1]["name"];

        // this is where the merge happens
        const mergedAnim = react_animations.merge(
          this.state.mergedAnimations[0]["animationName"],
          this.state.mergedAnimations[1]["animationName"],
        )
        const newAnimationsObject = Object.assign(
          {}, 
          this.state.animationsObject, 
          {[newAnimationName] : {
              animationName: mergedAnim,
              animationDuration: this.state.duration + 's',
              name: newAnimationName,
            }
          }
        );
        this.setState({  
          newAnimation: newAnimationName,     
          animationsObject: newAnimationsObject,
        })
        this.handleAnimation();
      }
    })
  }

  handleInput = (e) => {
    this.setState({
      currentAnimation: "",
      inputValue: e.target.value,
    })
  }

  handleIcon = (icon) => {
    this.setState({
      icon: icon ? icon : "fa-child",
      inputValue: "",
    })
  }

  handleDuration = (e) => {
    if (e.target.value < 0 || e.target.value > 25) {
      return false;
    } 
    const newSlice = Object.assign({}, this.state.animationsObject);
    for (let prop in newSlice) {
      console.log(prop)
      newSlice[prop].animationDuration = e.target.value + "s";
    }
    this.setState({
      currentAnimation: "",
      animationsObject: newSlice,
      duration: e.target.value,
    })
  }
  
  render() {
    const { animationsObject, inputValue, currentAnimation, showOptions, showMergeOptions, duration, mergedAnimations, newAnimation, icon, originalAnimations } = this.state;

    const stylesheet = StyleSheet.create(animationsObject);

     return (
      <div>

        <AnimationFrame 
          currentAnimation={currentAnimation}
          inputValue={inputValue}
          showMergeOptions={showMergeOptions}
          mergedAnimations={mergedAnimations}
          handleAnimation={this.handleAnimation} 
          newAnimation={newAnimation}
          stylesheet={stylesheet}
          icon={icon}
        />

        <a 
          href="https://github.com/gojutin/react-animations-demo" 
          rel="noopener noreferrer" 
          target="_blank">
          <i className={`fa fa-github fa-2x ${css(styles.github)}`} />
        </a>

        <div className={css(styles.optionsBox)}>
          <i 
            className="fa fa-ellipsis-h fa-2x" 
            onClick={this.toggleShowOptions} 
            style={{color: showOptions ? "#00C851" : "#4B515D"}}
          />
          <Options
            showOptions={showOptions} 
            inputValue={inputValue}
            handleInput={this.handleInput}
            duration={duration}
            handleDuration={this.handleDuration}
            handleIcon={this.handleIcon }
            icon={icon}
          />
          <h4 className={css(styles.mergeToggle)} onClick={this.toggleMergeOptions}>
              {showMergeOptions ? "close merge options" : "open merge options"}
            <i 
              style={{paddingLeft: 5 + "px"}}
              className={`
                fa
                ${showMergeOptions ? "fa-caret-up" : "fa-caret-down"}
              `}
            />
          </h4>

          <Merge showMergeOptions={showMergeOptions} />

          <AnimationButtons
            animationsObject={animationsObject}
            mergedAnimations={mergedAnimations}
            originalAnimations={originalAnimations}
            showMergeOptions={showMergeOptions}
            handleMerge={this.handleMerge} 
            handleAnimation={this.handleAnimation}
          />

            <ScrollToTop 
              showUnder={300} 
              style={{
                position: "fixed", 
                bottom: 0, 
                right: 45 + "%", 
                left: 45 + "%"
              }}
            >
              <i className={`fa fa-arrow-circle-up ${css(styles.scrollUpIcon)}`} />
            </ScrollToTop>

        </div>
      </div>
    );
  }
}

