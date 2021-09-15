import { Button, ButtonBase, Card, CardContent, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { GameRole, IRootState, IUser } from '../../types';
import Statistics from '../shared/Statistics';
import Title from '../shared/Title';
import GameControl from './GameControl';
import Issues from '../shared/Issues/Issues';
import Timer from '../shared/Timer';
import MemberCard from '../shared/Members/MemberCard';
import { scoreTypes } from '../shared/GameCards/GameCards';
import { SendWSMessage } from '../../helpers/WebSocketApi';
import GameCard from '../shared/GameCards/GameCard';
import './Game.scss';

const Game = (): JSX.Element => {
  const {
    room: {
      members,
      roomKey,
      game: { activeIssueId, vote },
      gameSettings: { scoreType, cards },
    },
    user: { role, id },
  } = useSelector((state: IRootState) => state);

  const findUserVoice = (userId: string): string => {
    const voice = activeIssueId !== '' && vote[activeIssueId].find(elem => elem.userId === userId);
    return voice ? `${voice.voice} ${scoreType}` : 'In progress';
  };

  const handleUserVoice = (cardValue: number) => {
    const userVoice = vote[activeIssueId].find(voice => voice.userId === id);
    if (userVoice === undefined) {
      SendWSMessage('setVoice', roomKey, { issueId: activeIssueId, userId: id, voice: cardValue });
    } else {
      alert('you alredy voice');
    }
  };

  return (
    <>
      <div className="game__wrapper">
        <section className="game__main">
          <Title text="Game" variant="h3" align="center" />
          <GameControl />
          <div className="row">
            <div>
              <Issues />
            </div>
            {role === GameRole.scrumMaster ? (
              <div>
                <Timer />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => SendWSMessage('resetRound', roomKey, { issueId: activeIssueId })}
                >
                  Reset Round
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    SendWSMessage('setActiveIssue', roomKey, {});
                  }}
                >
                  Next issue
                </Button>
              </div>
            ) : (
              <Statistics issueId={activeIssueId} />
            )}
          </div>
          {role === GameRole.scrumMaster ? (
            <Statistics issueId={activeIssueId} />
          ) : (
            <div className="center">
              {scoreTypes[scoreType].slice(0, cards).map(card => (
                <ButtonBase key={card} onClick={() => handleUserVoice(card)}>
                  <GameCard value={card} large />
                </ButtonBase>
              ))}
            </div>
          )}
        </section>
        <aside className="game__aside">
          <Title text="Vote" variant="h3" align="center" />
          {members?.map((member: IUser) => (
            <div className="row" key={member.id}>
              <Card className="card">
                <CardContent className="card-content">
                  <Typography variant="h6" component="h3">
                    {findUserVoice(member.id)}
                  </Typography>
                </CardContent>
              </Card>
              <MemberCard member={member} />
            </div>
          ))}
        </aside>
      </div>
    </>
  );
};

export default Game;
