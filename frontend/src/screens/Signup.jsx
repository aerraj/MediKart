// import React from 'react'
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Navbar from './../components/Navbar';
import Footer from './../components/Footer';

export default function Signup() {

    const [credentials, setcredentials] = useState({name:"",email:"",password:"",geolocation:""})
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://medi-kart.vercel.app/api/createUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: credentials.name,
            password: credentials.password,
            email: credentials.email,
            location: credentials.geolocation,
          }),
        });
    
        const json = await response.json();
        console.log(json);
        if (!json.success) {
          alert("Enter Valid Credentials");
        }
        else{
          navigate("/login");
        }
      };

const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
    <Navbar/>
    <div className="container border border-primary rounded mt-5 p-3 ">
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
      </div>
       <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" name='email' value={credentials.email} id="exampleInputEmail1" aria-describedby="emailHelp"  onChange={onChange}/>
    <div id="emailHelp" className="form-text">We&apos;ll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name='password' value={credentials.password}  id="exampleInputPassword1"  onChange={onChange}/>
  </div>
  <div className="mb-3">
<label htmlFor="exampleInputPassword1" className="form-label">  Address</label>
<input type="text" className="form-control" name="geolocation" value={credentials.geolocation} onChange={onChange} id="exampleInputPassword1" />
          </div>
  <button type="submit" className="btn btn-primary m-3">SignUp</button>
  <Link to="/login" className="btn btn-secondary m-3">Already a user</Link>
  </form>
</div>
<div style={{ height: '50px' }}></div>
<Footer/>
    </>
  )
}
