import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Spinner } from "../components/layout/spinners/Spinner";
import HomePage from "../components/latu/Home";
import BarcodeScanner from "../components/latu/BarCode";
import SignatureCapture from "../components/latu/Signature";
import GeoLocalization from "../components/latu/geo/GeoLocalization";

const PageRoutes = () => {

  

  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/BarCode" element={<BarcodeScanner />} />
            <Route path="/Signature" element={<SignatureCapture />} />
            <Route path="/Geo" element={<GeoLocalization />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
};

export default PageRoutes;
