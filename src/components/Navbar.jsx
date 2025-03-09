import React from 'react';
import { FaHome, FaUtensils, FaInfoCircle, FaBookOpen, FaPlusCircle, FaBookmark, FaUserCircle } from 'react-icons/fa';

const Navbar = ({ username, setUsername }) => {
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("userId"); // Ensure userId is also cleared
    setUsername("");
    window.location.href = "/"; // Redirect to the home page
  };
  

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#34495e" }}>
      <div className="container-fluid">
        
        <a className="navbar-brand d-flex align-items-center text-light" href="/">
          <FaBookOpen className="me-2 text-warning" size={24} /> Welcome
        </a>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarTogglerDemo01" 
          aria-controls="navbarTogglerDemo01" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-center" id="navbarTogglerDemo01">
          
          <ul className="navbar-nav mx-auto">
            <li className="nav-item"><a className="navbar-brand text-light" href="/"><FaHome className="me-2 text-warning" /> Home</a></li>
            <li className="nav-item"><a className="navbar-brand text-light" href="/menu"><FaUtensils className="me-2 text-danger" /> Menu</a></li>
            <li className="nav-item"><a className="navbar-brand text-light" href="/about-us"><FaInfoCircle className="me-2 text-primary" /> About Us</a></li>
            <li className="nav-item"><a className="navbar-brand text-light" href="/create-recipe"><FaPlusCircle className="me-2 text-success" /> Create Recipe</a></li>
            <li className="nav-item"><a className="navbar-brand text-light" href="/created-recipe"><FaBookmark className="me-2 text-warning" /> Saved Recipes</a></li>
          </ul>

          {username ? (
            <div className="d-flex align-items-center">
              <FaUserCircle className="text-light me-2" size={20} /> 
              <span className="text-light me-3">Hello, {username}!</span>
              <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div className="d-flex">
              <a className="btn btn-success me-2" href="/login">Login</a>
              <a className="btn btn-primary" href="/register">Register</a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
