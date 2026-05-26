import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'focusdoro_stats';

function getTodayKey() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
}

function getLast7Days() {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
  });
}

export default function useStats() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    AsyncStorage.getItem(KEY).then(raw => {
      if (raw) setStats(JSON.parse(raw));
    });
  }, []);

  const addSession = useCallback(async () => {
    const today = getTodayKey();
    setStats(prev => {
      const next = { ...prev, [today]: (prev[today] || 0) + 1 };
      AsyncStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const weeklyData = getLast7Days().map(dateKey => ({
    date: dateKey,
    label: dateKey.slice(8),
    sessions: stats[dateKey] || 0,
    minutes: (stats[dateKey] || 0) * 25,
  }));

  const todayKey = getTodayKey();
  const todaySessions = stats[todayKey] || 0;
  const weekTotal = weeklyData.reduce((sum, d) => sum + d.sessions, 0);
  const weekMinutes = weekTotal * 25;

  return { weeklyData, todaySessions, weekTotal, weekMinutes, addSession };
}