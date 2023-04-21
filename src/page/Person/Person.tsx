import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Container,
    Divider,
    List,
    ListItem,
    ListItemText,
    Typography
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface PersonProps {
    id: number;
    firstName: string;
    lastName: string;
    birthDate: string;
    birthPlace: string;
    ArrayOfFilm: string[];
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
                <Box sx={{ my: 4 }}>
                    <Card>
                        <CardHeader title={`${person.firstName} ${person.lastName}`} />
                        <CardContent>
                            <Typography>Date of Birth: {person.birthDate}</Typography>
                            <Typography>Place of Birth: {person.birthPlace}</Typography>
                        </CardContent>
                    </Card>
                </Box>
                <Box sx={{ my: 4 }}>
                    <Card>
                        <CardHeader title="Films" />
                        <Divider />
                        <List>
                            {person.ArrayOfFilm && person.ArrayOfFilm.map(film => (
                                <ListItem key={film}>
                                    <ListItemText primary={film} />
                                </ListItem>
                            ))}
                        </List>
                    </Card>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Person;
