import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../app/store/features/user/userSlice';
import { RootState, AppDispatch } from '../app/store/store';
// import appLogo from "../assets/stlogo.png";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const dispatch: AppDispatch = useDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const getedUser = useSelector((state: RootState) => state.userProfileData);

  useEffect(() => setUser(getedUser), [getedUser]);

  const isLoggedIn = Boolean(user && user.name);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  // Close mobile menu after link click
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    navigate("/login")
    window.location.reload();
  }


  
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-800 shadow-md sticky top-0 z-50 p-1">
      <div className="max-w-screen-xl mx-auto p-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="font-bold text-gray-900 dark:text-white">Skill</span>
          <span className="font-extrabold text-blue-600 dark:text-blue-400">Track</span>
          {/* <img src={appLogo} alt="SkillTrack" className='w-28' /> */}
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-500">
            Home
          </Link>
          <Link to="/courses" className="text-gray-700 hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-500">
            Courses
          </Link>
          <Link to="/instructors" className="text-gray-700 hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-500">
            Instructors
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-500">
            About
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-500">
            Contact
          </Link>
          {user && user.role === 'instructor' && (
            <Link to={'/AddCourse'} className="text-gray-700 hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-500" >AddCourse</Link>
          )}

          {/* Profile/Account Dropdown */}
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex items-center text-sm font-medium text-gray-800 dark:text-white focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              >
                <span className="mr-2">{user.name}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg dark:bg-gray-700">
                  <Link to="/user/profile" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                    Profile
                  </Link>
                  <button onClick={() => handleLogout()} className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/signup" className="text-gray-700 hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-500">
              Sign Up
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-white dark:bg-gray-800`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link to="/" onClick={handleLinkClick} className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
            Home
          </Link>
          <Link to="/courses" onClick={handleLinkClick} className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
            Courses
          </Link>
          <Link to="/instructors" onClick={handleLinkClick} className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
            Instructors
          </Link>
          <Link to="/about" onClick={handleLinkClick} className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
            About
          </Link>
          <Link to="/contact" onClick={handleLinkClick} className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
            Contact
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/user/profile" onClick={handleLinkClick} className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                Profile
              </Link>
              <Link to="/logout" onClick={handleLinkClick} className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                Logout
              </Link>
            </>
          ) : (
            <Link to="/signup" onClick={handleLinkClick} className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
              Sign Up
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
