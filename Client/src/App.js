import React  from "react";
import {Route,Routes} from 'react-router-dom'
import Register from './Components/loginPage/Register'
import Login from "./Components/loginPage/Login";
import Home from "./Components/HomePage/Home";
import WriteStory from "./Components/WriteStory/WriteStory";
import Mystory from "./Components/MyStory/Mystory";
import Publish from "./Components/PublishStory/Publish";
import InfoSection from "./Components/InfoSection/InfoSection";
import AllStory from "./Components/AllStory/AllStory";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/login" element={ <Login/> } />
        <Route path="/Register" element={ <Register/> } />
        <Route path="/WriteStory" element={ <WriteStory/> } />
        <Route path="/MyStory" element={ <Mystory/> } />
        <Route path="/Publish" element={ <Publish/> } />
        <Route path="/InfoSection" element={ <InfoSection/> } />
        <Route path="/AllStory" element={ <AllStory/> } />
      </Routes>
    </div>
       
  );
}

export default App;
