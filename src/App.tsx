import { Routes, Route } from "react-router-dom";
import Dashboard from './pages/dashboard/Dashboard';
import BoardPage from './pages/boardpage/BoardPage';
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import './App.css';
import Layout from "./components/layout/Layout";
import LayoutStart from "./components/layout/layout-start/LayoutStart";




function App() {
 

  return (
    <Routes>
      <Route path="/" 
      element={
      <ProtectedRoute>
        <Layout>
          <Dashboard/>
        </Layout>
        
        </ProtectedRoute>}/>

      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Layout>
            <Dashboard />
          </Layout>
        
        </ProtectedRoute>} />

      <Route path="/board/:id" element={
        <ProtectedRoute>
          <Layout>
          <BoardPage/>
          </Layout>
          </ProtectedRoute>}/>


      <Route path='/login' element={
        <LayoutStart>
          <Login/>
        </LayoutStart>
        
        }/>
      <Route path='/signup' element={
        <LayoutStart>
          <Signup/>
        </LayoutStart>
        
        }/>
      
    </Routes>
  )
}

export default App
