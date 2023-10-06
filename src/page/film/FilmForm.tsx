import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {TextField, Select, MenuItem, Button, Grid, FormHelperText, FormControl, InputLabel} from '@mui/material';
import {useAppSelector} from "../../app/hooks";
import {RootState} from "../../app/store";

interface FormValues {
    name: string;
    genre: string;
    releaseDate: number | null;
    imageFile: FileList | null;
}

const schema = yup.object().shape({
    name: yup.string().required('Název je povinný').max(128, 'Název může mít nejvíce 30 znaků'),
    genre: yup.string().required('Žánr je povinný'),
    releaseDate: yup.number().positive('Rok vydání musí být kladné číslo'),
});

const FilmForm = () => {
    const [error,setError] = useState<string|undefined>();
    const [submitting, setSubmitting] = useState(false);
    const token = useAppSelector((state: RootState) => state.login.token);
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: FormValues) => {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        setSubmitting(true);
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('genre', data.genre);
        if (data.releaseDate !== null) {
            formData.append('releaseDate', data.releaseDate.toString());
        }
        if (data.imageFile) {
            formData.append('imageFile', data.imageFile[0]);
        }
        try {
            const response = await fetch(`${backendUrl}/film`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                // throw new Error(`HTTP error! status: ${response.status}`);
                setError(`HTTP error! status: ${response.statusText}`);
            }
            const json = await response.json();
            console.log(json);
            alert("Film successfully added!");

            setError(json);
        } catch (error: any) {
            console.error(error);
            setError(error.value);
        }
        setSubmitting(false);
    };

    return (
        <div>
            <h1>Nový film</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container direction="column" alignItems="center" spacing={3}  >
                    <Grid item xs={12}>
                        <TextField
                            id="name"
                            name="name"
                            label="Název"
                            inputProps={{...register('name')}}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl sx={{ minWidth: 225 }} fullWidth  error={!!errors.genre}>
                            <InputLabel id="genre-label">Žánr</InputLabel>
                            <Select
                                labelId="genre-label"
                                id="genre"
                                name="genre"
                                inputProps={{...register('genre')}}
                                label="Žánr"

                            >
                                <MenuItem  value="">--Vyberte žánr--</MenuItem>
                                <MenuItem value="AKCNI">Akční</MenuItem>
                                <MenuItem value="KOMEDIE">Komedie</MenuItem>
                                <MenuItem value="DRAMA">Drama</MenuItem>
                                <MenuItem value="HOROR">Horor</MenuItem>
                                <MenuItem value="SCIFI">Sci-fi</MenuItem>
                            </Select>
                            <FormHelperText>{errors.genre?.message}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="releaseDate"
                            name="releaseDate"
                            label="Rok vydání"
                            type="number"
                            inputProps={{...register('releaseDate')}}
                            error={!!errors.releaseDate}
                            helperText={errors.releaseDate?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl  fullWidth error={!!errors.imageFile}>
                            <input
                                type="file"
                                id="imageFile"
                                {...register('imageFile', { required: true })}
                                hidden
                            />
                            <label htmlFor="imageFile">
                                <Button
                                    variant="contained"
                                    component="span"
                                >
                                    Vyberte obrázek
                                </Button>
                            </label>
                            <FormHelperText>{errors.imageFile?.message}</FormHelperText>
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
                    </Grid>
                </Grid>
                {error && <div>{JSON.stringify(error)}</div>}
            </form>
        </div>
    );
};

export default FilmForm;
