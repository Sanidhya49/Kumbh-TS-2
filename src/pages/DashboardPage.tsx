
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { UserDashboard } from '@/components/dashboard/user/UserDashboard';
import { AdminDashboard } from '@/components/dashboard/admin/AdminDashboard';

export const DashboardPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  if (!isAuthenticated || !user) return null;
  
  return user.role === 'admin' ? <AdminDashboard /> : <UserDashboard />;
};
