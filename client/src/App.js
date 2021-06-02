import Header from './components/Header/Header';
import { Switch, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faSearch, faUser, faNewspaper, faShoppingCart, faSignInAlt, faCalendarAlt, faHome, faAngleDoubleRight, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';

library.add(faBars, faSearch, faUser, faNewspaper, faShoppingCart, faSignInAlt, faCalendarAlt, faHome, faAngleDoubleRight, faEnvelopeOpenText)

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Landing} />
      </Switch>
    </>
  );
}

export default App;
