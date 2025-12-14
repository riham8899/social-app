import React, { useContext } from 'react'

import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../Context/AuthContext';
import AddPost from '../AddPost/AddPost';



export const Navbar = () => {

  const { token, logout: contextLogout } = useContext(authContext);
  const Navigate = useNavigate()

  function logout() {

    contextLogout();

    Navigate("/login")
  }
  return (
    <>
      <div className=" px-16 navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl text-blue-600 dark:text-white" >Linked Post</Link>
        </div>
        <div className="flex gap-2">
          {token ?  <div> <AddPost />  <div className="ms-4 dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
              
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li><Link to="/profile" className="justify-between">
                Profile

              </Link></li>
              <li><button onClick={logout}>Logout</button></li>
            </ul>
          </div> </div> 
              : <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>< Link to="/register" className="justify-between">
                Register

              </Link></li>
              <li>

                <Link to="/login">Login</Link>


              </li>
            </ul>
          </div>}



        </div>
      </div>
    </>
  )
}
