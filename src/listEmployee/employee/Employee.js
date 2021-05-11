import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';

import PositionSelect from '../../components/positionSelect';
import GenderSelect from '../../components/genderSelect';
import DatePicker from '../../components/datePicker';
import ColleaguesSelect from '../../components/colleaguesSelect';
import { useStyles } from './styles';
import { addEmployee, getEmployeeList } from '../common';

const EmployeeCard = (props) => {
  const {
    handleSetIsAdd,
    isAdd = false,
    item = {},
  } = props;

  const classes = useStyles();
  const [lastName, setLastName] = useState('');
  const [name, setName] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [position, setPosition] = useState(0);
  const [dateOfBirth, setDateOfBirth] = useState(moment().subtract(18, 'years').startOf('day'));
  const [gender, setGender] = useState(0);
  const [employmentDate, setEmploymentDate] = useState(moment().startOf('month'));
  const [dateOfDismissal, setDateOfDismissal] = useState(moment());
  const [drivingLicense, setDrivingLicense] = useState(false);
  const [colleagues, setColleagues] = useState();
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAdd) {
      console.log(item);
      setLastName(item.lastName);
      setName(item.name);
      setPatronymic(item.patronymic);
      setPosition(item.position);
      setDateOfBirth(moment(item.dateOfBirth));
      setGender(item.gender);
      setEmploymentDate(moment(item.employmentDate));
      setDateOfDismissal(moment(item.dateOfDismissal));
      setDrivingLicense(item.drivingLicense);
      setColleagues(item.colleagues);
    }
  }, []);

  const checkRequired = () => {
    if (lastName === '') {
      setError('lastName');
      return false;
    }
    if (name === '') {
      setError('name');
      return false;
    }
    return true;
  };

  const handleSubmitAdd = () => {
    if (checkRequired()) {
      const employeeObject = {
        lastName,
        name,
        patronymic,
        position,
        dateOfBirth,
        gender,
        employmentDate,
        dateOfDismissal,
        drivingLicense,
        colleagues,
      };
      addEmployee(employeeObject);
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={isAdd ? 10 : 12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                label="Фамилия"
                size="small"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                error={error === "lastName"}
                fullWidth
                margin="none"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Имя"
                value={name}
                error={error === "name"}
                onChange={(e) => setName(e.target.value)}
                size="small"
                fullWidth
                margin="none"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Отчество"
                onChange={(e) => setPatronymic(e.target.value)}
                size="small"
                value={patronymic}
                fullWidth
                margin="none"
              />
            </Grid>
            <Grid item xs={12}>
              <PositionSelect
                value={position}
                handleChangePosition={(value) => setPosition(value)}
              />
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                value={dateOfBirth}
                maxDate={dateOfBirth}
                onChange={(date) => setDateOfBirth(date)}
                label="Дата рождения"
              />
            </Grid>
            <Grid item xs={12}>
              <GenderSelect
                value={gender}
                handleChangeGender={(value) => setGender(value)}
              />
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                value={employmentDate}
                minDate={dateOfBirth}
                onChange={(date) => setEmploymentDate(date)}
                label="Дата приема на работу"
              />
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                value={dateOfDismissal}
                minDate={employmentDate}
                onChange={(date) => setDateOfDismissal(date)}
                label="Дата увольнения"
                required={false}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={(
                  <Checkbox
                    required
                    checked={drivingLicense}
                    onChange={(e) => setDrivingLicense(e.target.checked)}
                    color="primary"
                  />
                  )}
                label="Наличие прав"
              />
            </Grid>
            <Grid item xs={12}>
              <ColleaguesSelect
                value={colleagues}
                label="Коллеги"
                employees={['1', '2']}
                handleChangeColleagues={(value) => setColleagues(value)}
              />
            </Grid>
          </Grid>
        </Grid>
        {isAdd ? (
          <Grid item xs={2}>
            <IconButton
              color="secondary"
              onClick={() => handleSetIsAdd()}
              className={classes.clear}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
            <IconButton
              color="primary"
              onClick={() => handleSubmitAdd()}
              className={classes.clear}
            >
              <CheckIcon fontSize="small" />
            </IconButton>
          </Grid>
        ) : null}
      </Grid>
    </div>
  );
};

export default EmployeeCard;
