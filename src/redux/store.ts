import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { connectionReducer } from './reducers/connection/connectionReducer';
import { userReducer } from './reducers/user/userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  connection: connectionReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
