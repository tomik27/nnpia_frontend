import React, { useState } from "react";
import { Button, TextField, Grid, Paper, Typography } from '@mui/material';

interface UserProfileProps {
    username: string;
    email: string;
    favoriteFilms: string[];
}

const UserProfile: React.FC<UserProfileProps> = ({ username, email, favoriteFilms }) => {
    const [editing, setEditing] = useState(false);
    const [newUsername, setNewUsername] = useState(username);
    const [newEmail, setNewEmail] = useState(email);

    const handleSaveChanges = () => {
        // Handle saving changes to the user profile (e.g. make an API call)
        setEditing(false);
    };

    return (
        <Paper elevation={10}>
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
                        <Button color="primary" variant="contained" onClick={handleSaveChanges}>
                            Save Changes
                        </Button>
                    </Grid>
                ) : (
                    <Grid item>
                        <Button color="primary" variant="contained" onClick={() => setEditing(true)}>
                            Edit Profile
                        </Button>
                    </Grid>
                )}
                <Grid item>
                    <Typography variant="h5">Favorite Films:</Typography>
                </Grid>
                <Grid item>
                    {favoriteFilms.map((film) => (
                        <Typography key={film}>{film}</Typography>
                    ))}
                </Grid>
            </Grid>
        </Paper>
    );
};

export default UserProfile;
