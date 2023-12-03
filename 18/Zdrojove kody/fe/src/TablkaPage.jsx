import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Radek from "./Radek";
import "./Tabulka.css";
import testZnak from "./testznak.jpg";

function hslToRgb(h, s, l) {
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [r, g, b];
}

export function generateColor(value) {
  // Normalize the value to be between 0 and 1
  let normalizedValue = (100 - value) / 100;

  // Convert the normalized value to hue (red to green)
  let hue = 120 * (1 - normalizedValue); // 0 for red, 120 for green

  // Convert HSL to RGB
  let [r, g, b] = hslToRgb(hue / 360, 1, 0.5);

  // Convert RGB to hex
  let hexColor = `#${Math.round(r * 255)
    .toString(16)
    .padStart(2, "0")}${Math.round(g * 255)
    .toString(16)
    .padStart(2, "0")}${Math.round(b * 255)
    .toString(16)
    .padStart(2, "0")}`;

  return hexColor;
}

export default function Tabulka() {
  const [mesta, setMesta] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  let navigate = useNavigate();

  const getTable = () => {
    fetch("http://172.21.16.24:8080/table")
      .then((response) => {
        return response.json();
      })
      .then((jsondata) => {
        console.log(jsondata);
        setMesta(jsondata);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        console.log("Couldnt reach API");
      });
  };

  const fetched = useRef(false);
  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;
    getTable();
  }, []);

  return (
    <>
      <table className="cities">
        <thead>
          <tr>
            <td></td>
            <td>MĚSTO</td>
            <td style={{ textAlign: "end" }}>OBYVATELE</td>
            <td style={{ textAlign: "end" }}>INDEX</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {mesta.map((m, index) => (
            <tr
              key={m?.name + m?.id + index}
              onClick={() => {
                navigate("/city/" + m?.id);
              }}
            >
              <td>
                <div style={{ height: "50px", width: "50px" }}>
                  <img
                    src={m?.znak ? m?.znak : testZnak}
                    alt=""
                    style={{
                      height: "50px",
                      width: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
              </td>
              <th>{m?.name}</th>
              <td style={{ textAlign: "end" }}>{m?.score?.populationCount}</td>
              <th style={{ textAlign: "end" }}>
                {Math.round(m?.score?.total * 100)}
              </th>
              <td>
                <div
                  style={{
                    width: "15px",
                    aspectRatio: "1/1",
                    backgroundColor: generateColor(
                      Math.round(m?.score?.total * 100)
                    ),
                    borderRadius: "50%",
                  }}
                ></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && (
        <div
          style={{ margin: "0 auto", width: "fit-content", paddingTop: "10px" }}
        >
          <CircularProgress />
        </div>
      )}
    </>
  );

  return (
    <div id="Tabulka">
      <Radek
        znak={"nic.png"}
        jmeno={"MĚSTO"}
        obyvatele={"OBYVATELE"}
        index={"INDEX"}
        gucciK={"empty"}
        mod={"curve-top"}
        bold={false}
      />

      <div id="radky">
        {this.state.mesta.map((m) => (
          <Radek
            znak={m?.znak}
            jmeno={m?.name}
            obyvatele={m?.score?.populationCount}
            index={m?.score?.total}
            gucciK={m?.gucciKolecko}
            mod={m?.i % 2 === 0 ? "color-switch" : ""}
            key={m?.i}
          />
        ))}
      </div>
    </div>
  );
}
