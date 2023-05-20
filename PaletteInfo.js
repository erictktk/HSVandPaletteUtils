import React from 'react';
import { useState } from 'react';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { IconButton } from '@mui/material';

export function PaletteInfo({ colors, functionName = null }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const style = {
    fontSize: ".65rem",
    position: "absolute",
    marginLeft: "16px",
    marginTop: "-8px",
    padding: "4px 8px 4px 8px",
    backgroundColor: "rgb(60, 60, 60)",
    color: "lightgray",
    borderRadius: "6px",
    display: "flex",
  };

  const callback = () => {
    setIsExpanded(!isExpanded)
  }



  const size = 8;
  const iconButton = ( 

    <> 
    <div style={{}}>
      See Array
    </div>
    <IconButton className={`rotate-arrow ${!isExpanded ? 'open' : 'closed'}`}
      style={{color: "white"}} aria-label="upload picture" component="label" onClick={callback} sx={{width: size+"px", height: size+"px", marginTop: "-2px", marginRight: "-0px"}}>
      
      <ArrowBackIosOutlinedIcon sx={{width: size+"px", height: size+"px"}}/>
    </IconButton>
    </>
  );

  let string = '';
  if (isExpanded){
    for (let i = 0; i < colors.length; i += 1) {
      const c = colors[i];
      //string += `rgb(${Math.round(c[0])}, ${Math.round(c[1])}, ${Math.round(c[2])})`;
      string += `[${Math.round(c[0])}, ${Math.round(c[1])}, ${Math.round(c[2])}]`;
      if (i !== colors.length - 1) {
        string += ', ';
      }
    }
  }
  /*
  return (
    <div style={style}>
      {iconButton}{string}, {' '}{functionName}
    </div>
  );*/

  return (
    <div style={style}>
      {iconButton}{string} {' '}{functionName}
    </div>
  );
}
