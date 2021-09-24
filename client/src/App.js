import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route, Redirect
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import ReactGA from "react-ga";

function App() {
  ReactGA.initialize("UA-208542197-1");
  ReactGA.pageview(window.location.pathname + window.location.search);
  const { users } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {users ? < Home /> : <Register />}
        </Route>
        <Route path="/login">
          {users ? <Redirect to="/"/> : <Login/>}
        </Route>
        <Route path="/register">
          {users ? <Redirect to="/"/> : <Register/>}
        </Route>
        <Route path="/profile/:username">
          <Profile/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
