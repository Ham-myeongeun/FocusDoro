import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function useNotification() {
  useEffect(() => {
    Notifications.requestPermissionsAsync();
  }, []);

  const notifySessionEnd = async (isFocus) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: isFocus ? '집중 세션 완료! 🎉' : '휴식 끝! 💪',
        body: isFocus ? '잘 하셨어요! 이제 잠깐 쉬어가세요.' : '다시 집중할 시간이에요. 화이팅!',
        sound: true,
      },
      trigger: null,
    });
  };

  return { notifySessionEnd };
}