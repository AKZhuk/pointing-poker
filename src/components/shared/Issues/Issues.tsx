import { Collapse } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Dispatch, SetStateAction, useState } from 'react';
import { TransitionGroup } from 'react-transition-group';
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
  const [editableIssue, setEditableIssue]: [IIssue, Dispatch<SetStateAction<IIssue>>] = useState(issues[0]);
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
            <Collapse key={issue.id}>
              <section>
                <IssueCard key={issue.id} issue={issue} handleCurrentIssue={handleCurrentIssue} />
              </section>
            </Collapse>
          ),
        )}
        {user.role === GameRole.scrumMaster && (
          <>
            <IssueCard />
            <PopUp name="CreateIssuePopUp">
              <CreateIssue />
            </PopUp>
            <PopUp name="ChangeIssuePopUp">
              <CreateIssue oldIssue={editableIssue} />
            </PopUp>
          </>
        )}
      </TransitionGroup>
      <PopUp name="IssueDetailsPopUp">
        <IssueDetails issue={currentIssue} popUpName="IssueDetailsPopUp" />
      </PopUp>
    </>
  );
};

export default Issues;
