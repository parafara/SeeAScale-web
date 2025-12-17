import { useState, useCallback } from 'react';
import api from '@api/axios';

export default function useUser(){
  const [username, setUsername] = useState(null);

  const fetchMyName = useCallback(async () => {
    try {
      const response = await api.get('/account/my-name');
      setUsername(response.data.name);
      return response.data.name;
    }
    catch (e) {
      setUsername(null);
      return null;
    }
  }, []);

  return {username, fetchMyName}
}