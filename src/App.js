import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import BuildBanner from './components/BuildBanner';
import HomePage from './pages/HomePage';
import UserFormPage from './pages/UserFormPage';

const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee'
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222'
  }
}

const ThemeContext = React.createContext(themes.light);

const App = () => {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <BuildBanner />
    
      <div className="container">
        <Router>
          <Switch>
            <Route path="/add-user" component={UserFormPage} />
            <Route path="/edit-user/:id" render={(props) => <UserFormPage {...props} isEditing={true}/>} />
            <Route path="/" component={HomePage} />
          </Switch>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
