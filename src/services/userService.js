import api from './api';

export const userService = {
  // Mock data for demo
  mockUsers: [
    { id: 1, email: 'user@demo.com', role: 'user', name: 'John Client' },
    { id: 2, email: 'pro@demo.com', role: 'professional', name: 'Sarah Professional' },
    { id: 3, email: 'support@demo.com', role: 'support', name: 'Mike Support' },
    { id: 4, email: 'admin@demo.com', role: 'admin', name: 'Admin User' },
  ],

  async login(email, password) {
    // Mock login - in real app, this would call api.post('/auth/login', { email, password })
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.mockUsers.find(u => u.email === email);
        if (user) {
          resolve({
            ...user,
            fullName: user.name,
            avatar: `https://i.pravatar.cc/150?u=${user.email}`,
            verified: true,
            token: 'mock-jwt-token-' + user.id
          });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 800);
    });
  },

  async register(userData) {
    // Mock registration
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Registration successful' });
      }, 800);
    });
  },

  async getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  async updateProfile(userId, data) {
    // In real app: return api.put(`/users/${userId}`, data);
    return Promise.resolve({ success: true, data });
  },

  async getAllUsers() {
    // In real app: return api.get('/users');
    return Promise.resolve(this.mockUsers);
  }
};
