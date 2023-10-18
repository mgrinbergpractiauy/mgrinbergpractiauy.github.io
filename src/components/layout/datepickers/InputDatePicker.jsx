import React from "react";
import PropTypes from "prop-types";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { DateTime } from "luxon";
import { TextField } from "@mui/material";
import { BiCalendarAlt } from "react-icons/bi";
import InputAdornment from "@mui/material/InputAdornment";
import {
  CUSTOMMONTH,
  CUSTOMWEEKDAYS,
} from "../../../constants/datePickerLocaleCustom_es";

const InputDatePicker = (props) => {
  const defaultRender = ({ openCalendar, value, handleValueChange }) => {
    return (
      <>
        <TextField
          className={props.inputClassName}
          onClick={openCalendar}
          value={value}
          onChange={handleValueChange}
          label={props.inputDefaultValue}
          size="small"
          InputLabelProps={{ shrink: true }}
          disabled={props.disabled}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <BiCalendarAlt />
              </InputAdornment>
            ),
          }}
        />
      </>
    );
  };

  const {
    RenderObject = defaultRender,
    iniDateValue = null,
    handleChange = () => null,
    showOtherDays = false,
    minDate = new DateObject().add(-12, "months"),
    maxDate = new DateObject().add(12, "months"),
    formatDate = "DD/MM/YYYY",
    disableYearPicker = false,
    disableMonthPicker = false,
    className = "",
  } = props;

  return (
    <>
      <DatePicker
        {...props}
        weekStartDayIndex={1}
        format={formatDate}
        value={
          iniDateValue instanceof DateTime && iniDateValue.isValid
            ? iniDateValue.toJSDate()
            : iniDateValue
        }
        onChange={handleChange}
        months={CUSTOMMONTH}
        weekDays={CUSTOMWEEKDAYS}
        className={className}
        minDate={
          minDate instanceof DateTime && minDate.isValid
            ? minDate.toJSDate()
            : minDate
        }
        maxDate={
          maxDate instanceof DateTime && maxDate.isValid
            ? maxDate.toJSDate()
            : maxDate
        }
        showOtherDays={showOtherDays}
        disableYearPicker={disableYearPicker}
        disableMonthPicker={disableMonthPicker}
        render={<RenderObject />}
      />
    </>
  );
};

InputDatePicker.propTypes = {
  handleChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export { InputDatePicker };
