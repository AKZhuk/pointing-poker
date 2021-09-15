import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setOpen } from '../../../redux/reducers/popUp/popUpActions';
import { SendWSMessage } from '../../../helpers/WebSocketApi';
import { GameRole, IRootState, KickMemberProps } from '../../../types';
import Title from '../Title';
import { setVote } from '../../../redux/reducers/voting/votingActions';
import './Members.scss';

const KickMember = ({ member, popUpName }: KickMemberProps): JSX.Element => {
  const dispatch = useDispatch();
  const { scrumMaster, player } = GameRole;
  const {
    user: { role },
    room: { roomKey, members },
  } = useSelector((state: IRootState) => state);
  const handleNoButton = () => {
    dispatch(setOpen(popUpName, false));
  };
  const membersCountOK = members.length > 3;
  const handleYesButton = () => {
    if (role === scrumMaster) {
      SendWSMessage('removeMember', roomKey, member);
      dispatch(setOpen(popUpName, false));
    }
    if (role === player) {
      dispatch(setOpen(popUpName, false));

      if (membersCountOK) {
        dispatch(setVote('isVoted', true));
        SendWSMessage('kickVoting', roomKey, member);
      }
    }
  };

  const kickMessage = (
    <>
      Do you want to remove player
      <span className="member-name">{` ${member?.firstName} ${member?.lastName}`}</span> from session?
    </>
  );
  const errorMessage = (
    <>
      You cannot kick
      <span className="member-name">{` ${member?.firstName} ${member?.lastName}`}</span> from session. Too few users.
    </>
  );
  return (
    <>
      <Title text={membersCountOK ? 'Kick player?' : "Can't kick player"} variant="h3" align="center" />
      <p className="kick-text">{membersCountOK ? kickMessage : errorMessage}</p>
      <div className="button-wrapper">
        <Button variant="contained" color="primary" onClick={handleYesButton}>
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
