import { Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { IIssue, IRootState } from '../../types';
import IssueCard from './IssueCard';

const Issues = (): JSX.Element => {
  const issues = useSelector((state: IRootState) => state.issues);

  return (
    <div className="wrapper">
      <Typography variant="h5" gutterBottom>
        Issues:
      </Typography>
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
