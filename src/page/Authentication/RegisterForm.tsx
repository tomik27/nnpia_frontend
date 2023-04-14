import React from "react";
import { Button, TextField, Grid, Paper, Typography } from '@mui/material';
import LoginForm from "./LoginForm";


interface RegisterProps {
    handleRegister: (event: React.FormEvent<HTMLFormElement>) => void;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    email: string;
    username: string;
    password: string;
}

const RegisterForm: React.FC<RegisterProps> = ({
                                                   handleRegister,
                                                   handleInputChange,
                                                   email,
                                                   username,
                                                   password,
                                               }) => {
    return (
        <form onSubmit={handleRegister}>
            <Paper elevation={10}>
                <Grid container direction="column" alignItems="center" spacing={3}>
                    <Grid item>
                        <Typography variant="h4">Register</Typography>
                    </Grid>
                    <Grid item>
                        <TextField
                            label="Email"
                            variant="outlined"
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            label="Username"
                            variant="outlined"
                            type="text"
                            name="username"
                            value={username}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            label="Password"
                            variant="outlined"
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item>
                        <Button type="submit" color="primary" variant="contained">
                            Register
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </form>
    );
};

export default RegisterForm;