import Header from './components/Header/Header';
import { Switch, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import VideogamesList from './components/List/VideogamesList';
import Details from './components/Details/Details';
import Dashboard from './components/DashBoard/dashboard';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faSearch, faUser, faNewspaper, faShoppingCart, faSignInAlt, faCalendarAlt, faHome, faAngleDoubleRight, faAngleDoubleLeft, faAngleDoubleDown, faAngleDoubleUp, faEnvelopeOpenText, faHeart, faTimes, faCheckCircle, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Login from './components/LogIn/Login';
import Register from './components/Register/Register';

library.add(faBars, faSearch, faUser, faNewspaper, faShoppingCart, faSignInAlt, faCalendarAlt, faHome, faAngleDoubleRight, faAngleDoubleLeft, faAngleDoubleDown, faAngleDoubleUp, faEnvelopeOpenText, faHeart, faTimes, faCheckCircle, faEye, faEyeSlash)

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/all-games" component={VideogamesList} />
        <Route path="/product/:videogameId" component={Details} />
        <Route path="/dashboard/:userId" exact component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </>
  );
}

export default App;
