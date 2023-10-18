import React from "react";
import PropTypes from "prop-types";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { DateTime } from "luxon";
import {
  CUSTOMMONTH,
  CUSTOMWEEKDAYS,
} from "../../../constants/datePickerLocaleCustom_es";

const MultiDatePicker = (props) => {
  const defaultRender = ({
    openCalendar,
    value,
    handleValueChange,
    joinCharacter,
  }) => {
    return (
      <>
        <input
          className={props.InputClassName}
          value={value?.join(joinCharacter)}
          placeholder={props.InputDefaultValue}
          type="text"
          onClick={openCalendar}
          onChange={handleValueChange}
        />
      </>
    );
  };

  const {
    RenderObject = defaultRender,
    iniDateValue = [null, null],
    handleChange = () => null,
    showOtherDays = false,
    minDate = new DateObject().add(-12, "months"),
    maxDate = new DateObject().add(12, "months"),
    disableYearPicker = false,
    disableMonthPicker = false,
    formatDate = "DD/MM/YYYY",
    className = "",
    joinCharacter = " - ",
    numberOfMonths = 2,
  } = props;

  return (
    <>
      <DatePicker
        props
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
        weekStartDayIndex={1}
        format={formatDate}
        value={iniDateValue.map((d) =>
          d instanceof DateTime && d.isValid ? d.toJSDate() : d
        )}
        onChange={handleChange}
        disableYearPicker={disableYearPicker}
        disableMonthPicker={disableMonthPicker}
        range
        numberOfMonths={numberOfMonths}
        months={CUSTOMMONTH}
        weekDays={CUSTOMWEEKDAYS}
        showOtherDays={showOtherDays}
        render={<RenderObject joinCharacter={joinCharacter} />}
      />
    </>
  );
};

MultiDatePicker.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export { MultiDatePicker };
