import * as rw from "eric-random-wrapper";
import * as HSVUtils from "../HSVUtils";
import { Pastelize } from "../Pastelize";
import { Darken } from "../SolidColor";


export function RandomSolidColor(darken = false, fixOrange = true) {
  const red = [255, 0, 0];
  const green = [0, 205, 25];
  const teal = [0, 255, 255];
  const blue = [0, 0, 255];
  const orange = [275, 195, 0];
  const purple = [255, 0, 255];
  const yellow = [255, 255, 0];

  let indices = [0, 1, 2, 3, 4, 5];


  let color = rw.Choice([red, green, blue, orange, purple, yellow]);
  console.log(color);

  //color = orange;
  const rng = new rw.RandomWrapper();

  const distance = rng.random(30, 180);

  const actualColor = HSVUtils.RGBBrighten(color, -25);
  const desaturated = HSVUtils.RGBDesaturate(color, 10);

  let oppositeColor = HSVUtils.RGBHueRotate(color, distance);


  oppositeColor = HSVUtils.RGBDesaturate(oppositeColor, 15);
  oppositeColor = HSVUtils.RGBBrighten(oppositeColor, -10);

  let oppositeColor2 = HSVUtils.RGBHueRotate(oppositeColor, rng.random(15, 20));
  //oppositeColor2 = HSVUtils.HSVDesaturate(oppositeColor2, rng.random(10, 10));
  oppositeColor2 = HSVUtils.RGBDesaturate(oppositeColor2, rng.random(-10, -20));

  const primaryColors = [actualColor, desaturated];
  const oppositeColors = [oppositeColor, oppositeColor2];

  let final;
  if (darken) {
    final = [...Darken(primaryColors, rng, 10, 20), ...oppositeColors];
  }
  else {
    final = [...primaryColors, ...oppositeColors];
  }

  if (true) {
    final = Pastelize(final, rng, 30, 70);
  }

  return final;
}
