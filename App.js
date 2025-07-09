import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>⚡ Axionet OS v1.0</Text>
      <Text style={styles.sub}>You are online and operational.</Text>
      <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>🧠 Personal Assistant Mode</Text></TouchableOpacity>
      <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>🎮 Creator Mode</Text></TouchableOpacity>
      <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>🛡️ Moderator Mode</Text></TouchableOpacity>
      <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>📡 Mesh Communication</Text></TouchableOpacity>
      <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>📁 System Files & Memory</Text></TouchableOpacity>
      <Text style={styles.footer}>Axionet is running on full protocol stack.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', padding: 20 },
  header: { color: '#0ff', fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  sub: { color: '#ccc', fontSize: 16, marginBottom: 30 },
  button: { backgroundColor: '#222', padding: 15, borderRadius: 10, marginBottom: 15 },
  buttonText: { color: '#0ff', fontSize: 16, textAlign: 'center' },
  footer: { color: '#555', fontSize: 14, marginTop: 30, textAlign: 'center' },
});
