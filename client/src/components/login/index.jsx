import React from 'react'
import { useState,useEffect } from 'react'
import { usePostLoginMutation,usePostSignUpMutation } from '@/state/api'
import Lottie from "lottie-react"
import animationSC from "../../assets/Animation - 1717356840828";

const Login = ({ setUser,setSecret }) => {
    const [isRegister,setIsRegister] = useState(false);
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [triggerLogin,resultLogin] = usePostLoginMutation();
    const [triggerSignUp] = usePostSignUpMutation();

    const handleLogin = () => {
        triggerLogin({ username, password });
    };
    const handleSignUp = () => {
        triggerSignUp({ username, password });
    };
    useEffect(()=> {
        if(resultLogin.data?.response) {
            setUser(username);
            setSecret(password);
        }
    },[resultLogin.data]); //eslint-disable-line
    return (
    <div className='login-page'>
    <Lottie className='animation' animationData={animationSC}/>
      <div className='login-container'>
        <h2 className='title'>BotChatX</h2>
        <p className='register-change' onClick={()=> setIsRegister(!isRegister)}>
         {isRegister ? "Already a user?" : "Are  you a new user"}
        </p>
        <div>
       <input className='login-input' type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
       <input className='login-input' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className='login-actions'>
           {isRegister ? (
            <button type='button' onClick={handleSignUp}>
             Register
            </button>
           ): (
            <button type='button' onClick={handleLogin}>
                Login
            </button>
           )
           
           }
        </div>
      </div>
    </div>
  )
}

export default Login