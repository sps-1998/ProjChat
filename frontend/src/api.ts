// frontend/src/api.ts
import { useAuth } from './context/AuthContext';

export function useAuthenticatedFetch() {
  const { token } = useAuth();
  return async (input: RequestInfo, init: RequestInit = {}) => {
    const headers = {
      ...(init.headers || {}),
      Authorization: token ? `Bearer ${token}` : ''
    };
    const res = await fetch(input, { ...init, headers });
    if (res.status === 401) {
      // optionally auto-logout
      throw new Error('Unauthorized');
    }
    return res;
  };
}
