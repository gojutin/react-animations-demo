import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import * as react_animations from 'react-animations';
import styles from './appStyles';

// components
import GitHub from './components/GitHub';
import AnimationFrame from './components/AnimationFrame';
import Options from './components/Options';
import AnimationButtons from './components/AnimationButtons';
import ScrollUp from './components/ScrollUp';

export default class App extends Component {

  state = {
    animations : {
      animationsObject: {},
      originalAnimations: {},
      currentAnimation: "",
      mergedAnimations: [],
      newAnimation: "",
      duration: '1',
    },
    inputValue: "",
    inputError: "",
    showMergeOptions: false,
    showOptions: false,
    icon: "fa-child",
    showIcons: false,
  }

  componentWillMount() {
    this.fetchAnimations();
  }

  fetchAnimations = () => {
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
    this.updateAnimations({
      animationsObject,
      originalAnimations: animationsObject,
    })
  }

  updateAnimations = (animationObject, cb) => {
    this.setState({
      animations: Object.assign({}, this.state.animations, animationObject)
    }, () => { if (cb) cb();})
  }


  handleAnimation = animation => {
    this.updateAnimations({
        currentAnimation: "",
    }, () => {
      setTimeout(() => {
        if (this.state.showMergeOptions) {
          this.updateAnimations({
            currentAnimation: this.state.animations.newAnimation,
          })
        } else {
          this.updateAnimations({
            currentAnimation: animation,
          })
        }
      },100)
    })
  }

  toggleMergeOptions = () => {
    this.setState(prevState => ({
      showMergeOptions: !prevState.showMergeOptions,
    }));
    this.updateAnimations({
      currentAnimation: "",
      mergedAnimations: [],
    })
  }

  toggleShowOptions = () => {
    this.setState(prevState => ({
      showOptions: !prevState.showOptions,
    }), () => {
      if (!this.state.showOptions && this.state.showIcons ) {
        this.toggleShowIcons();
      }
      if (!this.state.showOptions && this.state.showMergeOptions ) {
        this.toggleMergeOptions();
      }
    });
  }

  toggleShowIcons = () => {
    this.setState(prevState => ({
      showIcons: !prevState.showIcons,
    }));
  }

  handleMerge = (name, animation) => {
    const { mergedAnimations } = this.state.animations;
    let mergeSlice = mergedAnimations.slice();
    const exists = mergedAnimations.findIndex(animation => 
      animation.name === name
    );

    if (exists !== -1) {
      mergeSlice.splice(exists,1);
    } else {
      if (mergedAnimations.length === 2) {return};
      mergeSlice.push(animation);
    }
    this.updateAnimations({
      mergedAnimations: mergeSlice,
    }, () => {
      if (mergeSlice.length === 2) {
        const { mergedAnimations, animationsObject, duration } = this.state.animations;
        const newAnimationName= mergedAnimations[0]["name"] 
          + mergedAnimations[1]["name"];

        // this is where the merge happens
        const mergedAnim = react_animations.merge(
          mergedAnimations[0]["animationName"],
          mergedAnimations[1]["animationName"],
        )
        const newAnimationsObject = Object.assign(
          {}, 
          animationsObject, 
          {[newAnimationName] : {
              animationName: mergedAnim,
              animationDuration: duration + 's',
              name: newAnimationName,
            }
          }
        );
        this.updateAnimations({  
          newAnimation: newAnimationName,     
          animationsObject: newAnimationsObject,
        }, () => this.handleAnimation())
      }
    })
  }

  handleInput = (e) => {
    this.setState({
      inputError: "",
    })
    if (e.target.value.length > 30){
      this.setState({
        inputError: "oops...you ran out of space"
      }, () => {return false;})
    } else {
      this.setState({
        inputValue: e.target.value,
      })
      this.updateAnimations({currentAnimation: ""})
    }
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
    const newSlice = Object.assign({}, this.state.animations.animationsObject);
    for (let prop in newSlice) {
      console.log(prop)
      newSlice[prop].animationDuration = e.target.value + "s";
    }
    this.updateAnimations({
      currentAnimation: "",
      animationsObject: newSlice,
      duration: e.target.value,
    })
  }
  
  render() {
    const { animations, inputValue, inputError, showOptions, showMergeOptions, icon, showIcons } = this.state;

    const stylesheet = StyleSheet.create(animations.animationsObject);

     return (
      <div>

        <GitHub className={css(styles.github)} />

        <AnimationFrame 
          animations={animations}
          inputValue={inputValue}
          showMergeOptions={showMergeOptions}
          handleAnimation={this.handleAnimation} 
          stylesheet={stylesheet}
          icon={icon}
        />

        <div className={css(styles.optionsBox)}>
          <i 
            className="fa fa-ellipsis-h fa-2x" 
            onClick={this.toggleShowOptions} 
            style={{color: showOptions ? "#00C851" : "#4B515D", marginBottom: 10 + "px"}}
          />
          <Options
            showOptions={showOptions} 
            showMergeOptions={showMergeOptions}
            toggleMergeOptions={this.toggleMergeOptions}
            inputValue={inputValue}
            inputError={inputError}
            handleInput={this.handleInput}
            duration={animations.duration}
            handleDuration={this.handleDuration}
            handleIcon={this.handleIcon }
            icon={icon}
            showIcons={showIcons}
            toggleShowIcons={this.toggleShowIcons}
          />

          <AnimationButtons
            animations={animations}
            showMergeOptions={showMergeOptions}
            handleMerge={this.handleMerge} 
            handleAnimation={this.handleAnimation}
          />

          <ScrollUp className={css(styles.scrollUpIcon)} />
        </div>
      </div>
    );
  }
}

