import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { BarChart3, TrendingUp, Calendar, Target } from 'lucide-react-native';
import { mockAdherenceData } from '@/data/mockData';

const { width } = Dimensions.get('window');

export default function Insights() {
  const adherenceData = mockAdherenceData;
  const averageAdherence = Math.round(
    adherenceData.reduce((sum, day) => sum + day.percentage, 0) / adherenceData.length
  );
  
  const totalMedsTaken = adherenceData.reduce((sum, day) => sum + day.taken, 0);
  const totalMedsScheduled = adherenceData.reduce((sum, day) => sum + day.total, 0);
  
  const streak = calculateStreak(adherenceData);
  
  function calculateStreak(data: typeof adherenceData) {
    let currentStreak = 0;
    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i].percentage === 100) {
        currentStreak++;
      } else {
        break;
      }
    }
    return currentStreak;
  }

  const getBarHeight = (percentage: number) => {
    return Math.max((percentage / 100) * 120, 4); // Minimum height of 4
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <BarChart3 color="#2563eb" size={28} />
          </View>
          <Text style={styles.title}>Medication Insights</Text>
          <Text style={styles.subtitle}>Track your medication adherence over time</Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, styles.primaryCard]}>
            <View style={styles.statIcon}>
              <Target color="#ffffff" size={20} />
            </View>
            <Text style={styles.statValue}>{averageAdherence}%</Text>
            <Text style={styles.statLabel}>Average Adherence</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={[styles.statIcon, styles.secondaryIcon]}>
              <TrendingUp color="#10b981" size={20} />
            </View>
            <Text style={styles.statValue}>{streak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={[styles.statIcon, styles.tertiaryIcon]}>
              <Calendar color="#f59e0b" size={20} />
            </View>
            <Text style={styles.statValue}>{totalMedsTaken}/{totalMedsScheduled}</Text>
            <Text style={styles.statLabel}>This Week</Text>
          </View>
        </View>

        {/* Chart */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Weekly Adherence</Text>
          <Text style={styles.chartSubtitle}>Percentage of medications taken each day</Text>
          
          <View style={styles.chartContainer}>
            <View style={styles.chart}>
              {adherenceData.map((day, index) => (
                <View key={day.date} style={styles.barContainer}>
                  <View style={styles.barWrapper}>
                    <View
                      style={[
                        styles.bar,
                        {
                          height: getBarHeight(day.percentage),
                          backgroundColor: day.percentage === 100 ? '#10b981' : 
                                         day.percentage >= 75 ? '#3b82f6' : 
                                         day.percentage >= 50 ? '#f59e0b' : '#ef4444',
                        }
                      ]}
                    />
                    <Text style={styles.percentageLabel}>{day.percentage}%</Text>
                  </View>
                  <Text style={styles.dateLabel}>{formatDate(day.date)}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Insights */}
        <View style={styles.insightsCard}>
          <Text style={styles.insightsTitle}>💡 Insights</Text>
          <View style={styles.insightsList}>
            {averageAdherence >= 90 && (
              <View style={styles.insightItem}>
                <Text style={styles.insightText}>
                  🎉 Excellent adherence! You're doing great at taking your medications consistently.
                </Text>
              </View>
            )}
            {averageAdherence < 75 && (
              <View style={styles.insightItem}>
                <Text style={styles.insightText}>
                  💪 Consider setting more reminders or adjusting your medication schedule to improve adherence.
                </Text>
              </View>
            )}
            {streak >= 3 && (
              <View style={styles.insightItem}>
                <Text style={styles.insightText}>
                  🔥 Great streak! Keep up the consistent habit of taking your medications on time.
                </Text>
              </View>
            )}
            <View style={styles.insightItem}>
              <Text style={styles.insightText}>
                📊 Your medication adherence data helps you and your healthcare provider make informed decisions.
              </Text>
            </View>
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
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  primaryCard: {
    backgroundColor: '#2563eb',
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  secondaryIcon: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  tertiaryIcon: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  chartCard: {
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
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  chartSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 20,
  },
  chartContainer: {
    alignItems: 'center',
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: width - 80,
    height: 160,
    paddingBottom: 20,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  barWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 140,
  },
  bar: {
    width: 24,
    borderRadius: 4,
    marginBottom: 4,
  },
  percentageLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#4b5563',
  },
  dateLabel: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 8,
    textAlign: 'center',
  },
  insightsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  insightsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  insightsList: {
    gap: 8,
  },
  insightItem: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
  },
  insightText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
});