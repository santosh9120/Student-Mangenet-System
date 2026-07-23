-- ===========================================
-- Student Management System Database
-- ===========================================

CREATE DATABASE IF NOT EXISTS student_management;

USE student_management;

-- ===========================================
-- Admin Table
-- ===========================================

CREATE TABLE admin (

    id INT AUTO_INCREMENT PRIMARY KEY,

    username VARCHAR(50) NOT NULL UNIQUE,

    password VARCHAR(255) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

INSERT INTO admin(username,password)

VALUES

('admin','admin123');

-- ===========================================
-- Students Table
-- ===========================================

CREATE TABLE students (

    id INT AUTO_INCREMENT PRIMARY KEY,

    fullname VARCHAR(100) NOT NULL,

    email VARCHAR(100) NOT NULL UNIQUE,

    mobile VARCHAR(15) NOT NULL,

    rollno VARCHAR(30) NOT NULL UNIQUE,

    department VARCHAR(100) NOT NULL,

    password VARCHAR(255) NOT NULL,

    photo VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

-- ===========================================
-- Courses Table
-- ===========================================

CREATE TABLE courses (

    id INT AUTO_INCREMENT PRIMARY KEY,

    course_name VARCHAR(100) NOT NULL,

    course_code VARCHAR(30) NOT NULL UNIQUE,

    credits INT NOT NULL,

    semester INT NOT NULL

);

INSERT INTO courses(course_name,course_code,credits,semester)

VALUES

('Data Structures','CS201',4,3),

('Java Programming','CS202',4,3),

('Database Management','CS203',4,4),

('Operating System','CS204',4,4),

('Computer Networks','CS205',4,5);

-- ===========================================
-- Attendance Table
-- ===========================================

CREATE TABLE attendance (

    id INT AUTO_INCREMENT PRIMARY KEY,

    student_id INT,

    attendance_date DATE,

    status ENUM('Present','Absent') DEFAULT 'Present',

    FOREIGN KEY(student_id)

    REFERENCES students(id)

    ON DELETE CASCADE

);

-- ===========================================
-- Results Table
-- ===========================================

CREATE TABLE results (

    id INT AUTO_INCREMENT PRIMARY KEY,

    student_id INT,

    semester INT,

    subject VARCHAR(100),

    marks INT,

    grade VARCHAR(5),

    FOREIGN KEY(student_id)

    REFERENCES students(id)

    ON DELETE CASCADE

);

-- ===========================================
-- Departments Table
-- ===========================================

CREATE TABLE departments (

    id INT AUTO_INCREMENT PRIMARY KEY,

    department_name VARCHAR(100) UNIQUE

);

INSERT INTO departments(department_name)

VALUES

('Computer Engineering'),

('Information Technology'),

('Mechanical Engineering'),

('Civil Engineering'),

('Electrical Engineering'),

('Electronics Engineering');

-- ===========================================
-- Notices Table
-- ===========================================

CREATE TABLE notices (

    id INT AUTO_INCREMENT PRIMARY KEY,

    title VARCHAR(200),

    message TEXT,

    notice_date DATE

);

INSERT INTO notices(title,message,notice_date)

VALUES

('Welcome',

'Welcome to Student Management System',

CURDATE());

-- ===========================================
-- Fees Table
-- ===========================================

CREATE TABLE fees (

    id INT AUTO_INCREMENT PRIMARY KEY,

    student_id INT,

    total_fee DECIMAL(10,2),

    paid_fee DECIMAL(10,2),

    balance_fee DECIMAL(10,2),

    FOREIGN KEY(student_id)

    REFERENCES students(id)

    ON DELETE CASCADE

);

-- ===========================================
-- Timetable Table
-- ===========================================

CREATE TABLE timetable (

    id INT AUTO_INCREMENT PRIMARY KEY,

    department VARCHAR(100),

    semester INT,

    subject VARCHAR(100),

    faculty VARCHAR(100),

    day_name VARCHAR(20),

    start_time TIME,

    end_time TIME

);

-- ===========================================
-- Sample Student
-- ===========================================

INSERT INTO students(

fullname,

email,

mobile,

rollno,

department,

password

)

VALUES

(

'Santosh',

'santosh@gmail.com',

'9876543210',

'CE001',

'Computer Engineering',

'123456'

);

-- ===========================================
-- Sample Attendance
-- ===========================================

INSERT INTO attendance(

student_id,

attendance_date,

status

)

VALUES

(

1,

CURDATE(),

'Present'

);

-- ===========================================
-- Sample Result
-- ===========================================

INSERT INTO results(

student_id,

semester,

subject,

marks,

grade

)

VALUES

(1,3,'Java Programming',92,'A+'),

(1,3,'Database',88,'A'),

(1,3,'Data Structures',95,'A+');

-- ===========================================
-- Sample Fees
-- ===========================================

INSERT INTO fees(

student_id,

total_fee,

paid_fee,

balance_fee

)

VALUES

(

1,

50000,

35000,

15000

);

-- ===========================================
-- Sample Timetable
-- ===========================================

INSERT INTO timetable(

department,

semester,

subject,

faculty,

day_name,

start_time,

end_time

)

VALUES

('Computer Engineering',3,'Java Programming','Mr. Sharma','Monday','09:00:00','10:00:00'),

('Computer Engineering',3,'Database','Mrs. Patel','Tuesday','10:00:00','11:00:00'),

('Computer Engineering',3,'Data Structures','Mr. Verma','Wednesday','11:00:00','12:00:00');
