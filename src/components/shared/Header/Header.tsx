import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import logo from '../../../assets/img/logo1.png';
import './Header.scss';

const Header = (): JSX.Element => (
  <>
    <CssBaseline />
    <AppBar>
      <div className="wrapper">
        <Toolbar>
          <img className="header__logo" src={logo} alt="logo" />
          <Typography variant="h6">Plain poker</Typography>
        </Toolbar>
      </div>
    </AppBar>
    <Toolbar />
  </>
);

export default Header;
