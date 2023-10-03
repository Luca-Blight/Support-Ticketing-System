import React, { useState } from 'react';
import './styles/App.css';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
  useLocation,
} from 'react-router-dom';

import TicketForm from './components/TicketForm';
import TicketList from './components/TicketList';
import Login from './components/Login';


function HeaderButton({ loggedIn }) {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  if (loggedIn) return null; // Don't display the button if logged in

  return (
    <Link
      className='adminLoginButton'
      to={isLoginPage ? '/' : '/login'}>
      {isLoginPage ? 'Homepage' : 'Admin Login'}
    </Link>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setLoggedIn(true);
  };

  return (
    <Router>
      <div className='App'>
        <HeaderButton loggedIn={loggedIn} />
        <div className='headerContainer'>
          <h1 className='Title'>Help Desk Ticket System</h1>
        </div>
        <Routes>
          <Route
            path='/'
            element={<TicketForm />}
          />
          <Route
            path='/login'
            element={
              loggedIn ? (
                <Navigate to='/tickets' />
              ) : (
                <Login onLoginSuccess={handleLoginSuccess} />
              )
            }
          />
          <Route
            path='/tickets'
            element={<TicketList />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
