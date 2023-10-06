import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Container,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MovieIcon from '@mui/icons-material/Movie';

interface UserFilmDetail {
    id: number;
    rating: number;
    comment: string;
    userId: number;
    filmId: number;
    filmName: string;
    userName: string;
}

interface UserProps {
    id: number;
    username: string;
    password: string;
    email: string;
    role: number;
    userRatingFilms: UserFilmDetail[];
}

const theme = createTheme({
    typography: {
        h3: {
            marginBottom: '16px',
        },
        h4: {
            marginTop: '16px',
            marginBottom: '8px',
        },
    },
});

const User = () => {
    const [user, setUser] = useState<UserProps | null>(null);
    const { id } = useParams<{ id: string }>();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        fetch(`${backendUrl}/user/${id}`)
            .then(response => response.json())
            .then(data => setUser(data));
    }, [id]);

    if (!user) return <div>Loading...</div>;

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="sm">
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Card>
                            <CardHeader title={`${user.username}`} />
                            <CardContent>
                                <Typography variant="body1">Email:</Typography>
                                <Typography variant="body2" color="textSecondary">{user.email}</Typography>
                                <Typography variant="body1">Role:</Typography>
                                <Typography variant="body2" color="textSecondary">{user.role}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <CardHeader title="Rated Films" />
                            <Divider />
                            <List>
                                {user.userRatingFilms && user.userRatingFilms.map((filmDetail, index) => (
                                    <ListItem key={index}>
                                        <ListItemIcon>
                                            <MovieIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={filmDetail.filmName} secondary={`Rating: ${filmDetail.rating}, Comment: ${filmDetail.comment}`} />
                                    </ListItem>
                                ))}
                            </List>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
};

export default User;