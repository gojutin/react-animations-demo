import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import * as react_animations from 'react-animations';
import styles from './appStyles';
import icons from './icons';

// components
import GitHub from './components/GitHub';
import AnimationFrame from './components/AnimationFrame';
import Options from './components/Options';
import ButtonGroup from './components/ButtonGroup';
import ScrollUp from './components/ScrollUp';

export default class App extends Component {

  state = {
    animations : {
      animationsObject: {},
      originalAnimations: {},
      currentAnimation: "",
      mergedAnimations: [],
      newAnimation: "",
      duration: 1,
    },
    inputValue: "",
    inputError: false,
    searchIconValue: "",
    showMergeOptions: false,
    showOptions: false,
    icon: "fa-code",
    showIcons: false,
    color: "#00C851",
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

  updateAnimations = (animationObject, callback) => {
    this.setState({
      animations: Object.assign(
        {}, this.state.animations, animationObject
      )
    }, () => { if (callback) callback();})
  }


  handleAnimation = animation => {
    const { showMergeOptions, animations } = this.state;
    this.updateAnimations({
        currentAnimation: "",
    }, () => {
      setTimeout(() => {
        if (showMergeOptions) {
          this.updateAnimations({
            currentAnimation: animations.newAnimation,
          })
        } else {
          this.updateAnimations({
            currentAnimation: animation,
          })
        }
      },100)
    })
  }

  handleSearchIcons = (e) => {
    const searchIconValue = e.target.value;
    this.setState({
      searchIconValue,
    });
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
      const { showOptions, showIcons, showMergeOptions } = this.state;
      if (!showOptions && showIcons ) {
        this.toggleShowIcons();
      }
      if (!showOptions && showMergeOptions ) {
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
      if (mergedAnimations.length === 2) {return;};
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
        const mergedAnimation = react_animations.merge(
          mergedAnimations[0]["animationName"],
          mergedAnimations[1]["animationName"],
        )
        const newAnimationsObject = Object.assign(
          {}, animationsObject, 
          {[newAnimationName] : {
              animationName: mergedAnimation,
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
      inputError: false,
    })
    if (e.target.value.length > 20){
      this.setState({
        inputError: true,
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
      icon: icon ? icon : "fa-code",
      inputValue: "",
    })
  }

  handleColor = ({hex}) => {
    this.setState({color: hex})
  }

  handleDuration = (value) => {
    const newSlice = Object.assign({}, this.state.animations.animationsObject);
    for (let prop in newSlice) {
      newSlice[prop].animationDuration = value + "s";
    }
    this.updateAnimations({
      currentAnimation: "",
      animationsObject: newSlice,
      duration: value,
    })
  }
  
  render() {
    const { animations, inputValue, inputError, showOptions, showMergeOptions, icon, showIcons, color, searchIconValue } = this.state;

    const stylesheet = StyleSheet.create(animations.animationsObject);

    const renderedIcons = searchIconValue 
      ? icons.filter(icon => icon.toLowerCase().includes(searchIconValue.toLowerCase())) 
      : icons;


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
          color={color}
        />

        <div className={css(styles.optionsBox)}>

          <i 
            className="fa fa-ellipsis-h" 
            onClick={this.toggleShowOptions} 
            style={{
              color: showOptions ? "#00C851" : "#4B515D", 
              marginBottom: 15 + "px", 
              cursor: "pointer"
            }}
          />

          <Options
            showOptions={showOptions} 
            showMergeOptions={showMergeOptions}
            toggleMergeOptions={this.toggleMergeOptions}
            inputValue={inputValue}
            renderedIcons={renderedIcons}
            handleSearchIcons={this.handleSearchIcons}
            searchIconValue={searchIconValue}
            inputError={inputError}
            handleInput={this.handleInput}
            duration={animations.duration}
            handleDuration={this.handleDuration}
            handleIcon={this.handleIcon }
            icon={icon}
            showIcons={showIcons}
            color={color}
            handleColor={this.handleColor}
            toggleShowIcons={this.toggleShowIcons}
          />

          <ButtonGroup
            animations={animations}
            showMergeOptions={showMergeOptions}
            handleMerge={this.handleMerge} 
            handleAnimation={this.handleAnimation}
          />

          <br />

          <ScrollUp className={css(styles.scrollUpIcon)} />
        </div>
      </div>
    );
  }
}

