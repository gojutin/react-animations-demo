import React from 'react';
import ScrollToTop from 'react-scroll-up';

export default ({className}) => 
  <ScrollToTop 
    showUnder={300} 
    style={{
      position: "fixed", 
      bottom: 0, 
      right: 45 + "%", 
      left: 45 + "%"
    }}
  >
    <i className={`fa fa-arrow-circle-up ${className}`} />
  </ScrollToTop>