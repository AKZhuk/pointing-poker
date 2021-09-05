import { useState, ChangeEvent } from 'react';
import Switch from '@material-ui/core/Switch';
import { Typography } from '@material-ui/core';
import { ISwitcherProps } from '../../types';

const Switcher = ({ label, name, handleChecked }: ISwitcherProps): JSX.Element => {
  const [checked, setChecked] = useState(false);

  const toggleChecked = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(prev => !prev);
    handleChecked(e);
  };

  return (
    <div className="row">
      <Typography variant="subtitle1">{label}</Typography>
      <Switch
        checked={checked}
        onChange={toggleChecked}
        color="primary"
        name={name}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
    </div>
  );
};

export default Switcher;
