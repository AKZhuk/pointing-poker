import { useSelector } from 'react-redux';
import { IIssue, IRootState } from '../../types';
import CreateIssue from '../CreateIssue/CreateIssue';
import PopUp from '../shared/PopUp';
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
        <PopUp content={<CreateIssue />} name="CreateIssuePopUp" />
      </div>
    </div>
  );
};

export default Issues;
