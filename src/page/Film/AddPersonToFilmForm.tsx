import { useState } from "react";
import { Autocomplete, Box, Button, CircularProgress, TextField,MenuItem } from "@mui/material";
import {useAppSelector} from "../../app/hooks";
import {RootState} from "../../app/store";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

interface Person {
    id: number;
    firstName: string;
    lastName: string;
}

interface Film {
    id: number;
    name: string;
}

interface FilmHasPerson {
    typeOfPerson: string;
    filmId: number;
    personId: number;
}

interface FormValues {
    typeOfPerson: string;
    film: Film | null;
    person: Person | null;
}

const AddPersonToFilmForm = () => {
    const [loading, setLoading] = useState(false);
    const [persons, setPersons] = useState<Person[]>([]);
    const [films, setFilms] = useState<Film[]>([]);
    const token = useAppSelector((state: RootState) => state.login.token);
    const [formValues, setFormValues] = useState<FormValues>({
        typeOfPerson: "ACTOR",
        film: null,
        person: null,
    });

    const handleTypeOfPersonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            typeOfPerson: event.target.value,
        });
    };

    const handleFilmChange = (event: React.ChangeEvent<{}>, value: Film | null) => {
        setFormValues({
            ...formValues,
            film: value,
        });
    };

    const handlePersonChange = (event: React.ChangeEvent<{}>, value: Person | null) => {
        setFormValues({
            ...formValues,
            person: value,
        });
    };

    const handleDelete = () => {
        const { typeOfPerson, film, person } = formValues;
        const filmHasPerson: FilmHasPerson = {
            typeOfPerson,
            filmId: film?.id!,
            personId: person?.id!,
        };
        fetch(`${backendUrl}/film/deletePerson`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(filmHasPerson),
        })
            .then((response) => {
                if (response.ok) {
                    alert("Person removed from film!");
                    setFormValues({
                        typeOfPerson: "ACTOR",
                        film: null,
                        person: null,
                    });
                } else {
                    throw new Error("Failed to remove person from film.");
                }
            })
            .catch((error) => {
                console.error(error);
                alert("An error occurred while removing person from film.");
            })
            .finally(() => setLoading(false));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const { typeOfPerson, film, person } = formValues;
        const filmHasPerson: FilmHasPerson = {
            typeOfPerson,
            filmId: film?.id!,
            personId: person?.id!,
        };
        fetch(`${backendUrl}/film/addPerson`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(filmHasPerson),
        })
            .then((response) => {
                if (response.ok) {
                    alert("Person added to film!");
                    setFormValues({
                        typeOfPerson: "ACTOR",
                        film: null,
                        person: null,
                    });
                } else {
                    throw new Error("Failed to add person to film.");
                }
            })
            .catch((error) => {
                console.error(error);
                alert("An error occurred while adding person to film.");
            })
            .finally(() => setLoading(false));
    };

    const fetchPersons = (searchValue: string) => {
        setLoading(true);
        fetch(`${backendUrl}/person?search=${searchValue}`)
            .then((response) => response.json())
            .then((data) => setPersons(data))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    };

    const fetchFilms = (searchValue: string) => {
        setLoading(true);
        fetch(`${backendUrl}/film?search=${searchValue}`)
            .then((response) => response.json())
            .then((data) => setFilms(data))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Autocomplete
                options={films}
                getOptionLabel={(film) => film.name}
                loading={loading}
                onChange={handleFilmChange}
                renderInput={(params) => (
                    <TextField {...params} label="Film" variant="outlined"
                               onChange={(event) => fetchFilms(event.target.value)}
                    />
                    )}
                    />
                    <Autocomplete
                    options={persons}
                    getOptionLabel={(person) =>`${person.firstName} ${person.lastName}`}
                    loading={loading}
                    onChange={handlePersonChange}
                    renderInput={(params) => (
                    <TextField
                {...params}
                    label="Person"
                    variant="outlined"
                    onChange={(event) => fetchPersons(event.target.value)}
                    />
                    )}
                    />
                    <TextField
                    select
                    label="Type of person"
                    value={formValues.typeOfPerson}
                    onChange={handleTypeOfPersonChange}
                    variant="outlined"
                    style={{ marginTop: "1rem" }}
                    >
                    <MenuItem value="ACTOR">Actor</MenuItem>
                    <MenuItem value="DIRECTOR">Director</MenuItem>
                    <MenuItem value="WRITER">Writer</MenuItem>
                    </TextField>
            <Button type="submit" variant="contained" disabled={loading} style={{ marginTop: "1rem" }}>
                {loading ? <CircularProgress size={24} /> : "Add person to film"}
            </Button>
            <Button variant="contained" color="secondary" onClick={handleDelete} style={{ marginTop: "1rem" }}>
                Remove person from film
            </Button>
                    </Box>
                    );
                };

            export default AddPersonToFilmForm;