import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import { genderTypeDescription } from '../../types';

const useStyles = makeStyles((theme) => ({
  input: {
    '&.Mui-error .MuiOutlinedInput-notchedOutline': {
      borderColor: '#f44336 !important',
    },
  },
  textField: {
    height: 45,
    fontSize: '14px',
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
 * Компонент выбора пола
 * @param {*} value (Number, default - '0')
 * @param {*} handleChangeGender (function for callback value)
 * @param {*} error (true/false, default - false)
 * @param {*} disabled (true/false, default - false)
 * @param {*} variant (standard/outlined/filled, default - standard)
 * @param {*} label (String, default - 'Пол')
 * @param {boolean} smaller default - false (уменьшить ширину и отступы поля)
 * @param {*} fullWidth (true/false, default - false)
 *
 */
function GenderSelect(props) {
  const {
    value = 0, handleChangeGender, error = false,
    disabled = false, variant = 'standard', label = 'Пол',
    smaller = false, fullWidth = true, required = true,
  } = props;
  const classes = useStyles();

  const handleChange = (event) => {
    handleChangeGender(event.target.value);
  };

  return (
    <TextField
      select
      required={required}
      disabled={disabled}
      error={error}
      label={label}
      value={value}
      onChange={handleChange}
      variant={variant}
      fullWidth={fullWidth}
      InputProps={{
        className: clsx(
          classes.input,
          smaller ? classes.textField : null,
        ),
      }}
      InputLabelProps={
        smaller ? {
          shrink: true,
          className: classes.inputLabel,
        } : null
      }
    >
      {Object.entries(genderTypeDescription).map((item) => (
        <MenuItem key={item[0]} value={item[0]}>
          {item[1]}
        </MenuItem>
      ))}
    </TextField>
  );
}

GenderSelect.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  handleChangeGender: PropTypes.func.isRequired,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  variant: PropTypes.string,
  label: PropTypes.string,
  fullWidth: PropTypes.bool,
};

export default GenderSelect;
