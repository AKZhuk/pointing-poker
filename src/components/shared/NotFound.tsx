import notFoundImg from '../../assets/img/404.png';

const NotFound = (): JSX.Element => {
  return <img src={notFoundImg} className="not-found" alt="404 error" width="750" height="400" />;
};

export default NotFound;
