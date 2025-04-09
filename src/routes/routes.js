import { authRouterStaff, authRouterStudent } from './auth.route.js';
import studentRouter from './student.route.js';

const Routes = () => [studentRouter, authRouterStudent, authRouterStaff];

export default Routes;
