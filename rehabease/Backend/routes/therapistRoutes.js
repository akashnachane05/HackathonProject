const express = require("express");
const { registerTherapist, loginTherapist } = require("../controllers/authController");
const verifyToken= require('../middlewares/authMiddleware');
const Therapist = require("../models/Therapist"); //
const router = express.Router();

router.post("/register", registerTherapist);
router.post("/login", loginTherapist);
router.get('/profile', verifyToken, async (req, res) => {
    try {
        // Ensure `req.patient.id` is set correctly from verifyToken
        if (!req.user || !req.user.id) {
            return res.status(400).json({ message: 'Therapist ID is missing from token.' });
        }

        // Find the patient by ID
        const user = await Therapist.findById(req.user.id).select('-password'); // Exclude the password field

        if (!user) {
            return res.status(404).json({ message: 'Therapist not found.' });
        }

        res.json({
            name: user.name,
            email: user.email,
            age: user.age,
            dob: user.dob,
            gender: user.gender,
            qualification: user.qualification,
            expertise:user.expertise,
            yearsOfExperience:user.yearsOfExperience,
          });
          
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.put('/profile', verifyToken, async (req, res) => {
    try {
        const { name, age, dob, gender, qualification, expertise,yearsOfExperience} = req.body;

        // Ensure `req.patient.id` is set correctly from verifyToken
        if (!req.user || !req.user.id) {
            return res.status(400).json({ message: 'Therapist ID is missing from token.' });
        }

        // Update the patient's profile using their ID
        const updatedPatient = await Therapist.findByIdAndUpdate(
            req.user.id,
            { name, age, dob, gender, qualification, expertise,yearsOfExperience },
            { new: true, runValidators: true } // Return the updated patient and apply schema validators
        );

        if (!updatedPatient) {
            return res.status(404).json({ message: 'Therapist not found.' });
        }

        res.json({ name: updatedPatient.name,
            email: updatedPatient.email,
            age: updatedPatient.age,
            dob: updatedPatient.dob,
            gender: updatedPatient.gender,
            qualification:updatedPatient.qualification,
            expertise:updatedPatient.expertise,
            yearsOfExperience:updatedPatient.yearsOfExperience,
            message: 'Profile updated successfully', user: updatedPatient });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


module.exports = router;


