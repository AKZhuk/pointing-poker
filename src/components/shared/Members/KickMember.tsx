import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setOpen } from '../../../redux/reducers/popUp/popUpActions';
import { KickMemberProps, PopUpNames } from '../../../types';
import Title from '../Title';
import './Members.scss';

const KickMember = ({ firstName, lastName }: KickMemberProps): JSX.Element => {
  const dispatch = useDispatch();
  const { deleteMemberPopUp } = PopUpNames;
  const handleNoButton = () => {
    dispatch(setOpen(deleteMemberPopUp, false));
  };
  return (
    <>
      <Title text="Kick player?" variant="h3" align="center" />
      <p className="kick-text">
        Do you really want to remove player <span className="member-name">{`${firstName} ${lastName}`}</span> from
        session?
      </p>
      <div className="button-wrapper">
        <Button variant="contained" color="primary">
          Yes
        </Button>
        <Button variant="contained" color="secondary" onClick={handleNoButton}>
          No
        </Button>
      </div>
    </>
  );
};

export default KickMember;
