import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOpen } from '../../redux/reducers/popUp/popUpActions';
import { IRootState, PopUpNames, GameRole } from '../../types';

const VotingListener = (): void => {
  const { kickVoting } = PopUpNames;
  const { player } = GameRole;
  const dispatch = useDispatch();
  const {
    features,
    user: { role },
  } = useSelector((state: IRootState) => state);

  useEffect(() => {
    if (features.kickMember && role === player && !features.isVoted) {
      dispatch(setOpen(kickVoting, true));
    }
  }, [dispatch, kickVoting, player, role, features]);
};

export default VotingListener;
