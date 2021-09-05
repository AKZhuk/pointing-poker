import { useState } from 'react';
import Switch from '@material-ui/core/Switch';
import { ISwitcherProps } from '../../types';

const Switcher = (props: ISwitcherProps): JSX.Element => {
  const { handleChecked } = props;
  const [checked, setChecked] = useState(false);

  const toggleChecked = () => {
    setChecked(prev => !prev);
    handleChecked(checked);
  };

  return (
    <div>
      <Switch
        checked={checked}
        onChange={toggleChecked}
        color="primary"
        name="check"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
    </div>
  );
};

export default Switcher;
