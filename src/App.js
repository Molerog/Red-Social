import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import 'antd/dist/antd.min.css';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Home from './components/Home/Home';
import PostDetail from './components/Home/Posts/PostDetail/PostDetail';
import Search from './components/Search/Search';
import Admin from './components/Admin/Admin';
import Users from './components/Users/Users';
import Header from './components/Header/Header';
import SearchUser from './components/SearchUser/SearchUser';





function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
      <Navbar />
      <Routes>
      <Route path= '/register' element={<Register />} />
      <Route path= '/login' element={<Login />} />
      <Route path= '/profile' element={<Profile />} />
      <Route path= '/home' element={<Home />} />
      <Route path= '/posts/id/:_id' element={<PostDetail />} />
      <Route path= '/search/:title' element={<Search />} />
      <Route path= '/admin' element={<Admin />} />
      <Route path= '/users' element= {<Users />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
