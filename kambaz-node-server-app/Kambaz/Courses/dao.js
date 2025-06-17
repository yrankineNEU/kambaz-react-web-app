import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export function createCourse(course) {
  const newCourse = { ...course, _id: uuidv4() };
  Database.courses = [...Database.courses, newCourse];
  return newCourse;
}

export function deleteCourse(courseId) {
  const { courses, enrollments } = Database;
  Database.courses = courses.filter((course) => course._id !== courseId);
  Database.enrollments = enrollments.filter(
    (enrollment) => enrollment.course !== courseId
  );
}
export function updateCourse(courseId, courseUpdates) {
  const { courses } = Database;
  const course = courses.find((course) => course._id === courseId);
  Object.assign(course, courseUpdates);
  return course;
}

export function findAllCourses() {
  return model.find();
}
export function findCoursesForEnrolledUser(userId) {
  const { courses, enrollments } = Database;

  console.log("findCoursesForEnrolledUser called with userId:", userId);
  console.log("Total courses:", courses.length);
  console.log("Total enrollments:", enrollments.length);
  console.log(
    "Enrollments for user:",
    enrollments.filter((e) => e.user === userId)
  );

  const enrolledCourses = courses.filter((course) =>
    enrollments.some(
      (enrollment) =>
        enrollment.user === userId && enrollment.course === course._id
    )
  );

  console.log("Enrolled courses found:", enrolledCourses);
  return enrolledCourses;
}
// delete this log statement
