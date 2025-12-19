import { useState, useCallback } from 'react';
import api from '@api/axios';

export default function useUser(){
  const [username, setUsername] = useState(null);

  const returnMacro = (response) => {
    return {
      status: response.status,
      name: response.data?.name,
      detail: response.data?.detail
    }
  }

  const fetchMyName = useCallback(async () => {
    try {
      const response = await api.get('/account/my-name');
      setUsername(response.data.name);
      return returnMacro(response);
    }
    catch (e) {
      setUsername(null);
      return returnMacro(e.response);
    }
  }, []);

  const fetchLogIn = useCallback(async (email, password) => {
    try {
      const payload = {
        email: email,
        password: password
      }
      const response = await api.post('/account/login', payload);
      setUsername(response.data.name);
      return returnMacro(response)
    }
    catch (e) {
      setUsername(null);
      return returnMacro(e.response)
    }
  }, []);

  const fetchLogOut = useCallback(async () => {
    try {
      const response = await api.post('/account/logout');
      setUsername(null);
      return returnMacro(response)
    }
    catch (e) {
      return returnMacro(e.response)
    }
  }, []);

  return {username, fetchLogIn, fetchLogOut, fetchMyName}
}