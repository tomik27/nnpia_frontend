import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {TextField, Button, Grid, FormHelperText} from '@mui/material';

interface FormValues {
    firstName: string;
    lastName: string;
    birthDate: Date | null;
    birthPlace: string;
}

const schema = yup.object().shape({
    firstName: yup.string().required('Jméno je povinné').max(128, 'Jméno může mít nejvíce 128 znaků'),
    lastName: yup.string().required('Příjmení je povinné').max(128, 'Příjmení může mít nejvíce 128 znaků'),
    birthDate: yup.date().nullable().typeError('Datum narození musi byt typu date'),
    birthPlace: yup.string().required('Místo narození je povinné').max(128, 'Místo narození může mít nejvíce 128 znaků'),
});

const PersonForm = () => {
    const [error,setError] = useState<string|undefined>();
    const [submitting, setSubmitting] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: FormValues) => {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        setSubmitting(true);
        try {
            const response = await fetch(`${backendUrl}/person`, {
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
            <h1>Nová osoba</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container direction="column" alignItems="center" spacing={3}  >
                    <Grid item xs={12}>
                        <TextField
                            id="firstName"
                            name="firstName"
                            label="Jméno"
                            inputProps={{...register('firstName')}}
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="lastName"
                            name="lastName"
                            label="Příjmení"
                            inputProps={{...register('lastName')}} //Tento zápis vytáhne všechny vlastnosti, které jsou vráceny funkcí register a přidá je do objektu inputProps.
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="birthDate"
                            name="birthDate"
                            label="Datum narození"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{...register('birthDate')}}
                            error={!!errors.birthDate}
                            helperText={errors.birthDate?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="birthPlace"
                            name="birthPlace"
                            label="Místo narození"
                            inputProps={{...register('birthPlace')}}
                            error={!!errors.birthPlace} //errors.birthPlace bude undefined a !!undefined vrací false. Pokud ale pole birthPlace obsahuje chybu
                            helperText={errors.birthPlace?.message}
                        />
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

export default PersonForm;