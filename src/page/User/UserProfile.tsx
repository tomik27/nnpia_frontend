import React, {useEffect, useState} from "react";
import { Button, TextField, Grid, Paper, Typography, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Movie } from '@mui/icons-material';
import {useAppSelector} from "../../app/hooks";
import {RootState} from "../../app/store";

interface UserProfileProps {
    username: string;
    email: string;
    favoriteFilms: string[];
}

const PaperStyled = styled(Paper)({
    padding: 24,
    maxWidth: 600,
    margin: '24px auto',
});

const ButtonStyled = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
}));

const ChipStyled = styled(Chip)(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

const UserProfile: React.FC<UserProfileProps> = () => {
    const [editing, setEditing] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [favoriteFilms, setFavoriteFilms] = useState<string[]>([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const user = useAppSelector((state: RootState) => state.login.user);

    useEffect(() => {
        fetch(`${backendUrl}/user/${user?.id}`)
            .then(response => response.json())
            .then(data => {
                setNewUsername(data.username);
                setNewEmail(data.email);
                setFavoriteFilms(data.userRatingFilms.map((film: any) => film.filmName));
            })
            .catch(error => console.error('Error:', error));
    }, [backendUrl, user]);

    const handleSaveChanges = () => {
        // Define the body of the PUT request
        const requestBody = {
            username: newUsername,
            email: newEmail,
            // Include other fields as necessary
        };

        // Send the PUT request to the backend
        fetch(`${backendUrl}/user/${user?.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Update the state with the new data
                setNewUsername(data.username);
                setNewEmail(data.email);
                // Update other state variables as necessary

                // Exit the editing mode
                setEditing(false);
            })
            .catch((error) => {
                // Handle the error
                console.error('There has been a problem with your fetch operation:', error);
            });
    };

    return (
        <PaperStyled elevation={10}>
            <Grid container direction="column" alignItems="center" spacing={3}>
                <Grid item>
                    <Typography variant="h4">User Profile</Typography>
                </Grid>
                <Grid item>
                    <TextField
                        label="Username"
                        variant="outlined"
                        type="text"
                        disabled={!editing}
                        value={newUsername}
                        onChange={(event) => setNewUsername(event.target.value)}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        label="Email"
                        variant="outlined"
                        type="email"
                        disabled={!editing}
                        value={newEmail}
                        onChange={(event) => setNewEmail(event.target.value)}
                    />
                </Grid>
                {editing ? (
                    <Grid item>
                        <ButtonStyled variant="contained" onClick={handleSaveChanges}>
                            Save Changes
                        </ButtonStyled>
                    </Grid>
                ) : (
                    <Grid item>
                        <ButtonStyled variant="contained" onClick={() => setEditing(true)}>
                            Edit Profile
                        </ButtonStyled>
                    </Grid>
                )}
                <Grid item>
                    <Typography variant="h5">Favorite Films:</Typography>
                </Grid>
                <Grid item>
                    {favoriteFilms.map((film) => (
                        <ChipStyled
                            key={film}
                            label={film}
                            icon={<Movie />}
                        />
                    ))}
                </Grid>
            </Grid>
        </PaperStyled>
    );
};

export default UserProfile;
