import { useContext, useEffect, useState } from "react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/login";
import { AuthContext } from "./context/AuthContext";
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
 } from "react-router-dom";
import Settings from "./pages/Settings";
import Underconsruction from "./components/underconsruction";

function App() {
  const user = useContext( AuthContext );


  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Router>
      
        { 
          windowWidth > 1280
            ? 
              <Routes>
      
                <Route exact path="/" element={ user.user !== null ? <Home/> : <Login /> } />

                <Route exact path="/login" element={ user.user !== null ? <Navigate to='/' /> : <Login />} />

                <Route exact path="/register" element={ user.user !== null ? <Navigate to='/' /> : <Register />} />

                <Route exact path="/profile/:username?" element={ user.user == null ? <Navigate to='/' /> : <Profile/> } />

                <Route exact path="/settings/:username?" element={ user.user == null ? <Navigate to='/' /> : <Settings/> } />

              </Routes>

            : <Underconsruction />
        }

    </Router>
    );

}

export default App;
