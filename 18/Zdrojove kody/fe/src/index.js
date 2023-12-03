import React from "react";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Layout from "./Layout";
import { CityPage } from "./CityPage.jsx";
import Map from "./Map";
import Options from "./Options";
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<App/>}/>
                <Route path='/map' element={<Map/>}/>
                <Route path='/options' element={<Options/>}/>
                <Route path="/city/:id" element={<CityPage />} />
                <Route path='*' element={<h1>404: Not Found</h1>} />
            </Route>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
