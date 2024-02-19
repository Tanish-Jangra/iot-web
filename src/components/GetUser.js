import React from 'react'
import {useEffect} from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const GetUser = () => {
    const navigate = useNavigate();
    const cookies = new Cookies();
   useEffect(()=>{
    console.log(`Bearer ${cookies.get('Authorization')}`);
    axios.get('https://iot.mrmprocom.com/php-auth-api/getUser.php', {
      withCredentials: true,
    },
    ).then(function(response){
    console.log(response.data);
    navigate('/');
});
   },[]);
    return (

    <div>GetUser</div>
  )
}

export default GetUser