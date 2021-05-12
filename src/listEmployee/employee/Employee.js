import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import Button from '@material-ui/core/Button';

import PositionSelect from '../../components/positionSelect';
import GenderSelect from '../../components/genderSelect';
import DatePicker from '../../components/datePicker';
// import ColleaguesSelect from '../../components/colleaguesSelect';
import { useStyles } from './styles';
import {
  addEmployee, deleteEmployee, editEmployee, // getEmployeeList,
} from '../common';

const Employee = (props) => {
  const {
    handleSetIsAdd,
    isAdd = false,
    item = {},
    handleReloadList,
  } = props;

  const classes = useStyles();
  const [lastName, setLastName] = useState('');
  const [name, setName] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [position, setPosition] = useState(0);
  const [dateOfBirth, setDateOfBirth] = useState(moment().subtract(18, 'years').startOf('day'));
  const [gender, setGender] = useState(0);
  const [employmentDate, setEmploymentDate] = useState(moment().startOf('month'));
  const [dateOfDismissal, setDateOfDismissal] = useState('');
  const [drivingLicense, setDrivingLicense] = useState(false);
  // const [colleagues, setColleagues] = useState();
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(0);

  useEffect(() => {
    if (!isAdd) {
      setLastName(item.lastName);
      setName(item.name);
      setPatronymic(item.patronymic);
      setPosition(item.position);
      setDateOfBirth(moment(item.dateOfBirth));
      setGender(item.gender);
      setEmploymentDate(moment(item.employmentDate));
      setDateOfDismissal(moment(item.dateOfDismissal));
      setDrivingLicense(item.drivingLicense);
      // setColleagues(item.colleagues);
    }
    // employees = getEmployeeList();
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

  const clearFields = () => {
    setLastName('');
    setName('');
    setPatronymic('');
    setPosition(0);
    setDateOfBirth(moment().subtract(18, 'years').startOf('day'));
    setGender(0);
    setEmploymentDate(moment().startOf('month'));
    setDateOfDismissal('');
    setDrivingLicense(false);
    // setColleagues();
  };

  const handleSubmit = (id) => {
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
        // colleagues,
      };
      if (id !== undefined) {
        employeeObject.id = id;
        editEmployee(employeeObject);
        setEditing(-1);
      } else {
        addEmployee(employeeObject);
        clearFields();
      }
    }
    handleReloadList();
  };

  const handleDeleteEmployee = () => {
    deleteEmployee(item.id);
    handleReloadList();
  };

  const handleEditEmployee = (id) => {
    if (id !== editing) {
      setEditing(id);
    } else {
      setEditing(-1);
    }
  };

  const isEdit = item.id === editing;

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={isEdit || isAdd ? 10 : 12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                label="Фамилия"
                size="small"
                disabled={!isEdit && !isAdd}
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                error={error === 'lastName'}
                fullWidth
                margin="none"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Имя"
                disabled={!isEdit && !isAdd}
                value={name}
                error={error === 'name'}
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
                disabled={!isEdit && !isAdd}
                value={patronymic}
                fullWidth
                margin="none"
              />
            </Grid>
            <Grid item xs={12}>
              <PositionSelect
                value={position}
                disabled={!isEdit && !isAdd}
                handleChangePosition={(value) => setPosition(value)}
              />
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                value={dateOfBirth}
                maxDate={dateOfBirth}
                disabled={!isEdit && !isAdd}
                onChange={(date) => setDateOfBirth(date)}
                label="Дата рождения"
              />
            </Grid>
            <Grid item xs={12}>
              <GenderSelect
                value={gender}
                disabled={!isEdit && !isAdd}
                handleChangeGender={(value) => setGender(value)}
              />
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                value={employmentDate}
                minDate={dateOfBirth}
                disabled={!isEdit && !isAdd}
                onChange={(date) => setEmploymentDate(date)}
                label="Дата приема на работу"
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={11}>
                  <DatePicker
                    value={dateOfDismissal}
                    minDate={employmentDate}
                    disabled={!isEdit && !isAdd}
                    notCheck
                    onChange={(date) => setDateOfDismissal(date)}
                    label="Дата увольнения"
                    required={false}
                  />
                </Grid>
                <Grid item xs={1}>
                  <IconButton
                    size="small"
                    style={{ marginTop: 16 }}
                    onClick={() => setDateOfDismissal('')}
                    className={classes.clear}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={(
                  <Checkbox
                    required
                    disabled={!isEdit && !isAdd}
                    checked={drivingLicense}
                    onChange={(e) => setDrivingLicense(e.target.checked)}
                    color="primary"
                  />
                  )}
                label="Наличие прав"
              />
            </Grid>
            {/* <Grid item xs={12}>
              <ColleaguesSelect
                value={colleagues}
                label="Коллеги"
                disabled={!isEdit && !isAdd}
                employees={['1', '2']}
                handleChangeColleagues={(value) => setColleagues(value)}
              />
            </Grid> */}
            {!isAdd ? (
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Button fullWidth onClick={() => handleEditEmployee(item.id)} variant="contained" color="primary">
                      Редактировать
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button fullWidth onClick={() => handleDeleteEmployee()} variant="contained" color="secondary">
                      Удалить
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            ) : null}
          </Grid>
        </Grid>
        {isEdit || isAdd ? (
          <Grid item xs={2}>
            <IconButton
              color="secondary"
              onClick={(editing !== -1 && item.id === editing) ? () => setEditing(-1) : () => handleSetIsAdd()}
              className={classes.clear}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
            <IconButton
              color="primary"
              onClick={(editing !== -1 && item.id === editing) ? () => handleSubmit(item.id) : () => handleSubmit()}
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

export default Employee;
