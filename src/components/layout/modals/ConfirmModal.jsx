import React from "react";
import PropTypes from "prop-types";
import { Modal } from "./Modal";

/**
 * Modal generico preconfigurado para confirmar acciones
 *
 * @param {{
 *  toggler: React.ReactNode,
 *  component: React.ReactNode | string,
 *  size: string,
 *  titleText: string,
 *  textoAceptarDialogo: string,
 *  textoRechazarDialogo: string,
 *  handleDialogo: (condition: boolean) => void,
 * }} props
 * @returns {Modal}
 */
const ConfirmModal = ({
  toggler,
  component: Component,
  size = "lg",
  textoAceptarDialogo = "ACEPTAR",
  textoRechazarDialogo = "CANCELAR",
  handleDialogo,
  ...props
}) => (
  <Modal
    footer
    noHeader
    size={size}
    toggler={toggler}
    footerType="dialogo"
    titleText="Confirmar"
    dialogClassName="modal-confirm"
    footerClassName="p-4 border-0 pt-0"
    component={(properties) => (
      <div className="p-5 pb-4 text-center fs-3">
        <Component {...properties} />
      </div>
    )}
    textoAceptarDialogo={textoAceptarDialogo}
    textoRechazarDialogo={textoRechazarDialogo}
    handleDialogo={handleDialogo}
    {...props}
  />
);

ConfirmModal.propTypes = {
  toggler: PropTypes.any.isRequired,
  component: PropTypes.any.isRequired,
  size: PropTypes.oneOf(["sm", "lg", "xl"]),
  textoAceptarDialogo: PropTypes.string,
  textoRechazarDialogo: PropTypes.string,
  handleDialogo: PropTypes.func.isRequired,
};

export { ConfirmModal };
