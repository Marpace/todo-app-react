import React, { useState } from "react";


function Login(props){

    //States for animation
    const [bodyShadow, setBodyShadow] = useState("shadow-right");
    const [login, setLogin] = useState("front");
    const [register, setRegister] = useState("back");
    const [loginForm, setLoginForm] = useState("show-flex");
    const [registerForm, setRegisterForm] = useState("hidden");

    // this is for the forgot password button
    // const [visibility, setVisibility] =  useState("form-flex");

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

    // Animates change from login to register
    function handleLoginClick(){
        setLogin("front");
        setLoginForm("show-flex");
        setRegisterForm("hidden")
        // setVisibility("form-flex")
        setTimeout(() => {
            setBodyShadow("shadow-right");
            setRegister("back");
        }, 200);
    }
    
    // Animates change from register to login
    function handleRegisterClick(){
        setLoginEmailValue("");
        setLoginPasswordValue("");

        setRegister("front");
        
        setLoginForm("hidden");
        setRegisterForm("show-flex")
        // setVisibility("form-hidden")
        setTimeout(() => {
            setBodyShadow("shadow-left");
            setLogin("back");
        }, 200);
    }

    function registerUser(e){
        e.preventDefault();
        const email = registerEmailValue;
        const password = registerPasswordValue;

        props.registerUser(email, password);

        if(props.errorMessage === "") {
            setRegisterEmailValue("");
            setRegisterPasswordValue("");
            setConfirmPasswordValue("");
        }
    }
    
    function handleLogin(e) {
        e.preventDefault();
        props.handleLogin(loginEmailValue, loginPasswordValue);
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
                <form onSubmit={handleLogin} className={`login-form ${loginForm}`}>
                    <div className="form-inputs">
                        <input 
                        onChange={handleLoginEmailInputChange} 
                        type="email"  
                        placeholder="Email" 
                        value={loginEmailValue}
                        required>
                        </input>
                        <input 
                        onChange={handleLoginPasswordInputChange}
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
                        onChange={handleRegisterEmailInputChange} 
                        type="email"  
                        placeholder="Email" 
                        value={registerEmailValue}
                        required></input>
                        <input 
                        onChange={handleRegisterPasswordInputChange} 
                        type="password"  
                        placeholder="Password" 
                        value={registerPasswordValue}
                        required></input>
                        <input 
                        name="confirmPassword" 
                        onChange={handleConfirmPasswordInputChange} 
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        type="password"  
                        placeholder="Confirm password"
                        value={confirmPasswordValue}
                        required></input>
                        <label 
                        htmlFor="confirmPasswrod"
                        className={`${labelVisibility} ${passwordMatch}`}
                        >{labelText}</label>
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