const express = require("express");
require("./db/conn");
const Student = require("./models/students");
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

//create a new students
// app.post("/students",(req, res) => {
//     console.log(req.body);
//     const user = new Student(req.body);

//     user.save().then( () => {
//         res.status(201).send(user);
//     }).catch( (err) => {
//         res.status(400).send(err);
//     });
//     //res.send("Hello From the other sides.")
// });

app.post("/students", async (req, res) => {
    try {
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

//get all the students records
app.get("/students", async (req, res) => {
    try {
        const studentsData = await Student.find();
        res.status(201).send(studentsData);
    } catch(err) {
        res.status(400).send(err);
    }
});

//get particular student record by id
app.get("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const studentData = await Student.findById(_id);
        console.log(studentData);
        res.status(201).send(studentData);
    } catch(err) {
        res.status(400).send(err);
    }
});

//get particular student record by name
// this below code is not working
// app.get("/students/:name", async (req, res) => {
//     try {
//         console.log(req.params.name);
//         const _name = req.params.name;
//         const studentData = await Student.find({_name});
//         console.log(studentData);
//         res.status(201).send(studentData);
//     } catch(err) {
//         res.status(400).send(err);
//     }
// });

//delete the student
app.delete("/students/:id", async (req, res) => {
    try {
        const deleteStudent = await Student.findByIdAndDelete(req.params.id);
        res.status(201).send(deleteStudent);
        console.log(deleteStudent);
    } catch(err) {
        res.status(500).send(err);
    }
});

//update student detail by id
app.patch("/students/:id", async(req, res) => {
    try {
        const updateStudent = await Student.findByIdAndUpdate(req.params.id, req.body,{new : true});
        res.status(201).send(updateStudent);
        console.log(updateStudent);
    } catch(err) {
        res.status(400).send(err);
    }
})



app.listen(port,() => {
    console.log(`connection is setup at ${port}`);
});