import { useContext, createContext } from 'react';
import { useAuthProvider } from './AuthProvider.hooks';
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const { token, login, logOut } = useAuthProvider();

  return (
    <AuthContext.Provider value={{ token, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
