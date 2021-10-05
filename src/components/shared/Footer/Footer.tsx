import { Link } from '@material-ui/core';
import './Footer.scss';

const Footer = (): JSX.Element => {
  const links = [
    { text: '@AKZhuk', href: 'https://github.com/AKZhuk/pointing-poker' },
    { text: '@Jendozz', href: 'https://github.com/Jendozz' },
    { text: '@Alexeyvalko', href: 'https://github.com/alexeyvalko' },
  ];

  return (
    <footer className="footer MuiAppBar-colorPrimary">
      <div className="wrapper row">
        <div className="github">
          <picture className="github-logo" />
          <ul className="github__links">
            {links.map(link => (
              <li key={link.href}>
                <Link color="inherit" href={link.href}>
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <a className="footer__link rss" href="https://rs.school/index.html">
          <span className="rss__year"> 21</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
