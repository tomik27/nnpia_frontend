import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
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
    Avatar,
    TextField,
    Button,
    Rating,
    CardMedia
} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import MovieIcon from '@mui/icons-material/Movie';
import {useAppSelector} from "../../app/hooks";
import {RootState} from "../../app/store";
import { base64ToArrayBuffer, byteArrayToBase64 } from './../HelpfulFunction/byteToImage';

interface FilmProps {
    id: number;
    name: string;
    genre: string;
    releaseYear: number;
    image: string | null;
    personsInFilms: PersonInFilm[];
    ratingByUsers: UserRating[];
}

interface UserRating {
    userId: number;
    rating: number;
    comment: string;
    userName:string;
}

interface PersonInFilm {
    id: number;
    typeOfPerson: string;
    filmId: number;
    personId: number;
    personFirstname: string;
    personLastname: string;
}

const theme = createTheme({
    typography: {
        h3: {
            marginBottom: '16px',
        }, h4: {
            marginTop: '16px', marginBottom: '8px',
        },
    },
});

const Film = () => {
    const [film, setFilm] = useState<FilmProps | null>(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const {id} = useParams<{ id: string }>();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const token = useAppSelector((state: RootState) => state.login.token);
    const user = useAppSelector((state: RootState) => state.login.user);
    const isLoggedIn = useAppSelector((state: RootState) => state.login.value);



    useEffect(() => {
        fetchFilmData();
    }, [id]);

    const fetchFilmData = () => {
        fetch(`${backendUrl}/film/${id}`)
            .then(response => response.json())
            .then(data => {
                let buffer = base64ToArrayBuffer(data.image);
                let bytes = new Uint8Array(buffer);
                let base64Image = byteArrayToBase64(bytes);
                data.image = `data:image/jpeg;base64,${base64Image}`;
                setFilm(data);
            });
    }


    const handleRatingChange = (event: React.ChangeEvent<{}>, value: number | null) => {
        if (value !== null) {
            setRating(value);
        }
    };

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    };

    const handleSubmit = async () => {
        // Ensure user and film IDs are available
        const userId = user?.id;
        const filmId = id; // Assuming that the film ID is stored in the film state

        // Create the payload
        const payload = {
            rating, comment, userId, filmId
        };

        const response = await fetch(`${backendUrl}/user/addFilm`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`  // If needed
            }, body: JSON.stringify(payload)
        });

        if (response.ok) {
            // Reset the form or show a success message
            setRating(0);
            setComment('');

            // Re-fetch the film data to show the updated ratings and comments
            fetchFilmData();
        } else {
            // Handle the error
            console.error('Failed to submit the form');
        }
    };

    if (!film) return <div>Loading...</div>;

    //Pokud film.ratingByUsersexistuje a má délku větší než 0, použijeme reduci funkci k sečtení všech hodnocení

    const averageRating = film.ratingByUsers && film.ratingByUsers.length ? film.ratingByUsers.reduce((accumulator, currentValue) => accumulator + currentValue.rating, 0) / film.ratingByUsers.length : 0;

    return (<>
            <ThemeProvider theme={theme}>
                <Container maxWidth="md">
                    <Grid container spacing={4}>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={12}>
                                <Box border={1} borderColor="#2596be">
                                    <Card>
                                        <CardContent style={{ display: 'flex' }}>
                                            <div style={{ flex: 1 }}>
                                                <Typography variant="h4" gutterBottom>
                                                    {film.name}
                                                </Typography>
                                                <Typography variant="body1">{`Genre: ${film.genre}`}</Typography>
                                                <Typography variant="body1">{`Release Year: ${film.releaseYear}`}</Typography>
                                                <Typography variant="body1">
                                                    <br />
                                                    <strong>Directors:</strong>
                                                    {film.personsInFilms &&
                                                        film.personsInFilms
                                                            .filter((person) => person.typeOfPerson === 'DIRECTOR')
                                                            .map((director, index) => (
                                                                <span key={index}>
                                                                    {director.personFirstname} {director.personLastname}
                                                                    {index !== film.personsInFilms.length - 1 ? ', ' : ''}
                    </span>
                                                            ))}
                                                </Typography>
                                                <Typography variant="body1">
                                                    <strong>Scénář:</strong>{' '}
                                                    {film.personsInFilms &&
                                                        film.personsInFilms
                                                            .filter((person) => person.typeOfPerson === 'WRITER')
                                                            .map((writer, index) => (
                                                                <span key={index}>
                                                                    {writer.personFirstname} {writer.personLastname}
                                                                    {index !== film.personsInFilms.length - 1 ? ', ' : ''}
                    </span>
                                                            ))}
                                                </Typography>
                                                <Typography variant="body1">
                                                    <strong>Actors:</strong>{' '}
                                                    {film.personsInFilms &&
                                                        film.personsInFilms
                                                            .filter((person) => person.typeOfPerson === 'ACTOR')
                                                            .map((actor, index) => (
                                                                <span key={index}>
                      {' '}
                                                                    {actor.personFirstname} {actor.personLastname}
                                                                    {index !== film.personsInFilms.length - 1 ? ', ' : ''}
                    </span>
                                                            ))}
                                                </Typography>
                                                <br />
                                                <Typography variant="body1">Average Rating:</Typography>
                                                <Rating name="read-only" value={averageRating} readOnly />
                                            </div>
                                            <CardMedia
                                                component="img"
                                                image={film.image || ''}
                                                alt={film.name}
                                                style={{
                                                    height: '270px',
                                                    width: '200px',
                                                    objectFit: 'cover',
                                                    marginLeft: 'auto',
                                                    alignSelf: 'center',
                                                }}
                                            />
                                        </CardContent>
                                    </Card>
                                </Box>
                            </Grid>
                        </Grid>


                        <Grid item xs={12}>
                            <Box border={1} borderColor="#2596be">
                                <Card>
                                    <CardHeader title="User Comments" />
                                    <CardContent>
                                        <List>
                                            {film.ratingByUsers &&
                                                film.ratingByUsers.map((rating, index) => (
                                                    <React.Fragment key={index}>
                                                        <ListItem>
                                                            <ListItemText
                                                                primary={`${rating.userName}`}
                                                                secondary={`Rating: ${rating.rating}`}
                                                            />
                                                        </ListItem>
                                                        <ListItem>
                                                            <ListItemText secondary={`Comment: ${rating.comment}`} />
                                                        </ListItem>
                                                        {index !== film.ratingByUsers.length - 1 && (
                                                            <Divider variant="middle" />
                                                        )}
                                                    </React.Fragment>
                                                ))}
                                        </List>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Grid>
                        {isLoggedIn ? (
                        <Grid item xs={12}>
                            <Box border={1} borderColor="#2596be">
                                <Card>
                                    <CardHeader title="Add Your Rating and Comment"/>
                                    <CardContent>
                                        <Box component="fieldset" mb={3} borderColor="transparent">
                                            <Typography component="legend">Rating</Typography>
                                            <Rating
                                                name="user-rating"
                                                value={rating}
                                                onChange={handleRatingChange}
                                            />
                                        </Box>
                                        <Box component="div" mb={3}>
                                            <TextField
                                                id="outlined-multiline-static"
                                                label="Comment"
                                                multiline
                                                rows={4}
                                                variant="outlined"
                                                value={comment}
                                                onChange={handleCommentChange}
                                                fullWidth
                                            />
                                        </Box>
                                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                                            Submit
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Grid> ):''}

                    </Grid>
                </Container>
            </ThemeProvider>
        </>);
};

export default Film;


