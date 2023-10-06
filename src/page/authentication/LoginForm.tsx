import React, { useState } from "react";
import { Button, TextField, Grid, Typography } from "@mui/material";
import * as yup from "yup";

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
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const schema = yup.object().shape({
        username: yup.string().required("Username is required"),
        password: yup.string().required("Password is required"),
    });

    const validateInput = () => {
        schema
            .validate({ username, password })
            .then(() => {
                setUsernameError("");
                setPasswordError("");
            })
            .catch((err) => {
                if (err.path === "username") setUsernameError(err.message);
                else if (err.path === "password") setPasswordError(err.message);
            });
    };
    return (
        <form onSubmit={handleLogin} onChange={validateInput}>
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
                            error={!!usernameError}
                            helperText={usernameError}

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
                            error={!!passwordError}
                            helperText={passwordError}

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
