import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import {Collapse} from 'react-collapse';
import Row from './Row';

const styles = StyleSheet.create({
  mergeText: {
    padding: "0px 5px",  
    margin: 8 + "px", 
    color: "#3E4551"
  },
});

export default ({showMergeOptions, handleAnimation, newAnimation, mergedAnimations}) =>
  <Collapse isOpened={showMergeOptions}>
  <Row>

        <p className={css(styles.mergeText)}>
          Please select two animations. Your custom animations will be added to the list below.
        </p>
        <p className={css(styles.mergeText)}>
          You can get really crazy and merge merged animations. Some combinations may not work well together. You will figure it out.
        </p>

  
    </Row>
  </Collapse>