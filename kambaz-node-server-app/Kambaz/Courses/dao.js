import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export function createCourse(course) {
  const newCourse = { ...course, _id: uuidv4() };
  return model.create(newCourse);
}

export function deleteCourse(courseId) {
  return model.deleteOne({ _id: courseId });
}

export function updateCourse(courseId, courseUpdates) {
  return model.updateOne({ _id: courseId }, { $set: courseUpdates });
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
