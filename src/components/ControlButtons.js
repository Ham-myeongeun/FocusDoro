import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

export default function ControlButtons({ isRunning, isFocus, onStart, onPause, onReset, onSkip }) {
  const color = isFocus ? COLORS.focus : COLORS.rest;
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.secondary} onPress={onReset}>
        <Text style={styles.secondaryText}>리셋</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.main, { backgroundColor: color }]} onPress={isRunning ? onPause : onStart}>
        <Text style={styles.mainText}>{isRunning ? '일시정지' : '시작'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondary} onPress={onSkip}>
        <Text style={styles.secondaryText}>건너뛰기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 40 },
  main: { paddingHorizontal: 36, paddingVertical: 16, borderRadius: 50 },
  mainText: { color: '#fff', fontSize: 16, fontWeight: '500' },
  secondary: { paddingHorizontal: 16, paddingVertical: 16 },
  secondaryText: { color: COLORS.textMuted, fontSize: 14 },
});