import { Button, Card, CardContent, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { GameRole, IRootState, IUser, PopUpNames } from '../../types';
import Statistics from '../shared/Statistics';
import Title from '../shared/Title';
import GameControl from './GameControl';
import Issues from '../shared/Issues/Issues';
import Timer from '../shared/Timer';
import MemberCard from '../shared/Members/MemberCard';
import './Game.scss';
import GameCards from '../shared/GameCards/GameCards';
import KickMember from '../shared/Members/KickMember';
import PopUp from '../shared/PopUp';

const Game = (): JSX.Element => {
  const { deleteMemberPopUp } = PopUpNames;
  const [user, setUser] = useState<IUser | null>(null);

  const handleUser = (member: IUser) => {
    setUser(member);
  };

  const {
    room: { members },
    user: { role },
  } = useSelector((state: IRootState) => state);

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
                <Button variant="contained" color="primary">
                  Reset Round
                </Button>
                <Button variant="contained" color="primary">
                  Next issue
                </Button>
              </div>
            ) : (
              <Statistics />
            )}
          </div>
          {role === GameRole.scrumMaster ? (
            <Statistics />
          ) : (
            <div className="center">
              <GameCards isGame />
            </div>
          )}
        </section>
        <aside className="game__aside">
          <Title text="Vote" variant="h3" align="center" />
          {members?.map((member: IUser) => (
            <div className="row" key={member.lastName}>
              <Card className="card">
                <CardContent className="card-content">
                  <Typography variant="h6" component="h3">
                    In progress
                  </Typography>
                </CardContent>
              </Card>
              <MemberCard key={member.lastName} member={member} onKickMember={handleUser} />
            </div>
          ))}
        </aside>
      </div>
      <PopUp content={<KickMember member={user} popUpName={deleteMemberPopUp} />} name={deleteMemberPopUp} />
    </>
  );
};

export default Game;
