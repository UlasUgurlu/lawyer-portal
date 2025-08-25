import { prisma } from './db';

export interface AuditLogData {
  action: string;
  entity: string;
  entityId: string;
  details?: any;
  actorId?: string;
  ip?: string;
  userAgent?: string;
}

export const auditLog = async (data: AuditLogData): Promise<void> => {
  try {
    await prisma.auditLog.create({
      data: {
        action: data.action,
        entity: data.entity,
        entityId: data.entityId,
        details: data.details,
        actorId: data.actorId,
        ip: data.ip,
        ua: data.userAgent,
      },
    });
  } catch (error) {
    console.error('Failed to create audit log:', error);
    // Don't throw to avoid breaking the main operation
  }
};

export const logUserAction = async (
  actorId: string,
  action: string,
  entityType: string,
  entityId: string,
  details?: any,
  request?: { ip?: string; headers?: { 'user-agent'?: string } }
): Promise<void> => {
  await auditLog({
    action,
    entity: entityType,
    entityId,
    details,
    actorId,
    ip: request?.ip,
    userAgent: request?.headers?.['user-agent'],
  });
};

// Common audit actions
export const AUDIT_ACTIONS = {
  // User actions
  USER_LOGIN: 'USER_LOGIN',
  USER_LOGOUT: 'USER_LOGOUT',
  USER_REGISTER: 'USER_REGISTER',
  USER_PASSWORD_CHANGE: 'USER_PASSWORD_CHANGE',
  USER_2FA_ENABLE: 'USER_2FA_ENABLE',
  USER_2FA_DISABLE: 'USER_2FA_DISABLE',
  USER_PROFILE_UPDATE: 'USER_PROFILE_UPDATE',
  
  // Case actions
  CASE_CREATE: 'CASE_CREATE',
  CASE_UPDATE: 'CASE_UPDATE',
  CASE_DELETE: 'CASE_DELETE',
  CASE_VIEW: 'CASE_VIEW',
  CASE_CLOSE: 'CASE_CLOSE',
  CASE_REOPEN: 'CASE_REOPEN',
  
  // Document actions
  DOCUMENT_UPLOAD: 'DOCUMENT_UPLOAD',
  DOCUMENT_DOWNLOAD: 'DOCUMENT_DOWNLOAD',
  DOCUMENT_DELETE: 'DOCUMENT_DELETE',
  DOCUMENT_UPDATE: 'DOCUMENT_UPDATE',
  DOCUMENT_VIEW: 'DOCUMENT_VIEW',
  
  // Message actions
  MESSAGE_SEND: 'MESSAGE_SEND',
  MESSAGE_READ: 'MESSAGE_READ',
  MESSAGE_DELETE: 'MESSAGE_DELETE',
  
  // Invoice actions
  INVOICE_CREATE: 'INVOICE_CREATE',
  INVOICE_UPDATE: 'INVOICE_UPDATE',
  INVOICE_SEND: 'INVOICE_SEND',
  INVOICE_PAY: 'INVOICE_PAY',
  INVOICE_DELETE: 'INVOICE_DELETE',
  
  // Admin actions
  USER_INVITE: 'USER_INVITE',
  USER_ROLE_CHANGE: 'USER_ROLE_CHANGE',
  USER_DEACTIVATE: 'USER_DEACTIVATE',
  FIRM_SETTINGS_UPDATE: 'FIRM_SETTINGS_UPDATE',
  
  // Security actions
  PASSWORD_RESET_REQUEST: 'PASSWORD_RESET_REQUEST',
  PASSWORD_RESET_COMPLETE: 'PASSWORD_RESET_COMPLETE',
  FAILED_LOGIN_ATTEMPT: 'FAILED_LOGIN_ATTEMPT',
  ACCOUNT_LOCKED: 'ACCOUNT_LOCKED',
} as const;

// Entity types
export const AUDIT_ENTITIES = {
  USER: 'User',
  CASE: 'Case',
  DOCUMENT: 'Document',
  MESSAGE: 'Message',
  INVOICE: 'Invoice',
  CLIENT: 'Client',
  FIRM: 'Firm',
  TASK: 'Task',
  EVENT: 'Event',
} as const;
