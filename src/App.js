import ListsPage from "./components/list/ListsPage"
import Login from "./components/auth/Login"
import {useEffect, useState} from "react"

function App() {

  // const base_url = "http://localhost:5000";
  const base_url = "https://byzantium-moose-gear.cyclic.app";

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


  async function registerUser(email, password) {

    try {
      const response = await fetch(`${base_url}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json"
        },
        body: JSON.stringify({email: email, password: password})
      })
  
      const data = await response.json()
      
      if(response.status !== 200) {
        setRegisterSuccess(false)
        throw new Error(data.message)
      } else {
        setRegisterSuccess(true)
      }
    } catch (err) {
      console.log(err)
      setErrorMessage(err.message)
    }



  }

  // function registerUser(email, password){
  //   fetch(`${base_url}/register`, {
  //       method: "POST",
  //       headers: {
  //           "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //           email: email,
  //           password: password
  //       })
  //   })
  //   .then(res =>  {
  //     if(res.status !== 200) {
  //       throw new Error('Could not create user')
  //     }
  //     return res.json()
  //   })
  //   .then( (data) => {
  //       console.log(data)
  //       setRegisterMessage("Thank you for registering, please login.")
  //       setErrorMessage("")
  //     })
  //     .catch(err => {
  //       setErrorMessage(err.message)
  //       console.log(err);
  //   })
  // }

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

  function userLogin(email, password) {
    setLoading(true);
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
        setErrorMessage("")
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
          );
          localStorage.setItem('expiryDate', expiryDate.toISOString());
          setAutoLogout(remainingMilliseconds);
          setLoading(false);
    })
    .catch(err => {
      console.log(err);
      setErrorMessage("Please check email or password");
      setRegisterMessage("");
    });
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

  // function forgotPassword(email) {
  //   fetch(`${base_url}/forgot-password`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({email: email})
  //   })
  //   .then(res => res.json())
  //   .then(data => {

  //   })
  // }


  function renderPage(){
    if(!loggedIn){
      return(
        <Login 
          errorMessage={errorMessage}
          registerMessage={registerMessage}
          loading={loading}
          registerSuccess={registerSuccess}
          handleLogin={userLogin}
          registerUser={registerUser}
        />
        ) 
    }
    return  (
      <ListsPage 
          base_url={base_url}
          token={token}
          onLogout={userLogout}
          deleteUser={deleteUser}
        />
    )
  }

  return (
    renderPage()
  );
}

export default App;
