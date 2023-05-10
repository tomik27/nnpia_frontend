import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Home from './HomePage';
import Films from '../Film/Films';
import UserAccount from "../User/UserProfile";
import Persons from "../Person/Persons";
import './Routes.css';
import LoginForm from "../Authentication/LoginForm";
import Authentication from "../Authentication/Authentication";
import UserProfile from "../User/UserProfile";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {RootState} from "../../app/store";
import {logout} from "../../features/login/loginSlice";
import Person from "../Person/Person";
import FilmForm from '../Film/FilmForm';
import PersonForm from "../Person/PersonForm";
import UserForm from "../User/UserForm";
import AddPersonToFilmForm from "../Film/AddPersonToFilmForm";
import PaddedContent from "./PaddedContent";
import Users from "../User/Users";
import FilmGrid from "../Film/FilmGrid";

interface Props {
    onLogout: () => void;
}

const RoutesComponent: React.FC<Props> = ({ onLogout }) => {
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector((state:RootState) => state.login.value)
    const handleLogout = () => {
        // const isLoggedIn = useAppSelector((state:RootState) => state.login.value)
        dispatch(logout());
        //isLoggedIn = useAppSelector((state:RootState) => state.login.value);
        // implementace odhlašování
    };

    return (
        <BrowserRouter>
            {isLoggedIn && (<div>isLoggedIn</div>)}
            <NavigationBar onLogout={handleLogout}  />
            <Routes>
                <Route path="/films" element={<PaddedContent><Films /></PaddedContent>} />
                <Route path="/" element={<Home />} />
                <Route path="/persons" element={<PaddedContent><Persons /></PaddedContent>} />
                <Route path="/account" element={<PaddedContent><UserProfile email={"mail.com"} favoriteFilms={["The Shawshank Redemption", "The Godfather"]} username={''} /></PaddedContent>} />
                <Route path="/authentication" element={<PaddedContent><Authentication /></PaddedContent>} />
                <Route path='/person/:id' element={<PaddedContent><Person /></PaddedContent>} />
                <Route path='/filmForm' element={<PaddedContent><FilmForm /></PaddedContent>} />
                <Route path='/personForm' element={<PaddedContent><PersonForm /></PaddedContent>} />
                <Route path='/userForm' element={<PaddedContent><UserForm /></PaddedContent>} />
                <Route path='/addPersonToFilmForm' element={<PaddedContent><AddPersonToFilmForm /></PaddedContent>} />
                <Route path="/users" element={<PaddedContent><Users /></PaddedContent>} />
                <Route path="/filmGrid" element={<PaddedContent><FilmGrid /></PaddedContent>} />


            </Routes>
        </BrowserRouter>
    );
};

export default RoutesComponent;