import "./Navbar2.css";
import { LuClipboard } from "react-icons/lu";
import { Link } from "react-router-dom";


export default function Navbar2() {
    return (
        <div className='navbar2-wrapper'>
            Navbar 2 (menu)
            <div className='nav-button-wrapper'>
            <Link to={'/dashboard'}>
            <LuClipboard color={'white'} size={50}/>
            <p> My Boards</p>
            </Link>
            </div>
        </div>
    )
}