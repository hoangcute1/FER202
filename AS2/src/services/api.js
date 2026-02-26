import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const lessonService = {
  getAllLessons: () => axios.get(API_URL),
  getLessonById: (id) => axios.get(`${API_URL}/${id}`),
  createLesson: (lesson) => axios.post(API_URL, lesson),
  updateLesson: (id, lesson) => axios.put(`${API_URL}/${id}`, lesson),
  deleteLesson: (id) => axios.delete(`${API_URL}/${id}`)
};