import React, { useState } from 'react';
import clsx from 'clsx';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { useStyles } from './styles';
import Employee from '../employee';

export default function AddEmployee() {
  const classes = useStyles();

  const [isAdd, setIsAdd] = useState(false);

  const handleSetIsAdd = () => {
    setIsAdd(!isAdd);
  };

  return (
    <div className={classes.container}>
      <div
        className={clsx(classes.flipper, {
          [classes.flip]: isAdd,
        })}
      >
        <div className={clsx(classes.front, classes.card)}>
          <Fab size="small" onClick={() => handleSetIsAdd()} className={classes.addFab}>
            <AddIcon />
          </Fab>
        </div>
        <div className={clsx(classes.back, classes.card)}>
          <Employee isAdd handleSetIsAdd={handleSetIsAdd} />
        </div>
      </div>
    </div>
  );
}
