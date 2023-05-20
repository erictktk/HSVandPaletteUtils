import * as HSVUtils from "./HSVUtils";
import * as rw from "eric-random-wrapper";

/**
 * 
 * @param {Array<Number>} color 
 * @param {rw.RandomWrapper} rng 
 * @param {Number} distRange 
 */
export function OppositeColor(color, distRange=30, rng=null){
    let dist;
    let actualDistRange = [];
    if (typeof(distRange) === "number"){
        actualDistRange = [-distRange*.5, distRange*.5];
        if (!rng){
            const u = (Math.random()-.5);  //[-.5, .5];
            dist = u*distRange;
        }
        else{
            dist = rng.random(-distRange*.5, distRange*.5);
        }
    }
    else{
        let unsignedDist;
        if (!rng){
            const range = distRange[1]-distRange[0];
            unsignedDist = Math.random()*range + distRange[0];
            dist = Math.random() > .5 ? unsignedDist : -unsignedDist;
        }
        else{
            unsignedDist = rng.random(distRange[0], distRange[1]);
            dist = rng.random(0, 1) > .5 ? unsignedDist : -unsignedDist;
        }
    }
}

/**
 * 
 * @param {Array<Number>} color 
 * @param {Number} percentage 
 */
export function DarkColors(color, percentage=.0025){
    return color.map( e => Math.round(e*percentage) );
}