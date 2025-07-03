import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export default function LoginScreen() {
  const [authenticated, setAuthenticated] = useState(false);

  const handleBiometricLogin = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !isEnrolled) {
        Alert.alert('Biometric not available', 'Fallback: Use manual login.');
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Login with biometrics',
        fallbackLabel: 'Use passcode',
        disableDeviceFallback: false,
      });

      if (result.success) {
        setAuthenticated(true);
      } else {
        Alert.alert('Failed', 'Authentication failed. Try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong with biometrics.');
    }
  };

  useEffect(() => {
    handleBiometricLogin();
  }, []);

  return (
    <View style={styles.container}>
      {authenticated ? (
        <Text style={styles.text}>✅ Welcome to Axionet</Text>
      ) : (
        <Text style={styles.text}>🔒 Authenticating...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  text: {
    color: '#0ff',
    fontSize: 18,
  },
});
