import React, { useState } from "react";
import "./App.css";
import { useData } from "./components/data/data";

function App() {
  const [searchclassname, setsearchclassname] = useState("inactive");
  const { data, setData } = useState([useData()]);
  const pozemky = useData();

  const VygenerovatPamatky = (props) => {
    return (
      <div className="Pamatky">
        
        {pozemky.map((pozemek) => (
          <div className="Pamatka" key={pozemek?.Nazev_Objektu}>
            <p>Název pozemku: {pozemek?.Nazev_Pozemku}</p>
            <p>Název Objektu: {pozemek?.Nazev_Objektu}</p>
            <div>
            <button className="Maps">Maps</button>
            <button className="inf">Více Info</button>
            </div>  
          </div>
          
        ))}
      </div>
      
    );
  };

  return (
    <div className="main">
      <div className="BackGround">

      <div className="header">
        <header className="App-header">
          <div className="search-bar">
            <div className="navb">

            </div>
          </div>

          
          <div className="container-wrapper">
            <div className={"search " + searchclassname}>
              <input type="text" className="input-search" placeholder="Search something..." />
              <button className="btn" onClick={() => {
                if (searchclassname === "active")
                  setsearchclassname("inactive");
                else setsearchclassname("active");
              }}>
                🔎︎
              </button>
            </div>
          </div>

          <div className="header">

          </div>

          <div>
            <VygenerovatPamatky />
          </div>
        </header>
      </div>
      </div>
    </div>
  );
}

export default App;
