import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useStats from '../hooks/useStats';
import { COLORS } from '../constants/colors';

export default function StatsScreen() {
  const { weeklyData, todaySessions, weekTotal, weekMinutes } = useStats();
  const maxSessions = Math.max(...weeklyData.map(d => d.sessions), 1);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>통계</Text>
        <View style={styles.summaryRow}>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryNum}>{todaySessions}</Text>
            <Text style={styles.summaryLabel}>오늘 세션</Text>
          </View>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryNum}>{weekTotal}</Text>
            <Text style={styles.summaryLabel}>주간 세션</Text>
          </View>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryNum}>{weekMinutes}m</Text>
            <Text style={styles.summaryLabel}>주간 집중</Text>
          </View>
        </View>
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>이번 주 기록</Text>
          <View style={styles.chart}>
            {weeklyData.map((d, i) => (
              <View key={i} style={styles.barCol}>
                <Text style={styles.barNum}>{d.sessions > 0 ? d.sessions : ''}</Text>
                <View style={styles.barTrack}>
                  <View style={[styles.bar, { height: Math.max((d.sessions / maxSessions) * 140, d.sessions > 0 ? 8 : 0), backgroundColor: d.label === String(new Date().getDate()).padStart(2,'0') ? COLORS.focus : COLORS.sessionDot, opacity: d.sessions === 0 ? 0.15 : 1 }]} />
                </View>
                <Text style={styles.barLabel}>{d.label}일</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>오늘의 목표</Text>
          <Text style={styles.tipText}>
            {todaySessions === 0 && '첫 번째 세션을 시작해보세요!'}
            {todaySessions >= 1 && todaySessions < 4 && todaySessions + '세션 완료! 계속 달려봐요 🔥'}
            {todaySessions >= 4 && todaySessions + '세션 완료! 오늘 정말 집중했네요 🏆'}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  container: { flex: 1, paddingHorizontal: 24, paddingTop: 16 },
  title: { fontSize: 22, fontWeight: '500', color: COLORS.text, marginBottom: 24 },
  summaryRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  summaryBox: { flex: 1, backgroundColor: '#fff', borderRadius: 12, padding: 16, alignItems: 'center', borderWidth: 0.5, borderColor: COLORS.border },
  summaryNum: { fontSize: 24, fontWeight: '300', color: COLORS.text, marginBottom: 4 },
  summaryLabel: { fontSize: 11, color: COLORS.textMuted },
  chartCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, marginBottom: 16, borderWidth: 0.5, borderColor: COLORS.border },
  chartTitle: { fontSize: 14, fontWeight: '500', color: COLORS.text, marginBottom: 16 },
  chart: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', height: 180 },
  barCol: { flex: 1, alignItems: 'center', justifyContent: 'flex-end' },
  barNum: { fontSize: 10, color: COLORS.textMuted, marginBottom: 4, height: 14 },
  barTrack: { width: '60%', height: 140, justifyContent: 'flex-end' },
  bar: { width: '100%', borderRadius: 4 },
  barLabel: { fontSize: 10, color: COLORS.textMuted, marginTop: 6 },
  tipCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, borderWidth: 0.5, borderColor: COLORS.border },
  tipTitle: { fontSize: 14, fontWeight: '500', color: COLORS.text, marginBottom: 8 },
  tipText: { fontSize: 13, color: COLORS.textMuted, lineHeight: 20 },
});