import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Spinner } from "../components/layout/spinners/Spinner";
//const {HomePage} = lazy(() => import("../components/latu/Home"));
import HomePage from "../components/latu/Home"
import BarcodeScanner from "../components/latu/BarCode"
import SignatureCapture from "../components/latu/Signature"
import GeoLocalization from "../components/latu/geo/GeoLocalization"

const PageRoutes = () => {
  return (
    <div>      
      <Suspense fallback={<Spinner />}>
        <BrowserRouter>
                <Routes>
                    <Route path='/home/:token/:user' element={<HomePage />}></Route> 
                    <Route path='/BarCode/' element={<BarcodeScanner />}></Route>  
                    <Route path='/Signature/' element={<SignatureCapture />}></Route> 
                    <Route path='/Geo/' element={<GeoLocalization />}></Route> 
                                               
                </Routes>
        </BrowserRouter>      
      </Suspense>
   
    </div>
  );
};

export default PageRoutes;
