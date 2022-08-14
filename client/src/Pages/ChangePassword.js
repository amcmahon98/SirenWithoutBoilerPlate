import axios from "axios";
import React , {useState, useEffect} from "react";
import { useNavigate} from "react-router-dom";
import "../Styling/Account.css";

const initialState = {
    email: "",
    password: "",
    passwordConfirm: ""
}

const ChangePassword = () => {
    const [state, setState] = useState(initialState);
    const {email,password,passwordConfirm} = state;
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        if(!email || !password || !passwordConfirm) {
            alert("Please enter data into all fields to reset password")
        } 
        else if (!regex.test(password)) {
            alert("Password must be at least 8 characters and include uppercase, lowercase, number and symbol")
        }
        else if(password != passwordConfirm) {
            alert("Please ensure password's match")
        }
        else {
            axios.post("http://localhost:5000/api/updatePassword", {
                email,
                password,
            })
            .catch((err) => console.log(err.response.data));
            setTimeout(500);
            navigate('/');
        }
    }
    
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setState({...state,[name]: value})
    }

  return (
    <div className="container">
        <h1>Update Password</h1>
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
            className="password"
            type="password"
            id="password"
            name="password"
            placeholder="Password..."
            value={password}
            onChange={handleInputChange}/>
            <label htmlFor="passwordConfirm">Confirm Password:</label>
            <input
            className="passwordConfirm"
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            placeholder="Confirm Password..."
            value={passwordConfirm}
            onChange={handleInputChange}/>
            <input type="submit" value="Update Password"/>
        </form>
        
    </div>
  );
}

export default ChangePassword;