import React, { lazy, Suspense, useEffect } from "react";
import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import PageRoutes from "../../routes/PageRoutes";
import AppHeader  from "../layout/app/Header";
import AppFooter  from "../layout/app/Footer";

function App() {  
  return (
    
    <div className="App">  
      <AppHeader />  
      <PageRoutes />  
      <AppFooter />  
    </div>
  )
}

export default App
