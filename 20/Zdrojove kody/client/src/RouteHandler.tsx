import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Auth from "./modules/auth";
import Dashboard from "./modules/dashboard";
import Donate from "./modules/Donate/Donate";

const RouteHandler: React.FC = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Auth method="login" />} />
        <Route path="/register" element={<Auth method="register" />} />
        <Route path="/donate" element={<Donate />} />
      </Routes>
    </Layout>
  </Router>
);

export default RouteHandler;
