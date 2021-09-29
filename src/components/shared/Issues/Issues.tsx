import { useSelector } from 'react-redux';
import { Dispatch, SetStateAction, useState } from 'react';
import { TransitionGroup } from 'react-transition-group';
import { Collapse } from '@material-ui/core';
import { GameRole, IIssue, IRootState } from '../../../types';
import CreateIssue from './CreateIssue';
import IssueCard from './IssueCard';
import PopUp from '../PopUp';
import IssueDetails from './IssueDetails';

const Issues = ({ className }: { className?: string }): JSX.Element => {
  const {
    room: { issues },
    user,
  } = useSelector((state: IRootState) => state);
  const [editableIssue, setEditableIssue]: // | [undefined, Dispatch<SetStateAction<undefined>>]
  [IIssue, Dispatch<SetStateAction<IIssue>>] = useState(issues[0]);
  const [currentIssue, setCurrentIssue] = useState<IIssue | null>(null);

  const handleCurrentIssue = (issue: IIssue) => {
    setCurrentIssue(issue);
  };

  return (
    <>
      <TransitionGroup className={className}>
        {issues.map((issue: IIssue) =>
          user.role === GameRole.scrumMaster ? (
            <Collapse key={issue.id}>
              <section>
                <IssueCard key={issue.id} issue={issue} editable removable setEditableIssue={setEditableIssue} />
              </section>
            </Collapse>
          ) : (
            <IssueCard key={issue.id} issue={issue} handleCurrentIssue={handleCurrentIssue} />
          ),
        )}
        {user.role === GameRole.scrumMaster && (
          <>
            <IssueCard />
            <PopUp content={<CreateIssue />} name="CreateIssuePopUp" />
            <PopUp content={<CreateIssue oldIssue={editableIssue} />} name="ChangeIssuePopUp" />
          </>
        )}
      </TransitionGroup>
      <PopUp content={<IssueDetails issue={currentIssue} popUpName="IssueDetailsPopUp" />} name="IssueDetailsPopUp" />
    </>
  );
};

export default Issues;
