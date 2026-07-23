-- ==========================================
-- Student Management System
-- Department Module
-- departments.sql
-- ==========================================

CREATE DATABASE IF NOT EXISTS student_management;

USE student_management;

-- ==========================================
-- Departments Table
-- ==========================================

DROP TABLE IF EXISTS departments;

CREATE TABLE departments (

    id INT AUTO_INCREMENT PRIMARY KEY,

    department_name VARCHAR(100) NOT NULL,

    department_code VARCHAR(20) UNIQUE NOT NULL,

    hod VARCHAR(100) NOT NULL,

    total_students INT DEFAULT 0,

    total_faculty INT DEFAULT 0,

    status ENUM('Active','Inactive') DEFAULT 'Active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP

);

-- ==========================================
-- Sample Data
-- ==========================================

INSERT INTO departments
(department_name, department_code, hod, total_students, total_faculty)
VALUES

('Computer Engineering','COMP','Dr. Rahul Sharma',420,28),

('Information Technology','IT','Dr. Priya Mehta',390,24),

('Artificial Intelligence','AI','Dr. Aman Verma',180,15),

('Mechanical Engineering','MECH','Dr. Sandeep Patil',310,21),

('Civil Engineering','CIVIL','Dr. Anil Kumar',260,18),

('Electrical Engineering','EEE','Dr. Kavita Joshi',240,17),

('Electronics Engineering','ECE','Dr. Nitin Deshmukh',280,20),

('Data Science','DS','Dr. Sneha Kulkarni',160,12),

('Cyber Security','CYBER','Dr. Vishal Singh',150,10),

('Robotics','ROBOT','Dr. Mahesh Rao',120,9);

-- ==========================================
-- View Data
-- ==========================================

SELECT * FROM departments;