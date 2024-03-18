import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Update = () => {

    const[Image,setImage]=new useState("")
    const[Gender,setGender]=new useState("");
    const[GenderId,setGenderId]=new useState("");
    const[cnCode,setcnCode] = new useState("");
    const[AdditionalNo,setAdditionalNo] = new useState("");
    const[Pincode,setPincode] = new useState("");
    const[PincodeId,setPincodeId] = new useState("");
    const[WardId,setWardId]=new useState("");
    const[LocalBody,setLocalBody] = new useState("");
    const[LocalBodyId,setLocalBodyId] = new useState("");
    const[Education,setEducation] = new useState("");
    const[EducationId,setEducationId] = new useState("");
    const[Profession,setProfession]=new useState("");
    const[ProfessionId,setProfessionId]=new useState("");
    const[ContactsCount,setContactsCount] = new useState("");
    const[DOB,setDOB]= new useState("");

    const [professions, setProfessions] = new useState([]);
    const[genders,setGenders]= new useState([]);
    const[localbodies,setlocalbodies]= new useState([]);
    const[educations,seteducations]= new useState([]);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("token")
        console.log("Stored refreshToken:", localStorage.getItem("refreshToken"));
        console.log("Stored token: ",localStorage.getItem("token"))
        navigate("/")
    };

    useEffect(() => {
        const getdata = async () => {
            try {
                const token = localStorage.getItem("token")
           
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
                const response = await axios.get("https://api.dev.piggybank.reontel.com/api/v1/member/profile", config);
                console.log("response",response);

                setImage(response.data.data.Profile.path)
                setGender(response.data.data.Gender.gender_name)
                setGenderId(response.data.data.Gender.gender_id)
                setcnCode(response.data.data.user_additional_number_cn_code)
                setAdditionalNo(response.data.data.user_additional_number)
                setPincode(response.data.data.Location.pincode_number)
                setPincodeId(response.data.data.Location.pincode_id)
                setWardId(response.data.data.user_ward_id)
                setLocalBody(response.data.data. LocalBody.localbody_type_name )
                setLocalBodyId(response.data.data.LocalBody.localbody_type_id)
                setEducation(response.data.data.Education.education_name)
                setEducationId(response.data.data.Education.education_id)                
                setProfession(response.data.data.Profession.profession_name)
                setProfessionId(response.data.data.Profession.profession_id)
                setContactsCount(response.data.data.user_contacts_count)
                setDOB(response.data.data.user_dob)

                const professionsResponse = await axios.get("https://api.dev.piggybank.reontel.com/api/v1/master/professions");
                const professionOptions = professionsResponse.data.data;
                setProfessions(professionOptions);

                const gendersresponse = await axios.get("https://api.dev.piggybank.reontel.com/api/v1/master/gender");
                const gendersOptions  = gendersresponse.data.data;
                setGenders(gendersOptions);

                const localbodiesresponse = await axios.get("https://api.dev.piggybank.reontel.com/api/v1/master/localbodytypes");
                const localbodiesOptions  = localbodiesresponse.data.data;
                setlocalbodies(localbodiesOptions);

                const educationsresponse = await axios.get("https://api.dev.piggybank.reontel.com/api/v1/master/education");
                const educationsOptions  = educationsresponse.data.data;
                seteducations(educationsOptions);


            } catch (error) {
                alert("Error")
            }
        };    
        getdata();
    }, []);
     

   
    const updateProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            console.log(token)
            const data = {
                user_profile_image:Image,
                user_dob:DOB,
                user_gender_id: GenderId,
                user_additional_number_cn_code:cnCode,
                user_additional_number:AdditionalNo,
                user_pincode_id:PincodeId,
                user_ward_id:WardId,
                user_local_body_type_id:LocalBodyId,
                user_local_body_name:LocalBody,
                user_highest_education_id:EducationId,
                user_profession_id:ProfessionId,
                user_contacts_count:ContactsCount
            };
            console.log(data)
            const response=await axios.patch("https://api.dev.piggybank.reontel.com/api/v1/member/profile", data, config);
            console.log("Response:", response.data);
            console.log("Profile updated successfully");
            alert("Profile updated successfully")
        } catch (error) {
            alert("Error ");
        }
    };

  return (
    <div>
        <div className="container">
            <div className="row">
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">

                    <div className="row g-3">

                        <h1><center><b>UPDATE YOUR PROFILE</b></center></h1>
                       
                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                            <label htmlFor="Image" className="form-label">Image</label>
                            <img src={Image} alt="Profile" style={{ width: "10%", height: "auto" }} />
                            <input type="text" id="Image" className="form-control"  onChange={(event) => {setImage(event.target.value)}}/>
                        </div>
                        </div>

                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                            <label htmlFor="" className="form-label">Date of birth</label>
                            <input type="date" className="form-control" value={DOB} onChange={(event) => setDOB(event.target.value)} />
                        </div>

                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                            <label htmlFor="" className="form-label">Ward Id</label>
                            <input type="text" className="form-control" name='WardId' value={WardId} onChange={(event) => setWardId(event.target.value)} />
                        </div>

                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                            <label htmlFor="" className="form-label">Gender</label>
                                <select name="Gender" id="Gender" className="form-control" value={Gender} onChange={(event) => {
                                    const selectedGenderName = event.target.value;
                                        setGender(selectedGenderName);
                                        const selectedGender = genders.find(gender => gender.gender_name === selectedGenderName);
                                        if (selectedGender) {
                                            setGenderId(selectedGender.gender_id);
                                        }
                                }}>
                                    {genders.map((gender) => (
                                    <option key={gender.gender_id} value={gender.gender_name}>{gender.gender_name}</option>
                                    ))}
                                </select>
                        </div>

                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                            <label htmlFor="" className="form-label">Gender Id</label>
                            <input type="text" className="form-control" name='GenderId' value={GenderId} onChange={(event) => setGenderId(event.target.value)} />
                        </div>

                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                            <label htmlFor="" className="form-label">Additional number cn_code</label>
                            <input type="text" className="form-control" name='cnCode' value={cnCode} onChange={(event) => setcnCode(event.target.value)} />
                        </div>

                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                            <label htmlFor="" className="form-label">Additional number</label>
                            <input type="text" className="form-control" name='AdditionalNo' value={AdditionalNo} onChange={(event) => setAdditionalNo(event.target.value)} />
                        </div>

                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                            <label htmlFor="" className="form-label">Pincode</label>
                            <input type="text" className="form-control" name='Pincode' value={Pincode} onChange={async (event) => {
                                const enteredPincode = event.target.value;
                                setPincode(enteredPincode);
                                try {
                                    const response = await axios.get(`https://api.dev.piggybank.reontel.com/api/v1/master/pincode/${enteredPincode}`);
                                    const pincodeId = response.data.data.pincode_id;
                                    setPincodeId(pincodeId);
                                } catch (error) {
                                    console.error("Error fetching pincode ID:", error);
                                    }
                                }} />
                        </div>

                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                            <label htmlFor="" className="form-label">Pincode Id</label>
                            <input type="text" className="form-control" name='PincodeId' value={PincodeId} onChange={(event) => setPincodeId(event.target.value)} />
                        </div>

                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                            <label htmlFor="" className="form-label">Local body:</label>
                            <select name="LocalBody" id="LocalBody" className="form-control" value={LocalBody} onChange={(event)=>{
                                const selectedLocalBody = event.target.value;
                                setLocalBody(selectedLocalBody);
                                const selectedlocalbody = localbodies.find(localbody => localbody.localbody_type_name === selectedLocalBody);
                                if(selectedlocalbody){
                                    setLocalBodyId(selectedlocalbody.localbody_type_id);
                                }
                                }}>
                                {
                                    localbodies.map((localbody)=>(
                                        <option key={localbody.id} value={localbody.localbody_type_name}>{localbody.localbody_type_name}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                            <label htmlFor="" className="form-label">Local body Id</label>
                            <input type="text" className="form-control" name='LocalBodyId' value={LocalBodyId} onChange={(event) => setLocalBodyId(event.target.value)} />
                        </div>

                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                            <label htmlFor="" className="form-label">Education</label>
                            <select name="Education" id="Education" className="form-control" value={Education} onChange={(event)=>{
                                const selectedEducation = event.target.value;
                                setEducation(selectedEducation)
                                const selecteducation = educations.find(education => education.education_name === selectedEducation)
                                if(selecteducation){
                                    setEducationId(selecteducation.education_id);
                                }
                                }}>
                                {educations.map((education)=>(
                                        <option key={education.id} value={education.education_name}>{education.education_name}</option>
                                ))}                                
                            </select>
                        </div>

                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                            <label htmlFor="" className="form-label">Education Id</label>
                            <input type="text" className="form-control" name='WardId' value={EducationId} onChange={(event) => setEducationId(event.target.value)} />
                        </div>

                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                            <label htmlFor="profession" className="form-label">Profession</label>
                            <select name="Profession" id="Profession" className="form-control" value={Profession} onChange={(event) => {
                                const selectedProfession = event.target.value;
                                setProfession(selectedProfession)
                                const selectprofession = professions.find(profession => profession.profession_name === selectedProfession)
                                if(selectprofession){
                                    setProfessionId(selectprofession.profession_id);
                                }
                                }}>
                                {professions.map((profession) => (
                                    <option key={profession.id} value={profession.profession_name}>{profession.profession_name}</option>
                                ))}
                            </select>                      
                        </div>

                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                            <label htmlFor="" className="form-label">Profession Id</label>
                            <input type="text" className="form-control" name='WardId' value={ProfessionId} onChange={(event) => setProfessionId(event.target.value)} />
                        </div>                        

                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                            <label htmlFor="" className="form-label">Contact counts</label>
                            <input type="text" className="form-control" name='WardId' value={ContactsCount} onChange={(event) => setContactsCount(event.target.value)} />
                        </div>                        

                       

                       

                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 co-xxl-12">
                            <div className="row">
                                <div className="col col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                                    <center> <button className="btn btn-info mb-2 mb-sm-0" onClick={handleLogout}>Log Out</button></center>
                                </div>
                                <div className="col col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                                    <center><button className="btn btn-info" onClick={updateProfile}>Update</button></center>
                                </div>
                                <div className="col col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                                    <center><button className="btn btn-info" onClick={() => (navigate("/profile"))}> Go To Profile</button></center>
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

export default Update