import * as rw from 'eric-random-wrapper';
import * as HSVUtils from '../HSVUtils';
import * as ColorFunctions from '../ColorFunctions';
import * as Pastelize from '../Pastelize';

export const NeonStandards = [
    [255, 255, 0], //yellow
    [255, 0, 0], //red
    [85, 255, 0], //green
    [255, 0, 255], //purple
    [255, 0, 85], //pink
];


/**
 * 
 * @param {rw.RandomWrapper} rng 
 */
export function Neon(rng=null, pastelizeSecond=false){
    if(!rng){
        rng = new rw.RandomWrapper(Math.random());
    }

    const choice = rw.Choice(NeonStandards);

    const rotateDist = rng.random(-30, 30);
    let pColor1 = HSVUtils.RGBHueRotate(choice, rotateDist);
    const p2Dist = rng.random(-10, 10);
    let pColor2 = HSVUtils.RGBHueRotate(pColor1, p2Dist);
    pColor2 = HSVUtils.RGBBrighten(pColor2, -10);

    const primaryColors = [pColor1, pColor2];

    let sColor1 = ColorFunctions.OppositeColor(pColor1, 30, rng);
    let sColor2 = HSVUtils.RGBHueRotate(sColor1, p2Dist);

    let secondaryColors = [sColor1, sColor2];

    if (pastelizeSecond){
        secondaryColors = Pastelize.Pastelize(secondaryColors, rng);
    }

    return [...primaryColors, ...secondaryColors];
}

export function GetOppositeNeon(color){
    let oppositeColor = HSVUtils.RGBHueRotate(color, Math.random()*360);
    oppositeColor = HSVUtils.RGBSetBrightness(oppositeColor, Math.random()*20 );
    return oppositeColor;
}