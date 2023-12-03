import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { FetchService } from '../services/fetchService';
import { Map, Marker,Overlay,GeoJson } from "pigeon-maps"
import { maptiler } from 'pigeon-maps/providers'
import { BusFormPoint } from '../services/BusFromPoint';


function App() {
  const maptilerProvider = maptiler('qxI5FZYAhQOyNwRo5kY4', 'streets')
  const [data, setData] = useState<any>()

  const { id } = useParams();

  useEffect(() => {
    FetchService().data.filter(function (i:any){
      setData(i.properties.dp_id===id)
    });
  }, []);

  return (
    <div className='GuideBox'>
      <Map>

      </Map>
      {JSON.stringify(data)}
      <br/>
    </div>
  );
}

export default App;
