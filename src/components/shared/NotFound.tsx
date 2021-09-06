import notFoundImg from '../assets/img/404.png';

const NotFound = (): JSX.Element => {
  return (
    <div className="card-container">
      <img src={notFoundImg} alt="404 error" />
    </div>
  );
};

export default NotFound;
