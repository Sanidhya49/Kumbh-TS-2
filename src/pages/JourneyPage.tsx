
import { JourneyForm } from '@/components/journey/JourneyForm';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const JourneyPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  if (!isAuthenticated) return null;
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Plan Your Pilgrimage Journey</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select your starting location, destination, dates, and passenger details to book your pilgrimage journey.
        </p>
      </div>
      <JourneyForm />
    </div>
  );
};
