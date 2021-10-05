import { useDispatch, useSelector } from 'react-redux';
import FirstPage from './FirstPage/FirstPage';
import Lobby from './Lobby/Lobby';
import Game from './Game/Game';
import Result from './Result/Result';
import NotFound from './shared/NotFound';
import Header from './shared/Header/Header';
import Footer from './shared/Footer/Footer';
import { Connect } from '../helpers/Connect';
import PopUp from './shared/PopUp';
import { IRootState, PopUpNames } from '../types';
import KickMember from './shared/Members/KickMember';
import VotingListener from './shared/VotingListener';
import AddMember from './shared/Members/AddMember';
import './App.scss';
import { getRoomKeyFromURL } from '../helpers/helpers';
import Notification from './shared/Notification';
import { setNotification } from '../redux/reducers/room/roomActions';

const App = (): JSX.Element => {
  const { kickVoting, askForJoinMemberPopUp } = PopUpNames;
  const {
    features,
    room: { route, notification },
  } = useSelector((state: IRootState) => state);
  const dispatch = useDispatch();
  Connect();
  VotingListener();
  const appNavigator = () => {
    if (window.location.pathname !== '/' && !getRoomKeyFromURL()) {
      return <NotFound />;
    }
    switch (route) {
      case 'lobby': {
        return <Lobby />;
      }
      case 'game': {
        return <Game />;
      }
      case 'result': {
        return <Result />;
      }
      default: {
        return <FirstPage />;
      }
    }
  };
  return (
    <>
      <Header />
      <main className="main">{appNavigator()}</main>
      <Footer />
      <PopUp name={kickVoting}>
        <KickMember member={features.kickMember} popUpName={kickVoting} />
      </PopUp>
      <PopUp name={askForJoinMemberPopUp}>
        <AddMember member={features.candidate} popUpName={askForJoinMemberPopUp} />
      </PopUp>
      <Notification
        text={notification.text}
        isOpen={notification.isOpen}
        severity={notification.severity}
        onClose={() => dispatch(setNotification({ text: '', isOpen: false, severity: notification.severity }))}
      />
    </>
  );
};
export default App;
