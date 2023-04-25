//TODOS 
//change backgournd images 
//fix drag and drop
//update list in frontend for better UX and update in database once the user saves



import ListsPage from "./components/list/ListsPage"
import Login from "./components/auth/Login"
import {useEffect, useState} from "react"

function App() {

  // const base_url = "http://localhost:5000";
  const base_url = "https://todo-app-api.herokuapp.com/";

  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);


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
    const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();
    setToken(token);
    setLoggedIn(true);
    setAutoLogout(remainingMilliseconds);
  }, []);


  async function registerUser(username, password) {

    try {
      const response = await fetch(`${base_url}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json"
        },
        body: JSON.stringify({username: username, password: password})
      })
  
      const data = await response.json()
      
      if(response.status !== 201) {
        setRegisterSuccess(false)
        throw new Error(data.message)
      } else {
        setRegisterSuccess(true)
        setRegisterMessage("Account created, please login")
      }
    } catch (err) {
      console.log(err)
      setErrorMessage(err.message)
    }
  }

  function deleteUser() {
    fetch(`${base_url}/delete-user`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      }
    })
    .then(() => {
      console.log("User deleted");
      userLogout();
    })
  }

  function userLogin(username, password) {
    setLoading(true);
    fetch(`${base_url}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(res => {
      return res.json()
    })
    .then(data => {
      setLoggedIn(true);
      setToken(data.token);
      setErrorMessage("")
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('username', data.username);
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
      localStorage.setItem('expiryDate', expiryDate.toISOString());
      setAutoLogout(remainingMilliseconds);
      setLoading(false);
      setRegisterMessage("");
    })
    .catch(err => {
      console.log(err);
      setErrorMessage("Please check username or password");
      setLoading(false);
      setRegisterMessage("");
    });
  } 

  function userLogout() { 
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem('username');
    setLoggedIn(false);
    setToken(null);
  }

  function setAutoLogout(milliseconds) {
    setTimeout(() => {
      userLogout();
    }, milliseconds);
  };


  if(!loggedIn){
    return(
      <Login 
        errorMessage={errorMessage}
        registerMessage={registerMessage}
        loading={loading}
        registerSuccess={registerSuccess}
        setErrorMessage={setErrorMessage}
        setRegisterMessage={setRegisterMessage}
        handleLogin={userLogin}
        registerUser={registerUser}
      />
      ) 
  }
  return  (
    <ListsPage 
        base_url={base_url}
        token={token}
        userLogout={userLogout}
        deleteUser={deleteUser}
      />
  )

}

export default App;
