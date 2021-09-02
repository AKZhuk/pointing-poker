export interface IAction {
  type: string;
  payload?: any;
}
export enum GameRole {
  scrumMaster = 'scrum master',
  player = 'player',
  observer = 'observer',
}
export interface IState {
  user: IUser;
  memders: IUser[];
  issues: { title: string; priority: string; link: string }[];
  gameSettings: IGameSettings;
}

export interface IUser {
  firstName: string;
  lastName?: string;
  jobPostion?: string;
  urlToImage?: string;
  role: string;
}

export interface IGameSettings {
  isScrumMasterAsPlayer: boolean;
  changingCardInRoundEnd: boolean;
  isTimerNeeded: boolean;
  scoreType: string;
  scorTypeShort: string;
  timer?: string;
  cards: { value: string; name: string }[];
}
