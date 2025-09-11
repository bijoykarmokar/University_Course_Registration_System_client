// Define all roles in the system
export const ROLES = {
  ADMIN: "admin",
  STUDENT: "student",
  ADVISOR: "advisor",
};

// Check if the current user has access to a certain role
export const hasAccess = (userRole, allowedRoles = []) => {
  if (!userRole) return false;
  return allowedRoles.includes(userRole);
};
