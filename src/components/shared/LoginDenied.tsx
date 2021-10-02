import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setOpen } from '../../redux/reducers/popUp/popUpActions';
import Title from './Title';

const LoginDenied = (): JSX.Element => {
  const dispatch = useDispatch();
  const handleOKButton = () => {
    dispatch(setOpen('LoginDeniedPopUp', false));
  };
  return (
    <>
      <Title text="Login denied!" variant="h4" align="center" />
      <Button variant="contained" color="secondary" onClick={handleOKButton}>
        OK
      </Button>
    </>
  );
};

export default LoginDenied;
