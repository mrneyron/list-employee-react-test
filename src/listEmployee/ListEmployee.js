import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { Typography } from '@material-ui/core';
import Employee from './employee';
import AddEmployee from './addEmployee';
import { getEmployeeList } from './common';
import { useStyles } from './styles';

const ListEmployee = () => {
  const classes = useStyles();
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(getEmployeeList());
  }, []);

  const handleClick = () => {
    localStorage.setItem('employees', null);
  };

  const handleReloadList = () => {
    setList(getEmployeeList());
  };

  return (
    <div>
      <Paper style={{ marginBottom: 16 }} className={classes.paper}>
        <Typography variant="h6">List Employee</Typography>
      </Paper>
      <Grid container spacing={2}>
        {list !== null ? (
          <>
            {list.map((item) => (
              <Grid key={item.lastName + item.name} item xs={12} sm={6} md={4} lg={3} xl={2}>
                <Paper className={classes.paper}>
                  <Employee isAdd={false} item={item} handleReloadList={handleReloadList} />
                </Paper>
              </Grid>
            ))}
          </>
        ) : null}
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <AddEmployee reloadList={handleReloadList} />
        </Grid>
        <Grid item xs={12}>
          <button onClick={handleClick}>clear</button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ListEmployee;
