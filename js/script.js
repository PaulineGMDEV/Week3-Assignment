let students=[];
let studentForm=
document.getElementById("studentForm");
let studentRecords=
document.getElementById("studentRecords");

studentForm.addEventListener("submit",function(event){
    event.preventDefault();

    let student={
        name:document.getElementById("fullName").value,
        age:document.getElementById("age").value,
        gender:document.getElementById("gender").value,
        course:document.getElementById("course").value,
        marks:Number(document.ElementById("marks").value,
    };
    students.push(student);
    displayStudents();
    studentForm.reset();
});

function displayStudents() {
    studentRecords.innerHTML="";

    for (let i=0;i<students.length;i++){
        studentRecords.innerHTML+='
        <tr>
        <td>${students(i).name}</td>
        <td>${students(i).age}</td>
        <td>${students(i).gender}</td>
        <td>${students(i).course}</td>
        <td>${students(i).marks}</td>
        <td>    
    <button onclick="deleteStudent(${i})">Delete</button>
    <button onclick="updateMarks(${i}"></button>
        </td>
        </tr>';
    
    }
}
updateSttistics();
}

/*Delete a student**/
function deleteStudent(index){
    students.splice(index,1);
    displayStudents();
}

/*Update Student marks*/
function updateMarks(index){
    let newMarks=prompt("Enter new marks(0-100):);
        if(newMarks===null){
            return;
        }
        newMarks=Number(newMarks);
        if(newMarks>=0 && newMarks<=100 && newMarks !==""){
            student[index].marks=newMarks;displayStudents();
        }else {
            alert("Invalid marks!Enter marks from 0 to 100.");
        }
}

/*update statistics*/
function updateStatistics{
let total=students.length;
let passed=0;
let failed=0;
let totalMarks=0;

for(let i=0;i<students.length;i++){
    totalMarks+=students[i].marks;
    if (students[i].marks>=50) {
        passed++;
    }else{
        failed++;
    }
}
let average=total>0? totalMarks/total:0

document.getElementById("totalStudents").textContent=total;
document.getElementById("passedStudents").textContent=passed;
document.getElementById("failedStudents").textContent=failed;
document.getElementById("averageMarks").textContent=average.toFixed(2);
}


/*search student*/
let searchStudent=
document.getElementById("searchStudent");
searchStudent.addEventListener("input",function(){
    let searchValue=searchStudent.value.toLowerCase();
    studentRecords.innerHTML="",

    for(let i=0;i<students.length;i++){
        if(students[i].name.toLowerCase().includes(searchValue)) {
            studentRecords.innerHTML+='
            <tr>
            <td>${students[i].name}</td>
            <td>${students[i].age}</td>
            <td>${students[i].gender}</td>
            <td>${students[i].course}</td>
            <td>${students[i].marks}</td>
            </td>
            </tr>
        ';

        }
    }
});

/*contact form*/
let contactForm=
document.getElementById("ContactForm");

contactForm.addEventListener("submit",function(event){
    event.preventDefault();
    
    let name=document.getElementById("ContactName").value;
    let email=document.getElementById("ContactEmail").value;
    let subject=document.getElementById("subject").value;
    let message=document.getElementById("message").value;

    if (name===""||email===||subject===""||message===""){
        alert("Please fill in all fields.");

       }else if (!email.includes("@")||!email includes(".")){
        alert("Please enter a valid email address.");

      }else if("Message must be at least 10 characters.");

    ]else{
        alert("Message sent successfully!);
            contactForm.reset();

    }
   
});

let menuToggle=
document.getElementById("menuToggle");
let nav=document.querySelector("nav");
menuToggle.addEventListener("click",function(){
    nav.classList.toggle("show");
});













