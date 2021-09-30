import { ButtonBase } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Alert } from '@material-ui/lab';
import { GameRole, IRootState, IUser, PopUpNames } from '../../types';
import Title from '../shared/Title';
import GameControl from './GameControl';
import Issues from '../shared/Issues/Issues';
import { scoreTypes } from '../shared/GameCards/GameCards';
import { SendWSMessage } from '../../helpers/WebSocketApi';
import GameCard from '../shared/GameCards/GameCard';
import KickMember from '../shared/Members/KickMember';
import PopUp from '../shared/PopUp';
import RoundControlPanel from './RoundControlPanel';
import Votes from './Votes';
import './Game.scss';
import Statistics from '../shared/Statistic/Statistics';

const Game = (): JSX.Element => {
  const { deleteMemberPopUp } = PopUpNames;
  const [kickUser, setKickUser] = useState<IUser | null>(null);
  const [isVoted, setIsVoted] = useState(false);
  const [pickedCard, setPickedCard] = useState<null | number>(null);

  const {
    room: {
      roomKey,
      game: { activeIssueId, vote, cardsIsFlipped, remainingRoundTime },
      gameSettings: { scoreType, cards, changingCardInRoundEnd, ScrumMasterAsPlayer },
    },
    user: { role, id },
  } = useSelector((state: IRootState) => state);

  const isScrumMasterCanVote = (): boolean => {
    return role === GameRole.scrumMaster && ScrumMasterAsPlayer;
  };

  const handleUserVoice = (cardValue: number) => {
    const canIChangeVote = changingCardInRoundEnd || !cardsIsFlipped;
    const userVoice = vote[activeIssueId].find(voice => voice.userId === id);
    const isTimeOver = remainingRoundTime === '00:00';
    if ((userVoice === undefined && !isTimeOver && !cardsIsFlipped) || (canIChangeVote && !isTimeOver)) {
      SendWSMessage('setVoice', roomKey, { issueId: activeIssueId, userId: id, voice: cardValue });
      setPickedCard(cardValue);
    } else {
      setIsVoted(true);
      setTimeout(() => {
        setIsVoted(false);
      }, 5000);
    }
  };

  return (
    <>
      <Title text="Game" variant="h3" align="center" />
      <GameControl />
      <div className="row">
        <Issues />
        <div className="game__right">
          {role === GameRole.scrumMaster && <RoundControlPanel />}
          <Statistics issueId={activeIssueId} isFlipped={cardsIsFlipped} />
          <Votes setKickUser={setKickUser} />
        </div>
      </div>
      {(role === GameRole.player || isScrumMasterCanVote()) && (
        <>
          <div className="message-area">{isVoted && <Alert severity="warning">The round is over!</Alert>}</div>
          <div className="center">
            {scoreTypes[scoreType].slice(0, cards).map(card => (
              <ButtonBase
                key={card}
                className={card === pickedCard ? 'picked' : ''}
                onClick={() => handleUserVoice(card)}
              >
                <GameCard value={card} large />
              </ButtonBase>
            ))}
          </div>
        </>
      )}
      <PopUp content={<KickMember member={kickUser} popUpName={deleteMemberPopUp} />} name={deleteMemberPopUp} />
    </>
  );
};

export default Game;
