import { useContext, useCallback } from 'react';
import { AppContext } from '../context/AppContext';
import { useApi } from './useApi';

export function useLectures() {
  const { lectures, setLectures, addLecture, updateLecture, deleteLecture, setCurrentLecture } = useContext(AppContext);
  const { get, post, del } = useApi();

  const fetchLectures = useCallback(async () => {
    try {
      const data = await get('/api/lectures');
      setLectures(data);
      return data;
    } catch (error) {
      console.error('Failed to fetch lectures:', error);
      throw error;
    }
  }, [get, setLectures]);

  const uploadLecture = useCallback(async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const data = await post('/api/lectures/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      addLecture(data);
      return data;
    } catch (error) {
      console.error('Failed to upload lecture:', error);
      throw error;
    }
  }, [post, addLecture]);

  const getLectureStatus = useCallback(async (lectureId) => {
    try {
      const data = await get(`/api/lectures/${lectureId}/status`);
      return data;
    } catch (error) {
      console.error('Failed to get lecture status:', error);
      throw error;
    }
  }, [get]);

  const getLecture = useCallback(async (lectureId) => {
    try {
      const data = await get(`/api/lectures/${lectureId}`);
      setCurrentLecture(data);
      return data;
    } catch (error) {
      console.error('Failed to get lecture:', error);
      throw error;
    }
  }, [get, setCurrentLecture]);

  const exportLecture = useCallback(async (lectureId, format) => {
    try {
      const data = await post(`/api/lectures/${lectureId}/export`, { format });
      return data;
    } catch (error) {
      console.error('Failed to export lecture:', error);
      throw error;
    }
  }, [post]);

  const removeLecture = useCallback(async (lectureId) => {
    try {
      await del(`/api/lectures/${lectureId}`);
      deleteLecture(lectureId);
    } catch (error) {
      console.error('Failed to delete lecture:', error);
      throw error;
    }
  }, [del, deleteLecture]);

  const updateLectureSelections = useCallback(async (lectureId, selections) => {
    try {
      const data = await post(`/api/lectures/${lectureId}/selections`, { selections });
      updateLecture(lectureId, data);
      return data;
    } catch (error) {
      console.error('Failed to update lecture selections:', error);
      throw error;
    }
  }, [post, updateLecture]);

  return {
    lectures,
    fetchLectures,
    uploadLecture,
    getLectureStatus,
    getLecture,
    exportLecture,
    removeLecture,
    updateLectureSelections,
  };
}

