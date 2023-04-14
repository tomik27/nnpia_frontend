import * as React from 'react';
import {useEffect, useState} from 'react';
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
import {useAppSelector} from "../../app/hooks";
import {RootState} from "../../app/store";

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    marginTop: theme.spacing(2),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    marginBottom: theme.spacing(2),
}));

interface Person {
    id: number;
    firstName: string;
    lastName: string;
    birthDate: string;
    birthPlace: string;
}

const dummyData: Person[] = [
    {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        birthDate: '1990-01-01',
        birthPlace: 'New York',
    },
];

const Persons: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [persons, setPersons] = useState<Person[]>(dummyData);
    const isLoggedIn = useAppSelector((state:RootState) => state.login.value);
    const user = useAppSelector((state:RootState) => state.login.user);

    useEffect(()=> {
        console.log(`State changed in persons: ${isLoggedIn}`);
    }, [isLoggedIn])
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredPersons = persons.filter(
        (person) =>
            person.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            person.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            person.birthPlace.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (

        <div>
            {isLoggedIn && (<div>Přihlášení proběhlo úspěšně. {isLoggedIn}</div>)}
            {user && (<div> {user.role}</div>)}
            <StyledTextField
                label="Search"
                value={searchTerm}
                onChange={handleSearchChange}
                fullWidth
            />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Birth Date</TableCell>
                            <TableCell>Birth Place</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredPersons.map((person) => (
                            <TableRow key={person.id}>
                                <TableCell>{person.id}</TableCell>
                                <TableCell>{person.firstName}</TableCell>
                                <TableCell>{person.lastName}</TableCell>
                                <TableCell>{person.birthDate}</TableCell>
                                <TableCell>{person.birthPlace}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Persons;
