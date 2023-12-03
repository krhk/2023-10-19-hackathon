import React, { useState } from "react";
import { Map, Marker,Overlay,GeoJson } from "pigeon-maps"
import {ReactComponent as ReactLogo} from '../assets/Point.svg';


export function BusFormPoint(possition:any){

  const [Bus, setBus] = useState<any>([]);

  fetch("http://localhost:3000/DataBackup/Autobus.geo.json").then(response => response.json())
  .then(data => setBus(data.features))
  .catch(error => console.error(error));

  var data;
  let minDistance = 1000000;
  
  for (var a = 0; a < Bus.length; a++) {
    var distance = Math.sqrt((possition[0] - Bus[a].geometry.coordinates[0]) * (possition[0] - Bus[a].geometry.coordinates[0]) + (possition[1] - Bus[a].geometry.coordinates[1]) * (possition[1] - Bus[a].geometry.coordinates[1]));
    if (distance < minDistance) {
      minDistance = distance;
      data = Bus[a].geometry.coordinates;
    }
  }
  return(data)
}
