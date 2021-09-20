import { ButtonBase, Card, CardContent, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Alert } from '@material-ui/lab';
import { GameRole, IRootState, IUser, PopUpNames } from '../../types';
import Statistics from '../shared/Statistics';
import Title from '../shared/Title';
import GameControl from './GameControl';
import Issues from '../shared/Issues/Issues';
import MemberCard from '../shared/Members/MemberCard';
import { scoreTypes } from '../shared/GameCards/GameCards';
import { SendWSMessage } from '../../helpers/WebSocketApi';
import GameCard from '../shared/GameCards/GameCard';
import KickMember from '../shared/Members/KickMember';
import PopUp from '../shared/PopUp';
import RoundControlPanel from './RoundControlPanel';
import './Game.scss';

const Game = (): JSX.Element => {
  const { deleteMemberPopUp } = PopUpNames;
  const [kickUser, setKickUser] = useState<IUser | null>(null);
  const [isVoted, setIsVoted] = useState(false);
  const handleUser = (member: IUser) => {
    setKickUser(member);
  };

  const {
    room: {
      members,
      roomKey,
      game: { activeIssueId, vote },
      gameSettings: { scoreType, cards, changingCardInRoundEnd },
    },
    user: { role, id },
  } = useSelector((state: IRootState) => state);

  const findUserVoice = (userId: string): string => {
    const voice = activeIssueId !== '' && vote[activeIssueId].find(elem => elem.userId === userId);
    return voice ? `${voice.voice} ${scoreType}` : 'In progress';
  };

  const handleUserVoice = (cardValue: number) => {
    const canIChangeVote = changingCardInRoundEnd && members.length === vote[activeIssueId].length;
    const userVoice = vote[activeIssueId].find(voice => voice.userId === id);
    if (userVoice === undefined || canIChangeVote) {
      SendWSMessage('setVoice', roomKey, { issueId: activeIssueId, userId: id, voice: cardValue });
    } else {
      setIsVoted(true);
      setTimeout(() => {
        setIsVoted(false);
      }, 5000);
    }
  };

  return (
    <>
      <div className="game__wrapper">
        <section className="game__main">
          <Title text="Game" variant="h3" align="center" />
          <GameControl />
          <div className="row">
            <Issues />
            {role === GameRole.scrumMaster ? <RoundControlPanel /> : <Statistics issueId={activeIssueId} />}
          </div>
          {role === GameRole.scrumMaster && <Statistics issueId={activeIssueId} />}
          {role === GameRole.player && (
            <>
              <div className="message-area">{isVoted && <Alert severity="warning">You are already voted!</Alert>}</div>
              <div className="center">
                {scoreTypes[scoreType].slice(0, cards).map(card => (
                  <ButtonBase key={card} onClick={() => handleUserVoice(card)}>
                    <GameCard value={card} large />
                  </ButtonBase>
                ))}
              </div>
            </>
          )}
        </section>
        <aside className="game__aside">
          <Title text="Vote" variant="h3" align="center" />
          {members
            ?.filter(member => member.role === GameRole.player)
            .map((member: IUser) => (
              <div className="row" key={member.id}>
                <Card className="card">
                  <CardContent className="card-content">
                    <Typography variant="h6" component="h3">
                      {findUserVoice(member.id)}
                    </Typography>
                  </CardContent>
                </Card>
                <MemberCard member={member} onKickMember={handleUser} />
              </div>
            ))}
        </aside>
      </div>
      <PopUp content={<KickMember member={kickUser} popUpName={deleteMemberPopUp} />} name={deleteMemberPopUp} />
    </>
  );
};

export default Game;
