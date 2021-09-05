export interface IAction {
  type: string;
  payload: { [key: string]: string };
}

export interface IIssueAction {
  type: string;
  payload: IIssue;
}

export interface IActionPopUp {
  type: string;
  payload?: { [key: string]: boolean };
}

export enum GameRole {
  scrumMaster = 'scrum master',
  player = 'player',
  observer = 'observer',
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

export interface IPopUpProps {
  content: JSX.Element;
  name: keyof typeof PopUpNames;
}
export enum PopUpNames {
  isOpen = 'isOpen',
  ConnectToLobbyPopUp = 'ConnectToLobbyPopUp',
  CreateIssuePopUp = 'CreateIssuePopUp',
}

export type IPopUp = {
  [key in PopUpNames]: boolean;
};

export interface IUploadButtonProps {
  handleUpdateImage(imageURL: string): void;
}

export interface ISwitcherProps {
  handleChecked(isChecked: boolean): void;
}

export interface IConnection {
  url: string;
}

export interface IIssue {
  title: string;
  priority: string;
  link: string;
}

export interface IRootState {
  user: IUserState;
  issues: IIssue[];
  popUp: IPopUp;
  connection: IConnection;
}

export interface IUserState {
  user: IUser;
  members: IUser[];
}
