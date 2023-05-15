import * as React from 'react';
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from '@mui/material';
import { Home, AccountCircle, Movie, Person, Login, MoreVert } from '@mui/icons-material';
import {useAppSelector} from "../../app/hooks";
import {RootState} from "../../app/store";
import { Link } from 'react-router-dom';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
}));

const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
});

const StyledButton = styled(Button)(({ theme }) => ({
    marginRight: theme.spacing(2),
}));

interface Props {
    onLogout: () => void;
}


const NavigationBar: React.FC<Props> = ({ onLogout }) => {
    const [adminMenuAnchorEl, setAdminMenuAnchorEl] = React.useState<null | HTMLElement>(null);
    const isLoggedIn = useAppSelector((state:RootState) => state.login.value)


    const handleAdminMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAdminMenuAnchorEl(event.currentTarget);
    };

    const handleAdminMenuClose = () => {
        setAdminMenuAnchorEl(null);
    };

    return (
        <StyledAppBar position="fixed">
            <StyledToolbar>
                <Typography variant="h6">Databáze filmů</Typography>
                <div>
                    <StyledButton color="inherit" startIcon={<Home />} href="/">
                        Home
                    </StyledButton>
                    <StyledButton color="inherit" startIcon={<Person />} href="/persons">
                        Osoby
                    </StyledButton>
                    <StyledButton color="inherit" startIcon={<Movie />} href="/films">
                       Nejlepší filmy
                    </StyledButton>
                    <StyledButton color="inherit" startIcon={<Movie />} href="/filmGrid">
                        Filmy
                    </StyledButton>
                    <StyledButton
                        color="inherit"
                        startIcon={<AccountCircle />}
                        href="/account"
                    >
                        Můj účet
                    </StyledButton>
                    <StyledButton
                        color="inherit"
                        startIcon={<MoreVert />}
                        onClick={handleAdminMenuClick}
                    >
                        Admin
                    </StyledButton>
                    <Menu
                        anchorEl={adminMenuAnchorEl}
                        open={Boolean(adminMenuAnchorEl)}
                        onClose={handleAdminMenuClose}
                    >
                        <Link to="/filmForm" onClick={handleAdminMenuClose} style={{ textDecoration: 'none', display: 'block' }}>
                            <MenuItem>
                                Přidat film
                            </MenuItem>
                        </Link>
                        <Link to="/personForm" onClick={handleAdminMenuClose} style={{ textDecoration: 'none', display: 'block' }}>
                            <MenuItem>
                                Přidat osobu
                            </MenuItem>
                        </Link>
                        <Link to="/userForm" onClick={handleAdminMenuClose} style={{ textDecoration: 'none', display: 'block' }}>
                            <MenuItem>
                                Přidat uživatele
                            </MenuItem>
                        </Link>
                        <Link to="/users" onClick={handleAdminMenuClose} style={{ textDecoration: 'none', display: 'block' }}>
                            <MenuItem>
                                Uživatelé
                            </MenuItem>
                        </Link>
                        <Link to="/addPersonToFilmForm" onClick={handleAdminMenuClose} style={{ textDecoration: 'none', display: 'block' }}>
                            <MenuItem>
                                 Osoby ve filmu
                            </MenuItem>
                        </Link>
                    </Menu>
                    {isLoggedIn ? (
                        <StyledButton
                            color="inherit"
                            startIcon={<AccountCircle />}
                            onClick={onLogout}
                        >
                            Logout
                        </StyledButton>
                    ) : (
                        <StyledButton
                            color="inherit"
                            startIcon={<Login />}
                            href="/authentication"
                        >
                            Login a Registrace
                        </StyledButton>
                    )}
                </div>
            </StyledToolbar>
        </StyledAppBar>
    );
};

export default NavigationBar;
