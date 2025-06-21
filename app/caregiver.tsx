import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Heart, AlertTriangle, Send, Clock, Phone } from 'lucide-react-native';
import { mockMedications } from '@/data/mockData';

export default function Caregiver() {
  const [notificationsSent, setNotificationsSent] = useState<Set<string>>(new Set());
  
  const getCurrentTime = () => {
    const now = new Date();
    return now.toTimeString().slice(0, 5);
  };

  const getMedications = () => {
    const currentTime = getCurrentTime();
    return mockMedications.filter(med => 
      !med.takenToday && med.scheduleTime < currentTime
    );
  };

  const sendNotification = (medicationId: string, medicationName: string) => {
    Alert.alert(
      'Notify Caregiver',
      `Send notification about missed ${medicationName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Send',
          onPress: () => {
            setNotificationsSent(prev => new Set([...prev, medicationId]));
            Alert.alert(
              'Notification Sent',
              `Your caregiver has been notified about the missed ${medicationName} dose.`,
              [{ text: 'OK' }]
            );
          }
        }
      ]
    );
  };

  const callCaregiver = () => {
    Alert.alert(
      'Call Caregiver',
      'Would you like to call your primary caregiver?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Call',
          onPress: () => {
            Alert.alert('Calling...', 'This would open your phone app in a real implementation.');
          }
        }
      ]
    );
  };

  const missedMedications = getMedications();
  const hasNotifications = notificationsSent.size > 0;

  const getTimeSinceMissed = (scheduleTime: string) => {
    const [hours, minutes] = scheduleTime.split(':').map(Number);
    const scheduledDate = new Date();
    scheduledDate.setHours(hours, minutes, 0, 0);
    
    const now = new Date();
    const diffMs = now.getTime() - scheduledDate.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHours > 0) {
      return `${diffHours}h ${diffMins}m ago`;
    }
    return `${diffMins}m ago`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Heart color="#dc2626" size={28} />
          </View>
          <Text style={styles.title}>Caregiver Support</Text>
          <Text style={styles.subtitle}>
            Keep your loved ones informed about your medication schedule
          </Text>
        </View>

        {/* Emergency Contact */}
        <TouchableOpacity style={styles.emergencyCard} onPress={callCaregiver}>
          <View style={styles.emergencyContent}>
            <View style={styles.emergencyIcon}>
              <Phone color="#ffffff" size={24} />
            </View>
            <View style={styles.emergencyText}>
              <Text style={styles.emergencyTitle}>Emergency Contact</Text>
              <Text style={styles.emergencySubtitle}>Tap to call your primary caregiver</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Missed Medications */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <AlertTriangle color="#f59e0b" size={20} />
            <Text style={styles.sectionTitle}>Missed Medications</Text>
          </View>
          
          {missedMedications.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateTitle}>Great job! 🎉</Text>
              <Text style={styles.emptyStateText}>
                No missed medications today. Your caregivers will be proud!
              </Text>
            </View>
          ) : (
            <View style={styles.medicationsList}>
              {missedMedications.map((medication) => (
                <View key={medication.id} style={styles.medicationCard}>
                  <View style={styles.medicationInfo}>
                    <View style={styles.medicationHeader}>
                      <Text style={styles.medicationName}>{medication.name}</Text>
                      <View style={styles.timeChip}>
                        <Clock size={12} color="#dc2626" />
                        <Text style={styles.timeText}>
                          {getTimeSinceMissed(medication.scheduleTime)}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.medicationDosage}>{medication.dosage}</Text>
                    <Text style={styles.scheduledTime}>
                      Scheduled for {medication.scheduleTime}
                    </Text>
                  </View>
                  
                  {notificationsSent.has(medication.id) ? (
                    <View style={styles.notificationSent}>
                      <Text style={styles.notificationSentText}>Caregiver Notified ✓</Text>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={styles.notifyButton}
                      onPress={() => sendNotification(medication.id, medication.name)}
                    >
                      <Send size={16} color="#ffffff" />
                      <Text style={styles.notifyButtonText}>Notify</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Notification History */}
        {hasNotifications && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Notifications</Text>
            <View style={styles.historyCard}>
              <Text style={styles.historyText}>
                {notificationsSent.size} notification{notificationsSent.size !== 1 ? 's' : ''} sent today
              </Text>
              <Text style={styles.historySubtext}>
                Your caregivers have been informed about missed medications
              </Text>
            </View>
          </View>
        )}

        {/* Caregiver Info */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>👥 About Caregiver Support</Text>
          <View style={styles.infoList}>
            <Text style={styles.infoItem}>• Notifications are sent via email and SMS</Text>
            <Text style={styles.infoItem}>• Caregivers receive medication name and time missed</Text>
            <Text style={styles.infoItem}>• Emergency contact is available 24/7</Text>
            <Text style={styles.infoItem}>• All notifications include your current status</Text>
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
    marginBottom: 24,
  },
  headerIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fef2f2',
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
  emergencyCard: {
    backgroundColor: '#dc2626',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  emergencyContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emergencyIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  emergencyText: {
    flex: 1,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  emergencySubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginLeft: 8,
  },
  emptyState: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#10b981',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
  },
  medicationsList: {
    gap: 12,
  },
  medicationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  medicationInfo: {
    flex: 1,
  },
  medicationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    flex: 1,
  },
  timeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#fef2f2',
    borderRadius: 12,
    marginLeft: 8,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#dc2626',
    marginLeft: 4,
  },
  medicationDosage: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 2,
  },
  scheduledTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
  notifyButton: {
    backgroundColor: '#dc2626',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  notifyButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  notificationSent: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  notificationSentText: {
    color: '#166534',
    fontSize: 12,
    fontWeight: '600',
  },
  historyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  historyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  historySubtext: {
    fontSize: 14,
    color: '#64748b',
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  infoList: {
    gap: 4,
  },
  infoItem: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
});