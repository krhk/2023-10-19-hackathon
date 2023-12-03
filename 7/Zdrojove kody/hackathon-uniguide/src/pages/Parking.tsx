import React, { useState, useEffect } from 'react';
import { Map,GeoJsonLoader,Draggable, Point,Marker, GeoJson } from "pigeon-maps"
import { maptiler } from 'pigeon-maps/providers'
import { MiddleOfPolygon } from '../services/middleOfPolygon';


function App() {
  const maptilerProvider = maptiler('qxI5FZYAhQOyNwRo5kY4', 'streets')
  const [parking, setParking] = useState([]);
  const [top5, settop5] = useState<any>([]);
  const [anchor, setAnchor] = useState<Point>();
  const [markerAnchor, setMarkerAnchor] = useState<Point>([0, 0]);
  const [data, setData] = useState<any>();

    fetch("http://localhost:3000/DataBackup/parkoviste3.geo.json").then(response => response.json())
    .then(data => setParking(data.features))
    .catch(error => console.error(error));

  function LoadData(data: any)
  {
    setData(
    <div className='dataDiv'>
      <h3>Počet míst: {JSON.stringify(data.properties.POC_MIST)}</h3>
      <h3>Invalidé: {JSON.stringify(data.properties.INVALIDE)}</h3>
      <h3>Plocha: {JSON.stringify(data.properties.PLOCHA)}m²</h3>
    </div>
    )
  }

  return (
    <div className='ParkingBox'>
      <h1 className='ParkingTitle'>Parkoviště 🚗</h1>
      <Map provider={maptilerProvider} height={450} width={1550} defaultCenter={[ 50.19296138642234, 15.838750875870064]} defaultZoom={14}>
        <Marker color="red" anchor={[markerAnchor[1], markerAnchor[0]]}/>
        <GeoJsonLoader
          link={"http://localhost:3000/DataBackup/parkoviste3.geo.json"}
          styleCallback={(feature:any) =>
            feature={ stroke:"#0340788A",fill:"#0340788A",strokeWidth: "2"}
          }
          onClick={(pa) => alert("pocet mist:" +pa.payload.properties.POC_MIST)}
          />
          <Draggable offset={[60, 87]} anchor={anchor} onDragEnd={(anchor)=>{setAnchor(anchor);settop5(MiddleOfPolygon(parking,anchor));setMarkerAnchor((MiddleOfPolygon(parking,anchor)).geometry.coordinates[0][0]);LoadData(MiddleOfPolygon(parking,anchor))}}>
            <Marker color='#034078' width={50}  />
          </Draggable>
      </Map>
      <div>
        {data}
      </div>
      <br/>
    </div>
  );
}

export default App;
