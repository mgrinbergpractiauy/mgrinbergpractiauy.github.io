import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSnackbar } from "Redux/actions/aplicationAction";
import { CustomizedSnackbar } from "react-shared-components";

const CustomizedSnackBarWrapper = () => {
  const dispatch = useDispatch();
  const aplicacion = useSelector((state) => state.aplicacionReducer);

  return (
    <CustomizedSnackbar
      setSnackbar={(snackbar) => dispatch(setSnackbar(snackbar))}
      aplicacion={aplicacion}
    />
  );
};

export default CustomizedSnackBarWrapper;
