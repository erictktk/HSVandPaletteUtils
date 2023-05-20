/**
 * returns h [0, 360), s [0, 100), v [0, 100)
 *
 * @param {Array<int>} color
 * @returns
 */
export function rgb_to_hsv(color) {
  let r = color[0];
  let g = color[1];
  let b = color[2];

  // R, G, B values are divided by 255
  // to change the range from 0..255 to 0..1
  r = r / 255.0;
  g = g / 255.0;
  b = b / 255.0;

  // h, s, v = hue, saturation, value
  var cmax = Math.max(r, Math.max(g, b)); // maximum of r, g, b
  var cmin = Math.min(r, Math.min(g, b)); // minimum of r, g, b
  var diff = cmax - cmin; // diff of cmax and cmin.
  var h = -1,
    s = -1;

  // if cmax and cmax are equal then h = 0
  if (cmax === cmin) h = 0;
  // if cmax equal r then compute h
  else if (cmax === r) h = (60 * ((g - b) / diff) + 360) % 360;
  // if cmax equal g then compute h
  else if (cmax === g) h = (60 * ((b - r) / diff) + 120) % 360;
  // if cmax equal b then compute h
  else if (cmax === b) h = (60 * ((r - g) / diff) + 240) % 360;

  // if cmax equal zero
  if (cmax === 0) s = 0;
  else s = (diff / cmax) * 100;

  // compute v
  let v = cmax * 100;

  return [h, s, v];
}


//export function Clamp

/**
 * Hsv should be [0, 360), [0, 100) and
 *
 * returns an Array of RGB values
 *
 * @param {Array<int>} hsv
 * @returns {<Array<Number>}
 */
export function hsv_to_rgb(hsv) {
  //0 <= h, s, v <= 1 needs to be

  let h = hsv[0];
  let s = hsv[1];
  let v = hsv[2];

  h = h / 360;
  s = s / 100;
  v = v / 100;

  let r, g, b, i, f, p, q, t;
  if (arguments.length === 1) {
    (s = h.s), (v = h.v), (h = h.h);
  }
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0:
      (r = v), (g = t), (b = p);
      break;
    case 1:
      (r = q), (g = v), (b = p);
      break;
    case 2:
      (r = p), (g = v), (b = t);
      break;
    case 3:
      (r = p), (g = q), (b = v);
      break;
    case 4:
      (r = t), (g = p), (b = v);
      break;
    case 5:
      (r = v), (g = p), (b = q);
      break;
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

export function hsv2rgb(hsv) {
  let h = hsv[0];
  let s = hsv[1] / 100;
  let v = hsv[2] / 100;
  let f = (n, k = (n + h / 60) % 6) =>
    v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
  return [f(5) * 255, f(3) * 255, f(1) * 255];
}

/**
 *
 * @param {Array<int>} rgb
 * @param {Number} hueMod
 * @param {Number} saturateMod
 * @param {Number} valueMod
 * @returns {Array<Number>} an array of new RGB values
 */
export function HSVModSinglePixel(rgb, hueMod, saturateMod, valueMod) {
  let hsv = rgb_to_hsv(rgb);

  hsv[0] = hueMod;
  hsv[1] = Math.min(Math.max(hsv[1] + saturateMod, 0), 100);
  hsv[2] = Math.min(Math.max(hsv[2] + valueMod, 0), 100);

  let newRGB3 = hsv2rgb(hsv);
  let newRGB;

  if (rgb.length === 4) {
    newRGB = [newRGB3[0], newRGB3[1], newRGB3[2], rgb[3]];
  } else {
    newRGB = [newRGB3[0], newRGB3[1], newRGB3[2]];
  }

  return newRGB;
}

/**
 * 
 * @param {*} rgb 
 * @param {*} hueRotate what should the range be
 * @returns 
 */
export function RGBHueRotate(rgb, hueRotate) {
  let hsv = rgb_to_hsv(rgb);

  hsv[0] += hueRotate;

  let newRGB3 = hsv2rgb(hsv);
  let newRGB;

  if (rgb.length === 4) {
    newRGB = [newRGB3[0], newRGB3[1], newRGB3[2], rgb[3]];
  } else {
    newRGB = [newRGB3[0], newRGB3[1], newRGB3[2]];
  }
  return newRGB;
}

export function RGBBrighten(rgb, brighten) {
  let hsv = rgb_to_hsv(rgb);

  hsv[2] = Math.min(Math.max(hsv[2] + brighten, 0), 100);

  console.log(hsv);

  let newRGB3 = hsv2rgb(hsv);
  let newRGB;

  if (rgb.length === 4) {
    newRGB = [newRGB3[0], newRGB3[1], newRGB3[2], rgb[3]];
  } else {
    newRGB = [newRGB3[0], newRGB3[1], newRGB3[2]];
  }

  return newRGB;
}

export function RGBSetBrightness(rgb, brightness){
  let hsv = rgb_to_hsv(rgb);

  hsv[2] = brightness;

  //console.log(hsv);

  let newRGB3 = hsv2rgb(hsv);
  let newRGB;

  if (rgb.length === 4) {
    newRGB = [newRGB3[0], newRGB3[1], newRGB3[2], rgb[3]];
  } else {
    newRGB = [newRGB3[0], newRGB3[1], newRGB3[2]];
  }

  return newRGB;
}


export function RGBDesaturate(rgb, desaturation=50) {
  let hsv = rgb_to_hsv(rgb);
  console.log("desaturate:");
  console.log(hsv);
  hsv[1] = hsv[1]-desaturation;
  

  console.log(hsv);

  let newRGB3 = hsv2rgb(hsv);
  let newRGB;

  if (rgb.length === 4) {
    newRGB = [newRGB3[0], newRGB3[1], newRGB3[2], rgb[3]];
  } else {
    newRGB = [newRGB3[0], newRGB3[1], newRGB3[2]];
  }

  return newRGB;
}


//export function Blend