import * as React from 'react';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { Menu as MenuIcon, Movie as MovieIcon, Person as PersonIcon, Login as LoginIcon, AccountBox as AccountBoxIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

interface MovieNavbarProps {}

const DrawerWrapper = styled(Drawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    '& .MuiDrawer-paper': {
        width: 250,
        boxSizing: 'border-box',
        backgroundColor: theme.palette.background.default,
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            marginTop: 64,
            width: 250,
        },
    },
}));

const MovieNavbar: React.FC<MovieNavbarProps> = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setIsDrawerOpen(open);
    };

    const renderMenuItems = () => {
        return (
            <List>
                <ListItem button component={RouterLink} to="/">
                    <ListItemIcon>
                        <MovieIcon />
                    </ListItemIcon>
                    <ListItemText primary="Přidat film" />
                </ListItem>
                <ListItem button component={RouterLink} to="/filmForm">
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Herci" />
                </ListItem>
                <ListItem button component={RouterLink} to="/directors">
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Režiséři" />
                </ListItem>
                <ListItem button component={RouterLink} to="/account">
                    <ListItemIcon>
                        <AccountBoxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Můj účet" />
                </ListItem>
                <ListItem button component={RouterLink} to="/authentication">
                    <ListItemIcon>
                        <LoginIcon />
                    </ListItemIcon>
                    <ListItemText primary="Login a Registrace" />
                </ListItem>
            </List>
        );
    };

    const title="Databáze filmů";
    return (
        <>
            <AppBar position="static" sx={{ zIndex: 1 }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <Button color="inherit" component={RouterLink} to="/login">
                        Přihlásit se
                    </Button>
                </Toolbar>
            </AppBar>
            <DrawerWrapper anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
                {renderMenuItems()}
            </DrawerWrapper>
        </>
    );
};

export default MovieNavbar
