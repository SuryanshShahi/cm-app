import * as Yup from 'yup';
import {ErrorMessage, Regex} from '../utils/static';

export const loginViaPhoneSchema = Yup.object({
  phone: Yup.string()
    .max(10)
    .required(ErrorMessage.REQUIRED)
    .matches(Regex.PHONE, {
      message: ErrorMessage.VALID_NUMBER,
      excludeEmptyString: false,
    }),
});
