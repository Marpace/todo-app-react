import ListsPage from "./components/list/ListsPage"
import Login from "./components/auth/Login"
import {useEffect, useState} from "react"
import { Route, useNavigate } from "react-router-dom";

function App() {

  // const base_url = "http://localhost:5000";
  const base_url = "https://todo-api-6215.herokuapp.com"

  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null)


  useEffect(() => {
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    if (!token) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      userLogout();
      return;
    }
    const userId = localStorage.getItem('userId');
    const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();
    setToken(token);
    setLoggedIn(true);
    setAutoLogout(remainingMilliseconds);
  }, []);

  function userLogin(email, password) {
    fetch(`${base_url}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(res => {
        return res.json()
    })
    .then(data => {
        setLoggedIn(true);
        setToken(data.token);
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem('expiryDate', expiryDate.toISOString());
        setAutoLogout(remainingMilliseconds);
    })
    .catch(err => console.log(err));
  } 

  function userLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expiryDate")
    setLoggedIn(false);
    setToken(null);
  }

  function setAutoLogout(milliseconds) {
    setTimeout(() => {
      userLogout();
    }, milliseconds);
  };

  function renderPage(){
    if(!loggedIn){
      return(
        <Login 
          handleLogin={userLogin}
        />
        ) 
    }
    return  (
      <ListsPage 
          base_url={base_url}
          token={token}
          onLogout={userLogout}
        />
    )
  }

  return (
    renderPage()
  );
}

export default App;
