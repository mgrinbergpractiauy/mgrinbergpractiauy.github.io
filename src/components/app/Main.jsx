import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import './index.css'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import HomePage from "../latu/Home";
import BarcodeScanner from "../latu/BarCode";
import SignatureCapture from "../latu/Signature";
import GeoLocalization from "../latu/geo/GeoLocalization";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <App />    
  </React.StrictMode>
)

