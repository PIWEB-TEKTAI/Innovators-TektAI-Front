import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { User } from '../../types/user';
import { getProfile } from '../../services/user.service';
import { useNavigate } from 'react-router-dom';

// Updated AuthContext to include user and role information
{/*interface AuthContextProps {
  user: User | null;
  role: string | null;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  role: null,
  
  
});

type AuthProviderProps = PropsWithChildren & {
  isSignedIn?: boolean;
};

export default function AuthProvider({
  children,
  isSignedIn,
}: AuthProviderProps) {
  const [authInfo, setAuthInfo] = useState<AuthContextProps>({
    user: null,
    role: null,
    
  });
  const navigate = useNavigate();

  const loginAction =  (user:any) => {
    setAuthInfo({ user: user, role: user.role });
  }
  const logoutAction =  () => {
    setAuthInfo({ user: null, role: null});
  }
  useEffect(() => {
    const isAuthenticated = async () => {
      try {
        const connectedUser = await getProfile();
        if (connectedUser) {
          // Assuming your User type has a 'role' property
          setAuthInfo({ user: connectedUser, role: connectedUser.role });
        } else {
          setAuthInfo({ user: null, role: null });
          navigate('/auth/signin');
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setAuthInfo({ user: null, role: null });
        navigate('/auth/signin');
      }
    };

    isAuthenticated();
  }, []);

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};*/}

interface AuthContextProps {
  authenticated: boolean;
  loginAuth: (user: User) => void;
  logoutAuth: () => void;
  userAuth: User | null;
  roleAuth: string | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userAuth, setUserAuth] = useState<User | null>(null);
  const [roleAuth, setRole] = useState<string | null>('');
  const navigate =useNavigate();
  useEffect(() => {
    const isAuthenticated = async () => {
      try {
        const connectedUser = await getProfile();
        if (connectedUser) {
          setUserAuth(connectedUser);
          setAuthenticated(true);
          setRole(connectedUser.role);
        } else {
          setUserAuth(null);
          setAuthenticated(false);
          setRole('');        }
      } catch (error) {
           }
    };

    isAuthenticated();
  }, []);
  const loginAuth = (user: User) => {
    setUserAuth(user);
    setRole(user.role);
    setAuthenticated(true);
  };

  const logoutAuth = () => {
    setAuthenticated(false);
    setUserAuth(null);
    setRole('');
  };

  return (
    <AuthContext.Provider value={{ authenticated, loginAuth, logoutAuth, userAuth, roleAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


