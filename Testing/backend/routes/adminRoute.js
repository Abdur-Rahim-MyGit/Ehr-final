import express from 'express';
import { loginAdmin, appointmentsAdmin, appointmentCancel, addDoctor, allDoctors, adminDashboard } from '../controllers/adminController.js';
import { changeAvailablity } from '../controllers/doctorController.js';
import authAdmin from '../middleware/authAdmin.js';
import upload from '../middleware/multer.js';
import { addPatient } from '../controllers/patientController.js';

const adminRouter = express.Router();

// Admin authentication
adminRouter.post("/login", loginAdmin);

// Doctor management
adminRouter.post("/add-doctor", authAdmin, upload.single('image'), addDoctor);
adminRouter.get("/all-doctors", authAdmin, allDoctors);
adminRouter.post("/change-availability", authAdmin, changeAvailablity);

// Appointment management
adminRouter.get("/appointments", authAdmin, appointmentsAdmin);
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel);

// Dashboard
adminRouter.get("/dashboard", authAdmin, adminDashboard);

// Patient management
adminRouter.post("/add-patient", authAdmin, addPatient);

export default adminRouter;