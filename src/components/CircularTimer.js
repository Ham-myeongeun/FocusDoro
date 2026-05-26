import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { COLORS } from '../constants/colors';
import { formatTime } from '../utils/formatTime';

const SIZE = 260;
const STROKE = 12;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const CENTER = SIZE / 2;

export default function CircularTimer({ secondsLeft, progress, isFocus }) {
  const color = isFocus ? COLORS.focus : COLORS.rest;
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);
  const originStr = CENTER + ', ' + CENTER;

  return (
    <View style={styles.container}>
      <Svg width={SIZE} height={SIZE}>
        <Circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          stroke={COLORS.border}
          strokeWidth={STROKE}
          fill='none'
        />
        <Circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          stroke={color}
          strokeWidth={STROKE}
          fill='none'
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap='round'
          rotation='-90'
          origin={originStr}
        />
      </Svg>
      <View style={styles.center}>
        <Text style={[styles.label, { color }]}>
          {isFocus ? '집중' : '휴식'}
        </Text>
        <Text style={styles.time}>{formatTime(secondsLeft)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
  center: { position: 'absolute', alignItems: 'center' },
  label: { fontSize: 14, fontWeight: '500', marginBottom: 4, letterSpacing: 2 },
  time: { fontSize: 52, fontWeight: '300', color: COLORS.text, letterSpacing: -2 },
});