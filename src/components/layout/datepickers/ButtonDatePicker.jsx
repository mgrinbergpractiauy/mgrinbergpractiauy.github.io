import React from "react";
import PropTypes from "prop-types";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { DateTime } from "luxon";
import {
  CUSTOMMONTH,
  CUSTOMWEEKDAYS,
} from "../../../constants/datePickerLocaleCustom_es";
import { ButtonCustom } from "../buttons/ButtonCustom";

const ButtonDatePicker = (props) => {
  const defaultRender = ({ openCalendar, value, handleValueChange }) => {
    return (
      <>
        <ButtonCustom
          variant="primary"
          onClick={openCalendar}
          className={props.InputClassName}
        >
          {value ? value.toString() : props.InputDefaultValue}
        </ButtonCustom>
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

ButtonDatePicker.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export { ButtonDatePicker };
