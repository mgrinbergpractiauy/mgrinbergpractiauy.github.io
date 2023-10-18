import React, { lazy, useState } from "react";
import { Container } from "@mui/material";

const Aside = lazy(() => import("Components/layout/app/Aside"));

const Layout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <main className={`main-container ${showSidebar ? "show-sidebar" : ""}`}>
      {/* <Aside showSidebar={showSidebar} setShowSidebar={setShowSidebar} /> */}
      <div className="main-content">{children}</div>
    </main>
  );
};

export default Layout;
