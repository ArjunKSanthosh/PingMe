import { useState } from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import Login from './Components/Login/Login'
import SignUp from './Components/Signup/Signup';
import Home from './Components/Home/Home';
import ChatCard from './Components/Chatcard/Chatcard';
import Listpeople from './Components/Listpeople/Listpeople';
import Profile from './Components/Profile/Profile';
import ForgotPass from './Components/ForgotPass/Forgotpass';
import NewPassword from './Components/Newpassword/Newpass';
import RecProfile from './Components/RecProfile/RecProfil';

function App() {
 return(
              <BrowserRouter>
                  
                          <Routes>
                            <Route path="/" Component={Home}/>
                            <Route path="/login" Component={Login}/>
                            <Route path='/signup' Component={SignUp}/>
                            <Route path='/chatcard/:id' Component={ChatCard}/>
                            <Route path='/listpeople' Component={Listpeople}/>
                            <Route path='/profile' Component={Profile}/>
                            <Route path='/forgotpassword' Component={ForgotPass}/>
                            <Route path='/newpassword' Component={NewPassword}/>
                            <Route path='/recprofile' Component={RecProfile}/>


                          </Routes>
              </BrowserRouter>
 )
}

export default App
