import React, { useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Login = () => {
        const navigate = useNavigate()

    const[email,setEmail] = new useState()
    const[password,setPassword]=new useState()


    const handleSubmit=async(e) => {
        try{
        
       const response=await axios.post ("https://api.dev.piggybank.reontel.com/api/v1/auth/login/email",{email,user_password:password});
       console.log("response",response)     
       console.log(response.data)
            console.log(email,password)
            if (response.status=="200") {
            localStorage.setItem ("refreshToken",response.data.data.refreshToken)
                localStorage.setItem ("token",response.data.data.token)
                console.log(localStorage.getItem("refreshToken"))
                console.log(localStorage.getItem("token"))
                navigate("/Profile")
            } else {

                alert("error occured")
            }
            
           
            }   
            
            catch(error){
                alert("error")
           
        }
    }
    
    return (
        <div>
            <Navbar/>
             <br></br>
            <div className="container">
                <div className="row">
                    
               
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div className="row g-4">
                        <div class="card" >
                        <div class="card-body">
                           <center> <h1>Login</h1></center>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <label htmlFor="" className="form-label">Email ID</label>
                                <input type="email" name="email" id="email" className="form-control" value={email} onChange={(e)=> setEmail(e.target.value)}   />
                            </div>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <label htmlFor="" className="form-label">Password</label>
                                <input type="password" name="password" id="pwd" className="form-control"  value={password} onChange={(e)=> setPassword(e.target.value)} />
                            </div>
                            <br></br>

                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <center><button className="btn btn-success" onClick={handleSubmit} >Login</button></center>
                            </div>
                           
                           </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login


