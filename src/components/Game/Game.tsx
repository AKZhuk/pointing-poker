import { Button, Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { GameRole, IRootState, IUser } from '../../types';
import GameCards from '../GameCards/GameCards';
import Issues from '../Issues/Issues';
import MemberCard from '../Members/MemberCard';
import Statistics from '../shared/Statistics';
import Title from '../shared/Title';
import GameControl from './GameControl';
import './Game.scss';
import Timer from '../shared/Timer';

const Game = (): JSX.Element => {
  const {
    room: { members },
    user: {
      user: { role },
    },
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
              <MemberCard key={member.lastName} member={member} />
            </div>
          ))}
        </aside>
      </div>
    </>
  );
};

export default Game;
