import { ChangeEvent } from 'react';
import Switch from '@material-ui/core/Switch';
import { Typography } from '@material-ui/core';
import { ISwitcherProps } from '../../types';

const Switcher = ({ label, name, value, handleChecked }: ISwitcherProps): JSX.Element => {
  const toggleChecked = (e: ChangeEvent<HTMLInputElement>) => {
    handleChecked(e);
  };

  return (
    <div className="row">
      <Typography variant="subtitle1">{label}</Typography>
      <Switch
        checked={value}
        onChange={toggleChecked}
        color="primary"
        name={name}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
    </div>
  );
};

export default Switcher;
