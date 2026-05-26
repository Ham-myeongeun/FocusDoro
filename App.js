import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TimerScreen from './src/screens/TimerScreen';
import StatsScreen from './src/screens/StatsScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style='dark' />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              const icons = {
                '타이머': focused ? 'timer' : 'timer-outline',
                '통계': focused ? 'bar-chart' : 'bar-chart-outline',
                '설정': focused ? 'settings' : 'settings-outline',
              };
              return <Ionicons name={icons[route.name]} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#E24B4A',
            tabBarInactiveTintColor: '#888780',
            tabBarStyle: {
              backgroundColor: '#FFFFFF',
              borderTopWidth: 0.5,
              borderTopColor: '#E0DED8',
              paddingBottom: 8,
              paddingTop: 6,
              height: 60,
            },
            tabBarLabelStyle: { fontSize: 11, fontWeight: '500' },
            headerShown: false,
          })}
        >
          <Tab.Screen name='타이머' component={TimerScreen} />
          <Tab.Screen name='통계' component={StatsScreen} />
          <Tab.Screen name='설정' component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}