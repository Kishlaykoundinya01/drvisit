import express from 'express';
import { loginDoctor, appointmentsDoctor, appointmentComplete, appointmentCancel, doctorList, doctorDashboard, doctorProfile, updateDoctorProfile, changeAvailability, rateDoctor, changePassword } from '../controllers/doctorController.js';
import authDoctor from '../middlewares/authDoctor.js';
const doctorRouter = express.Router();

doctorRouter.post("/login", loginDoctor)
doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel)
doctorRouter.get("/appointments", authDoctor, appointmentsDoctor)
doctorRouter.get("/list", doctorList)
doctorRouter.post("/change-availability", authDoctor, changeAvailability)
doctorRouter.post("/complete-appointment", authDoctor, appointmentComplete)
doctorRouter.get("/dashboard", authDoctor, doctorDashboard)
doctorRouter.get("/profile", authDoctor, doctorProfile)
doctorRouter.post("/update-profile", authDoctor, updateDoctorProfile)
doctorRouter.post("/rating/:id", authDoctor, rateDoctor)
doctorRouter.post("/change-password", authDoctor, changePassword)

export default doctorRouter;