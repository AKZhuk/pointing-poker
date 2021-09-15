import { useSelector } from 'react-redux';
import { IRootState } from '../../types';
import IssueCard from '../shared/Issues/IssueCard';
import Statistics from '../shared/Statistics';
import Title from '../shared/Title';

const Result = (): JSX.Element => {
  const {
    room: { issues },
  } = useSelector((state: IRootState) => state);

  return (
    <div className="wrapper">
      <Title text="Result" variant="h3" align="center" />
      {issues.map(issue => (
        <div className="game-result" key={issue.id}>
          <IssueCard issue={issue} />
          <Statistics issueId={issue.id} />
        </div>
      ))}
    </div>
  );
};

export default Result;
