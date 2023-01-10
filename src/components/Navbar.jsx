import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  // const [isLogin, setIsLogin] = useState('Tushar')
  const adminPanel = "http://localhost:3000/adminUsers"

  const navigate = useNavigate()

  const handleClick = () =>{
    // setIsLogin('') 
    navigate('/')
  }
  return (
   
    <div className="navbar">
      <div className='logo-img'></div>
          <ul>
            <li>
             {window.location.href !== adminPanel ? 
             <Link to="/" className="link-text nav-link-text">
                Login
              </Link>
              :
              <span className="link-text nav-link-text">
                Tushar
              </span>
              }
            </li>
            <li>
              { window.location.href !== adminPanel ? 
              <Link to="/register" className="link-text nav-link-text">
                Register
              </Link>
              :
              <button  onClick={handleClick}  className="link-text nav-link-text">
              Logout
              </button>
            }
            </li>
          </ul>
        </div>

  )
}

export default Navbar
