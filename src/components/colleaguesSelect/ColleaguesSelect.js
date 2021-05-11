import React from 'react';
import PropTypes from 'prop-types';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

/**
 * Компонент выбора коллег
 * @param {*} value (Number, default - '0')
 * @param {*} handleChangeColleagues (function for callback value)
 * @param {*} error (true/false, default - false)
 * @param {*} disabled (true/false, default - false)
 * @param {*} variant (standard/outlined/filled, default - outlined)
 * @param {*} label (String, default - 'Коллеги')
 * @param {boolean} smaller default - false (уменьшить ширину и отступы поля)
 * @param {*} fullWidth (true/false, default - false)
 *
 */
function ColleaguesSelect(props) {
  const {
    value = [''], handleChangeColleagues, label = 'Коллеги',
    smaller = true, fullWidth = true, required = false, employees = [],
  } = props;

  const handleChange = (event) => {
    handleChangeColleagues(event.target.value);
  };

  return (
    <FormControl
      required={required}
      fullWidth={fullWidth}
      size={smaller ? 'small' : 'medium'}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        value={value}
        onChange={handleChange}
        input={<Input />}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
      >
        {employees.map((name) => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={value.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

ColleaguesSelect.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  handleChangeColleagues: PropTypes.func.isRequired,
  label: PropTypes.string,
  fullWidth: PropTypes.bool,
};

export default ColleaguesSelect;
