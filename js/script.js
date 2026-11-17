/*Array of objects**/
let students=[];
let nextId=1;

/*connect js to html elements**/
const studentsForm=document.getElementById("student-form");
const nameInput=document.getElementById('name');
const ageInput=document.getElementById('age');
const genderInput=document.getElementById("gender");
const courseInput=document.getElementById("course");
const marksInput=document.getElementById("marks");
const formMessage=document.getElementById("form-message")
const tableBody=document.getElementById("students-table-body")

/**perfomance label */
function getPerfomance(marks){
    if(marks>=80) return "Excellent";
    else if(marks>=70)return "Very Good";
    else if(marks>=60)return "Good";
    else if(marks>=50)return "Average"
    else return "Failed"
}
/**draw students records */
function renderStudents(list){
    tableBody.innerHTML="";

    for(let i=0;i<list.length;i++){
        const student=list[i]
        const performance=getPerformance(student.marks);
        
        const row=document.createElement("tr")
        row.innerHTML=
        "<td>"+student.name+"</td>"+
        "<td>"+student.age+"</td>"+
        "<td>"+student.gender+"</td>"+
        "<td>"+student.course+"</td>"+
        "<td>"+student.marks+"</td>"+
        "<td>"+performance+"</td>";
        tableBody.appendChild(row);
    }
}
/**Validate Registration Form */
studentForm.addEventListener("submit",function(event){
    event.preventDefault();

    const name=nameInput.value.trim();
    const age=Number(ageInput.value);
    const gender=genderInput.value;
    const course=courseInput.value;
    constmarks=Number(marksInput.value);

    if (name===""||ageInput.value===""||gender===""||course===""||marksInput.value===""){
        showMessage("Please fill in all fields.","red");
        return;
    }
    if(isNaN(age)||age<=0){
        showMessage("Age must be a valid Number.","red");
        return;
    }
    if(NaN (marks)||marks<0||marks>100){
        showMessage("Marks must be between 0 and 100.","red");
            return;
    }

    /**create student object*/
    const newStudent={
        id:nextId,
        name:name,
        age:age,
        course:course,
        marks:marks
    };
    students.push(newStudent);
    nextId++;

    renderStudents(students);
    studentForm.reset();
    showMessage("Student registered successfully!","green");  
});

function showMessage(text,color){
    formMessage.textContent=text;
    formMessage.style.color=color;
}

/**Get the dashboard number element */
const totalStudentsEl=document.getElementById("total-students");
const totalPassedEl=document.getElementById("total-passed");
const totalFailedEl=document.getElementById("total-failed");
const averageMarksEl=document.getElementById("average-marks");

/**calculate Statistics */
function updateStats(){
    let passed=0;
    let failed=0;
    let totalMarks=0;

    for (let i=0;i<students.length;i++){
        totalMarks+=students[i].marks;

        if(students[i].marks>=50){
            passed++;
         }else{
            failed++;
         }
    }

let average=0;
if (students.length>0) {
    average=totalMarks/students.length;
}
totalStudentsEl.textContent=students.length;
totalPassedEl.textContent=passed;
totalFailedEl.textContent=failed;
averageMarksEl.textContent=average.toFixed(1);
}

updateStats();

/*Add update and delete buttons**/
"<td>"+
"<button class='update-btn' data-id="+student.id+">Update</button>"+
"<button class='delete-btn' data-id="+student.id+">Delete</button>"+
"</td>"

/**Listen for delete and update button */
tableBody.addEventListener("click",function(event){
    const clickedButton=event.target;
    const id=Number(clickedButton.getAttribute("data-id"));

    if (clickedButton.classList.contains("delete-btn")){
        deleteStudent(id);
    }else if(clickedButton.classList.contains("update-btn")){
        updateMarks(id);
    }
})

/*remove student from array then refresh dashboard**/
function deleteStudent(id){
    const updatedList=[]

    for(let i=0; i<students.length;i++){
        if(students[i].id!==id){
            /*back*/
        }
    }
    students=updatedList;
    renderStudents(students);
}

/**Ask for marks and validate them */
function updateMarks(id){
 const input=prompt("Enter the new marks(0 to 100):");

 if(input===null) return;
 constnewMarks=Number(input);

 if(input.trim()===""||isNaN(newMarks)||newMarks<0|| newMarks>100){
    alert("Invalid marks.Enter a number between 0and 100.");
    return;
 }
     }
 /*back here*/

/**Search box */
const searchInput=document.getElementById("search-input");
const searchMessage=document.getElementById("search-message");