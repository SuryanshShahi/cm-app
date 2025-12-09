import { createUrl } from '../utils/constants';

export const API_CONSTANTS = {
  registerDevice: '/api/register-device',
  requestOtp: '/auth/send-otp',
  verifyOtp: '/auth/login-with-otp',
  updateToken: '/auth/refresh',
  getUserProfile: '/users/complete-profile',
  updateUserProfile: '/users/personal-details',
  getPosts: '/user/posts',
  interactionLike: '/interactions/like',
  interactionComment: '/interactions/comment',
  interactionShare: '/interactions/share',
  getEvents: (
    page: number,
    limit: number,
    status: string,
    search: string,
    startDate?: string,
    endDate?: string,
  ) =>
    createUrl('/user/events', {
      page,
      limit,
      status,
      search,
      startDate,
      endDate,
    }),
  getEventById: (eventId: string) => `/user/events/${eventId}`,
  getAnalytics: '/user/events/analytics',
  linkTwitterAccount: '/auth/twitter/initiate',
  linkFacebookAccount: '/auth/facebook/initiate',
  linkInstagramAccount: '/auth/instagram/initiate',
  shareFeedback: '',
  getSocialAccounts: '/auth/oauth/accounts',
  rsvpEvent: (eventId: string) => `/user/events/${eventId}/rsvp`,
};
