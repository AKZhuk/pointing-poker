import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { roomReducer } from './reducers/room/roomReducer';
import { popUpReducer } from './reducers/popUp/popUpReducer';
import { connectionReducer } from './reducers/connection/connectionReducer';
import { userReducer } from './reducers/user/userReducer';
import { featuresReducer } from './reducers/features/featuresReducer';

const rootReducer = combineReducers({
  user: userReducer,
  popUp: popUpReducer,
  connection: connectionReducer,
  room: roomReducer,
  features: featuresReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
