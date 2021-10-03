import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setOpen } from '../../../redux/reducers/popUp/popUpActions';
import { SendWSMessage } from '../../../helpers/WebSocketApi';
import { GameRole, IRootState, KickMemberProps } from '../../../types';
import Title from '../Title';
import { resetVoting } from '../../../redux/reducers/features/featuresActions';
import './Members.scss';

const AddMember = ({ member, popUpName }: KickMemberProps): JSX.Element => {
  const dispatch = useDispatch();
  const { scrumMaster } = GameRole;
  const {
    user: { role },
    room: { roomKey },
  } = useSelector((state: IRootState) => state);
  const handleNoButton = () => {
    if (role === scrumMaster) {
      SendWSMessage('rejectLogin', roomKey, member);
      dispatch(setOpen(popUpName, false));
      dispatch(resetVoting());
    }
  };
  const handleYesButton = () => {
    if (role === scrumMaster) {
      SendWSMessage('addMember', roomKey, member);
      dispatch(setOpen(popUpName, false));
      dispatch(resetVoting());
    }
  };
  return (
    <>
      <Title text="New Member!" variant="h4" align="center" />
      <p className="kick-text">
        <span className="member-name">{` ${member?.firstName} ${member?.lastName}`}</span> wants to join the game .
      </p>
      <div className="button-wrapper">
        <Button variant="contained" color="primary" onClick={handleYesButton}>
          Admit
        </Button>
        <Button variant="contained" color="secondary" onClick={handleNoButton}>
          Reject
        </Button>
      </div>
    </>
  );
};

export default AddMember;
