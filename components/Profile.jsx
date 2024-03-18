import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

    const navigate = useNavigate();

    const[FullName,setFullName] = new useState("");
    const[Education,setEducation] = new useState("");
    const[Gender,setGender]=new useState("");
    const[Profession,setProfession]=new useState("");
    const[PhoneNumber,setPhoneNumber]=new useState("");
    const[Role,setRole]=new useState("")
    const[Image,setImage]=new useState("")
    const[loading,setLoading]=new useState(true)
    const[LocalBody,setLocalBody] = new useState("")
    const[DOB,setDOB]= new useState("");
    const[cnCode,setcnCode] = new useState("");
    const[AdditionalNo,setAdditionalNo] = new useState("");
    const[Pincode,setPincode] = new useState("");
    const[WardId,setWardId]=new useState("");
    const[ContactsCount,setContactsCount] = new useState("");

    const [data,setData] = new useState([])

    const getdata = async () => {
        try {
         const token=   localStorage.getItem("token")
           
            const config = {

                headers: {
                    Authorization: `Bearer ${token}`
                }

            };
   
            const response = await axios.get("https://api.dev.piggybank.reontel.com/api/v1/member/profile", config);
            console.log("response",response);
            setFullName(response.data.data.FullName);
            setEducation(response.data.data.Education.education_name)
            setGender(response.data.data.Gender.gender_name)
            setProfession(response.data.data.Profession.profession_name)
            setPhoneNumber(response.data.data.PhoneNumber)
            setRole(response.data.data.Role.role_name)
            setImage(response.data.data.Profile.path)
            setLocalBody(response.data.data.LocalBody.localbody_type_name )
            setDOB(response.data.data.user_dob)
            setcnCode(response.data.data.user_additional_number_cn_code)
            setAdditionalNo(response.data.data.user_additional_number)
            setPincode(response.data.data.Location.pincode_number)
            setWardId(response.data.data.user_ward_id)
            setContactsCount(response.data.data.user_contacts_count)
            setLoading(false)

        } catch (error) {
            navigate("/")
        }
    };
   
    useEffect(()=>{getdata()},[])

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
        } else {
            getdata();
        }
    });

    const handleLogout = () => {
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("token")
        console.log("Stored refreshToken:", localStorage.getItem("refreshToken"));
        console.log("Stored token: ",localStorage.getItem("token"))
        navigate("/")
    };

    if (loading){
        return <div>Loading...</div>
    }

    const updateHandle = () => {
        navigate("/update")
    }

    return (

        <div>

            <div class="custom-div"></div>

            <h1><b><center>MY PROFILE</center></b></h1>

            <div className="container custom-container">
                <div className="row">
                <div className="col col-12 col-sm-9 col-md-9 col-lg-9 col-xl-9 col-xx-9">
                    <table>
                        <tr>
                            <td>Full Name </td>
                            <td>: {FullName}</td>
                        </tr>
                        <tr>
                            <td>Date of birth </td>
                            <td>: {DOB}</td>
                        </tr>
                        <tr>
                            <td>Gender</td>
                            <td>:{Gender}</td>
                        </tr>
                        <tr>
                            <td>Education   </td>
                            <td>: {Education}</td>
                        </tr>
                        <tr>
                            <td>Profession </td>
                            <td>: {Profession}</td>
                        </tr>
                        <tr>
                            <td>Role</td>
                            <td>: {Role}</td></tr>
                       
                        <tr>
                            <td>PhoneNo</td>
                            <td>:{PhoneNumber}</td>
                        </tr>
                        <tr>
                            <td>Additional PhoneNo</td>
                            <td>:{AdditionalNo}</td>
                        </tr>
                        <tr>
                            <td>Additional number cn_code</td>
                            <td>:{cnCode}</td>
                        </tr>
                        <tr>
                            <td>Contacts Cound</td>
                            <td>:{ContactsCount}</td>
                        </tr>
                        <tr>
                            <td>Local body</td>
                            <td>:{LocalBody}</td>
                        </tr>
                        <tr>
                            <td>Pincode</td>
                            <td>:{Pincode}</td>
                        </tr>
                        <tr>
                            <td>Ward Id</td>
                            <td>:{WardId}</td>
                        </tr>
                    </table>
                </div>

                    <div className="col col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xx-3">
                          <center>
                            <img src={Image} alt="" />
                          </center>
                    </div>
                </div>

                <div className="row g-3">
            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                <center>
                    <button className="btn btn-success" onClick={handleLogout}>Log Out</button>
                    <button className="btn btn-success" onClick={updateHandle} >Update</button>
                </center>
            </div>

            </div>

           
            </div>
        </div>
    );
};

export default Profile;