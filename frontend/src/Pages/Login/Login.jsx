import React, { useState } from 'react';
import { Link,useNavigate} from 'react-router-dom';
import './Login.css'
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { UserContext } from '../../contexts/UserContext';
import { useContext } from 'react';
export default function Login() {
    const loggedData=useContext(UserContext);
    const navigate=useNavigate();

    const [message,setMessage]=useState({
        type:"invisible-msg",
        text:"Dummy msg"
    })

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    });

    function handleInput(event) {
      setUser((prevDetails) => {
        return { ...prevDetails, [event.target.name]: event.target.value };
      });
    }
  

    function handleSubmit(event) {
        event.preventDefault();
        // Add your login logic here
        fetch("http://localhost:3026/api/v1/users/login", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            if (response.status === 400) {
                setMessage({ type: "error", text: "Username or email is required!" });
            } else if (response.status === 404) {
                setMessage({ type: "error", text: "User does not exist!" });
            } else if (response.status === 401) {
                setMessage({ type: "error", text: "Password is incorrect!" });
            } else if (response.status === 200) {
                return response.json(); // only process the response JSON if it's successful
            } else {
                setMessage({ type: "error", text: "Something went wrong, please try again." });
            }
            setTimeout(() => {
                setMessage({ type: "invisible-msg", text: "Dummy Msg" });
            }, 5000);
        })
        .then((data) => {
            //console.log(data)
            if (data.accesstoken !== null) {
                localStorage.setItem("user", JSON.stringify(data));
                loggedData.setLoggedUser(data);
                console.log(loggedData.loggedUser)
                navigate("/");
            }
        })
        .catch((err) => {
            console.log(err)
        });
    }

    return (
        <>
            <Navbar page={"home"}/>
            <div className="container Login-form">
                <form onSubmit={handleSubmit}>
                <h2>Customer Login</h2>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            onChange={handleInput}
                            className="form-control"
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            value={user.username}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            onChange={handleInput}
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={user.email}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            onChange={handleInput}
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={user.password}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary login-btn">Login</button>
                    <p>
                        Don't have an account? <Link to="/register">Register</Link>
                    </p>
                    <p className={message.type}>{message.text}</p>
                </form>
            </div>
            <Footer />
        </>
    );
}