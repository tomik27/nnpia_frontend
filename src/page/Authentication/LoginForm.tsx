import React from "react";
import { Button, TextField, Grid, Paper, Typography } from '@mui/material';

interface LoginFormProps {
    handleLogin: (event: React.FormEvent<HTMLFormElement>) => void;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    username: string;
    password: string;
    handleRegisterButtonClick: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
                                                 handleLogin,
                                                 handleInputChange,
                                                 username,
                                                 password,
                                                 handleRegisterButtonClick,
                                             }) => {
    return (
        <form onSubmit={handleLogin}>
                <Grid container direction="column" alignItems="center" spacing={3}>
                    <Grid item>
                        <Typography variant="h4">Login</Typography>
                    </Grid>
                    <Grid item>
                        <TextField
                            label="username"
                            variant="outlined"
                            type="text"
                            name="username"
                            value={username}
                            onChange={handleInputChange}
                            required
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
                            required
                        />
                    </Grid>
                    <Grid item>
                        <Button type="submit" color="primary" variant="contained">
                            Login
                        </Button>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2">
                            Don't have an account?{" "}
                            <Button
                                variant="text"
                                size="small"
                                onClick={handleRegisterButtonClick}
                            >
                                Register
                            </Button>
                        </Typography>
                    </Grid>
                </Grid>
        </form>
    );
};

export default LoginForm;
