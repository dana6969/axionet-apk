import * as LocalAuthentication from 'expo-local-authentication';
import { Alert } from 'react-native';

export async function authenticateUser() {
  try {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !isEnrolled) {
      Alert.alert('Biometric not available', 'Fallback: Enter passcode or login manually.');
      return false;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Unlock with biometrics',
      fallbackLabel: 'Use passcode',
      cancelLabel: 'Cancel',
      disableDeviceFallback: false,
    });

    if (result.success) {
      return true;
    } else {
      Alert.alert('Authentication Failed', 'Fallback: Try again or use another method.');
      return false;
    }
  } catch (error) {
    Alert.alert('Error', 'Biometric auth failed. Fallback activated.');
    return false;
  }
}
