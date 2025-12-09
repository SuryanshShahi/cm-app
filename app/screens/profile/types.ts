export interface IAddProfile {
  fullName?: string;
  address: string;
  district: string;
  gender: string;
  dob: string;
  photoMimeType?: string;
}
export interface IUpdateProfile {
  fullName?: string;
  address: string;
  workingWithPartySince: string;
  aadhaarNumber: string;
  city: string;
  gender: string;
  dob: string;
  photoMimeType?: string;
}
