import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { register } from '../../ApiServices/AuthService';



import './RegisterPage.css'

const RegisterPage = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleUsernameChange = (event: any) => {
        setUserName(event.target.value)
    }

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value)
    }

    const handleRigisterClick = async () => {
        // const data = await register({username, password});

        // console.log(data)
       const {jwt, success} = await register({username, password})

       if(success) {
          localStorage.setItem('tyre-app-jwt', jwt)
          navigate('/home');
       } else {
        alert('Error registering')
       }


    //    console.log(data);
    }
    return (
        <div className="register-page-container">
            <div className='register-form-container'>
                <h1>Register</h1>

                <input onChange={(event) => handleUsernameChange(event)} className='username-input' placeholder='Username' />

                <input onChange={(event) => handlePasswordChange(event)}className='password-input' placeholder='Password'
                type='password' />

                <button className='register-button' onClick={() => handleRigisterClick()}>Register</button>

                <Link to='/login'>Click here to log in of you already have an account.</Link>
            </div>

        </div>
    )
}

export default RegisterPage