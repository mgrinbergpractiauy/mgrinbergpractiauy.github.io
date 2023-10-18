import React, { useRef, useState } from "react";
import { Tooltip as MUITooltip } from "@mui/material";
import PropTypes from "prop-types";
import "./TooltipStyles.scss";

/*
 * Tooltip de texto.
 * Props:
 * children: componente hijo. (Debe ser único)
 * title: string.
 * enterDelay: int.
 * leaveDelay: int.
 * enterNextDelay: int.
 * hideOnFocus: boolean.
 * disableHover: boolean.
 */
const Tooltip = ({
  children,
  title,
  enterDelay = 1000,
  enterNextDelay = 500,
  leaveDelay = 200,
  hideOnFocus = true,
  disableHover = false,
}) => {
  const [focusOnChild, setFocusOnChild] = useState(false);
  const [openTooltip, setOpenTooltip] = useState(false);

  const mouseHovering = useRef(false);

  const onMouseLeave = () => {
    mouseHovering.current = false;
    setOpenTooltip(false);
  };

  const onMouseEnter = () => {
    mouseHovering.current = true;
    setTimeout(() => {
      if (mouseHovering.current) {
        setOpenTooltip(true);
      }
    }, enterDelay);
  };

  const onFocus = () => {
    setFocusOnChild(true);
  };

  const onBlur = () => {
    setFocusOnChild(false);
  };

  return (
    <div className="tooltip-style">
      <MUITooltip
        title={<span className="font-weight-light fs-medium">{title}</span>}
        arrow
        enterDelay={enterDelay}
        enterNextDelay={enterNextDelay}
        leaveDelay={leaveDelay}
        disableHoverListener={disableHover}
        open={hideOnFocus ? openTooltip && !focusOnChild : undefined}
      >
        {hideOnFocus
          ? React.cloneElement(children, {
              onMouseEnter,
              onMouseLeave,
              onFocus,
              onBlur,
            })
          : children}
      </MUITooltip>
    </div>
  );
};

export { Tooltip };

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  enterDelay: PropTypes.number,
  leaveDelay: PropTypes.number,
  enterNextDelay: PropTypes.number,
  hideOnFocus: PropTypes.bool,
  disableHover: PropTypes.bool,
};
