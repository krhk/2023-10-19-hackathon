import React, { useState } from "react";
import { Map, Marker,Overlay,GeoJson } from "pigeon-maps"
import {ReactComponent as ReactLogo} from '../assets/Point.svg';


export function MiddleOfPolygon(array:any,possition:any){
  var data;
  let minDistance = 1000000;
    for (var a = 0; a < array.length; a++) {
      var distance = Math.sqrt((possition[1] - array[a].geometry.coordinates[0][0][0][0]) * (possition[1] - array[a].geometry.coordinates[0][0][0][0]) + (possition[0] - array[a].geometry.coordinates[0][0][0][1]) * (possition[0] - array[a].geometry.coordinates[0][0][0][1]));
      if(isNaN(distance)){
        distance=Math.sqrt((possition[1] - array[a].geometry.coordinates[0][0][0]) * (possition[1] - array[a].geometry.coordinates[0][0][0]) + (possition[0] - array[a].geometry.coordinates[0][0][1]) * (possition[0] - array[a].geometry.coordinates[0][0][1]));
        
        if (distance < minDistance) {
          minDistance = distance;
          data = array[a]
        }
      }
      else if(distance < minDistance) {
        minDistance = distance;
        data = array[a];
      }
    }
return(data)
}
