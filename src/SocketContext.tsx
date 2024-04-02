import { ReactNode, createContext, useContext } from 'react';
import io from 'socket.io-client';

const defaultValue = io('http://localhost:3000'); 

const SocketContext = createContext(defaultValue); 

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }:{ children: ReactNode }) => {
  const socket = io('http://localhost:3000');

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
