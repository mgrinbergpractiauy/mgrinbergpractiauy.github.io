import React, { lazy, Suspense, useEffect } from "react";
import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import PageRoutes from "../../routes/PageRoutes";
import AppHeader  from "../layout/app/Header";
import AppFooter  from "../layout/app/Footer";
import HomePage from "../latu/Home";
import Navigation from "../layout/app/Nav";

function App() {  
  return (
    
    <div className="App">  
      <AppHeader />  
      {/*<PageRoutes />*/}
      <Navigation/>
      <AppFooter />  
    </div>
  )
}

export default App
