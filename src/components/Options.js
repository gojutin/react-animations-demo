import React from 'react';
import _ from 'prop-types';
import { css, StyleSheet } from 'aphrodite';
import Toggle from 'react-toggle'
import {Collapse} from 'react-collapse';
import Slider from 'rc-slider';
import { SliderPicker } from 'react-color';


// components
import Input from './Input';
import FontIcon from './FontIcon';

const styles = StyleSheet.create({
  icons: {
    padding: 5 + "px",
  },
  iconBox: {
    height: 175 + "px", 
    cursor: "pointer", 
    border: "1px solid #3E4551",
    margin: 0,
    borderRadius: 5 + "px",
    overflowY: "auto",
	  "-webkitOverflowScrolling": "touch",
  },
  optionsWrapper: {
    marginTop: 10 + "px",
  },
});

const Options = ({
  showOptions, inputValue, inputError, handleInput, 
  duration, handleDuration, handleIcon, icon, 
  children, showMergeOptions, toggleMergeOptions, 
  toggleShowIcons, showIcons, color, handleColor, 
  searchIconValue, handleSearchIcons, renderedIcons
}) =>
<div>
  <Collapse isOpened={showOptions}>
    <div className={css(styles.optionsWrapper)}>
      <div className="columns is-mobile is-multiline">
        <div 
          className={`
            column 
            is-6-tablet is-offset-3-tablet 
            is-10-mobile is-offset-1-mobile
          `}
          style={{padding:"0px .75em"}}
        >
          <label>color</label>
            <SliderPicker
              color={color}
              onChange={handleColor}
            />
            <br/>
        </div>
        <div 
          className={`
            column 
            is-6-tablet is-offset-3-tablet 
            is-10-mobile is-offset-1-mobile
          `}
          style={{padding:"0px .75em"}}
        >
          <label>
            duration- {duration.toFixed(1)} second
            {duration > 1 && "s"}
          </label>
          <Slider
            max={60}
            min={.5}
            step={.5}
            value={+duration}
            onChange={value => handleDuration(value)} 
          />
          <br />
        </div>
        <div 
          className={`
            column 
            is-4-tablet is-offset-3-tablet 
            is-10-mobile is-offset-1-mobile
          `}
          style={{padding:"0px .75em 5px .75em"}}
        >
          <label>text</label>
          <Input
            type="text"
            inputValue={inputValue}
            inputError={inputError}
            onChange={handleInput}
          />
        </div>
      
        <div 
          className="column is-1-tablet is-3-mobile is-offset-3-mobile"
          style={{padding:"0px .75em"}}
        >
          <p>merge</p>
          <Toggle
            checked={showMergeOptions}
            onChange={toggleMergeOptions} 
          />
        </div>
        <div 
          className="column is-1-tablet is-3-mobile"
          style={{padding:"0px .75em"}}
        >
          <p>icons</p>
          <Toggle
            checked={showIcons}
            onChange={toggleShowIcons} 
          />
        </div>
      </div>
    </div>

    <br />
  </Collapse>
  <br />
  <Collapse isOpened={showOptions && showMergeOptions}>
    <div>
      Please select two animations to merge. Your custom animations will be added as buttons below until you close the browser tab.
    </div>
    <div>
      You can get really crazy and merge merged animations. Some combinations may not work well together. You will figure it out.
    </div>
    <br />
  </Collapse>
  <Collapse isOpened={showOptions && showIcons}>
    <div 
      className={`
        column 
        is-4-tablet is-offset-4-tablet 
        is-12-mobile
      `}
      style={{padding:"0px .75em"}}
    >
      <label>font-awesome icons</label>
      <Input
        type="text"
        inputValue={searchIconValue}
        onChange={handleSearchIcons}
        placeholder="search icons"
      />
    </div>
    <div className={`
      ${css(styles.iconBox)} 
      columns is-multiline is-mobile
    `}>
      { renderedIcons.map((thisIcon, i) => 
          <FontIcon 
            key={i} 
            icon={thisIcon}
            onClick={() => handleIcon(thisIcon)}
            searchIconValue={searchIconValue}
            style={{color: thisIcon === icon ? "#00C851": "#3E4551", margin: 5 + "px"}}
          />
        )
      }
    </div>
    <br />
  </Collapse>
</div>

Options.propTypes = {
  showMergeOptions: _.bool, 
  showOptions: _.bool,
  inputValue: _.bool,
  inputError: _.string,
  handleInput: _.func,
  handleDuration: _.func,
  duration: _.number,
  handleIcon: _.func,
  icon: _.string,
  handleColor: _.func,
  color: _.string,
  toggleMergeOptions: _.func,
  toggleShowIcons: _.func,
  showIcons: _.bool,
}

export default Options;


