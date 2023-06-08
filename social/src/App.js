import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/login";
import { 
  BrowserRouter as Router,
  Routes,
  Route
 } from "react-router-dom";

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/profile" element={<Profile/>} />
      </Routes>
    </Router>
    );

}

export default App;
