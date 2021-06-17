import Header from './components/Header/Header';
import { Switch, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import VideogamesList from './components/List/VideogamesList';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faSearch, faUser, faNewspaper, faShoppingCart, faSignInAlt, faCalendarAlt, faHome, faAngleDoubleRight, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';

library.add(faBars, faSearch, faUser, faNewspaper, faShoppingCart, faSignInAlt, faCalendarAlt, faHome, faAngleDoubleRight, faEnvelopeOpenText)

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/all-games" component={VideogamesList} />
      </Switch>
    </>
  );
}

export default App;
