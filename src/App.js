import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import SignUp from './components/SignUp';
import Loading from './components/Loading';


function App() {

  let homePage;
  console.log(localStorage.getItem("userID"))
  if (localStorage.getItem("userID")) {
    homePage = (
      <>
        <Header />
        <Loading />
        <Home />
      </>
    )
  }
  else {
    homePage = (
      <>
        <Loading />
        <Login />
      </>
    )
  }

  let signUp;

  if (localStorage.getItem("userID")) {
    signUp = (
      <>
        <Header />
        <Loading />
        <Home />
      </>
    )
  }
  else {
    signUp = (
      <>
        <Loading />
        <SignUp />
      </>
    )
  }

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Switch>
          <Route path="/signup">
            {signUp}
          </Route>
          <Route path="/">
            {homePage}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
