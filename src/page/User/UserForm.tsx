import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {TextField, Button, Grid, FormHelperText, InputLabel, FormControl, MenuItem, Select} from '@mui/material';

interface FormValues {
    username: string;
    password: string;
    emailAddress: string;
    role: string;
}

const schema = yup.object().shape({
    username: yup.string().required('Uživatelské jméno je povinné').max(128, 'Uživatelské jméno může mít nejvíce 128 znaků'),
    password: yup.string().required('Heslo je povinné').min(8, 'Heslo musí mít nejméně 8 znaků'),
    emailAddress: yup.string().email('Emailová adresa není platná').required('Emailová adresa je povinná'),
    role: yup.string().required('Role je povinná'),
});

const UserForm = () => {
    const [error,setError] = useState<string|undefined>();
    const [submitting, setSubmitting] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: FormValues) => {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        setSubmitting(true);
        try {
            const response = await fetch(`${backendUrl}/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                // throw new Error(`HTTP error! status: ${response.status}`);
                setError(`HTTP error! status: ${response.statusText}`);
            }
            const json = await response.json();
            console.log(json);
            setError(json);
        } catch (error: any) {
            console.error(error);
            setError(error.value);
        }
        setSubmitting(false);
    };

    return (
        <div>
            <h1>Nový uživatel</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container direction="column" alignItems="center" spacing={3}  >
                    <Grid item xs={12}>
                        <TextField
                            id="username"
                            name="username"
                            label="Uživatelské jméno"
                            inputProps={{...register('username')}}
                            error={!!errors.username}
                            helperText={errors.username?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="password"
                            name="password"
                            label="Heslo"
                            type="password"
                            inputProps={{...register('password')}}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="emailAddress"
                            name="emailAddress"
                            label="Emailová adresa"
                            inputProps={{...register('emailAddress')}}
                            error={!!errors.emailAddress}
                            helperText={errors.emailAddress?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                    <FormControl sx={{ minWidth: 225 }} fullWidth  error={!!errors.role}>
                        <InputLabel id="role-label">Role</InputLabel>
                        <Select
                            labelId="role-label"
                            id="role"
                            name="role"
                            label="Role"
                            inputProps={{...register('role')}}>
                            <MenuItem  value="">--Vyberte roli--</MenuItem>
                            <MenuItem value="ROLE_USER">User</MenuItem>
                            <MenuItem value="ROLE_ADMIN">Admin</MenuItem>
                        </Select>
                        <FormHelperText>{errors.role?.message}</FormHelperText>
                    </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                        variant="contained"
                        type="submit"
                        disabled={submitting}
                        >
                        Odeslat
                    </Button>
                    {error && <div>{JSON.stringify(error)}</div>}
                </Grid>
            </Grid>
        </form>
</div>
);
};

export default UserForm;