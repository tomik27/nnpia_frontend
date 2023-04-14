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
import MovieNavbar from "./MovieNavbar";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {RootState} from "../../app/store";
import {logout} from "../../features/login/loginSlice";

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
                <Route path="/films" element={<FilmsWithPadding />} />
                <Route path="/" element={<Home />} />
                <Route path="/persons" element={<PersonsWithPadding />} />
                <Route path="/account" element={<UserProfile  email={"mail.com"} favoriteFilms={["The Shawshank Redemption", "The Godfather"]} username={''}/>} />
                <Route path="/authentication" element={<AuthWithPadding/>} />
            </Routes>
        </BrowserRouter>
    );
};

const HomeWithPadding = () => {
    return (
        <div className="content">
            <Home />
        </div>
    );
};

const AuthWithPadding = () => {
    return (
        <div className="content">
            <Authentication />
        </div>
    );
};

const FilmsWithPadding = () => {
    return (
        <div className="content">
            <Films />
        </div>
    );
};



const PersonsWithPadding = () => {
    return (
        <div className="content">
            <Persons />
        </div>
    );


};

export default RoutesComponent;