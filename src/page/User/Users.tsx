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

interface UserData {
    id: number;
    username: string;
    password: string;
    email: string;
    role: string;
}

const columns: Column[] = [
    { id: 'username', label: 'Username' },
    { id: 'password', label: 'Password' },
    { id: 'email', label: 'Email' },
    { id: 'role', label: 'Role' },
];

const Users: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState<UserData[]>([]);
    const isLoggedIn = useAppSelector((state: RootState) => state.login.value);
    const user = useAppSelector((state: RootState) => state.login.user);
    const token = useAppSelector((state: RootState) => state.login.token);

    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [editUser, setEditUser] = useState<UserData | null>(null);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        return fetch(`${backendUrl}/user`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => response.json())
            .then((data) => setUsers(data));
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredUsers = users.filter((user) => {
        return user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const handleRowClick = (event: React.MouseEvent<unknown, MouseEvent>, rowData: any) => {
        console.log(`Row with id ${rowData.id} clicked`);
        navigate(`/user/${rowData.id}`);
    };

    const handleEditClick = async (rowData: UserData) => {
        console.log(`Edit user with id ${rowData.id}`);
        setEditUser(rowData);
        setOpenEditModal(true);
    };

    const updateUserData = async (user: UserData) => {
        const response = await fetch(`${backendUrl}/user/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`

            },
            body: JSON.stringify(user)
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
        if (editUser !== null) {
            updateUserData(editUser)
                .then(() => {
                    console.log('User updated:', editUser);
                    fetchUsers().then(() => forceUpdate());
                })
                .catch((err) => {
                    console.error('Error updating user:', err);
                });
        } else {
            console.error('Edit user is null. Cannot update.');
        }
        setOpenEditModal(false);
    };

    const handleEditInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        field: keyof UserData
    ) => {
        if (editUser) {
            setEditUser({ ...editUser, [field]: event.target.value });
        }
    };


    const handleDeleteClick = (rowData: UserData) => {
        console.log(`Delete user with id ${rowData.id}`);
        fetch(`${backendUrl}/user/${rowData.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                fetchUsers();
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
                        data={filteredUsers}
                        onRowClick={handleRowClick}
                        onEditClick={isAdmin ? handleEditClick : undefined}
                        onDeleteClick={isAdmin ? handleDeleteClick : undefined}
                    />
                </StyledTableContainer>
            </Paper>

            {editUser && (
                <Dialog open={openEditModal} onClose={handleEditClose}>
                    <DialogTitle>Edit User</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Username"
                            value={editUser.username}
                            onChange={(event) => handleEditInputChange(event, 'username')}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Password"
                            value={editUser.password}
                            onChange={(event) => handleEditInputChange(event, 'password')}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Email"
                            value={editUser.email}
                            onChange={(event) => handleEditInputChange(event, 'email')}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Role"
                            value={editUser.role}
                            onChange={(event) => handleEditInputChange(event, 'role')}
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

export default Users;



