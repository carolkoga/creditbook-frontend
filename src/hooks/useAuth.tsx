import { AuthContext } from 'context/AuthContext';
import { useContext } from 'react';

export default function useAuth() {
  const auth = useContext(AuthContext);
  return auth;
}
