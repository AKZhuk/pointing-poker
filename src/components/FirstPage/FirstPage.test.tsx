import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import FirstPage from './FirstPage';
import { store } from '../../redux/store';

afterEach(cleanup);

describe('Test for "FirstPage" component', () => {
  it('Should render "FirstPage" component without crashing', () => {
    render(
      <Provider store={store}>
        <FirstPage />
      </Provider>,
    );
    expect(screen.getByTestId('FirstPage-test')).toBeInTheDocument();
  });
});
