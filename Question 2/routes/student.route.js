const express = require("express");
const router = express.Router();
const {
    createStudent,
    getStudentAddressById,
    getStudentAddressList,
    getStudentById,
    getStudentList
} = require("../controllers/student.controller");


router
    .get("/students", getStudentList)
    .post("/students", createStudent)

router.get("/students/:_id", getStudentById);

router.get("/students/:studentId/addresses", getStudentAddressList)

router.get("/students/:studentId/addresses/:addressId", getStudentAddressById)

module.exports = router;