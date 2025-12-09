import Sound from 'react-native-sound';

let soundInstance: any = null;

export const playNotificationSound = () => {
  soundInstance = new Sound('notification_sound.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('Failed to load sound', error);
      return;
    }
    soundInstance.play((success: any) => {
      if (!success) {
        console.log('Sound playback failed');
      }
    });
  });
};

export const stopNotificationSound = () => {
  if (soundInstance) {
    soundInstance.stop(() => {
      console.log('Sound stopped');
    });
  }
};
