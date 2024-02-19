import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import Actions from './components/Actions';
import Graphs from './components/Graphs';
import Connect from './components/Connect';
import CreateUser from './components/CreateUser';
import LoginUser from './components/LoginUser';
import GetUser from './components/GetUser';
import SignupUser from './components/SignupUser';
import SavedDevices from './components/SavedDevices';
import SelectGraphs from './components/SelectGraphs';
import St from "./components/stt/St"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Router>
        <div className="pages">
          <Routes>
            <Route path="/" element={<LoginUser />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<St />} />
            <Route path="/actions" element={<Actions />} />
            <Route path="/graphs/create" element={<Graphs />} />
            <Route path="/user/create" element={<CreateUser />}/>
            <Route path="/connect" element={<Connect />}/>
            <Route path="/user" element={<GetUser />}/>
            <Route path="/signup" element={<SignupUser />}/>
            <Route path="/devices" element={<SavedDevices />}/>
            <Route path="/graphs" element={<SelectGraphs />}/>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
  </>
  );
}

export default App;