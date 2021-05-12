import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  datePickerInput: {
    '&.Mui-error .MuiOutlinedInput-notchedOutline': {
      borderColor: '#f44336',
    },
  },
  textField: {
    height: 45,
    '& legend': {
      maxWidth: 0,
      [theme.breakpoints.down('sm')]: {
        maxWidth: 'inherit',
      },
    },
  },
  inputLabel: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
}));

/**
 * Компонент датепикера
 * @param {object} value moment obj, default - текущая дата
 * @param {function} onChange function for callback value
 * @param {object} minDate moment obj, default - текущая дата - 100 лет
 * @param {object} maxDate moment obj, default - текущая дата
 * @param {string} invalidDateMessage default - Неверный формат даты
 * @param {string} minDateMessage default - Превышение минимальной даты
 * @param {string} maxDateMessage default - Превышение максимальной даты
 * @param {string} openTo year/month/date default - date
 * @param {Array} views array of datepicker elements, default - ['year', 'month', 'date']
 * @param {string} format default - DD.MM.YYYY
 * @param {boolean} disabled true/false, default - false
 * @param {string} variant standard/outlined/filled, default - standard
 * @param {String} label default - 'Выберите дату'
 * @param {boolean} fullWidth true/false, default - false
 *
 */
function DatePicker(props) {
  const {
    value = moment(), onChange, minDate = moment().subtract(100, 'years'), maxDate = moment(),
    invalidDateMessage = 'Неверный формат даты', minDateMessage = 'Превышение минимальной даты',
    maxDateMessage = 'Превышение максимальной даты', format = 'DD.MM.YYYY', openTo = 'date',
    views = ['year', 'month', 'date'], disabled = false, variant = 'standard', label = 'Выберите дату',
    smaller = false, fullWidth = true, required = true, notCheck = false,
  } = props;
  const [dateValue, setDateValue] = useState(null);
  const [errorValue, setErrorValue] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    if (moment(value)._isValid) {
      if (value < moment().subtract(100, 'years') || value > moment().add(100, 'years')) {
        setDateValue('');
        setErrorValue(true);
      } else {
        setDateValue(value);
        setErrorValue(false);
      }
    } else {
      setDateValue('');
      setErrorValue(true);
    }
  }, [value]);

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDatePicker
        error={notCheck ? false : errorValue}
        required={required}
        label={label}
        variant={variant}
        inputVariant={variant}
        format={format}
        openTo={openTo}
        views={views}
        value={dateValue}
        onChange={onChange}
        disabled={disabled}
        minDate={minDate}
        maxDate={maxDate}
        invalidDateMessage={notCheck ? '' : invalidDateMessage}
        minDateMessage={minDateMessage}
        maxDateMessage={maxDateMessage}
        InputProps={{
          className: clsx(
            classes.datePickerInput,
            smaller ? classes.textField : null,
          ),
        }}
        InputLabelProps={
          smaller ? {
            shrink: true,
            className: classes.inputLabel,
          } : null
        }
        fullWidth={fullWidth}
        cancelLabel="Отмена"
      />
    </MuiPickersUtilsProvider>
  );
}

DatePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  minDate: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  maxDate: PropTypes.object,
  invalidDateMessage: PropTypes.string,
  minDateMessage: PropTypes.string,
  maxDateMessage: PropTypes.string,
  format: PropTypes.string,
  openTo: PropTypes.oneOf(['year', 'month', 'date']),
  views: PropTypes.arrayOf(PropTypes.oneOf(['year', 'month', 'date'])),
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
  label: PropTypes.string,
  fullWidth: PropTypes.bool,
};

export default DatePicker;
