import { React } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

export default function NavBar() {
  return (
    <div id="navbar">
      <NavLink
        style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
        }}
        to={"/"}
      >
        <h1
          style={{
            fontSize: "1.5rem",
            color: "white",
          }}
        >
          Jak se žije?
        </h1>
      </NavLink>
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <NavLink to={"/"} className="nav-element">
          <span>Tabulka</span>
        </NavLink>

        <NavLink to={"/map"} className="nav-element">
          <span>Mapa</span>
        </NavLink>
        <NavLink to={"/options"} className="nav-element">
          <span>Možnosti</span>
        </NavLink>
      </div>
    </div>
  );
}
