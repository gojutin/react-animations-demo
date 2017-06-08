import React from 'react';
import {Collapse} from 'react-collapse';

export default ({showMergeOptions, className, toggleMergeOptions}) =>
  <div>
    <h4 className={className} onClick={toggleMergeOptions}>
        {showMergeOptions ? "close merge options" : "open merge options"}
      <i 
        style={{paddingLeft: 5 + "px"}}
        className={`
          fa
          ${showMergeOptions ? "fa-caret-up" : "fa-caret-down"}
        `}
      />
    </h4>
    <Collapse isOpened={showMergeOptions}>
        <div>
          Please select two animations. Your custom animations will be added as a button below.
        </div>
        <div>
          You can get really crazy and merge merged animations. Some combinations may not work well together. You will figure it out.
        </div>
        <br />
    </Collapse>
  </div>  