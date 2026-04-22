import "./Navbar2.css";
import { LuClipboard } from "react-icons/lu";
import { Link } from "react-router-dom";


export default function Navbar2() {
    return (
        <div className='navbar2-wrapper'>
            <h2>Grafix</h2>
           <div className="nav-button-wrapper">
  <Link to="/dashboard">
    <LuClipboard size={28} />
    <p>My Boards</p>
  </Link>
</div>
        </div>
    )
}