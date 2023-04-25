import React, { useState, useEffect } from "react";


function Login(props){

    //States for animation
    const [bodyShadow, setBodyShadow] = useState("shadow-right");
    const [login, setLogin] = useState("front");
    const [register, setRegister] = useState("back");
    const [loginForm, setLoginForm] = useState("show-flex");
    const [registerForm, setRegisterForm] = useState("hidden");
    const [height, setHeight] = useState("body-login");

    // this is for the forgot password button
    // const [visibility, setVisibility] =  useState("form-flex");

    const [passwordMatch, setPasswordMatch] = useState("no-match")
    const [labelText, setLabelText] = useState("Passwords do not match");
    const [labelVisibility, setLabelVisibility] = useState("invisible");

    const [loginUsernameValue, setLoginUsernameValue] = useState("");
    const [loginPasswordValue, setLoginPasswordValue] = useState("");
    const [registerUsernameValue, setRegisterUsernameValue] = useState("");
    const [registerPasswordValue, setRegisterPasswordValue] = useState("");
    const [confirmPasswordValue, setConfirmPasswordValue] = useState("");


    useEffect(() => {
        if(props.registerSuccess) switchForm();
    }, [props.registerSuccess])

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

    function switchForm(e) {
        const option = e === undefined ? "login" : e.target.id
        if(option === "login") {
            //show login form
            setHeight("body-login")
            setLogin("front");
            setLoginForm("show-flex");
            setTimeout(() => {
                setBodyShadow("shadow-right");
                setRegister("back");
            }, 200);
            //hide register form
            setRegisterForm("hidden")
            setRegisterUsernameValue("")
            setRegisterPasswordValue("")
            setConfirmPasswordValue("")
        }
        if(option === "register") {
            //show register form
            setHeight("body-register")
            setRegister("front");
            setRegisterForm("show-flex")
            setTimeout(() => {
                setBodyShadow("shadow-left");
                setLogin("back");
            }, 200);
            //hide login form
            setLoginForm("hidden");
            setLoginUsernameValue("");
            setLoginPasswordValue("");
            props.setRegisterMessage("");
        }
        props.setErrorMessage("");
    }

    function registerUser(e){
        e.preventDefault();
        const username = registerUsernameValue;
        const password = registerPasswordValue;

        props.registerUser(username, password);

        if(props.registerSuccess) {
            setRegisterUsernameValue("");
            setRegisterPasswordValue("");
            setConfirmPasswordValue("");
        }
    }
    
    function handleLogin(e) {
        e.preventDefault();
        props.handleLogin(loginUsernameValue, loginPasswordValue);
    }

    return (
        <div className="login">
            <div className="login__header">
                <h1 className="login__header-title">TO DOS</h1>
            </div>
            <div className="login__top">
                <div id="login" onClick={switchForm} className={`top__${login} top__login top__section`}>
                    <h1 id="login">Login</h1>
                </div> 
                <div id="register" onClick={switchForm} className={`top__${register} top__register top__section`}>
                    <h1 id="register">Register</h1>
                </div>
            </div>
            <div className={`login__body ${bodyShadow} ${height}`}>
                <form onSubmit={handleLogin} className={`login-form ${loginForm}`}>
                    <div className="form-inputs">
                        <input 
                        onChange={(e) => setLoginUsernameValue(e.target.value)} 
                        type="text"  
                        placeholder="Username" 
                        value={loginUsernameValue}
                        required>
                        </input>
                        <input 
                        onChange={(e) => setLoginPasswordValue(e.target.value)}
                        type="password"  
                        placeholder="Password" 
                        value={loginPasswordValue}
                        required>
                        </input>
                    </div>
                    <p className="register-msg">{props.registerMessage}</p>
                    <button className={`login-button ${props.loading ? "loading-button" : ""}`} type="submit">{props.loading ? "" : "Login"}</button>
                </form>
                {/* <button className={`forgotPassword ${visibility}`}>Forgot password</button> */}
                <form onSubmit={registerUser}  className={`register-form ${registerForm}`}>
                    <div className="form-inputs">
                        <input 
                            onChange={(e) => setRegisterUsernameValue(e.target.value)} 
                            type="text"  
                            placeholder="Username" 
                            value={registerUsernameValue}
                            required>
                        </input>
                        <input 
                            onChange={handleRegisterPasswordInputChange} 
                            type="password"  
                            placeholder="Password" 
                            value={registerPasswordValue}
                            required>
                        </input>
                        <input 
                            name="confirmPassword" 
                            onChange={handleConfirmPasswordInputChange} 
                            onFocus={() => setLabelVisibility("visible")}
                            onBlur={() => setLabelVisibility("invisible")}
                            type="password"  
                            placeholder="Confirm password"
                            value={confirmPasswordValue}
                            required>
                        </input>
                        <label 
                            htmlFor="confirmPasswrod"
                            className={`${labelVisibility} ${passwordMatch}`}
                            >{labelText}
                        </label>
                    </div>
                    <button type="submit">Register</button>
                </form>
                    <p className="error-msg">{props.errorMessage}</p>
            </div>
            <div></div>
        </div>
    )
};


export default Login;