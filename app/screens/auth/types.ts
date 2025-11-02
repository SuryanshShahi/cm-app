export interface IRequestOtp {
  contact: string;
  cmId: string;
  purpose: string;
  userId?: string;
}
export interface IVerifyOtp {
  otp: string;
  contact: string;
  cmId: string;
  purpose: string;
}
