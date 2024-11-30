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
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentControllers = exports.getSingleStudent = void 0;
const student_service_1 = require("./student.service");
const student_validation_1 = require("./student.validation");
const zod_1 = require("zod");
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = req.body.student;
        // Validate the input using Zod
        const zodData = student_validation_1.studentValidationSchema.parse(student);
        // Save the validated data to the database
        yield student_service_1.studentServices.createStudentIntoDB(zodData);
        res.status(201).json({
            success: true,
            message: 'Student created successfully.',
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            // Handle Zod validation errors
            const formattedErrors = error.errors.map((err) => ({
                path: err.path.join('.'), // Combine array paths into a readable string
                message: err.message,
            }));
            res.status(400).json({
                success: false,
                message: 'Validation failed.',
                errors: formattedErrors,
            });
        }
        else {
            // Handle other errors
            const errorMessage = error instanceof Error
                ? error.message
                : 'An unexpected error occurred.';
            res.status(500).json({
                success: false,
                message: errorMessage,
            });
        }
    }
});
const getAllStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield student_service_1.studentServices.getAllStudentDataFromDB();
        res.status(200).json({
            success: true,
            message: 'Successfully retrieved all student data.',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve student data. Please try again later.',
            error: error.message,
        });
    }
});
const getSingleStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.studentId;
        const result = yield student_service_1.studentServices.getSingleStudentDataFromDB(id);
        if (!result) {
            res.status(404).json({
                success: false,
                message: `No student found with the ID: ${id}`,
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: `Successfully retrieved data for student with ID: ${id}`,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while retrieving the student data.',
            error: error.message,
        });
    }
});
exports.getSingleStudent = getSingleStudent;
exports.studentControllers = {
    createStudent,
    getAllStudent,
    getSingleStudent: exports.getSingleStudent,
};
