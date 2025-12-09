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

export interface ISocialAccount {
  connectedAccounts: {
    platform: string;
    account: {
      id: string;
      providerUid: string;
      isActive: boolean;
      createdAt: string;
    };
  }[];
}
