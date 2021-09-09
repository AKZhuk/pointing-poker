import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { roomReducer } from './reducers/room/roomReducer';
import { popUpReducer } from './reducers/popUp/popUpReducer';
import { connectionReducer } from './reducers/connection/connectionReducer';
import { issuesReducer } from './reducers/issues/issuesReducer';
import { userReducer } from './reducers/user/userReducer';
import { gameSettingsReducer } from './reducers/gameSettings/gameSettingsReducer';

const rootReducer = combineReducers({
  user: userReducer,
  popUp: popUpReducer,
  connection: connectionReducer,
  issues: issuesReducer,
  gameSettings: gameSettingsReducer,
  room: roomReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
