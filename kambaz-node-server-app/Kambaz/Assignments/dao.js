import { v4 as uuidv4 } from "uuid";
import Database from "../Database/index.js";

export function createAssignment(assignment) {
  const newAssignment = { ...assignment, _id: uuidv4() };
  Database.assignments = [...Database.assignments, newAssignment];
  return newAssignment;
}

export const updateAssignment = (assignmentId, assignmentUpdates) => {
  const assignmentIndex = assignments.findIndex((a) => a._id === assignmentId);

  if (assignmentIndex === -1) {
    throw new Error(`Assignment with ID ${assignmentId} not found`);
  }

  assignments[assignmentIndex] = {
    ...assignments[assignmentIndex],
    ...assignmentUpdates,
  };

  return assignments[assignmentIndex];
};

export function findAssignmentsForCourse(courseId) {
  const { assignments } = Database;
  return assignments.filter((assignment) => assignment.course === courseId);
}

export function deleteAssignment(assignmentId) {
  const { assignments } = Database;
  Database.assignments = assignments.filter(
    (assignment) => assignment._id !== assignmentId
  );
}
