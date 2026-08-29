import { TestResult, UserSettings } from '../types';

const STORAGE_KEY_RESULTS = 'keypulse_test_results_v1';
const STORAGE_KEY_SETTINGS = 'keypulse_user_settings_v1';
const STORAGE_KEY_CHALLENGES = 'keypulse_completed_challenges_v1';
const STORAGE_KEY_REGISTERED_USERS = 'typerca_registered_users_v1';

export interface RegisteredUserRecord {
  id: string;
  username: string;
  uniqueHandle: string;
  wpm: number;
  accuracy: number;
  testsCount: number;
  registeredDate: string;
  badge: string;
}

export function getRegisteredUsers(): RegisteredUserRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_REGISTERED_USERS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveOrUpdateRegisteredUser(
  username: string,
  wpm: number,
  accuracy: number,
  testsCount: number
): RegisteredUserRecord[] {
  if (typeof window === 'undefined') return [];
  const cleanUsername = username.trim();
  if (!cleanUsername || cleanUsername === 'Pro Typist' || cleanUsername.length < 3) return getRegisteredUsers();

  const handle = `@${cleanUsername.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
  const users = getRegisteredUsers();
  
  const existingIndex = users.findIndex(
    (u) => u.username.toLowerCase() === cleanUsername.toLowerCase() || u.uniqueHandle.toLowerCase() === handle
  );

  let badge = '🌱 Novice';
  if (wpm >= 140) badge = '👑 Apex Titan';
  else if (wpm >= 110) badge = '🏆 Grandmaster';
  else if (wpm >= 90) badge = '⚡ Typing Deity';
  else if (wpm >= 70) badge = '🔥 Pro Typist';
  else if (wpm >= 50) badge = '⚡ Speedster';

  const userRecord: RegisteredUserRecord = {
    id: existingIndex >= 0 ? users[existingIndex].id : `reg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    username: cleanUsername,
    uniqueHandle: handle,
    wpm: Math.max(wpm, existingIndex >= 0 ? users[existingIndex].wpm : 0),
    accuracy: accuracy || (existingIndex >= 0 ? users[existingIndex].accuracy : 98),
    testsCount: Math.max(testsCount, existingIndex >= 0 ? users[existingIndex].testsCount : 1),
    registeredDate: existingIndex >= 0 ? users[existingIndex].registeredDate : new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    badge,
  };

  if (existingIndex >= 0) {
    users[existingIndex] = userRecord;
  } else {
    users.push(userRecord);
  }

  localStorage.setItem(STORAGE_KEY_REGISTERED_USERS, JSON.stringify(users));
  return users;
}

// In-Memory Storage Cache Layer
let cachedResults: TestResult[] | null = null;
let cachedSettings: UserSettings | null = null;
let cachedAnalytics: any = null;
let cachedChallenges: string[] | null = null;

export function invalidateStorageCache(): void {
  cachedResults = null;
  cachedSettings = null;
  cachedAnalytics = null;
  cachedChallenges = null;
}

export const DEFAULT_SETTINGS: UserSettings = {
  userName: 'Pro Typist',
  theme: 'system',
  fontSize: 'lg',
  caretStyle: 'line',
  soundEnabled: true,
  soundProfile: 'cherry_mx',
  soundVolume: 0.4,
  blindMode: false,
  stopOnError: false,
  showLiveWpm: true,
  showKeyboard: true,
  smoothCaret: true,
  highlightFinger: true,
  dailyGoalType: 'words',
  dailyGoalTarget: 500,
  zenMode: false,
  difficulty: 'moderate',
};

export function getCompletedChallengeIds(): string[] {
  if (typeof window === 'undefined') return [];
  if (cachedChallenges !== null) return cachedChallenges;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CHALLENGES);
    cachedChallenges = raw ? JSON.parse(raw) : [];
    return cachedChallenges!;
  } catch (e) {
    return [];
  }
}

export function saveCompletedChallengeId(challengeId: string): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const existing = getCompletedChallengeIds();
    if (!existing.includes(challengeId)) {
      const updated = [...existing, challengeId];
      localStorage.setItem(STORAGE_KEY_CHALLENGES, JSON.stringify(updated));
      cachedChallenges = updated;
      return updated;
    }
    return existing;
  } catch (e) {
    return [];
  }
}

export function getUserSettings(): UserSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  if (cachedSettings !== null) return cachedSettings;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SETTINGS);
    if (!raw) {
      cachedSettings = DEFAULT_SETTINGS;
      return DEFAULT_SETTINGS;
    }
    cachedSettings = { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    return cachedSettings;
  } catch (e) {
    return DEFAULT_SETTINGS;
  }
}

export function saveUserSettings(settings: UserSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
    cachedSettings = settings;
  } catch (e) {
    console.error('Failed to save settings:', e);
  }
}

export function getTestResults(): TestResult[] {
  if (typeof window === 'undefined') return [];
  if (cachedResults !== null) return cachedResults;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_RESULTS);
    if (!raw) {
      cachedResults = [];
      return [];
    }
    const results: TestResult[] = JSON.parse(raw);
    cachedResults = results.sort((a, b) => b.timestamp - a.timestamp);
    return cachedResults;
  } catch (e) {
    console.error('Failed to parse test results:', e);
    return [];
  }
}

