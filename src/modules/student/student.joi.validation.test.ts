import Joi from 'joi';

//create a schema validation using Joi
const UserNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .regex(
      /^[A-Z][a-zA-Z]*$/,
      'First letter should be capital and contain only alphabets',
    )
    .required()
    .messages({
      'string.pattern.base':
        'First Name should start with a capital letter and contain only alphabets',
      'string.empty': 'First Name is required',
      'string.max': "First Name can't be longer than 20 characters",
    }),
  middleName: Joi.string().allow(null, ''),
  lastName: Joi.string()
    .pattern(/^[A-Za-z]+$/, 'only alphabets')
    .required()
    .messages({
      'string.pattern.base': '{#value} is not valid',
      'string.empty': 'Last Name is required',
    }),
});

const GuardianValidationSchema = Joi.object({
  fatherName: Joi.string()
    .required()
    .messages({ 'string.empty': 'Father Name is required' }),
  fatherOccupation: Joi.string()
    .required()
    .messages({ 'string.empty': 'Father Occupation is required' }),
  fatherContactNo: Joi.string()
    .required()
    .messages({ 'string.empty': 'Father Contact No is required' }),
  motherName: Joi.string()
    .required()
    .messages({ 'string.empty': 'Mother Name is required' }),
  motherOccupation: Joi.string()
    .required()
    .messages({ 'string.empty': 'Mother Occupation is required' }),
  motherContactNo: Joi.string()
    .required()
    .messages({ 'string.empty': 'Mother Contact No is required' }),
});

const LocalGuardianValidationSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ 'string.empty': 'Local Guardian Name is required' }),
  occupation: Joi.string()
    .required()
    .messages({ 'string.empty': 'Local Guardian Occupation is required' }),
  contactNo: Joi.string()
    .required()
    .messages({ 'string.empty': 'Local Guardian Contact No is required' }),
  address: Joi.string()
    .required()
    .messages({ 'string.empty': 'Local Guardian Address is required' }),
});

const StudentValidationSchema = Joi.object({
  id: Joi.string().required(), // Optional
  name: UserNameValidationSchema.required(),
  gender: Joi.string().valid('Male', 'Female', 'Other').required().messages({
    'any.only': '{#value} is not a valid gender',
    'string.empty': 'Gender is required',
  }),
  dateOfBirth: Joi.string().isoDate().optional(),
  email: Joi.string().email().required().messages({
    'string.email': '{#value} is not a valid email',
    'string.empty': 'Email is required',
  }),
  contactNo: Joi.string()
    .required()
    .messages({ 'string.empty': 'Contact No is required' }),
  emergencyContactNo: Joi.string()
    .required()
    .messages({ 'string.empty': 'Emergency Contact No is required' }),
  bloodGroup: Joi.string()
    .valid('A+', 'B-', 'O+', 'AB-', 'O-', 'A-', 'B+', 'AB+')
    .optional(),
  presentAddress: Joi.string()
    .required()
    .messages({ 'string.empty': 'Present Address is required' }),
  permanentAddress: Joi.string()
    .required()
    .messages({ 'string.empty': 'Permanent Address is required' }),
  guardian: GuardianValidationSchema.required(),
  localGuardian: LocalGuardianValidationSchema.required(),
  profileImg: Joi.string().uri().optional(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
});

export default StudentValidationSchema;
