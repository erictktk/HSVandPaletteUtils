import * as HSVUtils from "./HSVUtils";
import * as rw from "eric-random-wrapper"


/**
 * 
 * @param {Array<Number>} colorArr 
 * @param {rw.RandomWrapper} rng 
 * @param {*} min 
 * @param {*} max 
 * @param {*} separate 
 * @returns 
 */
export function Pastelize(colorArr, rng=null, min=10, max=20, separate = false) {
  let value;
  if (!rng){
    value = Math.random()*(max-min)+min;
  }
  else{
    value = rng.random(min, max);
  }

  const newColors = [];
  for (let i = 0; i < colorArr.length; i += 1) {
    const curColor = colorArr[i];
    if (separate) {
      if (!rng){
        value = Math.random()*(max-min)+min;
      }
      else{
        value = rng.random(min, max);
      }
    }
    const newColor = HSVUtils.RGBDesaturate(curColor, value);
    newColors.push(newColor);
  }

  return newColors;
}
