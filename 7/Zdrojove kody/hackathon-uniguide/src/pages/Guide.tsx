import React, { useState } from 'react';
import { Map, Marker,Overlay,GeoJson } from "pigeon-maps"

import {FetchService} from "../services/fetchService"
import { maptiler } from 'pigeon-maps/providers'
import { useNavigate } from "react-router-dom"

function App() {
  const navigate = useNavigate()
  const [Kluby, KlubySet] = useState(true);
  const [Hrady, HradySet] = useState(true);
  const [Zamky, ZamkySet] = useState(true);
  const [Kina, KinaSet] = useState(true);
  const [Rozhledny, RozhlednySet] = useState(true);
  const [MuzeaAgalerie, MuzeaAgalerieSet] = useState(true);
  const [DivadlaAfilharmonie, DivadlaAfilharmonieSet] = useState(true);

  const [data, setData] = useState([]);
  const [geo, setGeo] = useState([50.20923, 15.83277]);
  const [zoom, setZoom] = useState(12);
  const [hover, setHover] = useState("");
  const [position, setPosition] = useState([0,0]);

  const maptilerProvider = maptiler('qxI5FZYAhQOyNwRo5kY4', 'streets')

  fetch("http://localhost:3000/Data/Architekt.geo.json").then(response => response.json())
  .then(data => setData(data.features))
  .catch(error => console.error(error));

  function RenderMarker(value:any){
    if (value.properties.dp_id.includes("HRAD") && Hrady === true) {
      return <Marker onClick={() => (value.properties.www ? window.open(value.properties.www) : null)} onMouseOver={() => {setPosition([value.properties.y, value.properties.x]);setHover(value.properties.nazev);}} onMouseOut={() => setHover("")} color={"#989595"} width={50} anchor={[value.properties.y, value.properties.x]} />
    }
    if (value.properties.dp_id.includes("ZAMKY") && Zamky === true) {
      return <Marker onClick={() => (value.properties.www ? window.open(value.properties.www) : null)} onMouseOver={() => {setPosition([value.properties.y, value.properties.x]);setHover(value.properties.nazev)}} onMouseOut={() => setHover("")} color={"#cdc1c1"} width={50} anchor={[value.properties.y, value.properties.x]} />
    }
    if (value.properties.dp_id.includes("ROZHL") && Rozhledny === true) {
      return <Marker onClick={() => (value.properties.www ? window.open(value.properties.www) : null)} onMouseOver={() => {setPosition([value.properties.y, value.properties.x]);setHover(value.properties.nazev)}} onMouseOut={() => setHover("")} color={"#90d285"} width={50} anchor={[value.properties.y, value.properties.x]} />
    }
    if (value.properties.dp_id.includes("KINA") && Kina === true) {
      return <Marker onClick={() => (value.properties.www ? window.open(value.properties.www) : null)} onMouseOver={() => {setPosition([value.properties.y, value.properties.x]);setHover(value.properties.nazev)}} onMouseOut={() => setHover("")} color={"#6b8ea4"} width={50} anchor={[value.properties.y, value.properties.x]} />
    }
    if (value.properties.dp_id.includes("DIVFILH") && DivadlaAfilharmonie === true) {
      return <Marker onClick={() => (value.properties.www ? window.open(value.properties.www) : null)} onMouseOver={() => {setPosition([value.properties.y, value.properties.x]);setHover(value.properties.nazev)}} onMouseOut={() => setHover("")} color={"#9c7e5f"} width={50} anchor={[value.properties.y, value.properties.x]} />
    }
    if (value.properties.dp_id.includes("KLUB") && Kluby === true) {
      return <Marker onClick={() => (value.properties.www ? window.open(value.properties.www) : null)}onMouseOver={() => {setPosition([value.properties.y, value.properties.x]);setHover(value.properties.nazev)}} onMouseOut={() => setHover("")} color={"#14aad0"} width={50} anchor={[value.properties.y, value.properties.x]} />
    }
    if (value.properties.dp_id.includes("MG") && MuzeaAgalerie === true) {
      return <Marker onClick={() => (value.properties.www ? window.open(value.properties.www) : null)} onMouseOver={() => {setPosition([value.properties.y, value.properties.x]);setHover(value.properties.nazev)}} onMouseOut={() => setHover("")} color={"#a188cb"} width={50} anchor={[value.properties.y, value.properties.x]} />
    }
  }

  return (
    <div className='GuideBox'>
      <h1 className='GuideTitle'>Průvodce 🗺️</h1>
      
      <Map provider={maptilerProvider} height={450} width={1550} center={[geo[0],geo[1]]} zoom={zoom}>
        {FetchService().data.map((number:any) =>
          RenderMarker(number)
        )}
        <Overlay anchor={[position[0], position[1]]} offset={[100,20]} >
          <h5 className='HoverName'>{hover}</h5>
        </Overlay>
      </Map>
      <div className='CategoryCheckboxesW'>
        <label className='CategoryCheckbox' id='Kluby'><span data-text="Kluby"></span><input type="checkbox" checked={Kluby} onChange={() => KlubySet(!Kluby)} /></label>
        <label className='CategoryCheckbox' id='Hrady'><span data-text="Hrady"></span><input type="checkbox"checked={Hrady} onChange={() => HradySet(!Hrady)} /></label>
        <label className='CategoryCheckbox' id='Zamky'><span data-text="Zámky"></span><input type="checkbox"checked={Zamky} onChange={() => ZamkySet(!Zamky)} /></label>
        <label className='CategoryCheckbox' id='Kina'><span data-text="Kina"></span><input type="checkbox" checked={Kina} onChange={() => KinaSet(!Kina)} /></label>
        <label className='CategoryCheckbox' id='Rozhledny'><span data-text="Rozhledny"></span><input type="checkbox" checked={Rozhledny} onChange={() => RozhlednySet(!Rozhledny)} /></label>
        <label className='CategoryCheckbox' id='MuzeaAgalerie'><span data-text="Muzea a galerie"></span><input type="checkbox" checked={MuzeaAgalerie} onChange={() => MuzeaAgalerieSet(!MuzeaAgalerie)} /></label>
        <label className='CategoryCheckbox' id='DivadlaAfilharmonie'><span data-text="Divadla a filharmonie"></span><input type="checkbox" checked={DivadlaAfilharmonie} onChange={() => DivadlaAfilharmonieSet(!DivadlaAfilharmonie)} /></label>
      </div>
    </div>
  );
}

export default App;
