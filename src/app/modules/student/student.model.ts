import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUserName,
} from './student.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
const UserNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true, //  remove space

    required: [true, 'First Name is required'],
    maxlength: [20, "First Name can't be longer than 20 characters"],
    // validate: {
    //   validator: function (value) {
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1); // capitalize first letter
    //     return firstNameStr === value;
    //   },
    //   message: 'First Name should start with a capital letter',
    // },
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: '{VALUE} is Not valid',
    // },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, required: [true, ' ID is required'], unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User is required'],
      unique: true,
      ref: 'User',
    },
    password: {
      type: String,
      required: true,
      maxlength: [20, 'password can not be more than 20 characters'],
    },

    name: {
      type: UserNameSchema,
      required: true,
    },

    gender: {
      type: String,
      required: true,

      enum: {
        values: ['Male', 'Female', 'Other'],
        message: `{VALUE} is not a valid gender`,
      }, // restrict to only these values
    },
    dateOfBirth: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },

    contactNo: {
      type: String,
      required: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], // restrict to only these values
    },

    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    guardian: {
      type: guardianSchema,
      required: true,
    },

    localGuardian: {
      type: localGuardianSchema,
      required: true,
    },
    profileImg: { type: String },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

//virtual schema

studentSchema.virtual('fullName').get(function () {
  console.log('first');
  return `${this.name.firstName} ${this.name.middleName}  ${this.name.lastName}`;
});

// middleware save data pre check
studentSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  user.password = await bcrypt.hash(user.password, Number(config.saltRound));

  next();
});

studentSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// for aggregation
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
  // this.pipeline().match({ isDeleted: { $ne: true } });
  // next();
});

// creating a custom static method in mongoose model

studentSchema.statics.isUserExists = async function (id: string) {
  const existUser = await Student.findOne({ id });
  return existUser;
};

// creating a custom instance method

// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });

//   return existingUser;
// };

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
