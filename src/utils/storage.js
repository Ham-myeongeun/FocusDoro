import AsyncStorage from '@react-native-async-storage/async-storage';

const SETTINGS_KEY = 'focusdoro_settings';

export async function saveSettings(focusMin, breakMin) {
  await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify({ focusMin, breakMin }));
}

export async function loadSettings() {
  const raw = await AsyncStorage.getItem(SETTINGS_KEY);
  if (!raw) return { focusMin: 25, breakMin: 5 };
  return JSON.parse(raw);
}