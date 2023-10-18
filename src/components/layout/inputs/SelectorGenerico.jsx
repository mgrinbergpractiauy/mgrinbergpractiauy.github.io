import { MenuItem, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import "./SelectorGenericoStyle.scss";

const SelectorGenerico = ({
  register = () => {},
  setValue = () => {},
  arregloDeDatos,
  label,
  agregarDatos,
  setChangeSelect = () => {},
  changeSelect,
  nombreCampo,
  valorPorDefecto,
  tieneValorPorDefecto,
  getValues = () => {},
  className,
  wrapperId,
  id,
  onChange = () => {},
}) => {
  const handleConvertirAInput = () => {
    const nuevoValor = getValues()[nombreCampo];
    setValorSeteado(nuevoValor);
    setChangeSelect(true);
    setValue("esNuevo", true);
  };

  const [valorSeteado, setValorSeteado] = useState(valorPorDefecto);

  useEffect(() => {
    if (tieneValorPorDefecto) {
      setValue(nombreCampo, valorPorDefecto);
      setValue(
        `${nombreCampo}Label`,
        arregloDeDatos.find((item) => {
          return item.value === valorPorDefecto;
        })?.label ?? ""
      );

      setValorSeteado(valorPorDefecto);
    }
  }, [valorPorDefecto]);

  return (
    <div id={wrapperId ?? "selector-generico"} className={className}>
      <div className="fieldset-style">
        {changeSelect && agregarDatos ? (
          <TextField
            type="text"
            className={className ?? "w-100"}
            size="small"
            {...register("datoAgregable")}
            name="datoAgregable"
            label="Ingrese el dato a agregar"
          />
        ) : (
          <>
            <TextField
              id={id ?? "selector-generico"}
              select
              className={className ?? "w-100"}
              size="small"
              {...register(nombreCampo)}
              label={label ? label : ""}
              value={valorSeteado}
              onChange={(event) => {
                setValorSeteado(event.target.value);
                setValue(
                  `${nombreCampo}Label`,
                  arregloDeDatos.find((item) => {
                    return item.value === event.target.value;
                  })?.label ?? ""
                );
                onChange(event);
              }}
            >
              {arregloDeDatos?.map((dato) => (
                <MenuItem key={dato.value} value={dato.value}>
                  {dato.label}
                </MenuItem>
              ))}
              {agregarDatos ? (
                <MenuItem onClick={handleConvertirAInput} value="nuevo">
                  Agregar Dato...
                </MenuItem>
              ) : null}
            </TextField>
          </>
        )}
      </div>
    </div>
  );
};

SelectorGenerico.propTypes = {
  register: PropTypes.func,
  setValue: PropTypes.func,
  arregloDeDatos: PropTypes.array,
  label: PropTypes.string,
  agregarDatos: PropTypes.bool,
  setChangeSelect: PropTypes.func,
  changeSelect: PropTypes.bool,
  nombreCampo: PropTypes.string,
  valorPorDefecto: PropTypes.number,
  tieneValorPorDefecto: PropTypes.bool,
  getValues: PropTypes.func,
  onChange: PropTypes.func,
};

export { SelectorGenerico };
