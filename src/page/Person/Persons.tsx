import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
    TextField,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { useNavigate } from 'react-router-dom';
import DataGrid, {Column} from "../../components/DataGrid";

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
    const isLoggedIn = useAppSelector((state: RootState) => state.login.value);
    const user = useAppSelector((state: RootState) => state.login.user);
    const [selectedPerson, setSelectedPerson] = useState<PersonData | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        fetch(`${backendUrl}/person`)
            .then((response) => response.json())
            .then((data) => setPersons(data));
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredPersons = persons.filter((person) => {
        const fullName = `${person.firstName} ${person.lastName}`;
        return fullName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // When a row is clicked, navigate to the corresponding person's details page
  /*  const handleRowClick = (id: number) => {
        navigate(`/person/${id}`);
    };*/
    const handleRowClick = (event: React.MouseEvent<unknown, MouseEvent>, rowData: any) => {
        console.log(`Row with id ${rowData.id} clicked`);
        navigate(`/person/${rowData.id}`);
    };

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
                    <DataGrid columns={columns} data={filteredPersons} onRowClick={handleRowClick} />
                </StyledTableContainer>
            </Paper>
        </div>
    );
};

export default Persons;



