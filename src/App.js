import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Pages
import Home from "./pages/HomePage"
import AdminHome from "./pages/AdminHome"
import JobDialog from "./pages/JobDialog"
import AdminLogin from "./pages/AdminLogin"
import AdminProfile from "./pages/AdminProfile"
import NewAdmin from "./pages/NewAdmin"
import UserLogin from "./pages/UserLogin"
import NewUser from "./pages/NewUser"
import UserHome from "./pages/UserHome"
import UserProfile from "./pages/UserProfile"

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login/admin" component={AdminLogin} />
          <Route exact path="/login/user" component={UserLogin} />
          <Route exact path="/signup/admin" component={NewAdmin} />
          <Route exact path="/signup/user" component={NewUser} />
          <Route exact path="/admin/home" component={AdminHome} />
          <Route exact path="/user/home" component={UserHome} />
          <Route exact path="/admin/profile" component={AdminProfile} />
          <Route exact path="/user/profile" component={UserProfile} />
          <Route exact path="/jobs/admin/:jobId" component={JobDialog} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
