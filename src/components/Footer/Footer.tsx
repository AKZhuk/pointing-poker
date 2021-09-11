import { Link } from '@material-ui/core';
import './Footer.scss';

const Footer = (): JSX.Element => {
  return (
    <footer className="footer MuiAppBar-colorPrimary">
      <div className="wrapper row">
        <div className="github ">
          <picture className=" github-logo" />
          <div className="github__links">
            <Link color="inherit" href="https://github.com/AKZhuk/pointing-poker">
              @AKZhuk
            </Link>
            <Link color="inherit" href="https://github.com/Jendozz">
              @Jendozz
            </Link>
            <Link color="inherit" href="https://github.com/alexeyvalko">
              @Alexeyvalko
            </Link>
          </div>
        </div>
        <a className="footer__link rss" href="https://rs.school/index.html">
          <span className="rss__year"> 21</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
