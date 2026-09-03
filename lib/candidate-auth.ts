export interface CandidateProfile {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  targetRole: string;
  experienceLevel: string;
  country: string;
  skills: string[];
  bio: string;
  isPublishedToTalentBoard: boolean;
  alertCategories: string[];
  joinedDate: string;
}

const STORAGE_KEY = 'us_candidate_session_v1';

export function getCandidateProfile(): CandidateProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export function saveCandidateProfile(profile: CandidateProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error(e);
  }
}

export function clearCandidateSession(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error(e);
  }
}
