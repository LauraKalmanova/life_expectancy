import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';


export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  useEffect(() => {
    // Check if user is logged in (for example, by checking localStorage)
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists
  }, []);

  const handleLogout = () => {
    // Handle logout logic (clear localStorage, reset state, etc.)
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };


  return (
    <header className="bg-primary text-primary-foreground py-4 px-6 shadow">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          Espérance de vie en France
        </Link>
        
        <div className="space-x-4">
        {!isLoggedIn ? (
            <>
              <Link to="/signup" className="hover:text-primary-foreground/80">
                S'inscrire
              </Link>
              <Link to="/login" className="hover:text-primary-foreground/80">
                Se connecter
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="hover:text-primary-foreground/80 focus:outline-none"
            >
              Se déconnecter
            </button>
          )}
        </div>
      </div>
    </header>
  )
};
