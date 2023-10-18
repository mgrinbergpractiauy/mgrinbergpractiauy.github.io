import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./DataTableStyle.scss";
const ColumnResizer = ({
  children,
  anchoMinimo = 10,
  columns,
  classes,
  className = "siempreVisible",
  header,
}) => {
  const separadorSeleccionado = useRef(null);
  const columnaIzquierda = useRef(null);
  const columnaDerecha = useRef(null);
  const posicionInicial = useRef(0);
  const anchoInicialCeldaDerecha = useRef(0);
  const anchoInicialCeldaIzquierda = useRef(0);

  let fila = [...children];

  useLayoutEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", finMovimiento);
    document.addEventListener("touchmove", onMouseMove);
    document.addEventListener("touchend", finMovimiento);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", finMovimiento);
      document.removeEventListener("touchmove", onMouseMove);
      document.removeEventListener("touchend", finMovimiento);
    };
  }, []);

  const inicioMovimiento = (e) => {
    e.stopPropagation();
    e.preventDefault();
    separadorSeleccionado.current = e.target;

    // Se extraen referencias a celdas del header para modificar solo ese ancho sin importar en que fila se usa el resizer
    // Si la tabla no tiene header trabajo directamente con las celdas de cada lado del separador

    columnaIzquierda.current =
      header?.current?.children[0]?.children[
        `header-${e.target.previousSibling.id.split("-")[1]}`
      ] ?? e.target.previousSibling;
    columnaDerecha.current =
      header?.current?.children[0]?.children[
        `header-${e.target.nextSibling.id.split("-")[1]}`
      ] ?? e.target.nextSibling;

    posicionInicial.current = e.screenX;
    anchoInicialCeldaDerecha.current = columnaDerecha.current.clientWidth;
    anchoInicialCeldaIzquierda.current = columnaIzquierda.current.clientWidth;
  };

  const finMovimiento = (e) => {
    separadorSeleccionado.current = null;
    posicionInicial.current = 0;
    anchoInicialCeldaDerecha.current = 0;
    anchoInicialCeldaIzquierda.current = 0;
  };

  const onMouseMove = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (separadorSeleccionado.current) {
      // medir movimientos y meterlos en estilos de los hermanos

      if (!separadorSeleccionado.current) return;

      // discriminar casos de pantalla tactil
      let mouseX = e.touches ? e.touches[0].screenX : e.screenX;

      const movimiento = posicionInicial.current - mouseX;

      let nuevoAnchoIzquierda = anchoInicialCeldaIzquierda.current - movimiento;
      let nuevoAnchoDerecha = anchoInicialCeldaDerecha.current + movimiento;

      if (nuevoAnchoIzquierda < anchoMinimo) {
        const diferencia = nuevoAnchoIzquierda - anchoMinimo;
        nuevoAnchoIzquierda = anchoMinimo;
        nuevoAnchoDerecha += diferencia;
      } else if (nuevoAnchoDerecha < anchoMinimo) {
        const diferencia = nuevoAnchoDerecha - anchoMinimo;
        nuevoAnchoDerecha = anchoMinimo;
        nuevoAnchoIzquierda += diferencia;
      }

      columnaDerecha.current.style.width = `${nuevoAnchoDerecha}px`;
      columnaIzquierda.current.style.width = `${nuevoAnchoIzquierda}px`;
    }
  };

  // Se insertan los separaradores entre cada par de celdas de la fila
  fila = fila.reduce((result, element, index, array) => {
    result.push(element);

    if (index < array.length - 1) {
      columns[index].options?.conResizer &&
        result.push(
          <td
            key={`resizer-${index}`}
            style={{
              cursor: "col-resize",
            }}
            className={className}
            onMouseDown={inicioMovimiento}
            onTouchStart={inicioMovimiento}
          ></td>
        );
    }

    return result;
  }, []);

  return fila;
};

ColumnResizer.propTypes = {
  anchoMinimo: PropTypes.number,
  columns: PropTypes.array.isRequired,
};

export { ColumnResizer };
