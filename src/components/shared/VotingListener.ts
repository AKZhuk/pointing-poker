import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOpen } from '../../redux/reducers/popUp/popUpActions';
import { IRootState, PopUpNames, GameRole } from '../../types';

const VotingListener = (): void => {
  const { kickVoting } = PopUpNames;
  const { observer, player } = GameRole;
  const dispatch = useDispatch();
  const {
    vote,
    room: { gameSettings },
    user: { role },
  } = useSelector((state: IRootState) => state);

  const isAllowedToVote = gameSettings.ScrumMasterAsPlayer ? role !== observer : role === player;
  useEffect(() => {
    if (vote.kickMember && isAllowedToVote) {
      dispatch(setOpen(kickVoting, true));
    }
  }, [dispatch, kickVoting, role, isAllowedToVote, vote]);
};

export default VotingListener;
