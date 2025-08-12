import React, {useState } from 'react';
import Homepage from './js-files/homepage';
//import Mainpage from './js-files/mainpage';

import './App.css';
import {BrowserRouter as Router, Routes, Route,Navigate} from "react-router-dom";
import Dashboard from './js-files/dashboard';
function App() 
{
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleFormSubmission = () => {
    setIsFormSubmitted(true);
    console.log("Form was submitted in Homepage!(app)");
  };
  return (
    <Router>
    <div className="App">
    <Routes>
          {/* Render Homepage on the root path */}
          <Route 
            path="/" 
            element={
              isFormSubmitted ? <Navigate to="/dashboard" replace /> : <Homepage onFormSubmit={handleFormSubmission} />
            } 
          />
          {/* Render Mainpage on /mainpage path and Dashboard on /dashboard part */}
          {/*<Route path="/mainpage" element={<Mainpage />} />*/}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

    {/*<Homepage onFormSubmit={handleFormSubmission}/>
    <Mainpage/>

        <Routes>
            <Route path='./js-files/homepage' onFormSubmit={handleFormSubmission} element={<Homepage/>}/>
            <Route path='./js-files/mainpage' element={<Mainpage/>}/>
        </Routes>*/}
    </div>
    </Router>
  );
}
export default App;