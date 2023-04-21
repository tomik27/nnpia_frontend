import { useState } from "react";
import { Autocomplete, Box, Button, CircularProgress, TextField } from "@mui/material";

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
    film: Film;
    person: Person;
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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const { typeOfPerson, film, person } = formValues;
        const filmHasPerson: FilmHasPerson = {
            typeOfPerson,
            film: film!,
            person: person!,
        };
        fetch(`${backendUrl}/filmhasperson`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(filmHasPerson),
        })
            .then(() => {
                alert("Person added to film!");
                setFormValues({
                    typeOfPerson: "ACTOR",
                    film: null,
                    person: null,
                });
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
                    <option value="ACTOR">Actor</option>
                    <option value="DIRECTOR">Director</option>
                    <option value="WRITER">Writer</option>
                    </TextField>
                    <Button type="submit" variant="contained" disabled={loading} style={{ marginTop: "1rem" }}>
                {loading ? <CircularProgress size={24} /> : "Add person to film"}
                    </Button>
                    </Box>
                    );
                };

            export default AddPersonToFilmForm;