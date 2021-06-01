import Header from './components/Header/Header';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faSearch, faUser, faNewspaper, faShoppingCart, faSignInAlt, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

library.add(faBars, faSearch, faUser, faNewspaper, faShoppingCart, faSignInAlt, faCalendarAlt)

function App() {
  return (
    <>
      <Header />
    </>
  );
}

export default App;
