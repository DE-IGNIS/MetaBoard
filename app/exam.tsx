import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Exam {
  id: string;
  subject: string;
  date: string;
  time: string;
}

export default function ExamScheduleScreen() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    loadExams();
  }, []);

  const loadExams = async () => {
    const stored = await AsyncStorage.getItem('exams');
    if (stored) setExams(JSON.parse(stored));
  };

  const saveExams = async (updated: Exam[]) => {
    await AsyncStorage.setItem('exams', JSON.stringify(updated));
    setExams(updated);
  };

  const addExam = () => {
    if (!subject || !date || !time) {
      Alert.alert('Fill all fields');
      return;
    }
    const newExam: Exam = {
      id: Date.now().toString(),
      subject,
      date,
      time,
    };
    saveExams([...exams, newExam]);
    setSubject('');
    setDate('');
    setTime('');
  };

  const deleteExam = (id: string) => {
    saveExams(exams.filter(e => e.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📅 Exam Schedule</Text>

      <TextInput
        style={styles.input}
        placeholder="Subject"
        placeholderTextColor="#aaa"
        value={subject}
        onChangeText={setSubject}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (e.g. 25 Mar 2026)"
        placeholderTextColor="#aaa"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Time (e.g. 10:00 AM)"
        placeholderTextColor="#aaa"
        value={time}
        onChangeText={setTime}
      />

      <TouchableOpacity style={styles.addButton} onPress={addExam}>
        <Text style={styles.addButtonText}>+ Add Exam</Text>
      </TouchableOpacity>

      <FlatList
        data={exams}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No exams added yet.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.subject}>{item.subject}</Text>
              <Text style={styles.detail}>{item.date} — {item.time}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteExam(item.id)}>
              <Text style={styles.delete}>🗑</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7F0',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  input: {
    backgroundColor: '#ffffff',
    color: '#1a1a1a',
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e8e8e0',
    fontSize: 15,
    fontWeight: '500',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  addButton: {
    backgroundColor: '#1DB954',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#1DB954',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e8e8e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  subject: {
    color: '#1a1a1a',
    fontSize: 16,
    fontWeight: '700',
  },
  detail: {
    color: '#888',
    fontSize: 13,
    marginTop: 4,
  },
  delete: {
    fontSize: 20,
  },
  emptyText: {
    color: '#aaa',
    textAlign: 'center',
    fontSize: 15,
    marginTop: 40,
  },
});