import { Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../types';
import GameCard from '../GameCards/GameCard';
import { scoreTypes } from '../GameCards/GameCards';
import IssueCard from '../Issues/IssueCard';
import Title from '../shared/Title';

const GameResult = () => {
  const {
    issues,
    gameSettings: { scoreType, cards },
  } = useSelector((state: IRootState) => state);
  return (
    <div>
      {issues.map(issue => (
        <div className="game-result" key={issue.title}>
          <IssueCard issue={issue} disabled />
          <div className="card-container">
            {scoreTypes[scoreType].slice(0, cards).map(elem => (
              <div key={elem} className="col-center">
                <GameCard value={elem} />
                <Title text="35%" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameResult;
