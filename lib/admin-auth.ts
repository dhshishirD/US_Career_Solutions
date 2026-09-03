const ADMIN_STORAGE_KEY = 'us_admin_authenticated_session';
const DEFAULT_PASSCODE = 'admin2026';

export function verifyAdminPasscode(passcode: string): boolean {
  return passcode.trim() === DEFAULT_PASSCODE;
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(ADMIN_STORAGE_KEY) === 'true';
  } catch (e) {
    return false;
  }
}

export function setAdminSession(auth: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    if (auth) {
      localStorage.setItem(ADMIN_STORAGE_KEY, 'true');
    } else {
      localStorage.removeItem(ADMIN_STORAGE_KEY);
    }
  } catch (e) {
    console.error(e);
  }
}
