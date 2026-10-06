'use client';

export type PlanTier = 'free' | 'starter' | 'fast_track' | 'vip';

export interface GoogleUserProfile {
  id: string;
  name: string;
  email: string;
  picture: string;
  plan: PlanTier;
  credits: number;
  creditsMonth: string; // e.g. "2026-10"
  createdAt: string;
  visaStatus?: string;
  phone?: string;
}

export interface CandidateDossier {
  cvText: string;
  cvFileName?: string;
  targetRole: string;
  targetCompany: string;
  coverLetter: string;
  skills: string[];
  lastUpdated: string;
}

export interface SavedOutput {
  id: string;
  type: 'ats_resume' | 'cover_letter' | 'outreach' | 'evaluation';
  title: string;
  company?: string;
  content: string;
  createdAt: string;
}

export interface ConnectionContact {
  id: string;
  name: string;
  organization: string;
  role: string;
  type: 'recruiter' | 'hiring_manager' | 'professor';
  email?: string;
  linkedInUrl?: string;
  status: 'Initiated' | 'Follow-up Due' | 'In Discussion' | 'Connected';
  nextFollowUpDate?: string;
  notes?: string;
}

const STORAGE_KEYS = {
  USER: 'usc_google_user_v2',
  DOSSIER: 'usc_candidate_dossier_v2',
  SAVED_OUTPUTS: 'usc_saved_outputs_v2',
  CONNECTIONS: 'usc_connections_v2',
  TRACKED_APPS: 'tracked_applications',
  CREDITS: 'usc_app_credits'
};

const DEFAULT_MONTHLY_FREE_CREDITS = 5;

export function getScopedKey(baseKey: string): string {
  if (typeof window === 'undefined') return baseKey;
  try {
    const rawUser = localStorage.getItem(STORAGE_KEYS.USER);
    if (rawUser) {
      const u = JSON.parse(rawUser);
      const identifier = u.email || u.id;
      if (identifier) {
        return `${baseKey}_${identifier.replace(/[^a-zA-Z0-9]/g, '_')}`;
      }
    }
  } catch (e) {}
  return baseKey;
}

function getCurrentMonthKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

export function getCurrentUser(): GoogleUserProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    if (!raw) return null;
    const user: GoogleUserProfile = JSON.parse(raw);

    // Monthly credit reset check
    const currentMonth = getCurrentMonthKey();
    if (user.creditsMonth !== currentMonth) {
      const resetCredits = user.plan === 'free' ? DEFAULT_MONTHLY_FREE_CREDITS : (user.credits + DEFAULT_MONTHLY_FREE_CREDITS);
      user.credits = resetCredits;
      user.creditsMonth = currentMonth;
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      localStorage.setItem(STORAGE_KEYS.CREDITS, resetCredits.toString());
    }

    return user;
  } catch (e) {
    console.warn('Error reading user session:', e);
    return null;
  }
}

export function saveCurrentUser(user: GoogleUserProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    localStorage.setItem(STORAGE_KEYS.CREDITS, user.credits.toString());
  } catch (e) {
    console.warn('Error saving user session:', e);
  }
}

export function createGoogleUserSession(
  name: string,
  email: string,
  picture?: string,
  chosenPlan: PlanTier = 'free'
): GoogleUserProfile {
  const currentMonth = getCurrentMonthKey();
  const initialCredits = chosenPlan === 'free' ? 5 : chosenPlan === 'fast_track' ? 25 : 100;

  // Generate clean initial avatar if picture not provided
  const avatar = picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2563EB&color=fff&bold=true`;

  const user: GoogleUserProfile = {
    id: `g_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    name,
    email,
    picture: avatar,
    plan: chosenPlan,
    credits: initialCredits,
    creditsMonth: currentMonth,
    createdAt: new Date().toISOString(),
    visaStatus: 'F-1 OPT / STEM OPT (No Initial Sponsorship Required)',
    phone: ''
  };

  saveCurrentUser(user);
  return user;
}

export function logoutUser(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEYS.USER);
  } catch (e) {
    console.warn('Error logging out:', e);
  }
}

export function decrementUserCredit(): number {
  const user = getCurrentUser();
  if (!user) return 0;
  if (user.credits <= 0) return 0;

  user.credits -= 1;
  saveCurrentUser(user);
  return user.credits;
}

