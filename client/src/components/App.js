import React, { createContext } from 'react';
import { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Workouts from './Workouts';
import Friends from './Friends';
import Login from './Login';
import Header from './Header';
import Profile from './Profile';
import Goals from './Goals';
import '../css/App.css';

const ThemeContext = createContext(null);

function App() {
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        fetch('/check_session')
            .then((r) => {
                if (r.ok) {
                r.json().then((user) => setUser(user));
                }
            });
    }, []);
  
    if (!user) {
      return <Login onLogin={setUser} />;
    }


    function handleLogout() {
        fetch('/logout', {
            method: 'DELETE'
        }).then(() => setUser(null));
    }
  
    const router = (
        <Router>
            <div>
                    <Header user={user} handleLogout={handleLogout} ThemeContext={ThemeContext}/>
                <Switch>
                    <Route path="/" exact render={(props) => <Home {...props} user={user} ThemeContext={ThemeContext} />}  />
                    <Route path="/workouts" render={(props) => <Workouts {...props} user={user} ThemeContext={ThemeContext} />} />
                    <Route path="/friends" render={(props) => <Friends {...props} user={user} ThemeContext={ThemeContext} />} />
                    <Route path="/profile" render={(props) => <Profile {...props} user={user} ThemeContext={ThemeContext} />} />
                    <Route path="/goals" render={(props) => <Goals {...props} user={user} ThemeContext={ThemeContext} />} />
                </Switch>
            </div>
        </Router>
    );

    return (
        <div className="App">
            {router}
        </div>
  );
}

export default App;
