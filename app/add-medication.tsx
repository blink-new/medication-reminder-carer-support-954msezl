import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { Plus, Clock, Pill as PillIcon } from 'lucide-react-native';
import { router } from 'expo-router';

export default function AddMedication() {
  const [medicationName, setMedicationName] = useState('');
  const [dosage, setDosage] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateTime = (time: string) => {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(time);
  };

  const handleSubmit = async () => {
    // Validation
    if (!medicationName.trim()) {
      Alert.alert('Error', 'Please enter a medication name');
      return;
    }
    
    if (!dosage.trim()) {
      Alert.alert('Error', 'Please enter the dosage');
      return;
    }
    
    if (!scheduleTime.trim()) {
      Alert.alert('Error', 'Please enter a schedule time');
      return;
    }
    
    if (!validateTime(scheduleTime)) {
      Alert.alert('Error', 'Please enter a valid time in HH:MM format (e.g., 08:30)');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      Alert.alert(
        'Success',
        'Medication added successfully!',
        [
          {
            text: 'OK',
            onPress: () => {
              // Reset form
              setMedicationName('');
              setDosage('');
              setScheduleTime('');
              // Navigate back to home
              router.push('/');
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to add medication. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Plus color="#2563eb" size={28} />
          </View>
          <Text style={styles.title}>Add New Medication</Text>
          <Text style={styles.subtitle}>
            Enter your medication details to set up reminders
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Medication Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Medication Name</Text>
            <View style={styles.inputContainer}>
              <PillIcon color="#6b7280" size={20} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={medicationName}
                onChangeText={setMedicationName}
                placeholder="e.g., Lisinopril, Metformin"
                placeholderTextColor="#9ca3af"
                autoCapitalize="words"
              />
            </View>
          </View>

          {/* Dosage */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Dosage</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.dosageIcon}>mg</Text>
              <TextInput
                style={styles.input}
                value={dosage}
                onChangeText={setDosage}
                placeholder="e.g., 10mg, 500mg"
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>

          {/* Schedule Time */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Schedule Time</Text>
            <View style={styles.inputContainer}>
              <Clock color="#6b7280" size={20} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={scheduleTime}
                onChangeText={setScheduleTime}
                placeholder="e.g., 08:00, 14:30"
                placeholderTextColor="#9ca3af"
                keyboardType="numeric"
              />
            </View>
            <Text style={styles.helpText}>Use 24-hour format (HH:MM)</Text>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <Text style={styles.submitButtonText}>
              {isSubmitting ? 'Adding Medication...' : 'Add Medication'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tips */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>💡 Tips</Text>
          <View style={styles.tipsList}>
            <Text style={styles.tipItem}>• Be specific with medication names</Text>
            <Text style={styles.tipItem}>• Include units in dosage (mg, ml, etc.)</Text>
            <Text style={styles.tipItem}>• Set times when you'll remember to take them</Text>
            <Text style={styles.tipItem}>• You can add multiple times for the same medication</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
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
    alignItems: 'center',
    marginBottom: 32,
  },
  headerIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 22,
  },
  form: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputIcon: {
    marginRight: 12,
  },
  dosageIcon: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    marginRight: 12,
    minWidth: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
  },
  helpText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
    marginLeft: 4,
  },
  submitButton: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  tipsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  tipsList: {
    gap: 4,
  },
  tipItem: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
});