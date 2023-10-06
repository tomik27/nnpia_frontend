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

interface PersonData {
    id: number;
    firstName: string;
    lastName: string;
    birthDate: string;
    birthPlace: string;
}

const columns: Column[] = [
    { id: 'firstName', label: 'First Name' },
    { id: 'lastName', label: 'Last Name' },
    { id: 'birthDate', label: 'Birth Date' },
    { id: 'birthPlace', label: 'Birth Place' },
];

const Persons: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [persons, setPersons] = useState<PersonData[]>([]);
    const user = useAppSelector((state: RootState) => state.login.user);
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const token = useAppSelector((state: RootState) => state.login.token);
    const [editPerson, setEditPerson] = useState<PersonData | null>(null);
    const [openEditModal, setOpenEditModal] = useState(false);
    //donutit komponentu k opětovnému vykreslení v Reactu
    //funkce redukce (x => x + 1), která jednoduše zvýší svůj argument o 1. Počáteční stav je 0.
    const [, forceUpdate] = useReducer(x => x + 1, 0);



    useEffect(() => {
        fetchPersons();
    }, []);

    const fetchPersons = () => {
        return fetch(`${backendUrl}/person`)
            .then((response) => response.json())
            .then((data) => setPersons(data));
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredPersons = persons.filter((person) => {
        const fullName = `${person.firstName} ${person.lastName}`;
        return fullName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const handleRowClick = (event: React.MouseEvent<unknown, MouseEvent>, rowData: any) => {
        console.log(`Row with id ${rowData.id} clicked`);
        navigate(`/person/${rowData.id}`);
    };

    const handleEditClick = async (rowData: PersonData) => {
        console.log(`Edit person with id ${rowData.id}`);
        setEditPerson(rowData); // Add this line to set the editPerson state
        setOpenEditModal(true);
    };

    const updatePersonData = async (person: PersonData) => {
        const response = await fetch(`${backendUrl}/person/${person.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(person)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    };

    const handleEditClose = () => {
        setOpenEditModal(false);
    };

    const handleEditSave = () => {
        // When the modal is closed (user has finished editing), send the updated data to the server.
        if (editPerson !== null) {
            updatePersonData(editPerson)
                .then(() => {
                    console.log('Person updated:', editPerson);
                    fetchPersons().then(() => forceUpdate()); // Force a re-render after fetching the updated data
                })
                .catch((err) => {
                    console.error('Error updating person:', err);
                });

        } else {
            console.error('Edit person is null. Cannot update.');
        }
        setOpenEditModal(false);
    };

    const handleEditInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        field: keyof PersonData
    ) => {
        if (editPerson) {
            setEditPerson({ ...editPerson, [field]: event.target.value });
        }
    };


    const handleDeleteClick = (rowData: PersonData) => {
        console.log(`Delete person with id ${rowData.id}`);
        // Add your delete logic here
        fetch(`${backendUrl}/person/${rowData.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Refresh the data after delete
                fetchPersons()
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
                        data={filteredPersons}
                        onRowClick={handleRowClick}
                        onEditClick={isAdmin ? handleEditClick : undefined}
                        onDeleteClick={isAdmin ? handleDeleteClick : undefined}
                    />
                </StyledTableContainer>
            </Paper>

            {editPerson && (
                <Dialog open={openEditModal} onClose={handleEditClose}>
                    <DialogTitle>Edit Person</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="First Name"
                            value={editPerson.firstName}
                            onChange={(event) => handleEditInputChange(event, 'firstName')}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Last Name"
                            value={editPerson.lastName}
                            onChange={(event) => handleEditInputChange(event, 'lastName')}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Birth Date"
                            value={editPerson.birthDate}
                            onChange={(event) => handleEditInputChange(event, 'birthDate')}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Birth Place"
                            value={editPerson.birthPlace}
                            onChange={(event) => handleEditInputChange(event, 'birthPlace')}
                            fullWidth
                            margin="normal"
                        />
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

export default Persons;