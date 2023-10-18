import React, { forwardRef, useRef, useState } from "react";
// import SnackbarService from "../../services/snackbarService";
// import { error } from "../../shared/constants/tipoNotificacion";
// import { obtenerMensajeDeError } from "../../shared/functions/mensajes";
import { DataTable } from "../../tables/DataTable";
import { setWrapperClassToggle } from "Helpers/object";
import { useTyping } from "Hooks/useTyping";
import { useEffectSinEjecucionInicial } from "Hooks/useEffectSinEjecucionInicial";
import { guid } from "Helpers/guid";
import { PropTypes } from "prop-types";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
/*
  Buscador de persona simple:
  Permite buscar realizar busquedas sobre el servicio enviado por parametro desplegando los resultados en un data table con las columnas recibidas por parametro
  Revisar, readme y pagina de demo para mas informacion
  Parámetros: (*) obligatorias  
  *servicio: PropTypes.func, servicio en el que se realizara la busqueda
  *columnasResultadoTabla: PropTypes.array, columnas de configuracion de la tabla que desplegara los resultados
  *onRowClick: PropTypes.func, funcion de callBack que sera ejecutada al presionar una row de resultado
  onError: PropTypes.func, funcion de error que se ejecutara cuando se produzca un error al realizar la llamada al servicio
  parametros: PropTypes.array, parametros al servicio de busqueda
  ref: PropTypes.oneOfType([PropTypes.func, PropTypes.object]), ref para el input de busqueda
  minWidth: PropTypes.number,
  conCabezal: PropTypes.bool, especifica si la tabla resultante mostrara su cabezal
  placeHolder: PropTypes.string, placeholder del input de busqueda
  wrapperId: PropTypes.string, 
  className: PropTypes.string, clase del componente
  fullWidth: PropTypes.bool, determina si el input ocupa todo el ancho disponible
  cantidadCaracteresTriggerBuscador: PropTypes.number, cantidad de caracteres minima para ejecutar la busqueda
  defaultValue: PropTypes.string, valor por defecto del input
*/
const BuscadorSimple = forwardRef(({ parametros = [], ...props }, ref) => {
  const [inputBuscador, setInputBuscador] = useState(props.defaultValue ?? "");
  const [loading, setLoading] = useState(false);
  const [resultadoBusqueda, setResultadoBusqueda] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const cantidadCaracteresTriggerBuscador =
    props.cantidadCaracteresTriggerBuscador ?? 3;
  const [dejoDeEscribir] = useTyping();
  const requestId = useRef(guid());
  const controller = new AbortController();
  const [noBuscar, setNoBuscar] = useState(false);
  // llamada al servicio de busqueda
  useEffectSinEjecucionInicial(() => {
    if (!noBuscar) {
      dejoDeEscribir(inputBuscador).then((ejecutar) => {
        if (
          ejecutar &&
          inputBuscador.length >= cantidadCaracteresTriggerBuscador
        ) {
          setLoading(true);
          controller.abort();
          setWrapperClass(
            `wrapper-search-busqueda ${props.fullWidth ? "w-100" : ""}`
          );
          setShowResults(true);
          props
            .servicio(
              inputBuscador,
              Object.entries({
                ...parametros,
              })?.map(([, value]) => value),
              {
                signal: controller.signal,
              }
            )
            .then((result) => {
              setResultadoBusqueda(result.data.data.results);
            })
            .catch((err) => {
              props.onError(err);
            })
            .finally(() => {
              setLoading(false);
            });
        } else {
          setWrapperClass("");
          setShowResults(false);
        }
      });
    } else {
      setNoBuscar(false);
    }
  }, [inputBuscador]);
  const rowClick = (obj) => {
    setShowResults(false);
    setWrapperClass("");
    if (props?.noLimpiarValueFunction != undefined) {
      setNoBuscar(true);
      setInputBuscador(props.noLimpiarValueFunction(obj));
    } else {
      setInputBuscador("");
    }
    props.onRowClick(obj);
  };
  const setWrapperClass = (clase) => {
    setWrapperClassToggle(clase, props.wrapperId);
  };
  const handleBlur = () => {
    setTimeout(() => {
      const elemFocus = document.activeElement;
      const elemPopover = document.querySelector(`#${props.wrapperId}`);
      if (!elemPopover.contains(elemFocus)) {
        setShowResults(false);
        setWrapperClass("");
        setInputBuscador("");
      }
    });
  };
  return (
    <div onBlur={handleBlur} id={props.wrapperId} className={props.className}>
      <div className={`${!props.noFlex && "d-flex"} w-100`}>
        <div className={`wrapper-search  ${props.fullWidth ? "w-100" : ""}`}>
          <TextField
            disabled={props?.disabled}
            inputRef={ref ?? useRef()}
            fullWidth={props.fullWidth}
            label={props.placeHolder}
            value={inputBuscador}
            id={props.id ?? "buscador-simple"}
            type="text"
            autoComplete="off"
            size="small"
            onChange={(e) => {
              setInputBuscador(e.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          {showResults && (
            <DataTable
              sinCheckbox
              conCabezal={props.conCabezal ?? false}
              loading={loading}
              orderBy={props.columnasResultadoTabla[0].field}
              columns={props.columnasResultadoTabla}
              rows={resultadoBusqueda}
              minWidth={props.minWidth}
              classTable="tablaFiltro"
              onRowClick={(obj) => {
                rowClick(obj);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
});
BuscadorSimple.propTypes = {
  servicio: PropTypes.func.isRequired,
  columnasResultadoTabla: PropTypes.array.isRequired,
  onRowClick: PropTypes.func.isRequired,
  ref: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  onError: PropTypes.func,
  parametros: PropTypes.array,
  minWidth: PropTypes.number,
  conCabezal: PropTypes.bool,
  placeHolder: PropTypes.string,
  wrapperId: PropTypes.string,
  className: PropTypes.string,
  fullWidth: PropTypes.bool,
  cantidadCaracteresTriggerBuscador: PropTypes.number,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
};
export { BuscadorSimple };
