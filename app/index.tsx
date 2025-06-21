import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert
} from 'react-native';
import { CheckCircle, Clock, Pill } from 'lucide-react-native';
import { mockMedications } from '@/data/mockData';
import { Medication } from '@/types/medication';

export default function Home() {
  try {
    const [medications, setMedications] = useState<Medication[]>(mockMedications);
    
    const getCurrentTime = () => {
      const now = new Date();
      return now.toTimeString().slice(0, 5);
    };

    const markAsTaken = (medicationId: string) => {
      setMedications(prev => 
        prev.map(med => 
          med.id === medicationId 
            ? { ...med, takenToday: true }
            : med
        )
      );
      Alert.alert('Success', 'Medication marked as taken!');
    };

    const getTodaysMedications = () => {
      return medications.sort((a, b) => a.scheduleTime.localeCompare(b.scheduleTime));
    };

    const getTimeStatus = (scheduleTime: string) => {
      const currentTime = getCurrentTime();
      const isOverdue = currentTime > scheduleTime;
      return isOverdue ? 'overdue' : 'upcoming';
    };

    const todaysMeds = getTodaysMedications();
    const takenCount = todaysMeds.filter(med => med.takenToday).length;
    const totalCount = todaysMeds.length;

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Today's Medications</Text>
            <Text style={styles.subtitle}>
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Text>
          </View>

          {/* Progress Summary */}
          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Pill color="#2563eb" size={24} />
              <Text style={styles.progressTitle}>Daily Progress</Text>
            </View>
            <Text style={styles.progressText}>
              {takenCount} of {totalCount} medications taken
            </Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${(takenCount / totalCount) * 100}%` }
                ]} 
              />
            </View>
          </View>

          {/* Medications List */}
          <View style={styles.medicationsSection}>
            <Text style={styles.sectionTitle}>Medications</Text>
            {todaysMeds.map((medication) => (
              <View key={medication.id} style={styles.medicationCard}>
                {/* Left Section: Name and Dosage */}
                <View style={styles.medicationDetails}>
                  <Text style={styles.medicationName}>{medication.name}</Text>
                  <Text style={styles.medicationDosage}>{medication.dosage}</Text>
                </View>

                {/* Center Section: Time Indicator */}
                <View style={[
                  styles.medicationTimeContainer, 
                ]}>
                  <View style={[
                    styles.timeChip,
                    getTimeStatus(medication.scheduleTime) === 'overdue' && !medication.takenToday
                      ? styles.timeChipOverdue
                      : styles.timeChipNormal
                  ]}>
                    <Clock size={12} color={
                      getTimeStatus(medication.scheduleTime) === 'overdue' && !medication.takenToday
                        ? '#dc2626'
                        : '#6b7280'
                    } />
                    <Text style={[
                      styles.timeText,
                      getTimeStatus(medication.scheduleTime) === 'overdue' && !medication.takenToday
                        ? styles.timeTextOverdue
                        : styles.timeTextNormal
                    ]}>
                      {medication.scheduleTime}
                    </Text>
                  </View>
                </View>

                {/* Right Section: Action Button/Indicator */}
                <View style={styles.medicationActionContainer}>
                  {medication.takenToday ? (
                    <View style={styles.takenIndicator}>
                      <CheckCircle color="#10b981" size={24} />
                      <Text style={styles.takenText}>Taken</Text>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={styles.takeButton}
                      onPress={() => markAsTaken(medication.id)}
                    >
                      <Text style={styles.takeButtonText}>Mark as Taken</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  } catch (err) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <Text style={{ color: 'red', fontSize: 18 }}>Error loading Home screen</Text>
        <Text selectable style={{ color: '#333', marginTop: 8 }}>{String(err)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  progressCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginLeft: 8,
  },
  progressText: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563eb',
    borderRadius: 4,
  },
  medicationsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  medicationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'nowrap', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  medicationDetails: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  medicationTimeContainer: {
    flex: 0, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  medicationActionContainer: {
    flex: 0, 
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  medicationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  timeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    paddingRight: 12,
  },
  timeChipNormal: {
    backgroundColor: '#f1f5f9',
  },
  timeChipOverdue: {
    backgroundColor: '#fef2f2',
  },
  timeText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  timeTextNormal: {
    color: '#6b7280',
  },
  timeTextOverdue: {
    color: '#dc2626',
  },
  medicationDosage: {
    fontSize: 14,
    color: '#64748b',
  },
  takeButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    width: 120, 
    overflow: 'hidden', 
  },
  takeButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    numberOfLines: 1, 
    ellipsizeMode: 'clip', 
  },
  takenIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  takenText: {
    color: '#10b981',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
});