import { useState } from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import Login from './Components/Login/Login'
import SignUp from './Components/Signup/Signup';
import Home from './Components/Home/Home';

function App() {
 return(
              <BrowserRouter>
                          <Routes>
                            <Route path="/" Component={Home}/>
                            <Route path="/login" Component={Login}/>
                            <Route path='/signup' Component={SignUp}/>


                          </Routes>
              </BrowserRouter>
 )
}

export default App
