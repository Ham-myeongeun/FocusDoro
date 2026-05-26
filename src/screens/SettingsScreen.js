import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants/colors';
import { TIMER_CONFIG } from '../constants/timer';

const FOCUS_OPTIONS = [15, 20, 25, 30, 45, 50];
const BREAK_OPTIONS = [3, 5, 10, 15];

export default function SettingsScreen() {
  const [focusMin, setFocusMin] = useState(TIMER_CONFIG.FOCUS / 60);
  const [breakMin, setBreakMin] = useState(TIMER_CONFIG.SHORT_BREAK / 60);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>설정</Text>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>집중 시간</Text>
            <Text style={styles.cardValue}>{focusMin}분</Text>
          </View>
          <View style={styles.optionRow}>
            {FOCUS_OPTIONS.map(min => (
              <TouchableOpacity
                key={min}
                style={[styles.optionBtn, focusMin === min && styles.optionBtnActive]}
                onPress={() => setFocusMin(min)}
              >
                <Text style={[styles.optionText, focusMin === min && styles.optionTextActive]}>
                  {min}분
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>휴식 시간</Text>
            <Text style={styles.cardValue}>{breakMin}분</Text>
          </View>
          <View style={styles.optionRow}>
            {BREAK_OPTIONS.map(min => (
              <TouchableOpacity
                key={min}
                style={[styles.optionBtn, breakMin === min && styles.optionBtnActive]}
                onPress={() => setBreakMin(min)}
              >
                <Text style={[styles.optionText, breakMin === min && styles.optionTextActive]}>
                  {min}분
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>현재 설정</Text>
          <View style={styles.infoRow}>
            <View style={styles.infoBox}>
              <Text style={styles.infoNum}>{focusMin}</Text>
              <Text style={styles.infoLabel}>집중 (분)</Text>
            </View>
            <Text style={styles.infoDivider}>+</Text>
            <View style={styles.infoBox}>
              <Text style={styles.infoNum}>{breakMin}</Text>
              <Text style={styles.infoLabel}>휴식 (분)</Text>
            </View>
            <Text style={styles.infoDivider}>=</Text>
            <View style={styles.infoBox}>
              <Text style={[styles.infoNum, { color: COLORS.focus }]}>{(focusMin + breakMin) * 4}</Text>
              <Text style={styles.infoLabel}>1사이클 (분)</Text>
            </View>
          </View>
        </View>

        <View style={styles.tipCard}>
          <Text style={styles.tipText}>💡 설정 변경은 다음 세션부터 적용돼요</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  container: { flex: 1, paddingHorizontal: 24, paddingTop: 16 },
  title: { fontSize: 22, fontWeight: '500', color: COLORS.text, marginBottom: 24 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 20, marginBottom: 16, borderWidth: 0.5, borderColor: COLORS.border },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  cardTitle: { fontSize: 14, fontWeight: '500', color: COLORS.text },
  cardValue: { fontSize: 14, color: COLORS.focus, fontWeight: '500' },
  optionRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  optionBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 0.5, borderColor: COLORS.border, backgroundColor: COLORS.bg },
  optionBtnActive: { backgroundColor: COLORS.focus, borderColor: COLORS.focus },
  optionText: { fontSize: 13, color: COLORS.textMuted },
  optionTextActive: { color: '#fff', fontWeight: '500' },
  infoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 12 },
  infoBox: { alignItems: 'center' },
  infoNum: { fontSize: 28, fontWeight: '300', color: COLORS.text },
  infoLabel: { fontSize: 10, color: COLORS.textMuted, marginTop: 2 },
  infoDivider: { fontSize: 18, color: COLORS.sessionEmpty, marginBottom: 16 },
  tipCard: { backgroundColor: '#EAF3DE', borderRadius: 12, padding: 14 },
  tipText: { fontSize: 12, color: '#27500A', lineHeight: 18 },
});