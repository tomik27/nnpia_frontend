import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    subtitle: {
        fontSize: 24,
        marginBottom: 48,
    },
    button: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: '16px 24px',
    },
});

const HomePage: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography className={classes.title}>Filmová databáze</Typography>
            <Typography className={classes.subtitle}>
                Vítejte na naší filmové databázi. Zde najdete informace o vašich oblíbených filmech a mnoho dalšího.
            </Typography>
            <Button variant="contained" color="primary" className={classes.button}>
                Přejít na databázi
            </Button>
        </div>
    );
};

export default HomePage;
