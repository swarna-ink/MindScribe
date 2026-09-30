
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/notes';

export const fetchNotes = async (search = '', category = 'All') => {
  const response = await axios.get(`${API_URL}?search=${search}&category=${category}`);
  return response.data;
};

export const fetchNoteById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createNoteAPI = async (noteData) => {
  const response = await axios.post(API_URL, noteData);
  return response.data;
};

export const updateNoteAPI = async (id, noteData) => {
  const response = await axios.put(`${API_URL}/${id}`, noteData);
  return response.data;
};

export const deleteNoteAPI = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};