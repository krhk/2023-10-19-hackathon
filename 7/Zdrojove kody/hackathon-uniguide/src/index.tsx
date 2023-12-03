import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home"
import Guide from "./pages/Guide"
import Parking from "./pages/Parking"
import GuideDetail from "./pages/GuideDetail"
import Logo from "./assets/UniGuideLogo.png"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
      <nav className='navBar'>
        <a className="LogoW" href="/"><img className='LogoImg' src={Logo} alt='UniGuide Logo'></img></a>
        <div className='PagesW'>
          <a className='PageButton' href='/pamatky'><h2>Průvodce</h2></a>
          <a className='PageButton' href='/parkovani'><h2>Parkoviště</h2></a>
        </div>
      </nav>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path='/pamatky' element={<Guide />} />
          <Route path='/pamatky/:id' element={<GuideDetail />} />
          <Route path='/parkovani' element={<Parking />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
