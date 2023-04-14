import * as React from 'react';
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Home, AccountCircle, Movie, Person,Login } from '@mui/icons-material';

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
                        startIcon={<Login />}
                        href="/authentication"
                    >
                        Login a Registrace
                    </StyledButton>
                    <StyledButton
                        color="inherit"
                        startIcon={<AccountCircle />}
                        onClick={onLogout}
                    >
                        Logout
                    </StyledButton>
                </div>
            </StyledToolbar>
        </StyledAppBar>
    );
};

export default NavigationBar;