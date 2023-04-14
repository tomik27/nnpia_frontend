import { css } from '@emotion/react';
import { cx } from '@emotion/css';

import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Home, AccountCircle,Movie,Person,PersonSearch,Login } from '@mui/icons-material';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    // Define your theme here
});
interface NavigationBarProps {
    onLogout: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ onLogout }) => {
    const styles = css`
  .appBar {
    z-index: ${theme.zIndex.drawer + 1};
  }
  .toolbar {
    display: flex;
    justify-content: space-between;
  }
  .button {
    margin-right: ${theme.spacing(2)};
  }
`;
    return (
        <AppBar position="fixed" className={cx('appBar', styles)}>
            <Toolbar className="toolbar">
                <Typography variant="h6">Databáze filmů</Typography>
                <div>
                    <Button
                        className="button"
                        color="inherit"
                        startIcon={<Home />}
                        href="/"
                    >
                        Home
                    </Button>
                    <Button
                        className="button"
                        color="inherit"
                        startIcon={<Person />}
                        href="/persons"
                    >
                        Osoby
                    </Button>
                    <Button
                        className="button"
                        color="inherit"
                        startIcon={<Movie />}
                        href="/films"
                    >
                        Filmy
                    </Button>
                    <Button
                        className="button"
                        color="inherit"
                        startIcon={<Person />}
                        href="/account"
                    >
                        Můj účet
                    </Button>
                    <Button
                        className="button"
                        color="inherit"
                        startIcon={<Login />}
                        href="/authentication"
                    >
                        Login a Registrace
                    </Button>
                    <Button
                        className="button"
                        color="inherit"
                        startIcon={<AccountCircle />}
                        onClick={onLogout}
                    >
                        Logout
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default NavigationBar;



