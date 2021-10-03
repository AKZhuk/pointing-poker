import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Title from "./Title";

afterEach(cleanup);

describe('Test for "Title" component', () => {
  it('Should render "Title" component without crashing', () => {
    render(
        <Title text='test' variant='h3' align='center' />
    );
    expect(screen.getByTestId('Title-test')).toBeInTheDocument();
  });
  it('Should render "Title" correctly', () => {
    render(
        <Title text='test' variant='h3' align='center' />
    );
    expect(screen.getByTestId('Title-test')).toHaveTextContent('test');
  });
});