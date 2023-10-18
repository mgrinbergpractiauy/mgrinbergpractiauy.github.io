import React, { useState } from "react";
import { Modal as BSModal } from "react-bootstrap";
import { CgClose } from "react-icons/cg";
import { ButtonCustom } from "../buttons/ButtonCustom";

const Modal = ({
  noHeader = false,
  footerClassName = "",
  dialogClassName = "",
  toggler: Toggler,
  closeBtn: CloseBtn,
  togglerType,
  togglerOnClick,
  size,
  togglerIcon,
  togglerText,
  titleText,
  titleIcon,
  togglerButtonVariant,
  togglerClass,
  bodyText,
  footer,
  textoAceptarDialogo,
  customFooter: CustomFooter,
  footerType,
  textoRechazarDialogo,
  component: Component,
  backdrop,
  keyboard,
  show: showProp,
  onHide,
  handleDialogo = () => {},
}) => {
  const [show, setShow] = useState(false);

  const toggleModal = () => {
    setShow((currentShow) => !currentShow);
  };

  const handleClick = (props) => {
    togglerOnClick?.(props);
    toggleModal();
  };

  const handleHide = () => {
    onHide?.();
    toggleModal();
  };

  // Si se pasa togglerType valido o un Toggler definido se va a usar el estado propio
  // En caso contrario se usa el show que se recibe por prop
  const RenderToggle =
    (["link", "button"].includes(togglerType) || Toggler) &&
    (() => {
      switch (togglerType) {
        case "link":
          return (
            <a
              onClick={handleClick}
              className={
                togglerClass ?? "small d-flex justify-content-end mt-2"
              }
            >
              {togglerIcon}
              <u>{togglerText}</u>
            </a>
          );

        case "button":
          return (
            <ButtonCustom
              onClick={handleClick}
              variant={togglerButtonVariant ?? "primary"}
              className={togglerClass}
            >
              {togglerText ?? "+"}
            </ButtonCustom>
          );

        default:
          return <Toggler onClick={handleClick} />;
      }
    });

  return (
    <>
      {RenderToggle && <RenderToggle />}
      <BSModal
        dialogClassName={dialogClassName}
        size={size}
        show={RenderToggle ? show : showProp}
        onHide={handleHide}
        backdrop={backdrop}
        keyboard={keyboard}
      >
        {!noHeader && (
          <BSModal.Header className="justify-content-between">
            <BSModal.Title>
              <span className="card-label d-flex font-size-h3 font-weight-bolder text-dark p-0">
                {titleIcon}
                {titleText}
              </span>
            </BSModal.Title>
            {CloseBtn ? (
              <CloseBtn handleHide={handleHide} />
            ) : (
              <ButtonCustom
                className="close-btn"
                variant="transparent"
                onClick={handleHide}
              >
                <CgClose />
              </ButtonCustom>
            )}
          </BSModal.Header>
        )}
        {(Component || bodyText) && (
          <BSModal.Body>
            {Component ? (
              <Component toggleModal={toggleModal} />
            ) : (
              <p>{bodyText}</p>
            )}
          </BSModal.Body>
        )}
        {footer && (
          <BSModal.Footer
            className={`${footerClassName} d-flex flex-row-reverse justify-content-between`}
          >
            <ButtonCustom
              onClick={() => {
                if (handleDialogo(true) != false) {
                  toggleModal();
                }
              }}
              variant="primary"
            >
              {textoAceptarDialogo ?? "Sí"}
            </ButtonCustom>
            {footerType === "dialogo" && (
              <ButtonCustom
                onClick={() => {
                  toggleModal();
                  handleDialogo(false);
                }}
                variant="secondary"
              >
                {textoRechazarDialogo ?? "No"}
              </ButtonCustom>
            )}
          </BSModal.Footer>
        )}
        {CustomFooter && (
          <BSModal.Footer>
            <CustomFooter toggleModal={toggleModal} />
          </BSModal.Footer>
        )}
      </BSModal>
    </>
  );
};

export { Modal };
