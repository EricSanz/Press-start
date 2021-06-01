import Header from './components/Header/Header';
import { Switch, Route } from 'react-router-dom';
import LeftSidenav from './components/Left-Sidenav/Left-Sidenav';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faSearch, faUser, faNewspaper, faShoppingCart, faSignInAlt, faCalendarAlt, faHome, faAngleDoubleRight, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';

library.add(faBars, faSearch, faUser, faNewspaper, faShoppingCart, faSignInAlt, faCalendarAlt, faHome, faAngleDoubleRight, faEnvelopeOpenText)

function App() {
  return (
    <>
      <Header />
      <Switch>
      </Switch>
    </>
  );
}

export default App;
