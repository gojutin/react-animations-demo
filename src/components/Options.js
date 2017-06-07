import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import icons from '../icons';
import {Collapse} from 'react-collapse';

// components
import Input from './Input';
import FontIcon from './FontIcon';

const styles = StyleSheet.create({
  icons: {
    padding: 5 + "px",
  },
  iconBox: {
    height: 200 + "px", 
    overflow: "auto", 
    cursor: "pointer", 
    border: "2px solid #3E4551",
    borderRadius: 5 + "px",
  },
});

export default ({showOptions, inputValue, handleInput, duration, handleDuration, handleIcon, icon }) =>
  <Collapse isOpened={showOptions}>
      <div style={{width: 70 + "%", display: "inline-block", margin: 5 + "px"}}>
        <label>Type anything you want</label>
        <Input
          type="text"
          inputValue={inputValue}
          onChange={handleInput}
        />
      </div>
      <div style={{width: 15 + "%", display: "inline-block", margin: 5 + "px"}}>
        <label>Duration</label>
          <Input
            type="number"
            inputValue={duration}
            onChange={handleDuration}
          />  
      </div>
    <br />
    <label>Choose an icon</label>
    <div className={css(styles.iconBox)}>
        { icons.map((thisIcon, i) => 
            <FontIcon 
              key={i} 
              className={`fa ${thisIcon}`} 
              onClick={() => handleIcon(thisIcon)}
              style={{color: thisIcon === icon ? "green": "gray", margin:5 + "px"}}
            />
          )

        }
    </div>
  </Collapse>

