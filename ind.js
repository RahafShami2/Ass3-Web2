//instannce from express
//const { request, response } = require('express');
const express=require("express");
const bodyParser = require('body-parser');
//call the express fun
const httpApp =express();
httpApp.use(bodyParser.json());
//require for out db module
const db = require('./dba');

/////////////////////
/////Instructor/////
////////////////////

//veiw Instructor informations
httpApp.get("/Instructor",async(request,response)=>{
    let [result,rows]=await db.connection.execute("SELECT * FROM Instructor");
    response.status(200).json(result);
});
//Instructor create account
httpApp.post('/Instructor',async(request,response)=>{
  let sql="INSERT INTO Instructor (Instructor_name, Instructor_email, Instructor_number) VALUES (?,?,?)";
  let result1=await db.connection.execute(sql,[request.body.Instructor_name, request.body.Instructor_email, request.body.Instructor_number]);
  response.status(200).json("row added");
});
//delete Instructor account
httpApp.delete('/Instructor',async(request,response)=>{
   let sql="DELETE FROM Instructor WHERE idInstructor=?";
   let result1=await db.connection.execute(sql,[request.body.idInstructor]);
  response.status(200).json("row deleted");
});
//update Instructor information
httpApp.put('/Instructor',async(request,response)=>{
  let sql="UPDATE Instructor SET  Instructor_name=?,Instructor_email=?,Instructor_number=? WHERE idInstructor=?"
  let[result,rows]=await db.connection.execute(sql,[request.body.idInstructor,request.body.Instructor_name, request.body.Instructor_email, request.body.Instructor_number]);
  response.status(200).json("row edited");
});


////////////////////
//////Student///////
///////////////////

//veiw Student informations
httpApp.get("/Student",async(request,response)=>{
  let [result,rows]=await db.connection.execute("SELECT * FROM Student");
  response.status(200).json(result);
});
//Student create account
httpApp.post('/Student',async(request,response)=>{
    let sql="INSERT INTO Student (Student_name, Student_email, Student_number,Instructor_idInstructor) VALUES (?,?,?,?)";
    let result1=await db.connection.execute(sql,[request.body.Student_name, request.body.Student_email, request.body.Student_number,request.body.Instructor_idInstructor]);
    response.status(200).json("row added");
});
//delete Student account
httpApp.delete('/Student',async(request,response)=>{
 let sql="DELETE FROM Student WHERE idStudent=?";
 let result1=await db.connection.execute(sql,[request.body.idStudent]);
 response.status(200).json("row deleted");
});
//update Student information
httpApp.put('/Student',async(request,response)=>{
    let sql="update Student set  Student_name=?,Student_email=?,Student_number=? where idStudent=?"
    let[result,rows]=await db.connection.execute(sql,[request.body.idStudent,request.body.Student_name, request.body.Student_email, request.body.Student_number]);
    response.status(200).json("row edited");
});


////////////////////////
////////Material////////
///////////////////////

//view the material 
httpApp.get("/Material",async(request,response)=>{
    let [result,rows]=await db.connection.execute("SELECT * FROM Material");
    response.status(200).json(result);
});
//the instructor add the material
httpApp.post('/Material',async(request,response)=>{
  let sql="INSERT INTO Material (Material_name,Course_idCourse,Instructor_idInstructor)  VALUES (?,?,?)";
  let result1=await db.connection.execute(sql,[request.body.Material_name,request.body.Course_idCourse,request.body.Instructor_idInstructor]);
  response.status(200).json("row added");
});
//the instructor delete the material
httpApp.delete('/Material',async(request,response)=>{
   let sql="DELETE FROM Material WHERE idMaterial=?";
   let result1=await db.connection.execute(sql,[request.body.idMaterial]);
  response.status(200).json("row deleted");
});
//the instructor update the material
httpApp.put('/Material',async(request,response)=>{
  let sql="update Material set Material_name=? where idMaterial=?"
  let[result,rows]=await db.connection.execute(sql,[request.body.idMaterial,request.body.Material_name]);
  response.status(200).json("row edited");
});


///////////////////////////
////Course(instructor)////
/////////////////////////

//view the courses
httpApp.get("/Course",async(request,response)=>{
  let [result,rows]=await db.connection.execute("SELECT * FROM Course");
  response.status(200).json(result);
});
//the instructor add the course
httpApp.post('/Course',async(request,response)=>{
    let sql="INSERT INTO Course (Course_name,Instructor_idInstructor)  VALUES (?,?)";
    let result1=await db.connection.execute(sql,[request.body.Course_name,request.body.Instructor_idInstructor]);
    response.status(200).json("row added");
});
//the instructor delete the course
httpApp.delete('/Course',async(request,response)=>{
    let sql="DELETE FROM Course WHERE idCourse=?";
    let result1=await db.connection.execute(sql,[request.body.idCourse]);
    response.status(200).json("row deleted");
});
//the instructor update the course
httpApp.put('/Course',async(request,response)=>{
    let sql="update Course set  Course_name=?  where idCourse=?"
    let[result,rows]=await db.connection.execute(sql,[request.body.idCourse,request.body.Course_name]);
    response.status(200).json("row edited");
});


//////////////////////////
////Course(student)////
/////////////////////////

//view the courses
httpApp.get("/Student_has_Course",async(request,response)=>{
  let [result,rows]=await db.connection.execute("SELECT * FROM Student_has_Course");
  response.status(200).json(result);
});
//the student choose the course
httpApp.post('/Student_has_Course',async(request,response)=>{
    let sql="INSERT INTO Student_has_Course (Student_idStudent,Student_Instructor_idInstructor,Course_idCourse)  VALUES (?,?,?)";
    let result1=await db.connection.execute(sql,[request.body.Course_name,request.body.Instructor_idInstructor]);
    response.status(200).json("row added");
});
//the student delete the course he choose 
httpApp.delete('/Student_has_Course',async(request,response)=>{
    let sql="DELETE FROM Student_has_Course WHERE Course_idCourse=? & Student_idStudent=? & Student_Instructor_idInstructor ";
    let result1=await db.connection.execute(sql,[request.body.idCourse]);
    response.status(200).json("row deleted");
});


//run the server on a port
httpApp.listen(3000,()=>{
    console.log(`server is running on port ${3000}`);
})