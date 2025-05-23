import { Router } from 'express';
import AuthController from '../controllers/auth.controller.js';

const authRouterStaff = Router();

const controller = new AuthController();

authRouterStaff.post(
  '/auth/staff/login',
  controller.loginStaffController.bind(controller)
);
authRouterStaff.post(
  '/auth/staff/register',
  controller.registerStaffController.bind(controller)
);

const authRouterStudent = Router();

authRouterStudent.post(
  '/auth/student/login',
  controller.loginStudentController.bind(controller)
);

authRouterStudent.post(
  '/auth/student/register',
  controller.registerStudentController.bind(controller)
);

export { authRouterStaff, authRouterStudent };
