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
    height: 175 + "px", 
    overflow: "auto", 
    cursor: "pointer", 
    border: "2px solid #3E4551",
    borderRadius: 5 + "px",
  },
});

export default ({showOptions, inputValue, handleInput, duration, handleDuration, handleIcon, icon }) =>
  <Collapse isOpened={showOptions}>
    <div className="columns">
      <div className="column is-10">
        <label>Type something</label>
        <Input
          type="text"
          inputValue={inputValue}
          onChange={handleInput}
        />
      </div>
  
 
      <div className="column is-2">
        <label>Duration</label>
          <Input
            type="number"
            inputValue={duration}
            onChange={handleDuration}
          />  
      </div>
      </div>
    <label>Choose an icon</label>
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
  </Collapse>

