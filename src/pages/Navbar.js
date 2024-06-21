import { NavLink } from 'react-router-dom';
import "./Navbar.css";
import icon1 from './images/icon1.png';
import { useNavigate} from 'react-router-dom';

function Navbar() {
const Navigate= useNavigate();
  const handleLogout = () => {
      localStorage.clear(); // or use a more secure method
      Navigate('/login')
   
  };
  const userID =localStorage.getItem('userId');
 

  return (
    <div className='navbarr'>
      <ul style={{ listStyleType: 'none' }}>
        <li>
          <NavLink className="NavLink" to="/" ><img src={icon1} alt="logo" /></NavLink>
        </li>
      </ul>
      <ul style={{ listStyleType: 'none', marginTop: '1px', fontSize: '28px' }}>
        <li>
          <NavLink to="/" activeclassname="Activee" className="NavLink">Home</NavLink>
        </li>
      </ul>
      <ul style={{ listStyleType: 'none', marginTop: '3px' }}>
        {userID ? (
          <li>
            <button className='button' onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <li>
            <NavLink to="/login">
              <button className='button'>Login/Register</button>
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
