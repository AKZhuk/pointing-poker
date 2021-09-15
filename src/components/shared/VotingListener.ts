import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOpen } from '../../redux/reducers/popUp/popUpActions';
import { IRootState, PopUpNames, GameRole } from '../../types';

const VotingListener = (): void => {
  const { kickVoting } = PopUpNames;
  const { player } = GameRole;
  const dispatch = useDispatch();
  const {
    kickVote,
    user: { role },
  } = useSelector((state: IRootState) => state);

  useEffect(() => {
    if (kickVote.kickMember && role === player && !kickVote.isVoted) {
      dispatch(setOpen(kickVoting, true));
    }
  }, [dispatch, kickVoting, player, role, kickVote]);
};

export default VotingListener;
