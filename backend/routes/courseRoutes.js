// routes/courseRoutes.js

const express = require('express');
const router = express.Router();
const Course = require('../models/course');
const Student = require('../models/studentModel');


router.get('/', async (req, res) => {
    try {
        // Fetch all courses from the database
        const courses = await Course.find({}, { _id: 0, __v: 0 }); // Exclude _id and __v fields
        
        res.status(200).json({ message: courses });
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/', async (req, res) => {
    try {

        // Extract course details from the request body
        const { title, code, status, educatorID, students } = req.body;
console.log('title', title);
console.log('code', code);
console.log('status', status);
console.log('educatorID', educatorID);


        // Create a new course record
        const newCourse = new Course({
            title,
            code,
            status,
            educatorID        });

        // Save the new course record to the database
        const savedCourse = await newCourse.save();

        res.status(201).json({ message: 'Course created successfully', course: savedCourse });
    } catch (error) {
        console.error('Error creating course:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
 

router.post('/register', async (req, res) => {
    try {
        const { code, student } = req.body;

        // Find the course with the provided code
        const course = await Course.findOne({ code });

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Ensure that the student data is provided
        if (!student) {
            return res.status(400).json({ message: 'Invalid student data' });
        }

        // Add the student to the students array of the course
        course.students.push(student); // Assuming student is the student's name
        await course.save();

        res.status(200).json({ message: 'Student registered successfully' });
    } catch (error) {
        console.error('Error registering student to course:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/eCourse', async (req, res) => {
    try {
        // Fetch only the 'code' field from courses with the same educatorID
        const courses = await Course.find({ educatorID: req.query.educatorID }, { code: 1, title: 1, status: 1 , _id: 0 });

        res.status(200).json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/sCourse', async (req, res) => {
    try {
        const studentId = req.query.studentID; 
        // Fetch only the 'code' field from courses that have the specified student
        const courses = await Course.find({ students: { $in: [studentId] } }, { code: 1, title: 1, status: 1 , _id: 0 });

        res.status(200).json({message:courses});
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
router.get('/sCourse/:courseCode/students', async (req, res) => {
    try {
        const { courseCode } = req.params;

        // Find the course by its code
        const course = await Course.findOne({ code: courseCode });
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // Retrieve students enrolled in the course
        const students = await Student.find({ ID: { $in: course.students } });
        console.log(students);
        res.status(200).json({ students });
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.patch('/status/:courseCode', async (req, res) => {
    try {
        const { courseCode } = req.params; // Extract courseCode from URL parameter
        const { status } = req.body; // Extract status from request body

        // Find the course by code and update its status
        const updatedCourse = await Course.findOneAndUpdate({ code: courseCode }, { status }, { new: true });

        if (!updatedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json({ message: 'Course status updated successfully', course: updatedCourse });
    } catch (error) {
        console.error('Error updating course status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




module.exports = router;
