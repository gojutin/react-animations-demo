import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import * as anim from 'react-animations';
import styles from './appStyles';
import icons from './icons';

// components
import Input from './components/Input';
import Container from './components/Container';
import Row from './components/Row';
import Col from './components/Col';
import Select from 'react-select';

export default class App extends Component {

  state = {
    animationsObject: {},
    currentAnimation: "",
    mergedAnimations: [],
    stylesheet: {},
    inputValue: "",
    showMergeOptions: false,
    duration: '1',
    newAnimation: "",
    icon: "fa-child",
    iconClass: "fa fa-child"
  }

  componentWillMount() {
    this.resetAnimations();
  }

  resetAnimations = () => {
    let animationsObject = {};
    Object.keys(anim).forEach(key => {
      if (key !== "merge") {
        return animationsObject[key] = {
          animationName: anim[key],
          animationDuration: '1s',
          name: key,
        }
      }
    })
    this.setState({
      animationsObject,
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

  handleShowMergeOptions = () => {
    this.setState(prevState => ({
      showMergeOptions: !prevState.showMergeOptions,
      currentAnimation: "",
      mergedAnimations: [],
    }));
    this.resetAnimations();
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
        const mergedAnim = anim.merge(
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
      icon: icon ? icon.value : "fa-child",
      iconClass: icon ? icon.className: "fa fa-child",
      inputValue: "",
    })
  }

  handleDuration = (e) => {
    if (e.target.value < 1 || e.target.value > 10) {
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
    const { animationsObject, stylesheet, inputValue, currentAnimation, showMergeOptions, duration, mergedAnimations, newAnimation } = this.state;

    let iconsArray = [];
    icons.map(icon => iconsArray.push({
      value: icon, 
      label: icon, 
      className:"fa " + icon
    })); 

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
        </div>
        <a 
          href="https://github.com/gojutin/react-animations-demo" 
          rel="noopener noreferrer" 
          target="_blank">
          <i className={`fa fa-github fa-2x ${css(styles.github)}`} />
        </a>

        <Container className={css(styles.optionsBox)}>
          <Row>
            <Col className="col-xs-12 col-sm-12 col-md-7">
              <label className={css(styles.label)}>Type a phrase</label>
              <Input
                type="text"
                inputValue={inputValue}
                onChange={this.handleInput}
              />
            </Col>
            <Col className="col-xs-12 col-sm-8 col-md-3">
              <label className={css(styles.label)}>Choose a new icon</label>
              <Select
                name="form-field-name"
                value={this.state.icon}
                options={iconsArray}
                onChange={this.handleIcon} 
                className={css(styles.select)}  
              />
            </Col>
            <Col className="col-xs-12 col-sm-4 col-md-2">
              <label className={css(styles.label)}>Select duration</label>
                <Input
                  type="number"
                  inputValue={duration}
                  onChange={this.handleDuration}
                />  
            </Col>
          </Row>

          <h3 className={css(styles.mergeToggle)} onClick={this.handleShowMergeOptions}>
            {showMergeOptions ? "close merge" : "merge"}
            <i 
              className={`
                fa
                ${showMergeOptions ? "fa-caret-up" : "fa-caret-down"}
              `}
            />
          </h3>

          { !showMergeOptions && <div className={css(styles.filler)} />}

          { showMergeOptions && 
            <Row>
              { mergedAnimations.length === 2 
               ? 
                  <button 
                    onClick={this.handleAnimation} 
                    className={css(styles.mergeButton)}
                  >
                    <i className="fa fa-play" style={{marginRight: 5 + "px"}} />
                    {newAnimation}
                  </button>
               : <div>
                  <p className={css(styles.mergeText)}>
                    Please select two animations.  Your custom animations will be added to the animation list below.
                  </p>
                  <p className={css(styles.mergeText)}>
                    You can get really crazy and merge merged animations. Some combinations will not work together. You will figure it out.
                  </p>
                </div>
              }
              </Row>
            }

            <Row>
              { Object.keys(animationsObject).map(key => {
                  const name = animationsObject[key]["name"];
                  const isSelected = mergedAnimations.find(animation => animation.name === name);     
                  return (
                    <span key={name}>
                      <div
                        key={name} 
                        className={`
                          ${css(styles.animationButton)}
                          ${showMergeOptions && css(styles.animationButtonMerge) }
                          ${isSelected && css(styles.animationButtonSelected)}
                        `}
                        onClick={
                          showMergeOptions 
                            ? () => this.handleMerge(name, animationsObject[key])
                            : () => this.handleAnimation(name)
                        }
                      >
                        {name}
                      </div>
                    </span>
                  )
                }
              )}
            </Row>
          </Container>
        </div>
      
    );
  }
}

