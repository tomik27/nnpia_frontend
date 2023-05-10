import React, { useState } from "react";
import { Button, TextField, Grid, Paper, Typography, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Movie } from '@mui/icons-material';

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

const UserProfile: React.FC<UserProfileProps> = ({ username, email, favoriteFilms }) => {
    const [editing, setEditing] = useState(false);
    const [newUsername, setNewUsername] = useState(username);
    const [newEmail, setNewEmail] = useState(email);

    const handleSaveChanges = () => {
        // Handle saving changes to the user profile (e.g. make an API call)
        setEditing(false);
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
