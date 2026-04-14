import LogoutButton from "../logout-btn/LogoutButton";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
    const { user } = useAuth();

    return (
        <nav className='nav-wrapper'>
            <h2>Grafix</h2>

            <div>
                {user && (
                    <>
                    <span>
                    {user.email}
                    </span>
                    <LogoutButton/>
                    </>
                )}
            </div>
            
        </nav>
    )
}