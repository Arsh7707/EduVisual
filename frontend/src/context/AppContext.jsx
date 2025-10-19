import React, { createContext, useReducer, useCallback } from 'react';

export const AppContext = createContext();

const initialState = {
  lectures: [],
  currentLecture: null,
  loading: false,
  error: null,
  successMessage: null,
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_SUCCESS':
      return { ...state, successMessage: action.payload };
    case 'CLEAR_MESSAGES':
      return { ...state, error: null, successMessage: null };
    case 'SET_LECTURES':
      return { ...state, lectures: action.payload };
    case 'ADD_LECTURE':
      return { ...state, lectures: [action.payload, ...state.lectures] };
    case 'UPDATE_LECTURE':
      return {
        ...state,
        lectures: state.lectures.map(l => l.id === action.payload.id ? action.payload : l),
      };
    case 'DELETE_LECTURE':
      return { ...state, lectures: state.lectures.filter(l => l.id !== action.payload) };
    case 'SET_CURRENT_LECTURE':
      return { ...state, currentLecture: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setLoading = useCallback((loading) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  }, []);

  const setError = useCallback((error) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, []);

  const setSuccess = useCallback((message) => {
    dispatch({ type: 'SET_SUCCESS', payload: message });
  }, []);

  const clearMessages = useCallback(() => {
    dispatch({ type: 'CLEAR_MESSAGES' });
  }, []);

  const setLectures = useCallback((lectures) => {
    dispatch({ type: 'SET_LECTURES', payload: lectures });
  }, []);

  const addLecture = useCallback((lecture) => {
    dispatch({ type: 'ADD_LECTURE', payload: lecture });
  }, []);

  const updateLecture = useCallback((lecture) => {
    dispatch({ type: 'UPDATE_LECTURE', payload: lecture });
  }, []);

  const deleteLecture = useCallback((id) => {
    dispatch({ type: 'DELETE_LECTURE', payload: id });
  }, []);

  const setCurrentLecture = useCallback((lecture) => {
    dispatch({ type: 'SET_CURRENT_LECTURE', payload: lecture });
  }, []);

  const value = {
    ...state,
    setLoading,
    setError,
    setSuccess,
    clearMessages,
    setLectures,
    addLecture,
    updateLecture,
    deleteLecture,
    setCurrentLecture,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

