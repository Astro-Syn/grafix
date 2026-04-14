import { Routes, Route } from "react-router-dom";
import Dashboard from './pages/dashboard/Dashboard';
import BoardPage from './pages/boardpage/BoardPage';
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import './App.css';




function App() {
 

  return (
    <Routes>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/board/:id" element={<BoardPage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      
    </Routes>
  )
}

export default App
