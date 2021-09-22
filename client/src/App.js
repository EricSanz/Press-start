import Header from './components/Header/Header';
import { Switch, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import VideogamesList from './components/List/VideogamesList';
import Details from './components/Details/Details';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faSearch, faUser, faNewspaper, faShoppingCart, faSignInAlt, faCalendarAlt, faHome, faAngleDoubleRight, faAngleDoubleLeft, faAngleDoubleDown, faAngleDoubleUp, faEnvelopeOpenText, faHeart, faTimes, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

library.add(faBars, faSearch, faUser, faNewspaper, faShoppingCart, faSignInAlt, faCalendarAlt, faHome, faAngleDoubleRight, faAngleDoubleLeft, faAngleDoubleDown, faAngleDoubleUp, faEnvelopeOpenText, faHeart, faTimes, faCheckCircle)

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/all-games" component={VideogamesList} />
        <Route path="/product/:videogameId" component={Details} />
      </Switch>
    </>
  );
}

export default App;
