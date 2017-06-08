import React from 'react';
import {Collapse} from 'react-collapse';

export default ({showMergeOptions}) =>
  <Collapse isOpened={showMergeOptions}>
      <div>
        Please select two animations. Your custom animations will be added as a button below.
      </div>
      <div>
        You can get really crazy and merge merged animations. Some combinations may not work well together. You will figure it out.
      </div>
      <br />
  </Collapse>