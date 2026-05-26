import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
import { TIMER_CONFIG } from '../constants/timer';

export default function SessionDots({ session }) {
  const total = TIMER_CONFIG.SESSIONS_BEFORE_LONG;
  const current = ((session - 1) % total);
  return (
    <View style={styles.row}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[styles.dot, { backgroundColor: i < current ? COLORS.sessionDot : COLORS.sessionEmpty }]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  dot: { width: 8, height: 8, borderRadius: 4 },
});