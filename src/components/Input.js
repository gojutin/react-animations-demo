import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({

  input: {
    borderRadius: 5 + "px",
    fontSize: 1.3 + "em",
    // lineHeight: 1.5 + "em",
    border: "1px solid lightgray",
    padding: 5 + "px",
    outline: "none",
    margin: 0,
    width: 95 + "%",
  },
})

export default ({inputValue, onChange, type, placeholder, animation}) => 
    <input
      type={type}
      value={inputValue}
      onChange={(e) => onChange(e, animation)}
      placeholder={placeholder}
      className={`
        ${css(styles.input)}
      `}
    />