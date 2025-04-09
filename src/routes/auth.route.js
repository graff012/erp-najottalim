import { Router } from 'express';
import AuthController from '../controllers/auth.controller.js';

const authRouterStaff = Router();

const controller = new AuthController();

authRouterStaff.post(
  '/auth/staff/login',
  controller.loginStaffController.bind(controller)
);
authRouterStaff.post('/auth/staff/register');

authRouterStudent = Router();

authRouterStudent.post(
  '/auth/student/login',
  controller.loginStudentController.bind(controller)
);
authRouterStaff.post('/auth/student/register');

export { authRouterStaff, authRouterStudent };
