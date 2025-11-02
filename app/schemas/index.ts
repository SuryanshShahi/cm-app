import * as Yup from 'yup';
import { ErrorMessage, Regex } from '../utils/static';

export const loginSchema = (mode: 'phone' | 'email') =>
  Yup.object({
    phone:
      mode === 'phone'
        ? Yup.string()
            .required(ErrorMessage.REQUIRED)
            .max(10)
            .matches(Regex.PHONE, {
              message: ErrorMessage.VALID_NUMBER,
              excludeEmptyString: false,
            })
        : Yup.string().notRequired(),
    email:
      mode === 'email'
        ? Yup.string().email().required(ErrorMessage.REQUIRED)
        : Yup.string().notRequired(),
  });



export const profileFormSchema = Yup.object({
  name: Yup.string()
    .required(ErrorMessage.REQUIRED)
    .matches(Regex.NAME, {
      message: ErrorMessage.NO_SPECIAL_CHARACTERS,
      excludeEmptyString: false,
    })
    .min(2, 'Name must be at least 2 characters'),
  dob: Yup.string()
    .required(ErrorMessage.REQUIRED)
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, {
      message: 'Please enter a valid date (DD/MM/YYYY)',
      excludeEmptyString: false,
    }),
  gender: Yup.string()
    .required(ErrorMessage.REQUIRED)
    .oneOf(['M', 'F'], 'Please select a valid gender'),
  address: Yup.string()
    .required(ErrorMessage.REQUIRED)
    .min(10, 'Address must be at least 10 characters'),
  city: Yup.string()
    .required(ErrorMessage.REQUIRED)
    .matches(Regex.NAME, {
      message: ErrorMessage.NO_SPECIAL_CHARACTERS,
      excludeEmptyString: false,
    })
    .min(2, 'City must be at least 2 characters'),
  workingSince: Yup.string()
    .required(ErrorMessage.REQUIRED)
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, {
      message: 'Please enter a valid date (DD/MM/YYYY)',
      excludeEmptyString: false,
    }),
  identifier: Yup.string()
    .required(ErrorMessage.REQUIRED)
    .matches(/^\d{12}$/, {
      message: 'Aadhaar number must be 12 digits',
      excludeEmptyString: false,
    }),
});
