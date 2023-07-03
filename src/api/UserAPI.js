const axios = require('axios').default;

export default class UserAPI {
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  getUsers() {
    console.log('[API call] getUsers');
    return this.axios.get(`/users`);
  }

  getUser(id) {
    console.log('[API call] getUser:', id);
    return this.axios.get(`/user/${id}`);
  }

  createUser(user) {
    console.log('[API call] createUser:', user);
    return this.axios.post(`/user`, JSON.stringify(user));
  }

  updateUser(user) {
    console.log('[API call] updateUser:', user);
    return this.axios.put(`/user`, JSON.stringify(user));
  }

  deleteUser(id) {
    console.log('[API call] deleteUser:', id);
    return this.axios.delete(`/user/${id}`);
  }

}
