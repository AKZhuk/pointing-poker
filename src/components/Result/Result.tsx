import { Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useSelector } from 'react-redux';
import { IRootState, Routes } from '../../types';
import IssueCard from '../shared/Issues/IssueCard';
import Title from '../shared/Title';
import { scoreTypes } from '../shared/GameCards/GameCards';
import { exportToExcel } from '../../helpers/helpers';
import { SendWSMessage } from '../../helpers/WebSocketApi';
import Statistics from '../shared/Statistic/Statistics';

const Result = (): JSX.Element => {
  const {
    room: {
      roomKey,
      issues,
      members,
      gameSettings: { scoreType, cards, ScrumMasterAsPlayer },
      game: { vote },
    },
    user,
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
  const handleBackToLobby = (): void => {
    SendWSMessage('changeRoute', roomKey, Routes.lobby);
  };
  return (
    <>
      <Title text="Result" variant="h3" align="center" />
      <div className="result__buttons">
        {user.role === 'scrumMaster' ? (
          <Button variant="contained" color="primary" startIcon={<ArrowBackIcon />} onClick={handleBackToLobby}>
            back to lobby
          </Button>
        ) : null}
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
      {issues.map(issue => (
        <div key={issue.id}>
          <IssueCard issue={issue} />
          <Statistics issueId={issue.id} />
        </div>
      ))}
    </>
  );
};

export default Result;
