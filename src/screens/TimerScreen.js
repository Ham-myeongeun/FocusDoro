import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import useTimer from '../hooks/useTimer';
import useStats from '../hooks/useStats';
import CircularTimer from '../components/CircularTimer';
import SessionDots from '../components/SessionDots';
import ControlButtons from '../components/ControlButtons';
import { COLORS } from '../constants/colors';

export default function TimerScreen() {
  const { secondsLeft, isRunning, isFocus, session, completedToday, progress, start, pause, reset, skip } = useTimer();
  const { addSession } = useStats();
  const prevCompleted = useRef(completedToday);

  useEffect(() => {
    if (completedToday > prevCompleted.current) {
      addSession();
    }
    prevCompleted.current = completedToday;
  }, [completedToday]);

  useEffect(() => {
    if (isRunning) {
      activateKeepAwakeAsync();
    } else {
      deactivateKeepAwake();
    }
    return () => deactivateKeepAwake();
  }, [isRunning]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>FocusDoro</Text>
        <SessionDots session={session} />
        <CircularTimer secondsLeft={secondsLeft} progress={progress} isFocus={isFocus} />
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>{completedToday}</Text>
            <Text style={styles.statLabel}>오늘 완료</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>{Math.round(completedToday * 25)}m</Text>
            <Text style={styles.statLabel}>집중 총합</Text>
          </View>
        </View>
        <ControlButtons
          isRunning={isRunning}
          isFocus={isFocus}
          onStart={start}
          onPause={pause}
          onReset={reset}
          onSkip={skip}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  title: { fontSize: 18, fontWeight: '500', color: COLORS.textMuted, letterSpacing: 3, marginBottom: 24 },
  statsRow: { flexDirection: 'row', gap: 24, marginTop: 32 },
  statBox: { alignItems: 'center' },
  statNum: { fontSize: 24, fontWeight: '300', color: COLORS.text },
  statLabel: { fontSize: 12, color: COLORS.textMuted, marginTop: 2 },
});