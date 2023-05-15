import React from 'react';
import RoutesComponent from "./page/Home/Routes";

function App() {
    const handleLogout = () => {
        // logika pro odhlášení uživatele
    };
    return (
        <div className="App">
            <RoutesComponent onLogout={handleLogout} />
        </div>
    );
}

export default App;