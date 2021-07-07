//import { createContext, useState, useEffect } from 'react'; // useEffect hook para disparo de efeitos colaterais
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
//import { auth, firebase } from './services/firebase';

import { AuthContextProvider } from './contexts/AuthContext';
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';

//Switch se uma rota satisfaz para de procurar outra
function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact={true} component={Home}></Route>
          <Route path="/rooms/new" component={NewRoom}></Route>
          <Route path="/rooms/:id" component={Room}></Route>

          <Route path="/admin/rooms/:id" component={AdminRoom}></Route>
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>


  );
}

export default App;
