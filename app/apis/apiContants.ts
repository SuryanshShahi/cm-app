export const API_CONSTANTS = {
  registerDevice: '',
  requestOtp: '/auth/send-otp',
  verifyOtp: '/auth/login-with-otp',
  updateToken: '',
  getUserProfile: '/users/complete-profile',
  getPosts: '/user/posts',
  interactionLike: '/interactions/like',
  interactionComment: '/interactions/comment',
  interactionShare: '/interactions/share',
  getEvents: '/user/events',
  getEventById: (eventId: string) => `/user/events/${eventId}`,
  getAnalytics: '/user/events/analytics',
};
