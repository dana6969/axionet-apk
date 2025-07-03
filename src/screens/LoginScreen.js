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
        Alert.alert('⚠️ Biometric not available', 'Fallback: Use manual login.');
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Login with biometrics',
        cancelLabel: 'Cancel',
        disableDeviceFallback: true,
      });

      if (result.success) {
        setAuthenticated(true);
      } else {
        Alert.alert('❌ Failed', 'Authentication failed. Try again.');
      }
    } catch (error) {
      Alert.alert('❗ Error', 'Something went wrong with biometrics.');
    }
  };

  useEffect(() => {
    handleBiometricLogin();
  }, []);

  return (
    <View style={styles.container}>
      {authenticated ? (
        <Text style={styles.success}>✅ Authentication Successful</Text>
      ) : (
        <>
          <Text style={styles.title}>Welcome to Axionet</Text>
          <Button title="Retry Biometric Login" onPress={handleBiometricLogin} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: '#00FF88',
    fontSize: 24,
    marginBottom: 30,
  },
  success: {
    color: '#00FF88',
    fontSize: 20,
  },
});
