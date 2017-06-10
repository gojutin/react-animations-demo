import React from 'react';

export default ({className, onClick, children}) =>
  <div className="column is-2-desktop is-3-tablet is-12-mobile" style={{padding: 1 + "px", overflowY: "hidden"}}>
    <div
      className={className}
      
      onClick={onClick}
    >
      {children}
    </div>
  </div>