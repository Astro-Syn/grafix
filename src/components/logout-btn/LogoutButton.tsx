import { useAuth } from "../../context/AuthContext";
import "./LogoutButton.css";

export default function LogoutButton(){
    const { logout } = useAuth();
    return (
        <div className='logout-btn-wrapper'>
             <button 
        className='logout-btn'
        onClick={logout}>
            Logout
        </button>
        </div>
       
    )
}