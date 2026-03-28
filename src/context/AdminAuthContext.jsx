import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminAuthContext = createContext();

// Session Timeout Logic (15 Minutes) - Defined outside to avoid re-creation
const TIMEOUT_DURATION = 15 * 60 * 1000;

export const AdminAuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [sessionToken, setSessionToken] = useState(null);
  const navigate = useNavigate();

  const timeoutRef = useRef(null);

  const logout = useCallback(() => {
    setIsAdmin(false);
    setUserRole(null);
    setSessionToken(null);
    localStorage.removeItem('zeraf_admin_session');
    localStorage.removeItem('zeraf_csrf_token');
    navigate('/zeraf-secure-portal/login');
  }, [navigate]);

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(logout, TIMEOUT_DURATION);
  }, [logout]);

  useEffect(() => {
    const savedSession = localStorage.getItem('zeraf_admin_session');
    if (savedSession) {
      const { role, token, expiry } = JSON.parse(savedSession);
      if (new Date().getTime() < expiry) {
        setIsAdmin(true);
        setUserRole(role);
        setSessionToken(token);
        resetTimeout();
      } else {
        logout();
      }
    }

    // Event listeners for activity tracking
    const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    activityEvents.forEach(event => window.addEventListener(event, resetTimeout));

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      activityEvents.forEach(event => window.removeEventListener(event, resetTimeout));
    };
  }, [logout, resetTimeout]);

  const login = async (email, password) => {
    const validEmail = 'admin@zeraf.com';
    const isPasswordValid = password === 'strongAdmin123!'; 

    if (email === validEmail && isPasswordValid) {
      const sessionData = {
        role: 'SUPER_ADMIN',
        token: Math.random().toString(36).substr(2, 10),
        expiry: new Date().getTime() + TIMEOUT_DURATION
      };
      
      localStorage.setItem('zeraf_admin_session', JSON.stringify(sessionData));
      setIsAdmin(true);
      setUserRole(sessionData.role);
      setSessionToken(sessionData.token);
      resetTimeout();
      return true;
    }
    return false;
  };

  return (
    <AdminAuthContext.Provider value={{ isAdmin, userRole, sessionToken, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
