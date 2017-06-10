import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import icons from '../icons';
import Toggle from 'react-toggle'
import {Collapse} from 'react-collapse';

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
    borderRadius: 5 + "px",
    margin: 15 + "px",
    overflowY: "auto",
	  "-webkitOverflowScrolling": "touch",
  },
  optionsWrapper: {
    marginBottom: 25 + "px",
  },
});

export default ({showOptions, inputValue, inputError, handleInput, duration, handleDuration, handleIcon, icon, children, showMergeOptions, toggleMergeOptions, toggleShowIcons, showIcons }) =>
<div>
  <Collapse isOpened={showOptions}>
    <div className={css(styles.optionsWrapper)}>
      <div className="columns is-mobile is-multiline">
        <div className="column is-3-tablet is-offset-3-tablet is-12-mobile">
          <label>text</label>
          <Input
            type="text"
            inputValue={inputValue}
            inputError={inputError}
            onChange={handleInput}
          />
        </div>
      
        <div className="column is-1-tablet is-4-mobile is-offset-1-mobile  ">
          <label>duration</label>
            <Input
              type="number"
              inputValue={duration}
              onChange={handleDuration}
            />  
        </div>
        <div className="column is-1-tablet is-3-mobile ">
          <p>merge</p>
          <Toggle
            checked={showMergeOptions}
            onChange={toggleMergeOptions} 
          />
        </div>
        <div className="column is-1-tablet is-3-mobile ">
          <p>icons</p>
          <Toggle
            checked={showIcons}
            onChange={toggleShowIcons} 
          />
        </div>
      </div>
      </div>
    </Collapse>
    <Collapse isOpened={showOptions && showMergeOptions}>
      <div>
        Please select two animations. Your custom animations will be added as buttons below until you close the browser tab.
      </div>
      <div>
        You can get really crazy and merge merged animations. Some combinations may not work well together. You will figure it out.
      </div>
      <br />
    </Collapse>
    <Collapse isOpened={showOptions && showIcons}>
      <div className={css(styles.iconBox)}>
        { icons.map((thisIcon, i) => 
            <FontIcon 
              key={i} 
              className={`fa ${thisIcon}`} 
              onClick={() => handleIcon(thisIcon)}
              style={{color: thisIcon === icon ? "#00C851": "#3E4551", margin:5 + "px"}}
            />
          )
        }
      </div>
    <br />
  </Collapse>
</div>

