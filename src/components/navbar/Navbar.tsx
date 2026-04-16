import LogoutButton from "../logout-btn/LogoutButton";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";
import Navbar2 from "../navbar2/Navbar2";

export default function Navbar() {
    const { user } = useAuth();

    return (
        <nav className='nav-wrapper'>
            <span>Git Link</span>

            <div className='main-words-container'>
             <h2 className='title'>Grafix</h2>
                <p>Create your own inspiration</p>
            </div>

            <Navbar2 />
           
            <div className='user-logout-wrapper'>
                {user && (
                    <>
                    <span className='user-email'>
                    {user.email}
                    </span>
                    <LogoutButton/>
                    </>
                )}
            </div>
            
        </nav>
    )
}