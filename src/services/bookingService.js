import api from './api';

const mockBookings = [
  {
    id: 'BK-1001',
    professionalId: 1,
    professionalName: 'Dr. Sarah Mitchell',
    service: 'UX Consultation',
    date: '2026-03-01',
    time: '10:00 AM',
    status: 'confirmed',
    amount: 150,
  },
  {
    id: 'BK-1002',
    professionalId: 2,
    professionalName: 'Rajesh Patel',
    service: 'Full Stack Development',
    date: '2026-03-05',
    time: '2:00 PM',
    status: 'pending',
    amount: 130,
  },
];

export const bookingService = {
  async getBookings(userId) {
    // In real app: return api.get(`/bookings/user/${userId}`);
    return Promise.resolve(mockBookings);
  },

  async createBooking(bookingData) {
    // In real app: return api.post('/bookings', bookingData);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          booking: {
            id: 'BK-' + Math.floor(Math.random() * 10000),
            ...bookingData,
            status: 'pending',
          }
        });
      }, 500);
    });
  },

  async updateBooking(bookingId, updates) {
    // In real app: return api.put(`/bookings/${bookingId}`, updates);
    return Promise.resolve({ success: true, bookingId, updates });
  },

  async cancelBooking(bookingId) {
    // In real app: return api.delete(`/bookings/${bookingId}`);
    return Promise.resolve({ success: true, bookingId });
  },

  async getProfessionalBookings(professionalId) {
    // In real app: return api.get(`/bookings/professional/${professionalId}`);
    return Promise.resolve(mockBookings);
  }
};
