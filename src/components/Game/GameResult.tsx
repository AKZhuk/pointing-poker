import React from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../types';
import IssueCard from '../Issues/IssueCard';

const GameResult = () => {
  const { issues, gameSettings } = useSelector((state: IRootState) => state);
  return (
    <div className="wrapper">
      {issues.map(issue => (
        <div>
          <IssueCard issue={issue} />
          {}
        </div>
      ))}
    </div>
  );
};

export default GameResult;
