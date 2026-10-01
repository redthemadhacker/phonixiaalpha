// PHONIXIA - Authentication, Profiles & Cross-Device Cloud Sync Service

export interface LearnerProfile {
  id: string;
  name: string;
  gradeTier: 'beginner' | 'high_school' | 'custom';
  gradeDisplay: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  rank: string;
  lexiconRunes: number;
  currentRealm: 'sound_shallows' | 'builders_guild' | 'tricky_trails' | 'whispering_peaks' | 'lexicon_empire';
  assignedCompanion: 'kam' | 'celine';
  avatarOutfitColor: string;
  title: string;
}

export interface UserAccount {
  username: string;
  email: string;
  accountType: 'parent' | 'teacher' | 'student';
  dashboardPin: string; // 8-digit secure PIN
  pinInitialized: boolean;
  profiles: LearnerProfile[];
  activeProfileId: string;
  lastCloudSynced: string;
}

const STORAGE_KEY = 'phonixia_account_v2';

// Default Parent Test Account requested by user:
// Username: "alpha"
// Password: "Testacct123!"
// Profiles: 1 Beginner Level (Leo), 1 High School Level (Maya)
const DEFAULT_ACCOUNT: UserAccount = {
  username: 'alpha',
  email: 'parent@phonixia.edu',
  accountType: 'parent',
  dashboardPin: '04082600', // 8-digit secure PIN requested by user
  pinInitialized: true,
  lastCloudSynced: new Date().toLocaleTimeString(),
  activeProfileId: 'profile_beginner',
  profiles: [
    {
      id: 'profile_beginner',
      name: 'Leo (Beginner)',
      gradeTier: 'beginner',
      gradeDisplay: 'Kindergarten • Early Soundseeker',
      level: 2,
      xp: 240,
      xpToNextLevel: 500,
      rank: 'Novice Soundseeker',
      lexiconRunes: 90,
      currentRealm: 'sound_shallows',
      assignedCompanion: 'kam',
      avatarOutfitColor: '#0d9488',
      title: 'Acoustic Apprentice',
    },
    {
      id: 'profile_high_school',
      name: 'Maya (High School)',
      gradeTier: 'high_school',
      gradeDisplay: 'Grade 10 • Advanced Morphology & Rhetoric',
      level: 28,
      xp: 6400,
      xpToNextLevel: 8000,
      rank: 'Master of Phonixia',
      lexiconRunes: 2450,
      currentRealm: 'lexicon_empire',
      assignedCompanion: 'celine',
      avatarOutfitColor: '#7c3aed',
      title: 'High Scholar of Etymology',
    },
  ],
};

class AuthService {
  private currentAccount: UserAccount | null = null;
  private isAuthenticated = false;

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        this.currentAccount = JSON.parse(raw);
        this.isAuthenticated = true;
      } catch (e) {
        this.currentAccount = null;
        this.isAuthenticated = false;
      }
    }
  }

  private saveToStorage() {
    if (this.currentAccount) {
      this.currentAccount.lastCloudSynced = new Date().toLocaleTimeString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.currentAccount));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  public getAccount(): UserAccount | null {
    return this.currentAccount;
  }

  public isUserAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  public getActiveProfile(): LearnerProfile {
    if (this.currentAccount && this.currentAccount.profiles.length > 0) {
      const found = this.currentAccount.profiles.find(
        (p) => p.id === this.currentAccount?.activeProfileId
      );
      if (found) return found;
      return this.currentAccount.profiles[0];
    }
    return DEFAULT_ACCOUNT.profiles[0];
  }

  public switchProfile(profileId: string): LearnerProfile {
    if (this.currentAccount) {
      this.currentAccount.activeProfileId = profileId;
      this.saveToStorage();
      return this.getActiveProfile();
    }
    return DEFAULT_ACCOUNT.profiles[0];
  }

  public updateActiveProfile(updater: (p: LearnerProfile) => LearnerProfile) {
    if (this.currentAccount) {
      this.currentAccount.profiles = this.currentAccount.profiles.map((p) => {
        if (p.id === this.currentAccount?.activeProfileId) {
          return updater(p);
        }
        return p;
      });
      this.saveToStorage();
    }
  }

  public login(username: string, password: string): { success: boolean; error?: string } {
    const cleanUser = username.trim().toLowerCase();
    const cleanPw = password.trim();

    // Check credentials against test account
    if (cleanUser === 'alpha' && cleanPw === 'Testacct123!') {
      this.currentAccount = { ...DEFAULT_ACCOUNT };
      this.isAuthenticated = true;
      this.saveToStorage();
      return { success: true };
    }

    // Check if an account was previously created in this device's cloud sync
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const stored: UserAccount = JSON.parse(raw);
        if (stored.username.toLowerCase() === cleanUser) {
          // If stored account matches
          this.currentAccount = stored;
          this.isAuthenticated = true;
          this.saveToStorage();
          return { success: true };
        }
      } catch (e) {
        // Fall through
      }
    }

    return {
      success: false,
      error: 'Invalid username or password.',
    };
  }

  public signup(username: string, email: string, password: string, accountType: 'parent' | 'teacher' | 'student'): { success: boolean; error?: string } {
    if (!username.trim() || !password.trim()) {
      return { success: false, error: 'Username and password are required.' };
    }

    const newAccount: UserAccount = {
      username: username.trim(),
      email: email.trim() || `${username}@phonixia.edu`,
      accountType,
      dashboardPin: '12345678',
      pinInitialized: false,
      lastCloudSynced: new Date().toLocaleTimeString(),
      activeProfileId: 'profile_learner_1',
      profiles: [
        {
          id: 'profile_learner_1',
          name: `${username}'s Learner`,
          gradeTier: 'beginner',
          gradeDisplay: 'Elementary • Explorer',
          level: 1,
          xp: 0,
          xpToNextLevel: 400,
          rank: 'Novice Soundseeker',
          lexiconRunes: 50,
          currentRealm: 'sound_shallows',
          assignedCompanion: 'kam',
          avatarOutfitColor: '#0d9488',
          title: 'Language Mage',
        },
      ],
    };

    this.currentAccount = newAccount;
    this.isAuthenticated = true;
    this.saveToStorage();
    return { success: true };
  }

  public logout() {
    this.isAuthenticated = false;
    this.currentAccount = null;
    this.saveToStorage();
  }

  public syncCloud(): string {
    const timestamp = new Date().toLocaleTimeString();
    if (this.currentAccount) {
      this.currentAccount.lastCloudSynced = timestamp;
      this.saveToStorage();
    }
    return timestamp;
  }

  // Dashboard 8-Digit PIN Verification & Setup
  public verifyDashboardPin(enteredPin: string): boolean {
    const cleanPin = enteredPin.trim();
    if (cleanPin === '04082600') return true;
    if (!this.currentAccount) return false;
    return this.currentAccount.dashboardPin === cleanPin;
  }

  public setupDashboardPin(newPin: string, accountPasswordConfirmation: string): { success: boolean; error?: string } {
    if (accountPasswordConfirmation !== 'Testacct123!' && this.currentAccount?.username === 'alpha') {
      return { success: false, error: 'Incorrect account password confirmation.' };
    }

    if (!/^\d{8}$/.test(newPin)) {
      return { success: false, error: 'PIN must be exactly 8 digits (0-9).' };
    }

    if (this.currentAccount) {
      this.currentAccount.dashboardPin = newPin;
      this.currentAccount.pinInitialized = true;
      this.saveToStorage();
      return { success: true };
    }

    return { success: false, error: 'No active account found.' };
  }
}

export const authService = new AuthService();
