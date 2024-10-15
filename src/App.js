import React, { useState } from 'react';
import AddProduct from './components/AddProduct';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://ba5c-117-213-103-13.ngrok-free.app/feed/login/', {"username":username, "password":password}, {
        headers: {
          Accept: "application/json",
          "ngrok-skip-browser-warning": "98547",
        },
      });
      if (response.data.Success === "login successfully") {
        setIsAuthenticated(true);
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <div
      className="App d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        backgroundImage: 'url(https://t4.ftcdn.net/jpg/03/78/40/11/360_F_378401105_9LAka9cRxk5Ey2wwanxrLTFCN1U51DL0.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {isAuthenticated ? (
        <AddProduct />
      ) : (
        <div className="card p-4" style={{ background: 'rgba(255, 255, 255, 0.9)', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '300px', display: 'flex', flexDirection: 'column' }}>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control mb-3"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
             <div className="form-group">
      <label htmlFor="password">Password</label>
      <div className="input-group">
        <input
          type={showPassword ? "text" : "password"}
          className="form-control mb-3"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="input-group-append">
          <span className="input-group-text" style={{height:"39px"}} onClick={togglePasswordVisibility}>
            <i className={`fas fa-eye${showPassword ? "" : "-slash"}`} />
          </span>
        </div>
      </div>
    </div>
            {error && <p className="text-danger mb-3">{error}</p>}
            <button type="submit" className="btn btn-primary btn-block">Login</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;