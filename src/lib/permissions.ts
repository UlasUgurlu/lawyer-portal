import { UserRole } from '@prisma/client';

export interface UserPermissions {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  firmId?: string;
}

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  CLIENT: 1,
  PARALEGAL: 2,
  LAWYER: 3,
  FIRM_ADMIN: 4,
  SUPER_ADMIN: 5,
};

export const hasPermission = (userRole: UserRole, requiredRole: UserRole): boolean => {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
};

export const isSuperAdmin = (userRole: UserRole): boolean => {
  return userRole === UserRole.SUPER_ADMIN;
};

export const isFirmAdmin = (userRole: UserRole): boolean => {
  return userRole === UserRole.FIRM_ADMIN || isSuperAdmin(userRole);
};

export const isLawyer = (userRole: UserRole): boolean => {
  return userRole === UserRole.LAWYER || isFirmAdmin(userRole);
};

export const isParalegal = (userRole: UserRole): boolean => {
  return userRole === UserRole.PARALEGAL || isLawyer(userRole);
};

export const isClient = (userRole: UserRole): boolean => {
  return userRole === UserRole.CLIENT;
};

export const canAccessCase = (
  userRole: UserRole,
  userFirmId: string,
  caseFirmId: string,
  caseAssignments?: { membershipId: string }[],
  userMembershipId?: string
): boolean => {
  // Super admins can access everything
  if (isSuperAdmin(userRole)) return true;
  
  // Users can only access cases in their firm
  if (userFirmId !== caseFirmId) return false;
  
  // Firm admins can access all cases in their firm
  if (isFirmAdmin(userRole)) return true;
  
  // Lawyers and paralegals can access assigned cases
  if (isLawyer(userRole) || isParalegal(userRole)) {
    return caseAssignments?.some(assignment => assignment.membershipId === userMembershipId) || false;
  }
  
  // Clients need specific case participant relationship (handled elsewhere)
  return false;
};

export const canAccessDocument = (
  userRole: UserRole,
  documentVisibility: 'INTERNAL' | 'CLIENT'
): boolean => {
  if (documentVisibility === 'INTERNAL') {
    return !isClient(userRole);
  }
  return true; // CLIENT visibility allows all roles
};

export const canManageUsers = (userRole: UserRole): boolean => {
  return isFirmAdmin(userRole);
};

export const canManageClients = (userRole: UserRole): boolean => {
  return isLawyer(userRole);
};

export const canCreateCases = (userRole: UserRole): boolean => {
  return isLawyer(userRole);
};

export const canCreateInvoices = (userRole: UserRole): boolean => {
  return isLawyer(userRole);
};

export const canViewReports = (userRole: UserRole): boolean => {
  return isLawyer(userRole);
};

export const canAccessAuditLogs = (userRole: UserRole): boolean => {
  return isFirmAdmin(userRole);
};
