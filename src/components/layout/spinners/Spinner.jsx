import React from "react";
import { Spinner as BootstrapSpinner } from "react-bootstrap";

const Spinner = () => {
  return (
    <div className="d-flex w-100 h-100 justify-content-center align-items-center">
      <BootstrapSpinner animation="border" variant="primary" />
    </div>
  );
};

export { Spinner };
