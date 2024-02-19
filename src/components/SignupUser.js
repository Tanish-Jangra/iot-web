import React from "react";
import { useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './SignupUser.css'
import avatar from './../assets/login.png'
import wave from './../assets/wavessss.png'


const SignupUser = () => {

  const navigate = useNavigate();
  const [inputs, setInputs] = useState([]);
  
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    // axios.post('https://iot.mrmprocom.com/api/user/save', inputs).then(function(response){
    axios
      .post("https://iot.mrmprocom.com/php-auth-api/register.php", inputs)
      .then(function (response) {
        console.log(response.data);
        navigate("/");
      });
  };

  return (
    <div className="main-container">
    <img className="wave" src={wave} />
    <div className="container">
      <div className="img">
        {/* <img src={bg} alt="Background" /> */}
      </div>
      <div className="login-content">
        <form onSubmit={handleSubmit}>
          <img src={avatar} alt="Avatar" />
          <h2 className="title">Sign up</h2>

          <div className="input-div one">
            <div className="i">
              <i className="fas fa-user"></i>
            </div>
            <div className="div">
              
              <input required type="text" name="name" className="input" placeholder="Enter name" onChange={handleChange} />
            </div>
          </div>


          <div className="input-div one">
            <div className="i">
              <i className="fas fa-user"></i>
            </div>
            <div className="div">
              
              <input required type="email" name="email" className="input" placeholder="Enter email" onChange={handleChange} />
            </div>
          </div>
          <div className="input-div pass">
            <div className="i">
              <i className="fas fa-lock"></i>
            </div>
            <div className="div">
              
               <input required type="password" name="password" placeholder="Enter password" onChange={handleChange} />            
            </div>
          </div>
          <button className="btn">Submit</button>
          Already have an account ?
          <button onClick={()=>{navigate('/');}}>Sign In</button>
        </form>
      </div>
    </div>
  </div>
  )
}

export default SignupUser