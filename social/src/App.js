import { useContext } from "react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/login";
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
 } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function App() {
  const user = useContext( AuthContext );

  return (
    <Router>
      <Routes>
        
        <Route exact path="/" element={ user.user !== null ? <Home/> : <Register /> } />

        <Route exact path="/login" element={ user.user !== null ? <Navigate to='/' /> : <Login />} />

        <Route exact path="/register" element={ user.user !== null ? <Navigate to='/' /> : <Register />} />

        <Route exact path="/profile/:username?" element={ user.user == null ? <Navigate to='/' /> : <Profile/> } />

      </Routes>
    </Router>
    );

}

export default App;
