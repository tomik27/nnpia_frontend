import * as React from 'react';
import {useState, useEffect, useReducer} from 'react';
import { styled } from '@mui/material/styles';
import {
    TextField,
    TableContainer,
    Paper,
} from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { useNavigate } from 'react-router-dom';
import DataGrid, {Column} from "../../components/DataGrid";
import {  Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    marginTop: theme.spacing(2),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    marginBottom: theme.spacing(2),
}));

interface MovieData {
    id: number;
    name: string;
    genre: string;
    releaseYear: number;
    imageFile: FileList | null;
}

const columns: Column[] = [
    { id: 'name', label: 'Name' },
    { id: 'genre', label: 'Genre' },
    { id: 'releaseYear', label: 'Release Year' },
];

const FilmGrid: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState<MovieData[]>([]);
    const isLoggedIn = useAppSelector((state: RootState) => state.login.value);
    const user = useAppSelector((state: RootState) => state.login.user);
    const token = useAppSelector((state: RootState) => state.login.token);

    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [editMovie, setEditMovie] = useState<MovieData | null>(null);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = () => {
        return fetch(`${backendUrl}/film`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => response.json())
            .then((data) => setMovies(data));
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredMovies = movies.filter((movie) => {
        return movie.name && movie.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const handleRowClick = (event: React.MouseEvent<unknown, MouseEvent>, rowData: any) => {
        console.log(`Row with id ${rowData.id} clicked`);
        navigate(`/film/${rowData.id}`);
    };

    const handleEditClick = async (rowData: MovieData) => {
        console.log(`Edit movie with id ${rowData.id}`);
        setEditMovie(rowData);
        setOpenEditModal(true);
    };

    const updateMovieData = async (data: MovieData) => {
        const formData = new FormData();
        formData.append('id', data.id.toString());
        formData.append('name', data.name);
        formData.append('genre', data.genre);
        if (data.releaseYear !== null) {
            formData.append('releaseYear', data.releaseYear.toString());
        }
        if (data.imageFile) {
            formData.append('imageFile', data.imageFile[0]);
        }
        try {
            const response = await fetch(`${backendUrl}/film/${data.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.statusText}`);
            }
            const json = await response.json();
            console.log(json);
            alert("Film successfully updated!");
        } catch (error: any) {
            console.error(error);
        }
    };

    const handleEditClose = () => {
        setOpenEditModal(false);
    };

    const handleEditSave = () => {
        if (editMovie !== null) {
            updateMovieData(editMovie)
                .then(() => {
                    console.log('Movie updated:', editMovie);
                    fetchMovies().then(() => forceUpdate());
                })
                .catch((err) => {
                    console.error('Error updating movie:', err);
                });
        } else {
            console.error('Edit movie is null. Cannot update.');
        }
        setOpenEditModal(false);
    };

    const handleEditInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        field: keyof MovieData
    ) => {
        if (editMovie) {
            if (field === 'imageFile' && event.target instanceof HTMLInputElement) {
                // For file inputs, we want to save FileList object to state
                setEditMovie({ ...editMovie, [field]: event.target.files });
            } else {
                // For other (text) inputs, we continue as before
                setEditMovie({ ...editMovie, [field]: event.target.value });
            }
        }
    };


    const handleDeleteClick = (rowData: MovieData) => {
        console.log(`Delete movie with id ${rowData.id}`);
        fetch(`${backendUrl}/film/${rowData.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                fetchMovies();
            })
            .catch(error => console.error('There has been a problem with your fetch operation: ', error));
    };

    const isAdmin = user && user.role === 'ROLE_ADMIN';

    return (
        <div>
            <StyledTextField
                label="Search"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <Paper>
                <StyledTableContainer>
                    <DataGrid
                        columns={columns}
                        data={filteredMovies}
                        onRowClick={handleRowClick}
                        onEditClick={isAdmin ? handleEditClick : undefined}
                        onDeleteClick={isAdmin ? handleDeleteClick : undefined}
                    />
                </StyledTableContainer>
            </Paper>

            {editMovie && (
                <Dialog open={openEditModal} onClose={handleEditClose}>
                    <DialogTitle>Edit Movie</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Name"
                            value={editMovie.name}
                            onChange={(event) => handleEditInputChange(event, 'name')}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Genre"
                            value={editMovie.genre}
                            onChange={(event) => handleEditInputChange(event, 'genre')}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Release Year"
                            value={editMovie.releaseYear}
                            onChange={(event) => handleEditInputChange(event, 'releaseYear')}
                            fullWidth
                            margin="normal"
                        />
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            multiple
                            type="file"
                            onChange={(event) => handleEditInputChange(event, 'imageFile')}
                        />
                        <label htmlFor="raised-button-file">
                            <Button component="span" >
                                Upload Image
                            </Button>
                        </label>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditClose}>Cancel</Button>
                        <Button onClick={handleEditSave} variant="contained" color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </div>
    );
};

export default FilmGrid;
