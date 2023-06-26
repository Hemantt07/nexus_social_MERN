import { useContext } from "react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/login";
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
  Navigate
 } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function App() {

  const user = useContext( AuthContext );

  return (
    <Router>
      <Routes>
        
        <Route exact path="/" element={ user ? <Home/> : <Login /> } />

        <Route exact path="/login" element={ user ? <Navigate to='/' /> : <Login />} />

        <Route exact path="/register" element={ !user ? <Navigate to='/' /> : <Register />} />

        <Route exact path="/profile/:username?" element={<Profile/>} />

      </Routes>
    </Router>
    );

}

export default App;
