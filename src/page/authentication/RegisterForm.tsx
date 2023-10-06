import React, {useState} from "react";
import { Button, TextField, Grid, Paper, Typography } from '@mui/material';
import * as yup from "yup";

interface RegisterProps {
    handleRegister: (event: React.FormEvent<HTMLFormElement>) => void;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    email: string;
    username: string;
    password: string;
    repeatPassword: string;
}

const RegisterForm: React.FC<RegisterProps> = ({
                                                   handleRegister,
                                                   handleInputChange,
                                                   email,
                                                   username,
                                                   password,
                                                   repeatPassword,
                                               }) => {
    const [emailError, setEmailError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [repeatPasswordError, setRepeatPasswordError] = useState("");

    const schema = yup.object().shape({
        email: yup.string().required("Email is required").email("Invalid email"),
        username: yup.string().required("Username is required"),
        password: yup.string().required("Password is required"),
        repeatPassword: yup
            .string()
            .oneOf([yup.ref("password"), undefined], "Passwords must match"),
    });

    const validateInput = () => {
        schema
            .validate({ email, username, password, repeatPassword })
            .then(() => {
                setEmailError("");
                setUsernameError("");
                setPasswordError("");
                setRepeatPasswordError("");
            })
            .catch((err) => {
                if (err.path === "email") setEmailError(err.message);
                else if (err.path === "username") setUsernameError(err.message);
                else if (err.path === "password") setPasswordError(err.message);
                else if (err.path === "repeatPassword")
                    setRepeatPasswordError(err.message);
            });
    };

    return (
        <form onSubmit={handleRegister} onChange={validateInput}>
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
                            error={!!emailError}
                            helperText={emailError}
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
                            error={!!passwordError}
                            helperText={passwordError}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            label="repeatPassword"
                            variant="outlined"
                            type="password"
                            name="repeatPassword"
                            value={repeatPassword}
                            onChange={handleInputChange}
                            error={!!repeatPasswordError}
                            helperText={repeatPasswordError}
                        />
                    </Grid>
                    <Grid item>
                        <Button type="submit" color="primary" variant="contained">
                            Register
                        </Button>
                    </Grid>
                </Grid>
        </form>
    );
};

export default RegisterForm;