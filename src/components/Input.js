import React from 'react';
import _ from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  inputWrapper: {
    height: 50 + "px"
  },
  input: {
    borderRadius: 5 + "px",
    fontSize: 1.3 + "em",
    border: "1px solid lightgray",
    padding: 5 + "px",
    outline: "none",
    width: 98 + "%",
  },
})                

const Input = ({inputValue, inputError, onChange, type}) => 
  <div className={css(styles.inputWrapper)}>
    <input
      type={type}
      value={inputValue}
      onChange={onChange}
      className={css(styles.input)}
    />
    <div>{inputError}</div>
  </div>

Input.propTypes = {
  inputValue: _.string,
  inputError: _.string, 
  onChange: _.func, 
  type: _.string

}

export default Input;
