import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  input: {
    borderRadius: 5 + "px",
    fontSize: 1.3 + "em",
    border: "1px solid lightgray",
    padding: 5 + "px",
    outline: "none",
    width: 98 + "%",
  },
})                

export default ({inputValue, onChange, type}) => 
  <input
    type={type}
    value={inputValue}
    onChange={onChange}
    className={css(styles.input)}
  />