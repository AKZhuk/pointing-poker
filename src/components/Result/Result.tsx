import { useSelector } from 'react-redux';
import { IRootState } from '../../types';
import IssueCard from '../shared/Issues/IssueCard';
import Statistics from '../shared/Statistics';
import Title from '../shared/Title';

const Result = (): JSX.Element => {
  const { issues } = useSelector((state: IRootState) => state);

  return (
    <div className="wrapper">
      <Title text="Result" variant="h3" align="center" />
      {issues.map(issue => (
        <div className="game-result" key={issue.title}>
          <IssueCard issue={issue} />
          <Statistics />
        </div>
      ))}
    </div>
  );
};

export default Result;
