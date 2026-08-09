import { TestResult, UserSettings } from '../types';

const STORAGE_KEY_RESULTS = 'keypulse_test_results_v1';
const STORAGE_KEY_SETTINGS = 'keypulse_user_settings_v1';

export const DEFAULT_SETTINGS: UserSettings = {
  userName: 'Pro Typist',
  fontSize: 'lg',
  caretStyle: 'line',
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
};

export function getUserSettings(): UserSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SETTINGS);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch (e) {
    return DEFAULT_SETTINGS;
  }
}

export function saveUserSettings(settings: UserSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings:', e);
  }
}

export function getTestResults(): TestResult[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_RESULTS);
    if (!raw) return [];
    const results: TestResult[] = JSON.parse(raw);
    return results.sort((a, b) => b.timestamp - a.timestamp);
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
    return updated;
  } catch (e) {
    console.error('Failed to save test result:', e);
    return getTestResults();
  }
}

export function clearTestHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY_RESULTS);
}

export function deleteTestResult(id: string): TestResult[] {
  if (typeof window === 'undefined') return [];
  const existing = getTestResults();
  const filtered = existing.filter(r => r.id !== id);
  localStorage.setItem(STORAGE_KEY_RESULTS, JSON.stringify(filtered));
  return filtered;
}

export function getOverallAnalytics() {
  const results = getTestResults();
  if (results.length === 0) {
    return {
      totalTests: 0,
      bestWpm: 0,
      avgWpm: 0,
      avgAccuracy: 0,
      totalTimeSeconds: 0,
      totalWords: 0,
      currentStreakDays: 0,
      topWeakKeys: [] as { key: string; errors: number }[],
    };
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

  return {
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
