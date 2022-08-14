import axios from "axios";
import React , {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import Cookies from 'universal-cookie';
import "../Styling/Account.css";

const initialState = {
    email: "",
    name: "",
    contactno: ""
}

const Account = () => {
    const cookies = new Cookies();
    const [state, setState] = useState(initialState);
    const {email,name,contactno} = state;

    useEffect(() => {
        const userid = cookies.get('userid')
        axios
            .get("http://localhost:5000/api/getAccount",{params:{user:userid}})
            .then((resp) => setState({...resp.data[0]}))
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = cookies.get('userid')
        if(!email || !name || !contactno) {
            alert("Please enter data into all fields to create an account")
        } else {
            axios.post("http://localhost:5000/api/updateAccount", {
                id,
                email,
                name,
                contactno
            })
            .catch((err) => console.log(err.response.data));
            setTimeout(500);
            window.location.reload(false);
        }
    }
    
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setState({...state,[name]: value})
    }

    function handleLogout(e) {
        e.preventDefault();
        cookies.remove('userid')
        cookies.remove('name')
        cookies.set('isloggedin',false);
        window.location.reload(false);
    }

  return (
    <div className="container">
        <h1>Account</h1>
        <hr/>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input 
            type="text"
            id="email"
            name="email"
            value={email || ""}
            onChange={handleInputChange}/>
            <label htmlFor="name">Name:</label>
            <input
            className="name"
            type="text"
            id="name"
            name="name"
            placeholder="Name..."
            value={name || ""}
            onChange={handleInputChange}/>
            <label htmlFor="contactnumber">Contact Number:</label>
            <input
            className="contactno"
            type="text"
            id="contactno"
            name="contactno"
            placeholder="Contact Number..."
            value={contactno || ""}
            onChange={handleInputChange}/>
            <input type="submit" value="Update Details"/>
            <button class="logout" onClick={handleLogout}>Logout</button>
            <Link to={"/change-password"} >
            <p className="login-link">Need to reset your password? Click here to update it!</p> 
            </Link>
        </form>
        
    </div>
  );
}

export default Account;