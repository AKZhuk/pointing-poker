import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import { store } from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app'),
);
