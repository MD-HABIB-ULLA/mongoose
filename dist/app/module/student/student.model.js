"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
// Guardian schema with validation and error messages
const GuardianSchema = new mongoose_1.Schema({
    name: {
        type: {
            firstName: {
                type: String,
                required: [true, 'Guardian first name is required.'],
                maxlength: [20, 'First name cannot exceed 20 characters.'],
            },
            middleName: {
                type: String,
                maxlength: [20, 'Middle name cannot exceed 20 characters.'],
            },
            lastName: {
                type: String,
                required: [true, 'Guardian last name is required.'],
                maxlength: [20, 'Last name cannot exceed 20 characters.'],
            },
        },
        required: [true, 'Guardian name is required.'],
    },
    occupation: {
        type: String,
        required: [true, 'Guardian occupation is required.'],
        maxlength: [20, 'Occupation cannot exceed 20 characters.'],
    },
    contactNo: {
        type: String,
        required: [true, 'Guardian contact number is required.'],
        validate: {
            validator: (value) => /^\d{10}$/.test(value),
            message: 'Guardian contact number must be a valid 10-digit number.',
        },
    },
});
// Main student schema with validation and error messages
const studentSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: [true, 'Student ID is required.'],
        unique: true,
        maxlength: [20, 'Student ID cannot exceed 20 characters.'],
    },
    name: {
        type: {
            firstName: {
                type: String,
                required: [true, 'Student first name is required.'],
                maxlength: [20, 'First name cannot exceed 20 characters.'],
            },
            middleName: {
                type: String,
                maxlength: [20, 'Middle name cannot exceed 20 characters.'],
            },
            lastName: {
                type: String,
                required: [true, 'Student last name is required.'],
                maxlength: [20, 'Last name cannot exceed 20 characters.'],
            },
        },
        required: [true, 'Student name is required.'],
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    phoneNo: {
        type: String,
        required: [true, 'Phone number is required.'],
        maxlength: [20, 'Phone number cannot exceed 20 characters.'],
    },
    profileImage: {
        type: String,
        default: 'default-profile.png',
    },
    emergencyContactNo: {
        type: String,
        required: [true, 'Emergency contact number is required.'],
        maxlength: [20, 'Emergency contact number cannot exceed 20 characters.'],
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true,
    },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    dateOfBirth: {
        type: String,
        default: '2000-01-01',
    },
    presentAddress: {
        type: String,
        required: [true, 'Present address is required.'],
        maxlength: [100, 'Present address cannot exceed 100 characters.'],
    },
    permanentAddress: {
        type: String,
        required: [true, 'Permanent address is required.'],
        maxlength: [100, 'Permanent address cannot exceed 100 characters.'],
    },
    guardian: {
        type: {
            mother: {
                type: GuardianSchema,
                required: true,
            },
            father: {
                type: GuardianSchema,
                required: true,
            },
        },
        required: true,
    },
    localGuardian: {
        type: GuardianSchema,
        required: true,
    },
    isActive: { type: Boolean, default: true },
    password: { type: String, required: true },
});
studentSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
        console.log(user);
    });
});
studentSchema.post('save', function async() {
    const user = this;
    console.log(user);
});
studentSchema.methods.isStudentExist = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingStudent = yield exports.Student.findOne({ id });
        return existingStudent;
    });
};
// Export the Student model
exports.Student = (0, mongoose_1.model)('Student', studentSchema);
