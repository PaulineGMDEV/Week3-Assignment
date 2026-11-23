/* =================================
   1. STUDENT DATA AND LOCAL STORAGE
================================= */

// Get previously saved students from localStorage.
// If no students have been saved, use an empty array.

let students = JSON.parse(localStorage.getItem("students")) || [];


// Save student information in localStorage.

function saveStudents() {
    localStorage.setItem("students", JSON.stringify(students));
}


/* =================================
   2. STUDENT REGISTRATION
================================= */

// Get the registration form from HTML.

const studentForm = document.getElementById("student-form");


// Listen for form submission.

if (studentForm) {

    studentForm.addEventListener("submit", function(event) {

        event.preventDefault();

        // Get values entered by the user.

        let name = document.getElementById("student-name").value.trim();

        let ageInput = document.getElementById("student-age").value;

        let gender = document.getElementById("student-gender").value;

        let course = document.getElementById("student-course").value;

        let marksInput = document.getElementById("student-marks").value;

        let age = Number(ageInput);

        let marks = Number(marksInput);


        // Get the message element.

        let message = document.getElementById("form-message");


        // Check if any field is empty.

        if (
            name === "" ||
            ageInput === "" ||
            gender === "" ||
            course === "" ||
            marksInput === ""
        ) {

            message.textContent = "Please fill in all fields.";

            message.className = "error";

            return;
        }


        // Validate age.

        if (!Number.isFinite(age) || age < 1 || age > 120) {

            message.textContent = "Please enter a valid age.";

            message.className = "error";

            return;
        }


        // Validate marks.

        if (!Number.isFinite(marks) || marks < 0 || marks > 100) {

            message.textContent = "Marks must be between 0 and 100.";

            message.className = "error";

            return;
        }


        // Create a student object.

        let student = {

            id: Date.now(),

            name: name,

            age: age,

            gender: gender,

            course: course,

            marks: marks

        };


        // Add the student object to our array.

        students.push(student);


        // Save students.

        saveStudents();


        // Update the table and statistics.

        displayStudents();

        updateStatistics();


        // Reset the form.

        studentForm.reset();


        // Display success message.

        message.textContent = "Student registered successfully!";

        message.className = "success";

    });

}


/* =================================
   3. STUDENT PERFORMANCE
================================= */

// Determine student performance using marks.

function getPerformance(marks) {

    if (marks >= 80) {

        return "Excellent";

    } else if (marks >= 70) {

        return "Very Good";

    } else if (marks >= 60) {

        return "Good";

    } else if (marks >= 50) {

        return "Average";

    } else {

        return "Failed";

    }

}


// Give each performance category a CSS class.

function getPerformanceClass(performance) {

    return performance.toLowerCase().replace(" ", "-");

}


/* =================================
   4. DISPLAY STUDENTS
================================= */

