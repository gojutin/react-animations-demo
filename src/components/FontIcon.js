import React from 'react';

export default ({icon, onClick, style, searchIconValue}) =>
<span onClick={onClick} className={searchIconValue && "column is-4"}>
  <i className={`fa ${icon}`} style={style} />
    {
      searchIconValue && <p>{icon}</p>
    }
</span>
