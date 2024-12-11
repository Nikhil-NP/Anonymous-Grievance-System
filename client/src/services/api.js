import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const registerStudent = (data) => API.post('/auth/register', data);
export const verifyStudentOTP = (data) => API.post('/auth/verify', data);
export const loginStudent = (data) => API.post('/auth/login', data);
export const loginFaculty = (data) => API.post('/auth/flogin', data);



export const createComplaint = (data, token) => API.post('/complaints', data, {
  headers: { Authorization: `Bearer ${token}` },
});


export const fetchComplaints = (type, token) => API.get(`/complaints/${type}`, {
  headers: { Authorization: `Bearer ${token}` },
});

export const updateComplaint = (id, data, token) => API.put(`/complaints/pending/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
