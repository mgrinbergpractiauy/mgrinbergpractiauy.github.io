import React from "react";
import { ListOption } from "../../../layout/ListOption";
import { antiguedad } from "../../../../constants/listOptions";

const SeleccionAntiguedad = (props) => {
  const handleCambioDeAntiguedad = (value) => {
    props.handleChange(value);
  };

  return (
    <>
      <ListOption
        label="Antigüedad"
        handleChange={handleCambioDeAntiguedad}
        items={antiguedad}
      />
    </>
  );
};

export { SeleccionAntiguedad };
