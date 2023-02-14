import './App.css';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import LandingPage from "./components/LandingPage/LandingPage";
import DogDetails from "./components/DogDetails/DogDetail";
import FormAddDog from "./components/FormAddDog/FormAddDog";

//nuestra app
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <LandingPage/>
          </Route>
          <Route exact path="/home">
            <Home/>
          </Route>
          <Route exact path="/dog-detail/:id">
            <DogDetails />
          </Route>
          <Route exact path="/dog">
            <FormAddDog />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
