import React from 'react';

const IconButton = ({ backgroundColor, value, image, handleClick, text }) => {
  return (
    <div>
      <button style={{backgroundColor}} value={value} onClick={handleClick} >{image}</button>
      <p>{text}</p>
    </div>
  );
}

export default IconButton;