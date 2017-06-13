import React from 'react';
import _ from 'prop-types';
import { headShake } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  inputWrapper: {
    height: 45 + "px",
    marginBottom: 2 + "px",
  },
  input: {
    borderRadius: 5 + "px",
    fontSize: 1.3 + "em",
    border: "1px solid lightgray",
    padding: 5 + "px",
    outline: "none",
    width: 98 + "%",
    textAlign: "center",
  },
  headShake: {
    animationName: headShake,
    animationDuration: '1s',
  },
})                

const Input = ({inputValue, inputError, onChange, type, placeholder}) => 
  <div className={css(styles.inputWrapper)}>
    <input
      type={type}
      value={inputValue}
      onChange={onChange}
      className={css(styles.input, inputError && styles.headShake)}
      placeholder={placeholder}
    />
  </div>

Input.propTypes = {
  inputValue: _.string,
  inputError: _.bool, 
  onChange: _.func, 
  type: _.string,
  placeholder: _.string,
}

export default Input;
