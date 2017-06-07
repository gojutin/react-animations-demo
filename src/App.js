import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import * as react_animations from 'react-animations';
import styles from './appStyles';

// components
import Container from './components/Container';
import Row from './components/Row';
import Col from './components/Col';
import Options from './components/Options';
import Merge from './components/Merge';

export default class App extends Component {

  state = {
    animationsObject: {},
    originalAnimations: {},
    currentAnimation: "",
    mergedAnimations: [],
    stylesheet: {},
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
      stylesheet: StyleSheet.create(animationsObject),
    })
  }


  handleAnimation = animation => {
    this.setState(prevState => ({
        currentAnimation: "",
      }), () => {
        setTimeout(() => {
        if (this.state.showMergeOptions) {
          this.setState({
            currentAnimation: this.state.newAnimation,
          })
        } else {
          this.setState({
            currentAnimation: animation,
          })
        }
        }, 100)
      })
  }

  toggleMergeOptions = () => {
    this.setState(prevState => ({
      showMergeOptions: !prevState.showMergeOptions,
      currentAnimation: "",
      mergedAnimations: [],
    }));
    // this.resetAnimations();
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
        });
        this.setState({  
          newAnimation: newAnimationName,     
          animationsObject: newAnimationsObject,
          stylesheet: Object.assign({},
            this.state.stylesheet, 
            StyleSheet.create(newAnimationsObject)
          ),
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
    const newStyleSheet = StyleSheet.create(newSlice);
    this.setState({
      currentAnimation: "",
      duration: e.target.value,
      stylesheet: newStyleSheet,
    })
  }
  
  render() {
    const { animationsObject, stylesheet, inputValue, currentAnimation, showOptions, showMergeOptions, duration, mergedAnimations, newAnimation, icon, originalAnimations } = this.state;

     return (
      <div>
        <div className={css(styles.animationBox)}>
          { inputValue 
            ? <h1 className={`
                ${css(styles.text)}
                ${css(stylesheet[currentAnimation])}
              `}>
                {inputValue}
              </h1>
            : <i className={` 
                  fa
                  ${this.state.icon}
                  ${css(styles.child)}
                  ${css(stylesheet[currentAnimation])}
                `}
              />   
          }
          { showMergeOptions && 
            <div>
              <button 
              onClick={this.handleAnimation} 
              className={css(styles.mergeButton)}
              style={{display: mergedAnimations.length === 2 ? "inline-block" : "none" }}
              >
                <i className="fa fa-repeat" style={{marginRight: 5 + "px", wordWrap: "nowrap"}} />
                {newAnimation}
              </button>
            </div>
          }
 
        </div>
        <a 
          href="https://github.com/gojutin/react-animations-demo" 
          rel="noopener noreferrer" 
          target="_blank">
          <i className={`fa fa-github fa-2x ${css(styles.github)}`} />
        </a>

        <Container className={css(styles.optionsBox)}>
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
          <h3 className={css(styles.mergeToggle)} onClick={this.toggleMergeOptions}>
              {showMergeOptions ? "close merge" : "merge"}
            <i 
              style={{paddingLeft: 5 + "px"}}
              className={`
                fa
                ${showMergeOptions ? "fa-caret-up" : "fa-caret-down"}
              `}
            />
          </h3>

            <Merge
              showMergeOptions={showMergeOptions}
              mergedAnimations={mergedAnimations}
              handleAnimation={this.handleAnimation}
              newAnimation={newAnimation}
            />


            <Row>
              { Object.keys(animationsObject).map(key => {
                  const name = animationsObject[key]["name"];
                  const isSelected = mergedAnimations.find(animation => animation.name === name);
                  const isOriginal = originalAnimations[name];
                  return (
                    <Col key={name} className="col-xs-12 col-sm-3 col-md-2">
                      <div
                        key={name} 
                        className={`
                          ${css(styles.animationButton)}
                          ${showMergeOptions && css(styles.animationButtonMerge) }
                          ${isSelected && css(styles.animationButtonSelected)}
                          ${!isOriginal && css(styles.newAnimation) }
                        `}
                        onClick={
                          showMergeOptions 
                            ? () => this.handleMerge(name, animationsObject[key])
                            : () => this.handleAnimation(name)
                        }
                      >
                        {name}
                      </div>
                    </Col>
                  )
                }
              )}
            </Row>
          </Container>
        </div>
      
    );
  }
}

