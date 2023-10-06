import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Home from './HomePage';
import Films from '../film/Films';
import Persons from "../person/Persons";
import './Routes.css';
import LoginForm from "../authentication/LoginForm";
import Authentication from "../authentication/Authentication";
import UserProfile from "../user/UserProfile";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {RootState} from "../../app/store";
import {logout} from "../../features/login/loginSlice";
import Person from "../person/Person";
import FilmForm from '../film/FilmForm';
import PersonForm from "../person/PersonForm";
import UserForm from "../user/UserForm";
import AddPersonToFilmForm from "../film/AddPersonToFilmForm";
import PaddedContent from "./PaddedContent";
import Users from "../user/Users";
import FilmGrid from "../film/FilmGrid";
import Film from "../film/Film";
import User from "../user/User";

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
                <Route path="/film/:id" element={<PaddedContent><Film /></PaddedContent>} />
                <Route path="/user/:id" element={<PaddedContent><User /></PaddedContent>} />
            </Routes>
        </BrowserRouter>
    );
};

export default RoutesComponent;