import { Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { useSelector } from 'react-redux';
import { IRootState } from '../../types';
import IssueCard from '../shared/Issues/IssueCard';
import Statistics from '../shared/Statistics';
import Title from '../shared/Title';
import { scoreTypes } from '../shared/GameCards/GameCards';
import { exportToExcel } from '../../helpers/helpers';

const Result = (): JSX.Element => {
  const {
    room: {
      issues,
      members,
      gameSettings: { scoreType, cards, ScrumMasterAsPlayer },
      game: { vote },
    },
  } = useSelector((state: IRootState) => state);

  const calculateIssueStat = (issueId: string, cardValue: number) => {
    const stat =
      (vote[issueId]?.filter(data => data.voice === cardValue)?.length /
        (members.length + (ScrumMasterAsPlayer ? 1 : 0))) *
      100;
    return stat ? `${stat.toFixed(2)}%` : '0%';
  };

  const prepareData = () => {
    const data: any[] = [];
    issues.forEach(issue => {
      const stat: any = {};
      stat.issue = issue.title;
      scoreTypes[scoreType].slice(0, cards).forEach(x => {
        // вынести расчет на сервер(дублируется в statistic)
        stat[`${x} of ${scoreType}`] = calculateIssueStat(issue.id, x);
      });
      data.push(stat);
    });
    return data;
  };

  return (
    <div className="wrapper">
      <Title text="Result" variant="h3" align="center" />
      {issues.map(issue => (
        <div className="game-result" key={issue.id}>
          <IssueCard issue={issue} />
          <Statistics issueId={issue.id} />
        </div>
      ))}
      <Button
        variant="contained"
        className="saveButton"
        color="primary"
        startIcon={<SaveIcon />}
        onClick={() => {
          exportToExcel(prepareData());
        }}
      >
        Save
      </Button>
    </div>
  );
};

export default Result;
