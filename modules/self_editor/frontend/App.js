import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export default function App() {
  const [auth, setAuth] = useState(false);
  const [memory, setMemory] = useState(["System initialized"]);

  useEffect(() => {
    LocalAuthentication.authenticateAsync({ promptMessage: "Access Axionet AGI Core" })
      .then(res => setAuth(res.success));
  }, []);

  const think = () => {
    let output = "Reflection: AGI subsystem secure. Task chain valid.";
    setMemory(prev => [...prev, output]);
  };

  return auth ? (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Axionet AGI Core</Text>
      {memory.map((line, i) => <Text key={i}>→ {line}</Text>)}
      <Button title="Run Reflection Loop" onPress={think} />
    </ScrollView>
  ) : <View><Text>Authenticating...</Text></View>;
}
