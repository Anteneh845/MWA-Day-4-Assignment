const {model} = require("mongoose");
const Student = model("Student");

module.exports.getStudentList = (req, res) => {
    const callBackHandler = (err, studentList) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal server error")
        }
        res.status(200).json(studentList);
    }
    if (req.query && req.query.offset && req.query.count) {
        const {offset, count} = [parseInt(req.query.offset), parseInt(req.query.count)];
        Student
            .find()
            .skip(offset)
            .limit(count)
            .exec((err, resp) => callBackHandler(err, resp))
    } else
        Student
            .find()
            .exec((err, resp) => callBackHandler(err, resp))
}


module.exports.getStudentById = (req, res) => {
    if (req.params && !req.params._id)
        return res.status(400).send("Student Id is required");
    else
        Student.findById(req.params._id).exec((err, student) => {
            if (err) {
                console.log(err);
                res.status(500).send("Internal server error");
            }
            res.status(200).json(student);
        })
}

module.exports.getStudentAddressList = (req, res) => {
    if (req.params && !req.params.studentId)
        return res.send(400).send("Student Id is required");
    else
        Student.findById(req.params.studentId).select("address").exec((err, student) => {
            if (err) {
                console.log(err)
                res.status(500).send("Internal server error");
            }
            res.status(200).json(student.address);
        })
}

module.exports.getStudentAddressById = (req, res) => {
    if (req.params && !req.params.studentId && !req.params.addressId)
        return res.status(400).send("Student Id and Address Id is required");
    else
        Student.findById(req.params.studentId).select("address").exec((err, student) => {
            if (err) {
                console.log(err)
                res.status(500).send("Internal server error");
            }
            const address = student.address.find(a => a._id.toString() === req.params.addressId.toString());
            res.status(200).json(address);
        })
}

module.exports.createStudent = (req, res) => {
    if (req.body) {
        const student = new Student({...req.body});
        Student.create(student, (err, student) => {
            if (err) {
                console.log(err)
            }
            res.status(200).json(student)
        })
    }
}