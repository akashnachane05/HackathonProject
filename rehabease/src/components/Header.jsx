import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HandHeart } from 'lucide-react';

function Header() {
  const location = useLocation();

  // Define routes for roles
  const patientRoutes = [
    '/patient/dashboard',
    '/exercise',
    '/video-tutorials',
    '/appointments',
    '/patient-progress',
    '/patients/profile',
  ];
  const therapistRoutes = [
    '/therapist/dashboard',
    '/create-exercise-plan',
    '/patient-progress',
    '/therapist/profile',
  ];

  // Determine the role based on the current route
  const isPatient = patientRoutes.includes(location.pathname);
  const isTherapist = therapistRoutes.includes(location.pathname);
  const isLoggedIn = isPatient || isTherapist;

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove the token from localStorage
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <header className="border-b bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <HandHeart className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-gray-900">RehabEase</span>
        </Link>

        {/* Navigation */}
        <nav>
          <ul className="flex space-x-8">
            <li>
              <Link to="/about" className="text-gray-600 hover:text-blue-600">
                About
              </Link>
            </li>
            <li>
              <Link to="/services" className="text-gray-600 hover:text-blue-600">
                Services
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-600 hover:text-blue-600">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Conditional Buttons */}
        <div className="flex space-x-4 items-center">
          {isLoggedIn ? (
            <>
              {isPatient && (
                <Link to="/patients/profile" className="text-gray-600 hover:text-blue-600">
                  My Account (Patient)
                </Link>
              )}
              {isTherapist && (
                <Link to="/therapist/profile" className="text-gray-600 hover:text-blue-600">
                  My Account (Therapist)
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              {/* Log In Dropdown */}
              <div className="relative group">
                <button className="text-gray-600 hover:text-blue-600">
                  Log In
                </button>
                <div className="absolute hidden group-hover:block mt-2 bg-white border border-gray-200 rounded shadow-lg z-10">
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                  >
                    Patient
                  </Link>
                  <Link
                    to="/therapist/login"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                  >
                    Therapist
                  </Link>
                </div>
              </div>

              {/* Sign Up Dropdown */}
              <div className="relative group">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Sign Up
                </button>
                <div className="absolute hidden group-hover:block mt-2 bg-white border border-gray-200 rounded shadow-lg z-10">
                  <Link
                    to="/register"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                  >
                     Patient
                  </Link>
                  <Link
                    to="/therapist/register"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                  >
                    Therapist
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