function displayStudents(studentList = students) {

    // Get the table body.

    let table = document.getElementById("student-table");


    // Stop if we are not on the dashboard page.

    if (!table) return;


    // Clear the previous table contents.

    table.innerHTML = "";


    // Check whether there are students.

    if (studentList.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="7" class="empty-state">
                    No students found.
                </td>
            </tr>
        `;

        return;
    }


    // Loop through the student array.

    studentList.forEach(function(student) {

        // Calculate performance.

        let performance = getPerformance(Number(student.marks));

        let performanceClass = getPerformanceClass(performance);


        // Create a table row.

        let row = document.createElement("tr");


        // Insert student information.

        row.innerHTML = `
            <td class="student-name"></td>
            <td>${student.age}</td>
            <td>${student.gender}</td>
            <td>${student.course}</td>
            <td>${student.marks}%</td>

            <td>
                <span class="performance ${performanceClass}">
                    ${performance}
                </span>
            </td>

            <td>
                <button
                    class="action-btn"
                    onclick="updateStudent(${student.id})">
                    Edit
                </button>

                <button
                    class="action-btn delete-btn"
                    onclick="deleteStudent(${student.id})">
                    Delete
                </button>
            </td>
        `;


        // Safely display the student's name.

        row.querySelector(".student-name").textContent = student.name;


        // Add the row to the table.

        table.appendChild(row);

    });

}


/* =================================
   5. UPDATE STUDENT MARKS
================================= */

function updateStudent(id) {

    // Find the student using their ID.

    let student = students.find(function(item) {

        return item.id === id;

    });


    // Ask the user for new marks.

    let newMarks = prompt("Enter the new marks for " + student.name);


    // Stop if the user cancels.

    if (newMarks === null) {

        return;

    }


    // Validate the new marks.

    if (
        newMarks.trim() === "" ||
        !Number.isFinite(Number(newMarks)) ||
        Number(newMarks) < 0 ||
        Number(newMarks) > 100
    ) {

        alert("Please enter marks between 0 and 100.");

        return;

    }


    // Update the student's marks.

    student.marks = Number(newMarks);


    // Save the changes.

    saveStudents();


    // Refresh the table and dashboard.

    displayStudents();

    updateStatistics();

}


/* =================================
   6. DELETE STUDENT
================================= */

function deleteStudent(id) {

    // Ask for confirmation.

    let confirmDelete = confirm("Are you sure you want to delete this student?");


    if (confirmDelete) {

        // Keep all students except the selected student.

        students = students.filter(function(student) {

            return student.id !== id;

        });


        // Save the updated array.

        saveStudents();


        // Refresh the page information.

        displayStudents();

        updateStatistics();

    }

}


/* =================================
   7. SEARCH STUDENTS
================================= */

// Get the search input.

const searchInput = document.getElementById("search-input");


if (searchInput) {

    searchInput.addEventListener("input", function() {

        // Get what the user has typed.

        let searchValue = searchInput.value.toLowerCase();


        // Filter students by name.

        let filteredStudents = students.filter(function(student) {

            return student.name.toLowerCase().includes(searchValue);

        });


        // Display matching students.

        displayStudents(filteredStudents);

    });

}


/* =================================
   8. DASHBOARD STATISTICS
================================= */

function updateStatistics() {

    // Find the dashboard elements.

    let totalElement = document.getElementById("total-students");

    let passedElement = document.getElementById("passed-students");

    let failedElement = document.getElementById("failed-students");

    let averageElement = document.getElementById("average-marks");


    // Stop if the dashboard elements do not exist.

    if (!totalElement) return;


    // Count total students.

    let total = students.length;


    // Start passed and failed counters.

    let passed = 0;

    let failed = 0;

    let totalMarks = 0;


    // Loop through students.

    students.forEach(function(student) {

        totalMarks += Number(student.marks);


        if (student.marks >= 50) {

            passed++;

        } else {

            failed++;

        }

    });


    // Calculate average marks.

    let average = total === 0 ? 0 : Math.round(totalMarks / total);


    // Display the statistics.

    totalElement.textContent = total;

    passedElement.textContent = passed;

    failedElement.textContent = failed;

    averageElement.textContent = average + "%";

}


/* =================================
   9. CONTACT FORM VALIDATION
================================= */

const contactForm = document.getElementById("contact-form");


if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();


        // Get contact form values.

        let name = document.getElementById("contact-name").value.trim();

        let email = document.getElementById("contact-email").value.trim();

        let subject = document.getElementById("contact-subject").value.trim();

        let message = document.getElementById("contact-message").value.trim();


        let feedback = document.getElementById("contact-feedback");


        // Check empty fields.

        if (!name || !email || !subject || !message) {

            feedback.textContent = "Please fill in all fields.";

            feedback.className = "error";

            return;

        }


        // Check email format.

        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email)) {

            feedback.textContent = "Please enter a valid email address.";

            feedback.className = "error";

            return;

        }


        // Check message length.

        if (message.length < 10) {

            feedback.textContent = "Your message must be at least 10 characters.";

            feedback.className = "error";

            return;

        }


        // Display success message.

        feedback.textContent = "Thank you! Your message has been received.";

        feedback.className = "success";


        // Clear the form.

        contactForm.reset();

    });

}


/* =================================
   10. MOBILE NAVIGATION
================================= */

// Get the hamburger button.

const menuToggle = document.getElementById("menu-toggle");


// Get the navigation menu.

const navMenu = document.getElementById("nav-menu");


if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function() {

        // Add or remove the open class.

        navMenu.classList.toggle("open");


        // Change hamburger into an X when open.

        if (navMenu.classList.contains("open")) {

            menuToggle.textContent = "×";

        } else {

            menuToggle.textContent = "☰";

        }

    });

}


/* =================================
   11. DISPLAY TODAY'S DATE
================================= */

const dateElement = document.getElementById("today-date");


if (dateElement) {

    let today = new Date();

    dateElement.textContent = today.toLocaleDateString("en-KE", {

        day: "numeric",

        month: "long",

        year: "numeric"

    });

}


/* =================================
   12. INITIAL PAGE DISPLAY
================================= */

// Display saved students when the dashboard opens.

displayStudents();

updateStatistics();