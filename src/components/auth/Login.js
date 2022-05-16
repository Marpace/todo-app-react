import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login(props){

    let navigate = useNavigate();

    const base_url = "http://localhost:5000";
  // const base_url = "https://todo-api-6215.herokuapp.com"

    const [loggedIn, setLoggedIn] = useState(false);

    //States for animation
    const [bodyShadow, setBodyShadow] = useState("shadow-right");
    const [login, setLogin] = useState("front");
    const [register, setRegister] = useState("back");
    const [loginForm, setLoginForm] = useState("form-flex");
    const [registerForm, setRegisterForm] = useState("form-hidden");
    const [visibility, setVisibility] =  useState("form-flex");

    const [passwordMatch, setPasswordMatch] = useState("no-match")
    const [labelText, setLabelText] = useState("Passwords do not match");
    const [labelVisibility, setLabelVisibility] = useState("invisible");

    const [loginEmailValue, setLoginEmailValue] = useState("");
    const [loginPasswordValue, setLoginPasswordValue] = useState("");
    const [registerEmailValue, setRegisterEmailValue] = useState("");
    const [registerPasswordValue, setRegisterPasswordValue] = useState("");
    const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

    //Set input values 
    function handleLoginEmailInputChange(e){
        setLoginEmailValue(e.target.value);
    }
    function handleLoginPasswordInputChange(e){
        setLoginPasswordValue(e.target.value);
    }
    function handleRegisterEmailInputChange(e){
        setRegisterEmailValue(e.target.value);
    }
    function handleRegisterPasswordInputChange(e){
        setRegisterPasswordValue(e.target.value);
        if(confirmPasswordValue === e.target.value) {
            setPasswordMatch("match");
            setLabelText("Passwords match")
        } 
        else {
            setPasswordMatch("no-match");
            setLabelText("Passwords do not match");
        }
    }
    function handleConfirmPasswordInputChange(e){
        setConfirmPasswordValue(e.target.value);
        if(registerPasswordValue === e.target.value){
            setPasswordMatch("match");
            setLabelText("Passwords match");
        } 
        else {
            setPasswordMatch("no-match")   
            setLabelText("Passwords do not match")
        } 
    }
    
    function handleBlur() {
        setLabelVisibility("invisible");
    }

    function handleFocus() {
        setLabelVisibility("visible");
    }

    // Animate change from login to register
    function handleLoginClick(){
        setLogin("front");
        setLoginForm("form-flex");
        setRegisterForm("form-hidden")
        setVisibility("form-flex")
        setTimeout(() => {
            setBodyShadow("shadow-right");
            setRegister("back");
        }, 200);
    }
    function handleRegisterClick(){
        setRegister("front");
        setLoginForm("form-hidden");
        setRegisterForm("form-flex")
        setVisibility("form-hidden")
        setTimeout(() => {
            setBodyShadow("shadow-left");
            setLogin("back");
        }, 200);
    }

    function registerUser(e){
        e.preventDefault();
        fetch(`${base_url}/register`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: registerEmailValue,
                password: registerPasswordValue
            })
        })
        .then(res =>  {
            return res.json()
        })
        .then( (data) => {
            console.log(data)
          setRegisterEmailValue("");
          setRegisterPasswordValue("");
          setConfirmPasswordValue("");
        })
        .catch(err => {
            console.log(err);
        })
    }

    function handleLogin(e) {
        e.preventDefault();
        props.handleLogin(loginEmailValue, loginPasswordValue);
    }
    

    function userLogout() {
        setLoggedIn(false)
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    }

    return (
        <div className="login">
            <div className="login__header">
                <h1 className="login__header-title">TODO</h1>
            </div>
            <div className="login__top">
                <div onClick={handleLoginClick} className={`top__${login} top__login top__section`}>
                    <h1>Login</h1>
                </div>
                <div onClick={handleRegisterClick} className={`top__${register} top__register top__section`}>
                    <h1>Register</h1>
                </div>
            </div>
            <div className={`login__body ${bodyShadow}`}>
                <form onSubmit={handleLogin} className={`form ${loginForm}`}>
                    <div className="form-inputs">
                        <input 
                        onChange={handleLoginEmailInputChange} 
                        type="email"  
                        placeholder="Email" 
                        value={loginEmailValue}></input>
                        <input 
                        onChange={handleLoginPasswordInputChange}
                        type="password"  
                        placeholder="Password" 
                        value={loginPasswordValue}></input>
                    </div>
                    <button type="submit">Login</button>
                </form>
                <button className={`forgotPassword ${visibility}`}>Forgot password</button>
                <form onSubmit={registerUser}  className={`form register-form ${registerForm}`}>
                    <div className="form-inputs">
                        <input 
                        onChange={handleRegisterEmailInputChange} 
                        type="text"  
                        placeholder="Email" 
                        value={registerEmailValue}></input>
                        <input 
                        onChange={handleRegisterPasswordInputChange} 
                        type="password"  
                        placeholder="Password" 
                        value={registerPasswordValue}></input>
                        <input 
                        name="confirmPassword" 
                        onChange={handleConfirmPasswordInputChange} 
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        type="password"  
                        placeholder="Confirm password"
                        value={confirmPasswordValue}
                        ></input>
                        <label 
                        htmlFor="confirmPasswrod"
                        className={`${labelVisibility} ${passwordMatch}`}
                        >{labelText}</label>
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    )
};


export default Login;