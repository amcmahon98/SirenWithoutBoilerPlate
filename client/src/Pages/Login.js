import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link} from "react-router-dom";
import Cookies from 'universal-cookie';
import "../Styling/Login.css";


const initialState = {
    email: "",
    password: ""
}

const Login = () => {

    const navigate = useNavigate();
    const [state, setState] = useState(initialState);
    const {email,password} = state;
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!email || !password) {
            alert("Please enter data into all fields to create an account")
        } else {
            axios.post("http://localhost:5000/api/login", {
                email,
                password
            })
            .then((response) => {
                if(response.status === 200) {
                    const cookies = new Cookies();
                    cookies.set('userid',response.data[0].id);
                    cookies.set('name',response.data[0].name);
                    cookies.set('isloggedin',true);
                    console.log("set cookies");
                    navigate('/');
                }
            })
            .catch((err) => {
                if(err.response.status === 404){
                    alert("User Not Found: Please confirm provided username is correct")
                }
                else if(err.response.status === 401) {
                    alert("Incorrect Password: Please try again")
                }
            });
            setTimeout(500);
        }
    }
    
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setState({...state,[name]: value})
    }

  return (

    <div className="container">
        <h1>Login</h1>
        <hr/>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input 
            type="text"
            id="email"
            name="email"
            placeholder="Email..."
            value={email}
            onChange={handleInputChange}/>
            <label htmlFor="password">Password:</label>
            <input 
            type="password"
            id="password"
            name="password"
            placeholder="Password..."
            value={password}
            onChange={handleInputChange}
            />
            <input type="submit" value="Login"/>
            <Link to={"/create/account"} >
            <p className="login-link">Don't have an account? Click here to create one!</p> 
            </Link>
            <Link to={"/change-password"} >
            <p className="login-link">Forgotten your password? Click here to reset it!</p> 
            </Link>
        </form>

    </div>
  );
}

export default Login;