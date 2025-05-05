
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { User, LogOut } from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="w-full bg-gradient-primary shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <span className="text-kumbh-blue font-bold text-xl">K</span>
          </div>
          <span className="text-white font-bold text-xl md:text-2xl">KUMBH-TS</span>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className={`text-white hover:text-opacity-80 transition-colors ${
              location.pathname === '/' ? 'font-semibold' : ''
            }`}
          >
            Home
          </Link>
          
          {user && (
            <>
              <Link 
                to="/journey" 
                className={`text-white hover:text-opacity-80 transition-colors ${
                  location.pathname.includes('/journey') ? 'font-semibold' : ''
                }`}
              >
                Plan Journey
              </Link>
              
              <Link 
                to="/dashboard" 
                className={`text-white hover:text-opacity-80 transition-colors ${
                  location.pathname.includes('/dashboard') ? 'font-semibold' : ''
                }`}
              >
                {user.role === 'admin' ? 'Admin Dashboard' : 'Dashboard'}
              </Link>
            </>
          )}
          
          <Link 
            to="/about" 
            className={`text-white hover:text-opacity-80 transition-colors ${
              location.pathname === '/about' ? 'font-semibold' : ''
            }`}
          >
            About
          </Link>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/profile">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white hover:bg-white/20 px-3"
                >
                  <User className="w-4 h-4 mr-2" />
                  {user.fullName.split(' ')[0]}
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-white/20 px-3"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="secondary" size="sm" className="bg-white text-kumbh-blue hover:bg-gray-100">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </nav>
        
        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-16 right-0 left-0 z-50 bg-white shadow-lg rounded-b-lg py-4 md:hidden">
            <div className="flex flex-col space-y-3 px-4">
              <Link 
                to="/" 
                className="px-3 py-2 hover:bg-gray-100 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              
              {user && (
                <>
                  <Link 
                    to="/journey" 
                    className="px-3 py-2 hover:bg-gray-100 rounded"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Plan Journey
                  </Link>
                  
                  <Link 
                    to="/dashboard" 
                    className="px-3 py-2 hover:bg-gray-100 rounded"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {user.role === 'admin' ? 'Admin Dashboard' : 'Dashboard'}
                  </Link>
                </>
              )}
              
              <Link 
                to="/about" 
                className="px-3 py-2 hover:bg-gray-100 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              
              {user ? (
                <>
                  <Link 
                    to="/profile" 
                    className="px-3 py-2 hover:bg-gray-100 rounded flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Link>
                  <button 
                    className="px-3 py-2 hover:bg-gray-100 rounded text-left flex items-center"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="px-3 py-2 hover:bg-gray-100 rounded"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="px-3 py-2 bg-kumbh-blue text-white rounded"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