export function saveTestResult(result: TestResult): TestResult[] {
  if (typeof window === 'undefined') return [];
  try {
    const existing = getTestResults();
    const updated = [result, ...existing].slice(0, 150); // Store up to 150 past tests
    localStorage.setItem(STORAGE_KEY_RESULTS, JSON.stringify(updated));
    cachedResults = updated;
    cachedAnalytics = null; // Invalidate analytics cache

    // Sync registered user score to leaderboard if registered
    const settings = getUserSettings();
    if (settings.userName && settings.userName.trim().length >= 3 && settings.userName !== 'Pro Typist') {
      const bestWpm = Math.max(result.wpm, ...updated.map((r) => r.wpm));
      saveOrUpdateRegisteredUser(settings.userName, bestWpm, result.accuracy, updated.length);
    }

    return updated;
  } catch (e) {
    console.error('Failed to save test result:', e);
    return getTestResults();
  }
}

export function clearTestHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY_RESULTS);
  cachedResults = [];
  cachedAnalytics = null;
}

export function deleteTestResult(id: string): TestResult[] {
  if (typeof window === 'undefined') return [];
  const existing = getTestResults();
  const filtered = existing.filter(r => r.id !== id);
  localStorage.setItem(STORAGE_KEY_RESULTS, JSON.stringify(filtered));
  cachedResults = filtered;
  cachedAnalytics = null;
  return filtered;
}

export function getOverallAnalytics() {
  if (cachedAnalytics !== null) return cachedAnalytics;
  const results = getTestResults();
  if (results.length === 0) {
    cachedAnalytics = {
      totalTests: 0,
      bestWpm: 0,
      avgWpm: 0,
      avgAccuracy: 0,
      totalTimeSeconds: 0,
      totalWords: 0,
      currentStreakDays: 0,
      topWeakKeys: [] as { key: string; errors: number }[],
    };
    return cachedAnalytics;
  }

  const totalTests = results.length;
  const bestWpm = Math.max(...results.map(r => r.wpm));
  const avgWpm = Math.round(results.reduce((acc, r) => acc + r.wpm, 0) / totalTests);
  const avgAccuracy = Math.round(results.reduce((acc, r) => acc + r.accuracy, 0) / totalTests);
  const totalTimeSeconds = results.reduce((acc, r) => acc + r.timeSeconds, 0);
  const totalWords = results.reduce((acc, r) => acc + Math.round(r.correctChars / 5), 0);

  // Calculate streak days
  const uniqueDates = Array.from(
    new Set(
      results.map(r => new Date(r.timestamp).toISOString().split('T')[0])
    )
  ).sort().reverse();

  let streak = 0;
  if (uniqueDates.length > 0) {
    const today = new Date().toISOString().split('T')[0];
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = yesterdayDate.toISOString().split('T')[0];

    let checkDate = uniqueDates[0] === today ? today : (uniqueDates[0] === yesterday ? yesterday : null);

    if (checkDate) {
      let current = new Date(checkDate);
      for (const dStr of uniqueDates) {
        const expected = current.toISOString().split('T')[0];
        if (dStr === expected) {
          streak++;
          current.setDate(current.getDate() - 1);
        } else {
          break;
        }
      }
    }
  }

  // Aggregate key errors
  const keyErrorMap: Record<string, number> = {};
  for (const res of results) {
    if (res.keyErrors) {
      for (const [key, count] of Object.entries(res.keyErrors)) {
        const k = key.toLowerCase();
        keyErrorMap[k] = (keyErrorMap[k] || 0) + count;
      }
    }
  }

  const topWeakKeys = Object.entries(keyErrorMap)
    .map(([key, errors]) => ({ key, errors }))
    .sort((a, b) => b.errors - a.errors)
    .slice(0, 6);

  cachedAnalytics = {
    totalTests,
    bestWpm,
    avgWpm,
    avgAccuracy,
    totalTimeSeconds,
    totalWords,
    currentStreakDays: streak,
    topWeakKeys,
    keyErrors: keyErrorMap,
  };
  return cachedAnalytics;
}

export function exportUserDataJSON(): string {
  const settings = getUserSettings();
  const results = getTestResults();
  return JSON.stringify({ settings, results, exportDate: new Date().toISOString() }, null, 2);
}

export function importUserDataJSON(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed.settings) saveUserSettings(parsed.settings);
    if (Array.isArray(parsed.results)) {
      localStorage.setItem(STORAGE_KEY_RESULTS, JSON.stringify(parsed.results));
    }
    invalidateStorageCache();
    return true;
  } catch (e) {
    console.error('Failed to import user data:', e);
    return false;
  }
}

export function getTodayGoalProgress(
  results: TestResult[],
  goalType: 'words' | 'time',
  goalTarget: number
) {
  const todayDateStr = new Date().toISOString().split('T')[0];
  const todayResults = results.filter(
    (r) => new Date(r.timestamp).toISOString().split('T')[0] === todayDateStr
  );

  if (goalType === 'words') {
    const totalWordsTyped = todayResults.reduce(
      (acc, r) => acc + Math.round((r.correctChars || r.totalChars) / 5),
      0
    );
    const target = Math.max(10, goalTarget || 500);
    const percent = Math.min(100, Math.round((totalWordsTyped / target) * 100));
    return {
      type: 'words' as const,
      completed: totalWordsTyped,
      target,
      percent,
      unit: 'words',
    };
  } else {
    const totalSecondsTyped = todayResults.reduce((acc, r) => acc + r.timeSeconds, 0);
    const completedMinutes = Math.round((totalSecondsTyped / 60) * 10) / 10;
    const target = Math.max(1, goalTarget || 10);
    const percent = Math.min(100, Math.round((completedMinutes / target) * 100));
    return {
      type: 'time' as const,
      completed: completedMinutes,
      target,
      percent,
      unit: 'mins',
    };
  }
}
