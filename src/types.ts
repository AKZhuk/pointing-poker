export interface IAction {
  type: string;
  payload?: null | string;
}

export interface IState1 {
  isLoad: boolean;
  error: string;
}

enum GameRole {
  scrumMaster = 'scrum master',
  player = 'player',
  observer = 'observer',
}
interface IState {
  user: IUser;
  memders: IUser[];
  issues: { title: string; priority: string; link: string }[];
  gameSettings: IGameSettings;
}

interface IUser {
  firstName: string;
  lastName?: string;
  jobPostion?: string;
  urlToImage: string;
  role: typeof GameRole;
}

interface IGameSettings {
  isScrumMasterAsPlayer: boolean;
  changingCardInRoundEnd: boolean;
  isTimerNeeded: boolean;
  scoreType: string;
  scorTypeShort: string;
  timer?: string;
  cards: { value: string; name: string }[];
}
