import { useContext, useCallback } from 'react';
import { AppContext } from '../context/AppContext';
import api from '../services/api';

export function useApi() {
  const { setLoading, setError, setSuccess } = useContext(AppContext);

  const request = useCallback(async (method, url, data = null, options = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      let response;
      if (method === 'GET') {
        response = await api.get(url, options);
      } else if (method === 'POST') {
        response = await api.post(url, data, options);
      } else if (method === 'PUT') {
        response = await api.put(url, data, options);
      } else if (method === 'DELETE') {
        response = await api.delete(url, options);
      }
      
      setLoading(false);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      setError(errorMessage);
      setLoading(false);
      throw error;
    }
  }, [setLoading, setError]);

  const get = useCallback((url, options) => request('GET', url, null, options), [request]);
  const post = useCallback((url, data, options) => request('POST', url, data, options), [request]);
  const put = useCallback((url, data, options) => request('PUT', url, data, options), [request]);
  const del = useCallback((url, options) => request('DELETE', url, null, options), [request]);

  return { get, post, put, del, request };
}

