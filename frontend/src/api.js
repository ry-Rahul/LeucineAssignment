import axios from "axios";

const API_BASE = "http://localhost:3001";

const api = {
  async getTodos() {
    const res = await axios.get(`${API_BASE}/todos`);
    return res.data;
  },
  async addTodo(text) {
    const res = await axios.post(`${API_BASE}/todos`, { text });
    return res.data;
  },
  async deleteTodo(id) {
    const res = await axios.delete(`${API_BASE}/todos/${id}`);
    return res.data;
  },
  async editTodo(id, text, is_done) {
    const res = await axios.patch(`${API_BASE}/todos/${id}`, { text, is_done });
    return res.data;
  },
  async summarizeTodo() {
    const res = await axios.post(`${API_BASE}/todos/summarize`);
    console.log(res.data);
    return res.data;
  },
};

export default api;
