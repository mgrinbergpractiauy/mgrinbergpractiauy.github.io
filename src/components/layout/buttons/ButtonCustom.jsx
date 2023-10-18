import React from "react";
import PropTypes from "prop-types";
import { Button as BootstrapBottom } from "react-bootstrap";
import { width } from "@mui/system";
import "./ButtonStyle.scss";

const ButtonCustom = ({
  children,
  fullAncho,
  variant = "primary",
  className,
  size,
  onClick = () => {},
}) => {
  return (
    <div>
      <BootstrapBottom
        className={`${className} close-btn`}
        variant={variant}
        onClick={onClick}
        style={{ width: fullAncho ? "100%" : "auto" }}
        size={size}
      >
        {children}
      </BootstrapBottom>
    </div>
  );
};

ButtonCustom.propTypes = {
  onClick: PropTypes.func,
};

export { ButtonCustom };
