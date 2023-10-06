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


interface FilmDetail {
    typeOfPerson: string;
    filmId: number;
    personId: number;
    filmName: string;
}

interface PersonProps {
    id: number;
    firstName: string;
    lastName: string;
    birthDate: string;
    birthPlace: string;
    personHasFilmDtos: FilmDetail[];
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

const Person = () => {
    const [person, setPerson] = useState<PersonProps | null>(null);
    const { id } = useParams<{ id: string }>();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        fetch(`${backendUrl}/person/${id}`)
            .then(response => response.json())
            .then(data => setPerson(data));
    }, [id]);

    if (!person) return <div>Loading...</div>;

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="sm">
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Card>
                            <CardHeader title={`${person.firstName} ${person.lastName}`} />
                            <CardContent>
                                <Typography variant="body1">Date of Birth:</Typography>
                                <Typography variant="body2" color="textSecondary">{person.birthDate}</Typography>
                                <Typography variant="body1">Place of Birth:</Typography>
                                <Typography variant="body2" color="textSecondary">{person.birthPlace}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <CardHeader title="Films" />
                            <Divider />
                            <List>
                                {person.personHasFilmDtos && person.personHasFilmDtos.map((filmDetail, index) => (
                                    <ListItem key={index}>
                                        <ListItemIcon>
                                            <MovieIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={filmDetail.filmName} secondary={filmDetail.typeOfPerson} />
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

export default Person;