export function getCandidateDossier(): CandidateDossier {
  const fallback: CandidateDossier = {
    cvText: '',
    targetRole: '',
    targetCompany: '',
    coverLetter: '',
    skills: [],
    lastUpdated: new Date().toISOString()
  };

  if (typeof window === 'undefined') return fallback;
  try {
    const scopedKey = getScopedKey(STORAGE_KEYS.DOSSIER);
    const scopedRaw = localStorage.getItem(scopedKey);
    if (scopedRaw) return JSON.parse(scopedRaw);

    const raw = localStorage.getItem(STORAGE_KEYS.DOSSIER);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

export function saveCandidateDossier(dossier: Partial<CandidateDossier>): CandidateDossier {
  const current = getCandidateDossier();
  const updated: CandidateDossier = {
    ...current,
    ...dossier,
    lastUpdated: new Date().toISOString()
  };

  if (typeof window !== 'undefined') {
    try {
      const serialized = JSON.stringify(updated);
      localStorage.setItem(STORAGE_KEYS.DOSSIER, serialized);
      const scopedKey = getScopedKey(STORAGE_KEYS.DOSSIER);
      if (scopedKey !== STORAGE_KEYS.DOSSIER) {
        localStorage.setItem(scopedKey, serialized);
      }
    } catch (e) {
      console.warn('Error saving candidate dossier:', e);
    }
  }

  return updated;
}

export function getSavedOutputs(): SavedOutput[] {
  if (typeof window === 'undefined') return [];
  try {
    const scopedKey = getScopedKey(STORAGE_KEYS.SAVED_OUTPUTS);
    const scopedRaw = localStorage.getItem(scopedKey);
    if (scopedRaw) return JSON.parse(scopedRaw);

    const raw = localStorage.getItem(STORAGE_KEYS.SAVED_OUTPUTS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveOutput(output: Omit<SavedOutput, 'id' | 'createdAt'>): SavedOutput {
  const outputs = getSavedOutputs();
  const newOutput: SavedOutput = {
    ...output,
    id: `out_${Date.now()}`,
    createdAt: new Date().toISOString()
  };

  const updated = [newOutput, ...outputs];
  if (typeof window !== 'undefined') {
    try {
      const serialized = JSON.stringify(updated);
      localStorage.setItem(STORAGE_KEYS.SAVED_OUTPUTS, serialized);
      const scopedKey = getScopedKey(STORAGE_KEYS.SAVED_OUTPUTS);
      if (scopedKey !== STORAGE_KEYS.SAVED_OUTPUTS) {
        localStorage.setItem(scopedKey, serialized);
      }
    } catch (e) {
      console.warn('Error saving output:', e);
    }
  }

  return newOutput;
}

export function deleteSavedOutput(id: string): void {
  const outputs = getSavedOutputs().filter(o => o.id !== id);
  if (typeof window !== 'undefined') {
    try {
      const serialized = JSON.stringify(outputs);
      localStorage.setItem(STORAGE_KEYS.SAVED_OUTPUTS, serialized);
      const scopedKey = getScopedKey(STORAGE_KEYS.SAVED_OUTPUTS);
      if (scopedKey !== STORAGE_KEYS.SAVED_OUTPUTS) {
        localStorage.setItem(scopedKey, serialized);
      }
    } catch (e) {
      console.warn('Error deleting output:', e);
    }
  }
}

export function getConnections(): ConnectionContact[] {
  if (typeof window === 'undefined') return [];
  try {
    const scopedKey = getScopedKey(STORAGE_KEYS.CONNECTIONS);
    const scopedRaw = localStorage.getItem(scopedKey);
    if (scopedRaw) return JSON.parse(scopedRaw);

    const raw = localStorage.getItem(STORAGE_KEYS.CONNECTIONS);
    if (raw) return JSON.parse(raw);
    
    // Default initial connections for demonstration
    const initial: ConnectionContact[] = [
      {
        id: 'conn_1',
        name: 'Sarah Jenkins',
        organization: 'Microsoft Cloud & AI Recruitment',
        role: 'Senior Technical Talent Acquisition Partner',
        type: 'recruiter',
        email: 'talent-inbound@microsoft.com',
        linkedInUrl: 'https://linkedin.com/in/recruiter-talent',
        status: 'Follow-up Due',
        nextFollowUpDate: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString().split('T')[0],
        notes: 'Submitted tailored application dossier. Sent 3-line connect note on LinkedIn.'
      },
      {
        id: 'conn_2',
        name: 'Dr. Michael Chen',
        organization: 'Stanford School of Engineering',
        role: 'Professor & Graduate Lab Director',
        type: 'professor',
        email: 'chen-lab@stanford.edu',
        status: 'Initiated',
        nextFollowUpDate: new Date(Date.now() + 1000 * 60 * 60 * 96).toISOString().split('T')[0],
        notes: 'Sent cold outreach email regarding Graduate Research Assistantship (GRA) funding.'
      }
    ];

    localStorage.setItem(STORAGE_KEYS.CONNECTIONS, JSON.stringify(initial));
    return initial;
  } catch (e) {
    return [];
  }
}

export function saveConnection(contact: Omit<ConnectionContact, 'id'>): ConnectionContact {
  const connections = getConnections();
  const newConn: ConnectionContact = {
    ...contact,
    id: `conn_${Date.now()}`
  };

  const updated = [newConn, ...connections];
  if (typeof window !== 'undefined') {
    try {
      const serialized = JSON.stringify(updated);
      localStorage.setItem(STORAGE_KEYS.CONNECTIONS, serialized);
      const scopedKey = getScopedKey(STORAGE_KEYS.CONNECTIONS);
      if (scopedKey !== STORAGE_KEYS.CONNECTIONS) {
        localStorage.setItem(scopedKey, serialized);
      }
    } catch (e) {
      console.warn('Error saving connection:', e);
    }
  }

  return newConn;
}

export function deleteConnection(id: string): void {
  const connections = getConnections().filter(c => c.id !== id);
  if (typeof window !== 'undefined') {
    try {
      const serialized = JSON.stringify(connections);
      localStorage.setItem(STORAGE_KEYS.CONNECTIONS, serialized);
      const scopedKey = getScopedKey(STORAGE_KEYS.CONNECTIONS);
      if (scopedKey !== STORAGE_KEYS.CONNECTIONS) {
        localStorage.setItem(scopedKey, serialized);
      }
    } catch (e) {
      console.warn('Error deleting connection:', e);
    }
  }
}

export function exportVaultBackup(): string {
  if (typeof window === 'undefined') return '{}';
  const user = getCurrentUser();
  const dossier = getCandidateDossier();
  const outputs = getSavedOutputs();
  const connections = getConnections();
  let apps = [];
  try {
    const rawApps = localStorage.getItem('tracked_applications');
    if (rawApps) apps = JSON.parse(rawApps);
  } catch (e) {}

  const payload = {
    platform: 'US Career Solutions Candidate Vault',
    version: '2.0',
    exportedAt: new Date().toISOString(),
    user,
    dossier,
    outputs,
    connections,
    applications: apps
  };
  return JSON.stringify(payload, null, 2);
}

export function importVaultBackup(jsonStr: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const data = JSON.parse(jsonStr);
    if (data.dossier) saveCandidateDossier(data.dossier);
    if (Array.isArray(data.outputs)) {
      localStorage.setItem(STORAGE_KEYS.SAVED_OUTPUTS, JSON.stringify(data.outputs));
      const scopedKey = getScopedKey(STORAGE_KEYS.SAVED_OUTPUTS);
      if (scopedKey !== STORAGE_KEYS.SAVED_OUTPUTS) {
        localStorage.setItem(scopedKey, JSON.stringify(data.outputs));
      }
    }
    if (Array.isArray(data.connections)) {
      localStorage.setItem(STORAGE_KEYS.CONNECTIONS, JSON.stringify(data.connections));
      const scopedKey = getScopedKey(STORAGE_KEYS.CONNECTIONS);
      if (scopedKey !== STORAGE_KEYS.CONNECTIONS) {
        localStorage.setItem(scopedKey, JSON.stringify(data.connections));
      }
    }
    if (Array.isArray(data.applications)) {
      localStorage.setItem('tracked_applications', JSON.stringify(data.applications));
    }
    if (data.user) {
      saveCurrentUser(data.user);
    }
    return true;
  } catch (e) {
    console.warn('Failed to import backup:', e);
    return false;
  }
}

export function upgradeUserPlan(newPlan: PlanTier, creditsToAdd?: number): GoogleUserProfile | null {
  const user = getCurrentUser();
  if (!user) return null;
  const creditsMap: Record<PlanTier, number> = {
    free: 5,
    starter: 15,
    fast_track: 35,
    vip: 100
  };
  const added = creditsToAdd !== undefined ? creditsToAdd : creditsMap[newPlan];
  user.plan = newPlan;
  user.credits = Math.max(user.credits, 0) + added;
  saveCurrentUser(user);
  return user;
}

export interface PaymentSubmission {
  id: string;
  userId?: string;
  plan: PlanTier;
  currency: 'BDT' | 'USD';
  amount: string;
  method: 'bkash' | 'nagad' | 'rocket' | 'us_bank_wire' | 'card';
  senderPhone?: string;
  trxId?: string;
  senderName?: string;
  senderBank?: string;
  reference?: string;
  status: 'pending' | 'verified';
  submittedAt: string;
}

export function savePaymentSubmission(sub: Omit<PaymentSubmission, 'id' | 'submittedAt'>): PaymentSubmission {
  const newSub: PaymentSubmission = {
    ...sub,
    id: `pay_${Date.now()}`,
    submittedAt: new Date().toISOString()
  };
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem('usc_payments_history');
      const list: PaymentSubmission[] = raw ? JSON.parse(raw) : [];
      list.unshift(newSub);
      localStorage.setItem('usc_payments_history', JSON.stringify(list));
    } catch (e) {
      console.warn('Error saving payment record:', e);
    }
  }
  return newSub;
}

export function getPaymentSubmissions(): PaymentSubmission[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('usc_payments_history');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

