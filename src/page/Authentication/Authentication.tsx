import React, {useEffect, useState} from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import {RootState} from "../../app/store";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {login} from "../../features/login/loginSlice";

const Authentication: React.FC = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError] = useState<string|undefined>();

    const [showRegisterForm, setShowRegisterForm] = useState(false);
   // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const isLoggedIn = useAppSelector((state:RootState) => state.login.value)
    const dispatch = useAppDispatch();

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(()=> {
        console.log(`State changed in Authentication: ${isLoggedIn}`);
    }, [isLoggedIn])

    const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // zde by mohlo být volání API pro registraci uživatele
        console.log(
            `Registrace uživatele s emailem ${email} a uživatelským jménem ${username} byla úspěšná.`
        );
    };

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch(`${backendUrl}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(`Přihlášení uživatele s emailem ${data.email} bylo úspěšné.`);
                dispatch(login({
                    token: data.accessToken,
                    user: {
                        username: data.username,
                        role: data.role,
                        email: data.email,
                    },
                }));
            } else {
                setError(await response.json());
                console.error('Chyba při přihlašování:', response.status);
            }
        } catch (error) {
            console.error('Při přihlášení došlo k chybě:', error);
        }
    };

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = event.target;
        if (name === "email") {
            setEmail(value);
        } else if (name === "username") {
            setUsername(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const handleRegisterButtonClick = () => {
        setShowRegisterForm(true);
    };

    return (
        <>
            {error && <div>{error}</div>}

            {isLoggedIn ? (
                <div>Přihlášení proběhlo úspěšně.</div>
            ) : showRegisterForm ? (
                <RegisterForm
                    handleRegister={handleRegister}
                    handleInputChange={handleInputChange}
                    email={email}
                    username={username}
                    password={password}
                />
            ) : (
                <LoginForm
                    handleLogin={handleLogin}
                    handleInputChange={handleInputChange}
                    username={username}
                    password={password}
                    handleRegisterButtonClick={handleRegisterButtonClick}
                />
            )}
        </>
    );
};

export default Authentication;
