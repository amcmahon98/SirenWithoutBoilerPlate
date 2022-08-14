import axios from "axios";
import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import "../Styling/CreateAccount.css";

const initialState = {
    email: "",
    name: "",
    contactnumber: "",
    password: "",
    confirmpassword: ""
}

const CreateAccount = () => {

    const [state, setState] = useState(initialState);
    const {email,name,contactnumber,password,confirmpassword} = state;
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        if(!email || !name || !contactnumber || !password || !confirmpassword) {
            alert("Please enter data into all fields to create an account")
        } 
        else if (!regex.test(password)) {
            alert("Password must be at least 8 characters and include uppercase, lowercase, number and symbol")
        }
        else if(password != confirmpassword) {
            alert("Please ensure password's match")
        }
        else {
            axios.post("http://localhost:5000/api/createAccount", {
                email,
                name,
                contactnumber,
                password
            })
            .catch((err) => {
                if(err.response.status === 409){
                    alert("An account with this email already exists, if required use the password reset link at the bottom of this page")
                }
            });
            setTimeout(500);
            navigate('/login');
        }
    }
    
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setState({...state,[name]: value})
    }

  return (

    <div className="container">
        <h1>Create Account</h1>
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
            <label htmlFor="name">Name:</label>
            <input
            className="name"
            type="text"
            id="name"
            name="name"
            placeholder="Name..."
            value={name}
            onChange={handleInputChange}/>
            <label htmlFor="contactnumber">Contact Number:</label>
            <input
            className="contactnumber"
            type="text"
            id="contactnumber"
            name="contactnumber"
            placeholder="Contact Number..."
            value={contactnumber}
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
            <label htmlFor="confirmpassword">Password:</label>
            <input 
            type="password"
            id="confirmpassword"
            name="confirmpassword"
            placeholder="Confirm Password..."
            value={confirmpassword}
            onChange={handleInputChange}
            />
            <input type="submit" value="Create Account"/>
        </form>

    </div>
  );
}

export default CreateAccount;