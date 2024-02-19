import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
// import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import "./LoginUser.css";
import avatar from "./../assets/login.png";
import wave from "./../assets/wavessss.png";

const LoginUser = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    axios
      .get("https://iot.mrmprocom.com/php-auth-api/getUser.php", {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response);
        if (response.data.success !== 0) {
          navigate("/connect");
        }
      }).catch((error) => {
        console.log("Error: ", error);
      });
      
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    // axios.post('https://iot.mrmprocom.com/api/user/save', inputs).then(function(response){
    axios
      .post("https://iot.mrmprocom.com/php-auth-api/login.php", inputs, {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response.data);
        // const cookies=new Cookies();
        // cookies.set("Authorization",response.data.token,{
        //     maxAge:555
        // });
        if(response.data.success===0){
          setErrorMessage(response.data.message);
        }else{
        navigate("/connect");
        }
      }).catch((error) => {
        setErrorMessage(error.message);
      });
  };
  return (
    <div className="main-container">
      <img className="wave" src={wave} />
      <div className="container">
        <div className="img">
        </div>
        <div className="login-content">
          
          <form onSubmit={handleSubmit}>
            <img src={avatar} alt="Avatar" />
            
            {errorMessage && <p className="error" style={{color:'red'}}> {errorMessage} </p>}

            <h2 className="title">Sign in</h2>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user" style={{color: 'black'}}></i>
              </div>
              <div className="div">
                <input
                  required
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Enter email"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock" style={{color: 'black'}}></i>
              </div>
              <div className="div">
                <input
                  required
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  onChange={handleChange}
                />
              </div>
            </div>
            <button className="btn">Submit</button>
            Don't have an account ?
            <button
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;





































































































// import React from "react";
// import { useState, useEffect } from "react";
// import axios from "axios";
// // import Cookies from "universal-cookie";
// import { useNavigate } from "react-router-dom";
// import "./LoginUser.css";
// import avatar from "./../assets/avatar.svg";
// import bg from "./../assets/bg.svg";
// import wave from "./../assets/wave.png";
// // import homeBanner from "./../assets/homeBanner.png";
// import loginscreenphoto from "./../assets/logo.png";

// const LoginUser = () => {
//   const navigate = useNavigate();
//   const [inputs, setInputs] = useState([]);
//   const [errorMessage, setErrorMessage] = useState("");
//   // useEffect(() => {
//   //   axios
//   //     .get("https://test.mrmprocom.com/php-auth-api/getUser.php", {
//   //       withCredentials: true,
//   //     })
//   //     .then(function (response) {
//   //       console.log(response);
//   //       if (response.data.success !== 0) {
//   //         navigate("/connect");
//   //       }
//   //     }).catch((error) => {});

//   // }, []);

//   const handleChange = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setInputs((values) => ({ ...values, [name]: value }));
//   };
//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // axios.post('https://iot.mrmprocom.com/api/user/save', inputs).then(function(response){
//     axios
//       .post("https://test.mrmprocom.com/php-auth-api/login.php", inputs, {
//         withCredentials: true,
//       })
//       .then(function (response) {
//         console.log(response.data);
//         // const cookies=new Cookies();
//         // cookies.set("Authorization",response.data.token,{
//         //     maxAge:555
//         // });
//         if(response.data.success===0){
//           setErrorMessage(response.data.message);
//         }else{
//         navigate("/connect");
//         }
//       }).catch((error) => {
//         setErrorMessage(error.message);
//       });
//   };
//   return (
//     <div className="main-container">
//       {/* <img className="wave" src={homeBanner} /> */}
//       <div className="container">
//         {/* <img className="wave" src={homeBanner} /> */}
//         <div className="img">
//           {/* <div className="product-name" >WELCOME TO PROCOM SMART DEVICES</div> */}
//           {/* <div className="product-name" >PROCOM SMART DEVICES</div> */}
//           {/* <img src={bg} alt="Background" /> */}
//           {/* <img src={loginscreenphoto} alt="Background" /> */}
//         </div>
//         <div className="login-content">
          
//           <form onSubmit={handleSubmit}>
//             <img src={avatar} alt="Avatar" />
            
//             {errorMessage && <p className="error" style={{color:'red'}}> {errorMessage} </p>}

//             <h2 className="title">Welcome</h2>
//             <div className="input-div one">
//               <div className="i">
//                 <i className="fas fa-user" style={{color: 'black'}}></i>
//               </div>
//               <div className="div">
//                 <input
//                   required
//                   type="email"
//                   name="email"
//                   className="input"
//                   placeholder="Enter email"
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>
//             <div className="input-div pass">
//               <div className="i">
//                 <i className="fas fa-lock" style={{color: 'black'}}></i>
//               </div>
//               <div className="div">
//                 <input
//                   required
//                   type="password"
//                   name="password"
//                   placeholder="Enter password"
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>
//             <button className="btn">Login</button>
//             Don't have an account ?
//             <button onClick={() => { navigate("/signup"); }}>
//               Sign Up
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginUser;

















































// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';  // Import useNavigate
// // import axios from 'axios';  // Import axios
// // import { ThemeProvider, CssBaseline, Container, Typography, TextField, Button, Link, Grid, Box } from '@mui/material';
// // import { createTheme } from '@mui/material/styles';
// // import logo from './../assets/logo.png';

// // // const customTheme = createTheme({
// // //   palette: {
// // //     primary: {
// // //       main: '#264796',
// // //     },
// // //     secondary: {
// // //       main: '#264796',
// // //     },
// // //     background: {
// // //       default: '#264796',
// // //     },
// // //   },
// // // });

// // const customTheme = createTheme({
// //   palette: {
// //     primary: {
// //       main: '#ffffff',
// //     },
// //     secondary: {
// //       main: '#ffffff',
// //     },
// //     background: {
// //       default: '#ffffff',
// //     },
// //   },
// // });

// // export default function SignIn() {
// //   const navigate = useNavigate();
// //   const [inputs, setInputs] = useState([]);
// //   const [errorMessage, setErrorMessage] = useState('');

// //   const handleChange = (event) => {
// //     const name = event.target.name;
// //     const value = event.target.value;
// //     setInputs((values) => ({ ...values, [name]: value }));
// //   };

// //   const handleSubmit = (event) => {
// //     event.preventDefault();

// //     axios
// //       .post("https://test.mrmprocom.com/php-auth-api/login.php", inputs, {
// //         withCredentials: true,
// //       })
// //       .then(function (response) {
// //         console.log(response.data);
// //         if (response.data.success === 0) {
// //           setErrorMessage(response.data.message);
// //         } else {
// //           navigate("/connect");
// //         }
// //       })
// //       .catch((error) => {
// //         setErrorMessage(error.message);
// //       });
// //   };

// //   return (
// //     <ThemeProvider theme={customTheme}>
// //       <Container component="main" maxWidth="xs" style={{ display: 'grid', placeItems: 'center', height: '100vh', background: '#f0f0f0' }}>
// //         <CssBaseline />
// //         <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
// //           <img
// //             src={logo}
// //             alt="Procom Smart Devices"
// //             style={{
// //               width: '20%',
// //               maxWidth: '200px',
// //               height: 'auto',
// //               display: 'block',
// //               margin: '0 auto 20px',
// //             }}
// //           />
// //           <Typography component="h1" variant="h5">
// //             PROCOM SMART DEVICES
// //           </Typography>
// //           <Typography component="h1" variant="h5">
// //             Sign In
// //           </Typography>
// //           {errorMessage && <p className="error" style={{ color: 'red' }}> {errorMessage} </p>}
// //           <form onSubmit={handleSubmit}>
// //             <TextField
// //               margin="normal"
// //               required
// //               fullWidth
// //               id="email"
// //               label="Email Address"
// //               name="email"
// //               autoComplete="email"
// //               autoFocus
// //               onChange={handleChange}
// //             />
// //             <TextField
// //               margin="normal"
// //               required
// //               fullWidth
// //               name="password"
// //               label="Password"
// //               type="password"
// //               autoComplete="current-password"
// //               onChange={handleChange}
// //             />
// //             <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
// //               Sign In
// //             </Button>
// //             <Grid container alignItems="center">
// //               <Grid item xs>
// //                 {/* Add forgot password link if needed */}
// //               </Grid>
// //               <Grid item>
// //                 Don't have an account?
// //                 <button onClick={() => { navigate("/signup"); }} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} style={{
// //                     color: '#f0f0f0',
// //                     backgroundColor: '#264796',
// //                     margin: '0 0',
// //                   }}>
// //                   Sign Up
// //                 </button>
// //                 {/* <Link href="/signup" variant="body2">
// //                   {"Sign Up"}
// //                 </Link> */}
// //               </Grid>
// //             </Grid>
// //           </form>
// //         </Box>
// //       </Container>
// //     </ThemeProvider>
// //   );
// // }



































































































// // import React from "react";
// // import { useState, useEffect } from "react";
// // import axios from "axios";
// // // import Cookies from "universal-cookie";
// // import { useNavigate } from "react-router-dom";
// // import "./LoginUser.css";
// // import avatar from "./../assets/avatar.svg";
// // import bg from "./../assets/bg.svg";
// // import wave from "./../assets/wave.png";
// // // import homeBanner from "./../assets/homeBanner.png";
// // import loginscreenphoto from "./../assets/logo.png";

// // const LoginUser = () => {
// //   const navigate = useNavigate();
// //   const [inputs, setInputs] = useState([]);
// //   const [errorMessage, setErrorMessage] = useState("");
// //   // useEffect(() => {
// //   //   axios
// //   //     .get("https://test.mrmprocom.com/php-auth-api/getUser.php", {
// //   //       withCredentials: true,
// //   //     })
// //   //     .then(function (response) {
// //   //       console.log(response);
// //   //       if (response.data.success !== 0) {
// //   //         navigate("/connect");
// //   //       }
// //   //     }).catch((error) => {});

// //   // }, []);

// //   const handleChange = (event) => {
// //     const name = event.target.name;
// //     const value = event.target.value;
// //     setInputs((values) => ({ ...values, [name]: value }));
// //   };
// //   const handleSubmit = (event) => {
// //     event.preventDefault();

// //     // axios.post('https://iot.mrmprocom.com/api/user/save', inputs).then(function(response){
// //     axios
// //       .post("https://test.mrmprocom.com/php-auth-api/login.php", inputs, {
// //         withCredentials: true,
// //       })
// //       .then(function (response) {
// //         console.log(response.data);
// //         // const cookies=new Cookies();
// //         // cookies.set("Authorization",response.data.token,{
// //         //     maxAge:555
// //         // });
// //         if(response.data.success===0){
// //           setErrorMessage(response.data.message);
// //         }else{
// //         navigate("/connect");
// //         }
// //       }).catch((error) => {
// //         setErrorMessage(error.message);
// //       });
// //   };
// //   return (
// //     <div className="main-container">
// //       {/* <img className="wave" src={homeBanner} /> */}
// //       <div className="container">
// //         {/* <img className="wave" src={homeBanner} /> */}
// //         <div className="img">
// //           {/* <div className="product-name" >WELCOME TO PROCOM SMART DEVICES</div> */}
// //           {/* <div className="product-name" >PROCOM SMART DEVICES</div> */}
// //           {/* <img src={bg} alt="Background" /> */}
// //           {/* <img src={loginscreenphoto} alt="Background" /> */}
// //         </div>
// //         <div className="login-content">
          
// //           <form onSubmit={handleSubmit}>
// //             <img src={avatar} alt="Avatar" />
            
// //             {errorMessage && <p className="error" style={{color:'red'}}> {errorMessage} </p>}

// //             <h2 className="title">Welcome</h2>
// //             <div className="input-div one">
// //               <div className="i">
// //                 <i className="fas fa-user" style={{color: 'black'}}></i>
// //               </div>
// //               <div className="div">
// //                 <input
// //                   required
// //                   type="email"
// //                   name="email"
// //                   className="input"
// //                   placeholder="Enter email"
// //                   onChange={handleChange}
// //                 />
// //               </div>
// //             </div>
// //             <div className="input-div pass">
// //               <div className="i">
// //                 <i className="fas fa-lock" style={{color: 'black'}}></i>
// //               </div>
// //               <div className="div">
// //                 <input
// //                   required
// //                   type="password"
// //                   name="password"
// //                   placeholder="Enter password"
// //                   onChange={handleChange}
// //                 />
// //               </div>
// //             </div>
// //             <button className="btn">Login</button>
// //             Don't have an account ?
// //             <button onClick={() => { navigate("/signup"); }}>
// //               Sign Up
// //             </button>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LoginUser;




// // import * as React from 'react';
// // import Avatar from '@mui/material/Avatar';
// // import Button from '@mui/material/Button';
// // import CssBaseline from '@mui/material/CssBaseline';
// // import TextField from '@mui/material/TextField';
// // import FormControlLabel from '@mui/material/FormControlLabel';
// // import Checkbox from '@mui/material/Checkbox';
// // import Link from '@mui/material/Link';
// // import Grid from '@mui/material/Grid';
// // import Box from '@mui/material/Box';
// // import logo from './../assets/logo.png'
// // import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// // import Typography from '@mui/material/Typography';
// // import Container from '@mui/material/Container';
// // import { createTheme, ThemeProvider } from '@mui/material/styles';

// // // function Copyright(props) {
// // //   return (
// // //     <Typography variant="body2" color="text.secondary" align="center" {...props}>
// // //       {'Copyright © '}
// // //       <Link color="inherit" href="https://test.mrmprocom.com/">
// // //         Your Website
// // //       </Link>{' '}
// // //       {new Date().getFullYear()}
// // //       {'.'}
// // //     </Typography>
// // //   );
// // // }

// // // TODO remove, this demo shouldn't need to reset the theme.

// // const defaultTheme = createTheme();

// // // Create a custom theme with your desired color changes
// // const customTheme = createTheme({
// //   palette: {
// //     primary: {
// //       main: '#264796', // Change this to your desired primary color
// //     },
// //     secondary: {
// //       main: '#264796', // Change this to your desired secondary color
// //     },
// //     background: {
// //       default: '#264796', // Change this to your desired default background color
// //     },
// //   },
// // });

// // export default function SignIn() {
// //   const handleSubmit = (event) => {
// //     event.preventDefault();
// //     const data = new FormData(event.currentTarget);
// //     console.log({
// //       email: data.get('email'),
// //       password: data.get('password'),
// //     });
// //   };

// //   return (
// //     // <ThemeProvider theme={defaultTheme}>
// //     <ThemeProvider theme={customTheme}>
      
// //       <Container component="main" maxWidth="xs" style={{
// //           display: 'grid',
// //           placeItems: 'center',
// //           height: '90vh',
// //           background: '#f0f0f0', // Replace with your desired background color or image
          
// //         }}>
// //         <CssBaseline />
// //         <Box
// //           sx={{
// //             marginTop: 8,
// //             display: 'flex',
// //             flexDirection: 'column',
// //             alignItems: 'center',
// //           }}
// //         >
// //           {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
// //             <logo />
// //           </Avatar> */}

// //           {/* <div class="logo-container">
// //               <img src="{logo}" alt="Procom Smart Devices" />
// //           </div> */}

// //           <img src={logo} alt="Procom Smart Devices"  style={{
// //                         width: '20%',
// //                         maxWidth: '200px',
// //                         height: 'auto',
// //                         display: 'block',
// //                         margin: '0 auto 20px'
// //                     }}/>

// //           <Typography component="h1" variant="h5">
// //             PROCOM SMART DEVICES
// //           </Typography>
// //           <Typography component="h1" variant="h5">
// //             Sign In
// //           </Typography>
// //           <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
// //             <TextField
// //               margin="normal"
// //               required
// //               fullWidth
// //               id="email"
// //               label="Email Address"
// //               name="email"
// //               autoComplete="email"
// //               autoFocus
// //             />
// //             <TextField
// //               margin="normal"
// //               required
// //               fullWidth
// //               name="password"
// //               label="Password"
// //               type="password"
// //               id="password"
// //               autoComplete="current-password"
// //             />
// //             {/* <FormControlLabel
// //               control={<Checkbox value="remember" color="primary" />}
// //               label="Remember me"
// //             /> */}
// //             <Button
// //               type="submit"
// //               fullWidth
// //               variant="contained"
// //               sx={{ mt: 3, mb: 2 }}
// //             >
// //               Sign In
// //             </Button>
// //             <Grid container>
// //               <Grid item xs>
// //                 {/* <Link href="#" variant="body2">
// //                   Forgot password?
// //                 </Link> */}
// //               </Grid>
// //               <Grid item>
// //               Don't have an account? 
// //                 <Link href="/signup" variant="body2">
// //                   {"Sign Up"}
// //                 </Link>
// //               </Grid>
// //             </Grid>
// //           </Box>
// //         </Box>
// //         {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
// //       </Container>
// //     </ThemeProvider>
// //   );
// // }