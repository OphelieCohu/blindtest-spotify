import React from 'react';
import './Button.css';
import AlbumCover from "./AlbumCover";



const Button = (props) => (
  <button onClick={props.onClick}>{props.children}</button>
);

export default Button;
