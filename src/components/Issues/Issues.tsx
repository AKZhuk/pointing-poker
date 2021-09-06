import { useSelector } from 'react-redux';
import { IIssue, IRootState } from '../../types';
import Title from '../shared/Title';
import IssueCard from './IssueCard';

const Issues = (): JSX.Element => {
  const issues = useSelector((state: IRootState) => state.issues);

  return (
    <div className="wrapper">
      <Title text="Issues:" />
      <div className="card-container">
        {issues.map((issue: IIssue) => (
          <IssueCard key={issue.title} issue={issue} />
        ))}
        <IssueCard />
      </div>
    </div>
  );
};

export default Issues;
